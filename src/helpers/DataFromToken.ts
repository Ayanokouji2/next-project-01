import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET_TOKEN as string | undefined

export function DataFromToken(req: NextRequest): { _id: string, email: string } | null {

    try {
        const token = req.cookies.get('token')?.value as string | ""

        if (!token) {
            return null
        }

        const user =  jwt.verify(token, SECRET as string ) as { _id : string, email : string }

        return user
    } catch (error: unknown) {
        console.log((error as Error).message)
        return null
    }
}
