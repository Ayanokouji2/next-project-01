import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const  isPublicPath = pathname === '/login' || pathname === '/signup'

    const userToken : string = request.cookies.get('token')?.value as string || ""

    if(isPublicPath && userToken){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!isPublicPath && !userToken){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
    
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/profile/:userid*',
        '/login',
        '/signup'
    ],
}