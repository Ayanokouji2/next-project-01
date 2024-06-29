import connectDB from "@/dbconnection/connect";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

connectDB()

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json()

        if (!username || !email || !password) {
            return NextResponse.json({
                error: 'Please fill all fields',
                success: false,
                status: 400
            })
        }

        // Check if user already exists

        const existingUser = await userModel.findOne({ email })

        if(existingUser) {
            return NextResponse.json({
                error: 'User already exists',
                success: false,
                status: 400
            })
        }

        // Hash password
        
        const hashPassword = await bcrypt.hash(password, 10)

        // Create user

        const user = await userModel.create({
            username,
            email,
            password: hashPassword
        })

        return NextResponse.json({
            success: true,
            status: 201,
            user
        })

    } catch (error: unknown) {
        console.log((error as Error).message)
        return NextResponse.json({ 
            error: (error as Error).message,
            success: false,
            status: 500
        })
    }
}