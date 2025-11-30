import { verifyAccessToken } from "@/lib/auth";
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
    const user = verifyAccessToken(token!);
        

    if(!user )return NextResponse.json({error : 'Unauthorized'} , {status : 401});

    const deleted = await Snippet.findOneAndDelete({
        _id : id,
        userId : user.id
    })

    if(!deleted)return NextResponse.json({error : "Snippet not found"} , {status : 404});

    return NextResponse.json({message : "Snippet deleted"} , {status : 200});

}

export async function PATCH(
    req : Request,
    { params }: { params: Promise<{ id: string }> }
){
    try{
        await connectDB();
        const {id} = await params;
    
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const user = verifyAccessToken(token!);

        if(!user)return NextResponse.json({error : "Unauthorized"} , {status : 401});

        const {code} = (await req.json()) as {code? : string};
        if(!code || typeof code !== "string")return NextResponse.json({error : "Invalid code"} , {status : 400});

        const snippet = await Snippet.findById(id);
        if(!snippet)return NextResponse.json({error : "Not found"} , {status : 404});

        if(String(snippet.userId) != user.id)return NextResponse.json({error : "Forbidden"} , {status : 403});

        snippet.code = code;
        await snippet.save();

        return NextResponse.json({snippet});
    }
    catch(e : any){
        console.error("Patch snippet error :" , e);
        return NextResponse.json({error : e.message ||
            "Server error"
        } , {status : 500});
    }
}