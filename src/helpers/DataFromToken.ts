import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET_TOKEN as string | undefined

export function DataFromToken(req: NextRequest) : NextResponse{

    try {
        const token = req.cookies.get('token')?.value as string | ""

        if (!token) {
            return NextResponse.json({
                success: false,
                error: 'No token found',
                status: 401
            })
        }

        const user =  jwt.verify(token, SECRET as string ) as { _id : string, email : string }

        return NextResponse.json({
            status: 200,
            success: true,
            user
        })
    } catch (error: unknown) {
        console.log((error as Error).message)
        return NextResponse.json({
            success: false,
            error: (error as Error).message,
            status: 500
        })
    }
}
