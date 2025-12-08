"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Ensure you have this shadcn component
import { Skeleton } from "@/components/ui/skeleton";
import { 
  User, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Save, 
  Loader2 
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SettingClient = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  // Separate loading states for better UX
  const [loadingUser, setLoadingUser] = useState(true);
  const [updatingName, setUpdatingName] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const [newName, setNewName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        setLoadingUser(true);
        const res = await fetch("/api/user", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setNewName(data.name);
        } else {
          toast.error("Failed to load user data");
        }
      } catch (e) {
        toast.error("Network error");
      } finally {
        setLoadingUser(false);
      }
    }

    loadUser();
  }, []);

  const updateName = async () => {
    if (!newName.trim()) return toast.error("Name cannot be empty");
    
    setUpdatingName(true);
    try {
        const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
        });

        if (!res.ok) throw new Error();

        toast.success("Profile updated successfully");
        // Update local state to reflect change immediately if needed elsewhere
        if (user) setUser({ ...user, name: newName });
    } catch(e) {
        toast.error("Failed to update name");
    } finally {
        setUpdatingName(false);
    }
  };

  const updatePassword = async () => {
    if (!oldPassword || !newPassword) return toast.error("Please fill in both fields");
    
    setUpdatingPassword(true);
    try {
        const res = await fetch("/api/user/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
        });

        if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Password update failed");
        }

        toast.success("Password updated successfully");
        setOldPassword("");
        setNewPassword("");
    } catch (e: any) {
        toast.error(e.message || "Failed to update password");
    } finally {
        setUpdatingPassword(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="max-w-4xl mx-auto mt-10 space-y-6 px-4">
        <Skeleton className="h-10 w-48 bg-white/10" />
        <Skeleton className="h-[300px] w-full rounded-xl bg-white/5" />
        <Skeleton className="h-[300px] w-full rounded-xl bg-white/5" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-8 px-4 md:px-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-indigo-500" />
          Settings
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your account preferences and security.
        </p>
      </div>

      <div className="grid gap-8">
        
        {/* Profile Card */}
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-400" /> Profile Information
            </CardTitle>
            <CardDescription>
              Update your public display information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Email Field (Read Only) */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-muted-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <Input 
                    id="email" 
                    value={user.email} 
                    disabled 
                    className="pl-9 bg-black/20 border-white/5 text-muted-foreground cursor-not-allowed" 
                />
              </div>
              <p className="text-[10px] text-muted-foreground/60">Email cannot be changed manually.</p>
            </div>

            {/* Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="name">Display Name</Label>
              <Input 
                id="name" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                className="bg-white/5 border-white/10 focus-visible:ring-indigo-500"
              />
            </div>

          </CardContent>
          <CardFooter className="border-t border-white/5 px-6 py-4">
            <Button 
                onClick={updateName} 
                disabled={updatingName} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white ml-auto"
            >
                {updatingName ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                ) : (
                    <><Save className="w-4 h-4 mr-2" /> Save Changes</>
                )}
            </Button>
          </CardFooter>
        </Card>


        {/* Security Card */}
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-400" /> Security
            </CardTitle>
            <CardDescription>
              Ensure your account stays safe by updating your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="grid gap-2">
              <Label htmlFor="old-password">Current Password</Label>
              <Input 
                id="old-password" 
                type="password" 
                placeholder="••••••••" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)}
                className="bg-white/5 border-white/10 focus-visible:ring-indigo-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password" 
                placeholder="••••••••" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-white/5 border-white/10 focus-visible:ring-indigo-500"
              />
            </div>

          </CardContent>
          <CardFooter className="border-t border-white/5 px-6 py-4">
            <Button 
                onClick={updatePassword} 
                disabled={updatingPassword} 
                variant="destructive" // Using destructive/warning color for security actions is common, or stick to primary
                className="ml-auto bg-rose-600 hover:bg-rose-700 text-white"
            >
                 {updatingPassword ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating...</>
                ) : (
                    "Update Password"
                )}
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
};

export default SettingClient;