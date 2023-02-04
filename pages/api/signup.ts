import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body

  if (email === undefined || password === undefined) {
    return res.status(400).json({ message: 'Body cannot be empty' })
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
      },
    })

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
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'User already exists' })
  }
}
