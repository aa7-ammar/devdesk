import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "@/lib/auth";
import RefreshToken from "@/models/RefreshToken";

export async function POST(req : NextRequest){
    
    await connectDB();

    const refreshToken = req.cookies.get("refreshToken")?.value || req.headers.get("cookie")?.match(/refreshToken=([^;]+)/)?.[1];

    if(!refreshToken) return NextResponse.json({error : "No refresh token."} , {status : 401});

    const payload = verifyRefreshToken(refreshToken);
    if(!payload || !payload.id) return NextResponse.json({error : "Invalid refresh token."} , {status : 401});

    const dbToken = await RefreshToken.findOne({token : refreshToken , userId : payload.id});
    if(!dbToken) return NextResponse.json({error : "Refresh token not found"} , {status : 401});

    if (dbToken.expiresAt < new Date()) {
        await RefreshToken.deleteOne({ token: refreshToken });
        return NextResponse.json({ error: "Refresh token expired" }, { status: 401 });
    }

    await RefreshToken.deleteOne({token : refreshToken});

    const newAccessToken = createAccessToken(payload.id);
    const newRefreshToken = createRefreshToken(payload.id);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + Number(process.env.REFRESH_EXPIRES_DAYS || 7));
    await RefreshToken.create({token : newRefreshToken , userId : payload.id , expiresAt});

    const res = NextResponse.json({message : "Tokens refreshe"});

    res.cookies.set("token" , newAccessToken , {
        httpOnly : true,
        path : "/",
        maxAge : 60*15,
        sameSite : "lax",
        secure : process.env.NODE_ENV === "production"
    });

    res.cookies.set("refreshToken" , newRefreshToken , {
        httpOnly : true,
        path : "/",
        maxAge : 60*60*24* Number(process.env.REFRESH_EXPIRES_DAYS || "7d"),
        sameSite : "lax",
        secure : process.env.NODE_ENV === "production"
    })

    return res;

    


}