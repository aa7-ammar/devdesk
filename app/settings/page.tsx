import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth";
import SettingClient from "./SettingClient";

const Settings = async()=>{
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if(!token)redirect("/signin");

    const user = verifyAccessToken(token);
    if(!user)redirect("/signin");

    return <SettingClient/>;


}

export default Settings;