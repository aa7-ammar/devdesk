import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth";
import AnalyticsClient from "./AnalyticsClient";

const Analytics = async ()=>{
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if(!token)redirect("/signin");

    const user = verifyAccessToken(token);
    if(!user)redirect("/signin");

    return <AnalyticsClient/>
}

export default Analytics;