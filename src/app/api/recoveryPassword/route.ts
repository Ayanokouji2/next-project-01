import userModel from "@/models/user.model";
import connectDB from "@/dbconnection/connect";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST( request : NextRequest ){
    try {
        const token = request.nextUrl.searchParams.get('token');

        if(!token){
            return NextResponse.json({
                error: 'Invalid token',
                status: 400
            })
        }

        const user = await userModel.findOne({ resetPasswordToken : token, resetPasswordExpires : { $gt : Date.now() } });

        if(!user){
            return NextResponse.json({
                error: 'Invalid token',
                status: 400
            })
        }

        const reqBody = await request.json()

        user.password = reqBody.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        
        return NextResponse.json({
            message: 'Password updated successfully',
            status: 200
        })
    } catch (error : unknown) {
        return NextResponse.json({
            error : (error as Error).message,
            status: 500
        })
    }
}