import { verifyAccessToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import Tasks from "@/models/Tasks";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    context : {params : Promise<{id : string}>}
){
    await connectDB();

    const {id} = await context.params;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const user = verifyAccessToken(token!);

    if(!user) return NextResponse.json({error : "Unauthorized"} , {status : 401});

    const deleted = await Tasks.findOneAndDelete({
        _id : id,
        userId : user.id
    });

    if(!deleted)return NextResponse.json({error : "Task not found"} , {status : 400});

    return NextResponse.json({
        message : "Task deleted successfully"
    } , {
        status : 200
    })
}