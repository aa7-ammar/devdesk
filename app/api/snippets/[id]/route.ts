import { verifyToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import Snippet from "@/models/Snippets";
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
    const user = verifyToken(token!);
    console.log(user);

    if(!user )return NextResponse.json({error : 'Unauthorized'} , {status : 401});

    const deleted = await Snippet.findOneAndDelete({
        _id : id,
        userId : user.id
    })

    if(!deleted)return NextResponse.json({error : "Snippet not found"} , {status : 404});

    return NextResponse.json({message : "Snippet deleted"} , {status : 200});

}