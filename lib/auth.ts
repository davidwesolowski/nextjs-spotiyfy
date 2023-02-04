import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

export const validateRoute = (
  handler: (req: NextApiRequest, res: NextApiResponse, user) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { SESSION_ID: token } = req.cookies

    if (token) {
      try {
        const { id } = jwt.verify(token, 'top-secret')

        const user = await prisma.user.findUnique({
          where: {
            id,
          },
        })

        if (!user) {
          throw new Error('Not real user')
        }

        return handler(req, res, user)
      } catch (error) {
        return res.status(401).json({ error: 'Not authorized' })
      }
    }
    return res.status(401).json({ error: 'Not authorized' })
  }
}

export const validateToken = (token: string) => {
  try {
    return jwt.verify(token, 'top-secret')
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }
}
