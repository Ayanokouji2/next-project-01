import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const response = NextResponse.json({
            success: true,
            status: 200,
            message: 'Logged out successfully'
        })

        response.cookies.delete('token')

        return response
    } catch (error: unknown) {
        return NextResponse.json({
            error: (error as Error).message,
            success: false,
            status: 500
        })

    }
}