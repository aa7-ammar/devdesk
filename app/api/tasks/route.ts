import { verifyToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import {cookies} from "next/headers";
import Task from "@/models/Tasks";
import { NextResponse } from "next/server";
import {JwtPayload} from "jsonwebtoken";

export async function GET(){
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value; 
    const user = verifyToken(token!);

    if(!user || typeof user.id !== 'string')return NextResponse.json({error : "Unauthorized"} , {status : 401});

    const tasks = await Task.find({userId : user.id}).sort({createdAt : -1});
    return NextResponse.json(tasks);
}

export async function POST(req : Request){
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const user = verifyToken(token!);

    if(!user || typeof user.id !== "string")return NextResponse.json({error : "Unauthorized"} , {status : 401});

    const {title} = await req.json();

    const task = await Task.create({
        userId : user.id,
        title,
    })

    return NextResponse.json(task);
}