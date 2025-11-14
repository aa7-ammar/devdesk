import { verifyToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Note from "@/models/Notes";


export async function GET(){
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const user = verifyToken(token!);

    if(!user || typeof user.id !== "string")return NextResponse.json({error : "Unauthorized"}, {status : 401});

    const notes = await Note.find({userId : user.id}).sort({createdAt : -1});

    return NextResponse.json(notes);
}

export async function POST(req : Request){
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const user = verifyToken(token!);

    if(!user || typeof user.id !== 'string')return NextResponse.json({error : "Unauthorized"} , {status : 401});

    const {title , content} = await req.json();
    const note = await Note.create({
        userId : user.id,
        title , 
        content
    });

    return NextResponse.json(note);
}
