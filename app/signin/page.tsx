"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
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
import { toast, Toaster } from "sonner"

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
            });

            const data = await res.json();

            if (!res.ok) {
            const message =
                typeof data.error === "string"
                ? data.error
                : data.error?.message || "Login failed";
                toast.error(message);
                setLoading(false);
                return;
            }

            toast("Login successful!",{ description: "Redirecting to dashboard..." });

            setTimeout(()=>{router.push("/dashboard")}, 1500);
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
            {/* <CardAction>
            <Button variant="link">Sign Up</Button>
            </CardAction> */}
        </CardHeader>
        <CardContent>
            <form>
            <div className="flex flex-col gap-6">
                {/* <div className="grid gap-2">
                <Label htmlFor="text">Username</Label>
                <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                </div> */}
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
                {/* <div className="flex items-center"> */}
                    <Label htmlFor="password">Password</Label>
                    {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                    Forgot your password?
                    </a> */}
                {/* </div> */}
                <Input id="password" name="password" type="password" placeholder="********" value={form.password} onChange={handleChange} required />
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
            <Button onClick={handleSubmit} disabled={loading} className="w-full cursor-pointer">
            {loading ? "Creating" : "LogIn"}
            </Button>
            {/* <Button variant="outline" className="w-full">
            Login with Google
            </Button> */}
        </CardFooter>
        </Card>  
    </div>
  )
}

export default Signin;
