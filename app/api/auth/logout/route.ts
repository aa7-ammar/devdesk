import connectDB from "@/lib/db";
import RefreshToken from "@/models/RefreshToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    await connectDB();
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if(refreshToken){
        await RefreshToken.deleteOne({token : refreshToken});
    }

    const res = NextResponse.json({message : "Logged Out"});
    res.cookies.delete("token");
    res.cookies.delete("refreshToken");

    return res;
}
