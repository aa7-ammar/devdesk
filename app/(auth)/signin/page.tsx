"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

function Signin() {
    const router = useRouter();
    const [form , setForm] = useState({email : "" , password : ""});
    const [loading , setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e : React.FormEvent)=> {
        e.preventDefault();
        setLoading(true);

        try{
            const res = await fetch("/api/auth/signin" , {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(form),
                credentials : "include"
            });

            const data = await res.json();

            if (!res.ok) {
                const message = typeof data.error === "string" ? data.error : data.error?.message || "Login failed";
                toast.error(message);
                setLoading(false);
                return;
            }

            toast.success("Login successful!");

            

            
            router.push("/dashboard");
            router.refresh();
        }
        catch(e){
            toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
    }
    
    return (
    <div className="flex h-screen justify-center items-center ">
        <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle>Please Log in</CardTitle>
            <CardDescription>
            Enter your email and password below to log in
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                </div>
                
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" placeholder="********" value={form.password} onChange={handleChange} required />
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button onClick={handleSubmit} disabled={loading} className="w-full cursor-pointer">
            {loading ? "Logging In" : "LogIn"}
            </Button>
        </CardFooter>
        </Card>  
    </div>
  )
}

export default Signin;