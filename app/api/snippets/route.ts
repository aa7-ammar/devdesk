import { verifyToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import Snippet from "@/models/Snippets";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(){
    
        await connectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const user = verifyToken(token!);

        if(!user || typeof user.id !== 'string')return NextResponse.json({error : 'Unauthorized'} , {status : 401});

        const snippets = await Snippet.find({
            userId : user.id
        }).sort({createdAt : -1});

        return NextResponse.json(snippets);
    
    
}

export async function POST(req : Request){
    
        await connectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const user = verifyToken(token!);

        if(!user || typeof user.id !== 'string')return NextResponse.json({error : 'Unauthorized'} , {status : 401});

        const {language , code} = await req.json();

        const snippet = await Snippet.create({
            userId : user.id,
            language ,
            code
        });

        return NextResponse.json(snippet);
    
}