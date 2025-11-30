import { verifyAccessToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Note from "@/models/Notes";
import { rateLimit } from "@/lib/rate-limit";


export async function GET(req : Request){
    await connectDB();

    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") || 1);
    const limit = Number(url.searchParams.get("limit") || 5);
    const query = url.searchParams.get("query") || "";

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const user = verifyAccessToken(token!);

    if(!user || typeof user.id !== "string")return NextResponse.json({error : "Unauthorized"}, {status : 401});

    const filter = {
        userId : user.id,
        title : { $regex : query , $options: "i"}
    };

    const notes = await Note.find(filter)
        .skip((page-1)*limit)
        .limit(limit)
        .sort({createdAt : -1});

    const total = await Note.countDocuments(filter);

    return NextResponse.json({
        notes,
        total, 
        page,
        totalPages : Math.ceil(total/limit)
    });
}

export async function POST(req : Request){
    await connectDB();

    const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown";

    if(rateLimit(ip ?? "unknown")){
        return NextResponse.json({error : "Too many requests" }, {status : 429});
    }
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const user = verifyAccessToken(token!);

    if(!user || typeof user.id !== 'string')return NextResponse.json({error : "Unauthorized"} , {status : 401});

    const {title , content} = await req.json();
    const note = await Note.create({
        userId : user.id,
        title , 
        content
    });

    return NextResponse.json(note);
} 
