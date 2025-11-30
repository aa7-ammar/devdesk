import { verifyAccessToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req : Request){
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const user = verifyAccessToken(token!);

    if(!user){
        return NextResponse.json({error : "Unauthorized"} , {status : 401});
    }

    const {name} = await req.json();

    await User.findByIdAndUpdate(user.id , {name});

    return NextResponse.json({message : "Name updated"});

}