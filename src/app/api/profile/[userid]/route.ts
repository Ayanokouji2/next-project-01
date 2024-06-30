import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest, context : any) {
    try {
        const { userid } = context.params
        
        const user = await userModel.findById(userid).select('-password')

        if (!user) {
            return NextResponse.json({
                error: 'User not found',
                success: false,
                status: 404
            })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            user,
        })
    } catch (error: unknown) {
        return NextResponse.json({
            error: (error as Error).message,
            success: false,
            status: 500
        })
    }
}