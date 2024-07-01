import connectDB from "@/dbconnection/connect";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { DataFromToken } from "@/helpers/DataFromToken";
import sendMail from "@/helpers/MailHelper";


connectDB()


export async function GET(){

    const cookieStore = cookies()
    try {
        
        const token : string = cookieStore.get('token')?.value || ""

        if(!token){
            return NextResponse.json({
                error: 'Token not found',
                success: false,
                status: 404
            })
        }

        const user = await DataFromToken( token )

        
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
