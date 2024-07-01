import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbconnection/connect";


connectDB();

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({
                message: "Token not found",
                status: 400,
                success: false
            })
        }

        const user = await userModel.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: new Date(Date.now()) } }).select("-password")

        if (!user) {
            return NextResponse.json({
                message: "Invalid token",
                status: 400,
                success: false
            })
        }

        await userModel.findOneAndUpdate({ _id: user._id },
            {
                $set: {
                    isverified: true,
                },
            },
            {
                $unset: {
                    verifyToken: "",
                    verifyTokenExpiry: ""
                }
            }
        )

        return NextResponse.json({
            message: "Email verified successfully",
            status: 200,
            success: true,
            user
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