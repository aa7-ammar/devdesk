import { redirect } from "next/navigation";
import { cookies } from "next/headers"

import { verifyAccessToken } from "@/lib/auth";
import SnippetsClient from "./SnippetsClient";

const Snippets = async()=>{
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if(!token){
        redirect("/signin");
    }

    const user = verifyAccessToken(token!);
    if(!user){
        redirect("/signin");
    }

    return <SnippetsClient/>
}

export default Snippets;