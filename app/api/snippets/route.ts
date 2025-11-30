import { verifyAccessToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import Snippet from "@/models/Snippets";
// import { Notebook } from "lucide-react";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(req : Request){
    
        await connectDB();

        const url = new URL(req.url);
        const page = Number(url.searchParams.get("page") || 1);
        const limit = Number(url.searchParams.get("limit") || 5);
        const query = url.searchParams.get("query") || "";

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const user = verifyAccessToken(token!);

        if(!user || typeof user.id !== 'string')return NextResponse.json({error : 'Unauthorized'} , {status : 401});

        const filter = {
            userId : user.id,
            code : { $regex: query , $options : "i"}
        };
        
        const snippets = await Snippet.find(filter)
            .skip((page-1)*limit)
            .limit(limit)
            .sort({createdAt : -1});

        const total = await Snippet.countDocuments(filter);

        return NextResponse.json({
            snippets,
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

        if(!user || typeof user.id !== 'string')return NextResponse.json({error : 'Unauthorized'} , {status : 401});

        const {language , code} = await req.json();

        const snippet = await Snippet.create({
            userId : user.id,
            language ,
            code
        });

        return NextResponse.json(snippet);
    
}