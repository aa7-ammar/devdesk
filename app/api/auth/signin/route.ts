import { NextRequest , NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import User from "@/models/User";

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

        return NextResponse.json({
            message : "Login Successful" , user : {id : user._id , name : user.name}
        } , {status : 200});
    }

    catch(error : unknown){
        return NextResponse.json({error : error} , {status : 500});
    }
}