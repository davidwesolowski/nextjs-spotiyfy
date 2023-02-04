import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/', '/playlist', '/library']

export default function middleware(req: NextRequest) {
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    const token = req.cookies.SESSION_ID

    if (token == null) {
      return NextResponse.redirect('/signin')
    }
  }
}
