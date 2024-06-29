import connectDB from "@/dbconnection/connect";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

connectDB()

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()
        if(!email || !password){
            return NextResponse.json({
                error: 'Please fill all fields',
                success: false,
                status: 400
            })
        }

        const user = await userModel.findOne({email})

        if(!user){
            return NextResponse.json({
                error: 'User not found',
                success: false,
                status: 404
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return NextResponse.json({
                error: 'Invalid credentials',
                success: false,
                status: 401
            })
        }

        user.password = undefined

        return NextResponse.json({
            success: true,
            status: 200,
            user 
        })
    } catch (error: unknown) {
        return NextResponse.json({ 
            error: (error as Error).message,
            success: false,
            status: 500
        })
    }
}