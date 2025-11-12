import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req : NextRequest){
    try{
        const body = await req.json();
        const {username , email , password } = body;

        await connectDB();

        const userExists = await User.findOne({email});
        if(userExists){
            return NextResponse.json({error : "User already exists"} , {status : 400});
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        await User.create({
            name : username,
            email, 
            password : hashedPassword
        });

        return NextResponse.json({message : "User Created"} , {status : 200});
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: message }, { status: 400 });
    }

}