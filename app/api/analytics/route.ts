import { verifyAccessToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import Note from "@/models/Notes";
import Snippets from "@/models/Snippets";
import Tasks from "@/models/Tasks";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const user = verifyAccessToken(token!);

    if(!user || typeof user.id !== 'string')return NextResponse.json({error : "Unauthorized"} , {status : 401});

    const totalNotes = await Note.countDocuments({userId : user.id});
    const totalTasks = await Tasks.countDocuments({userId : user.id});
    const totalSnippets = await Snippets.countDocuments({userId : user.id});

    return NextResponse.json({
        totalNotes , totalTasks , totalSnippets
    });
}