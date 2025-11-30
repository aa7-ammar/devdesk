import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { createAccessToken , createRefreshToken } from "@/lib/auth";
import RefreshToken from "@/models/RefreshToken";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0] ||
        req.headers.get("x-real-ip") ||
        "unknown";
    
    if(rateLimit(ip ?? "unknown")){
        return NextResponse.json({error : "Too many requests" }, {status : 429});
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid Email" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    const accessToken = createAccessToken(user._id.toString());
    const refreshToken = createRefreshToken(user._id.toString());

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await RefreshToken.create({token : refreshToken , userId : user._id.toString() , expiresAt , userAgent : req.headers.get("user-agent") || "unknown"});
    

    const res = NextResponse.json({ message: "Login Successful" } , {status : 200});

    res.cookies.set("token", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 15, // 15 minutes
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.cookies.set("refreshToken" , refreshToken , {
      httpOnly : true,
      path : "/" , 
      maxAge : 60*60*24*7,
      sameSite : "lax",
      secure : process.env.NODE_ENV === "production"
    });

    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
