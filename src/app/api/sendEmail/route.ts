import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbconnection/connect";
import sendMail from "@/helpers/MailHelper";
import { UserType } from "@/models/user.model";


connectDB();

export async function POST(req: NextRequest) {
    try {
        const {user, subject}  = await req.json()

        const response = await sendMail({email: user.email, subject, userId: user._id})

        if(!response){
            return NextResponse.json({
                error: 'Error while sending mail',
                status: 500,
                success: false
            })
        }

        return NextResponse.json({
            message: 'Verification email sent',
            status: 200,
            success: true
        })

    } catch (error: unknown) {
        console.log("Error while verifying token : ", (error as Error).message)
        return NextResponse.json({
            error: (error as Error).message,
            status: 500,
            success: false
        })
    }
}