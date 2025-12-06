import { verifyAccessToken } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {GoogleGenAI} from "@google/genai";

const genAI = new GoogleGenAI({});
// const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});

export async function POST(req : Request){
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const user = verifyAccessToken(token!);

        if(!user){
            return NextResponse.json({error : "Unauthorized"} , {status : 401});
        }

        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0] ||
            req.headers.get("x-real-ip") ||
            "unknown";
    
        if(rateLimit(ip ?? "unknown")){
            return NextResponse.json({error : "Too many requests" }, {status : 429});
        }

        
        const body = await req.json();

        const code : string = body.code;
        const snippetId : string | undefined = body.snippetId;

        if(!code || typeof code !== "string"){
            return NextResponse.json({
                error : "Missing code"

            }, {
                status : 400
            });
        }


        const prompt = `You are a senior software engineer. Improve the following code for clarity, correctness, and structure. Return ONLY the improved code. DO NOT return explanations.
                    If code is already optimal, return it unchanged. 
                    Code  : 
                    \`\`\` ${code} \'\'\' `.trim();

        const result = await genAI.models.generateContent({
            model : "gemini-2.5-flash",
            contents : prompt
        });

        

        let improved = result.text;
            

        return NextResponse.json({improved , snippetId} , {status : 200});
    }catch(e : any){
        console.error("AI ERROR :", e);
        return NextResponse.json({
            error : e.message || "Something went wrong"
        }, { status : 500})
    }

}