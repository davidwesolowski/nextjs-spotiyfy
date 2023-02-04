import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user.id,
          createdAt: Date.now(),
        },
        'top-secret',
        { expiresIn: '8h' }
      )

      return res
        .status(201)
        .setHeader(
          'Set-Cookie',
          cookie.serialize('SESSION_ID', token, {
            httpOnly: true,
            maxAge: 8 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          })
        )
        .json({ user })
    }

    return res.status(401).json({ error: 'Email or password is incorrect' })
  } catch (error) {
    return res.status(401).json({ error: 'Email or password is incorrect' })
  }
}
