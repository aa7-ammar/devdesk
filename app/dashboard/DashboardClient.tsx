"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TypographyH1 } from "@/components/TypographyH1";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TypographyH4 } from "@/components/TypographyH4";
import { Card, CardTitle, CardHeader, CardFooter } from "@/components/ui/card";
// import { TypographyH3 } from "@/components/TypographyH3";

interface Tasks{
    _id : string;
    title : string;
    createdAt : string;
}

export default function DashboardClient(){
    const router = useRouter();
    const [tasks , setTasks] = useState<Tasks[]>([]);
    const [title , setTitle] = useState("");
    const [loading , setLoading] = useState(false);


    const fetchTasks = async()=>{
        try{
            const res = await fetch("/api/tasks" , {
                method : "GET",
                credentials : "include"
            });
            
            if(!res.ok){
                toast.error("Session expired , Please login again");
                router.push("/signin");
                return ;
            }

            const data = await res.json();
            setTasks(data);

        }catch(e){
            toast.error("Failed to get tasks.");
        }
    };

    useEffect(()=>{
        fetchTasks();
    },[]);

    const handleAddTask = async(e : React.FormEvent)=>{
        e.preventDefault();
        if(!title.trim())return toast.error("Title can't be empty.");

        setLoading(true);
        try{
            const res = await fetch("/api/tasks", {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({title})
            });

            if(!res.ok){
                const data = await res.json();
                toast.error(data.error || "Failed to add task.");
                return;
            }

            toast.success("Task added successfully");
            setTitle("");
            fetchTasks();
        }
        finally{
            setLoading(false);
        }
    };

    return (
    <div className="max-w-xl mx-auto mt-10 space-y-4 ">
      <TypographyH1 title="My Tasks" />

      <form onSubmit={handleAddTask} className="flex gap-2">
        <Input type="text" placeholder="Enter task title..." name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <Button disabled={loading} className="cursor-pointer hover:scale-105">{loading ? "Adding" : "Add"}</Button>
        
      </form>

      
        <ul className="space-y-2 mt-4">
            {tasks.length === 0 ? (
            <TypographyH4 title="No tasks yet." />
            ) : (
            tasks.map((task) => (
                <li key={task._id}>
                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                        <Card className="@container/card hover:scale-103">
                            <CardHeader>
                            
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                {task.title}
                            </CardTitle>
                            
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                 {new Date(task.createdAt).toLocaleDateString()}
                            </div>
                            
                            </CardFooter>
                        </Card>
                    
                    </div>
                </li>
            ))
            )}
         </ul>
      
    </div>
  );
}