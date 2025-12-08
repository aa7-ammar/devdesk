"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { Mail, Lock, Loader2, ArrowRight, X } from "lucide-react";

function Signin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!form.email || !form.password) return toast.error("Please fill in all fields");
    
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
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
    } catch (e) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-[500px] bg-indigo-500/20 blur-[100px] rounded-full -z-10" />

      {/* Added 'relative' to Card so the absolute button positions correctly inside it */}
      <Card className="relative w-full max-w-sm border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
        
        {/* NEW: Close Button (Top Right) */}
        <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-6 w-6 text-muted-foreground hover:text-foreground cursor-pointer"
            asChild
        >
            <Link href="/">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </Link>
        </Button>

        <CardHeader className="space-y-1 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
             <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 font-bold text-xl border border-indigo-500/30">
                &gt;_
             </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your workspace
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="pl-9 bg-black/20 border-white/10 focus-visible:ring-indigo-500 transition-all hover:bg-black/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="pl-9 bg-black/20 border-white/10 focus-visible:ring-indigo-500 transition-all hover:bg-black/30"
                />
              </div>
            </div>

            <Button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                </>
              ) : (
                <>
                    Log In <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4 border-t border-white/5 pt-6">
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-indigo-400 hover:text-indigo-300 underline-offset-4 hover:underline transition-all">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signin;