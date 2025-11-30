import { verifyAccessToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const user = verifyAccessToken(token!);

    if(!user || typeof user.id !== "string")return NextResponse.json({error : "unauthorized"} , {status : 401});
    const existing = await User.findById(user.id).select("name email");

    return NextResponse.json(existing);
}