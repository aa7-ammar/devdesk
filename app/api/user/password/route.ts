import { verifyAccessToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req : Request){
    const {oldPassword , newPassword} = await req.json();

    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const user = verifyAccessToken(token!);

    if(!user)return NextResponse.json({error : "Unauthorized"} , {status : 401});
    const existing = await User.findById(user.id);

    const match = await bcrypt.compare(oldPassword , existing.password);

    if(!match){
        return NextResponse.json({error : "Old Password incorrect"} , {status : 400});

    }

    const hashed = await bcrypt.hash(newPassword , 10);

    await User.findByIdAndUpdate(user.id , {password : hashed});

    return NextResponse.json({message : "Password changed"});

}