"use client";

import { TypographyH1 } from "@/components/TypographyH1";
import { TypographyH3 } from "@/components/TypographyH3";
import { Button } from "@/components/ui/button";
import { Card , CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SettingClient = ({userId} : {userId : string})=>{
    const [user , setUser] = useState<{name : string ; email : string} | null>(null);
    const [loading , setLoading] = useState(false);
    const [newName , setNewName] = useState("");
    const [oldPassword , setOldPassword] = useState("");
    const [newPassword , setNewPassword] = useState("");

    useEffect(()=>{
        async function loadUser(){
            const res = await fetch("/api/user" , {
                credentials : "include"
            });
            const data = await res.json();
            setUser(data);
            setNewName(data.name);
        }

        loadUser();
    },[]);

    const updateName = async()=>{
        setLoading(true);
        const res = await fetch("/api/user/update" , {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({name : newName})
        });
        setLoading(false);

        if(!res.ok)return toast.error("Failed to update name.");

        toast.success("Name updated");
    };

    const updatePassword = async()=>{
        setLoading(true);
        const res = await fetch("/api/user/password" , {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({oldPassword , newPassword})
        });

        setLoading(false);

        if(!res.ok){
            const data = await res.json();
            return toast.error(data.error || "Password update failed");
        }

        toast.success("Password updated");
        setOldPassword("");
        setNewPassword("");
    };

    if(!user)return <p>Loading...</p>

    return (
        <div className="max-w-4xl mx-auto mt-10 space-y-4">
            <TypographyH1 title="User Settings"/>
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader><TypographyH3 title={`Email : ${user.email}`}/></CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <Input value={newName} placeholder="New Username" onChange={(e)=>setNewName(e.target.value)}/>
                        <Button onClick={updateName} disabled={loading} className="w-fit">Update Name</Button>
                    </CardContent>
                </Card>

                <Card>
                    
                    <CardContent className="flex flex-col gap-4">
                        <Input type="password" placeholder="Old Password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                        <Input type="password" placeholder="New Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                        <Button onClick={updatePassword} disabled={loading} className="w-fit">Update Password</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SettingClient;