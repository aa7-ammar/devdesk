import { verifyAccessToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import Notes from "@/models/Notes";
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

    if(!user)return NextResponse.json({error : 'Unauthorized'} , {status   : 401});

    const deleted = await Notes.findOneAndDelete({
        _id : id,
        userId : user.id
    });

    if(!deleted)return NextResponse.json({error : "Note not found"} , {status : 404});

    return NextResponse.json({
        message : "Note Deleted"
    } , {status : 200});
}