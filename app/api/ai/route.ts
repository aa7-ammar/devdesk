import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req : Request){
    const {prompt} = await req.json();

    const openai = new OpenAI({
        apiKey : process.env.OPENAI_API_KEY!,
    });

    const response = await openai.chat.completions.create({
        model : "gpt-5.1-mini",
        messages : [
            {role : "system" , content : "You are helpful dev assistant inside the DevDesk dashboard"},
            {role : "user" , content : prompt}
        ],
    });

    return NextResponse.json({
        answer : response.choices[0].message.content
    });

}