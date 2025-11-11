import { NextRequest , NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { createToken } from "@/lib/auth";

export async function  POST(req : NextRequest){
    try{
        const {email , password } = await req.json();
        await connectDB();

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error : "Invalid email"} , {status : 400});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({error : "Invalid Password"} , {status : 400});
        }

        const token = createToken(user._id.toString());

        return NextResponse.json({token}, {status : 200});
    }

    catch(error : unknown){
        return NextResponse.json({error : error} , {status : 500});
    }
}