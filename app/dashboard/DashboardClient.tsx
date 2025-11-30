"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TypographyH1 } from "@/components/TypographyH1";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TypographyH4 } from "@/components/TypographyH4";
import { Card, CardTitle, CardHeader, CardFooter } from "@/components/ui/card";
import { Copy, Trash2 } from "lucide-react";

interface Tasks {
  _id: string;
  title: string;
  createdAt: string;
}

export default function DashboardClient() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  
  const loadFunction = async (reset = false) => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/tasks?page=${page}&limit=${limit}&query=${query}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        toast.error("Session expired, Please login again");
        router.push("/signin");
        return;
      }

      const data = await res.json();

      if (reset) {
        setTasks(data.tasks);
      } else {
        setTasks((prev) => [...prev, ...data.tasks]);
      }

      setHasMore(data.page < data.totalPages);
    } catch (e) {
      toast.error("Failed to get tasks");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    loadFunction(true);
  }, []);

  
  useEffect(() => {
    if (page !== 1) loadFunction(false);
  }, [page]);

  
  useEffect(() => {
    setPage(1);
    loadFunction(true);
  }, [query]);

  
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim())
      return toast.error("Title cannot be empty");

    setLoading(true);

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error || "Failed to add task");
      setLoading(false);
      return;
    }

    toast.success("Task added");
    setTitle("");
    setPage(1);
    loadFunction(true);
    setLoading(false);
  }

  const handleDeleteTask = async(id : string)=>{
      try{
        const res = await fetch(`/api/tasks/${id}` , {
          method : "DELETE",
          credentials : "include"
        });

        if(!res.ok){
          const data = await res.json();
          toast.error(data.error || "Failed to delete");
          return;
        }

        toast.success("Task deleted");
        setPage(1);
        loadFunction(true);
        setLoading(false);
      }

      catch(e){
        toast.error("Error deleting task");
      }
    }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4 ">
      <TypographyH1 title="My Tasks" />

      
      <form onSubmit={handleAddTask} className="flex gap-2">
        <Input
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button disabled={loading} className="cursor-pointer hover:scale-105">
          {loading ? "Adding..." : "Add"}
        </Button>
      </form>

      
      <Input
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4"
      />

      
      <ul className="space-y-2 mt-4">
        {tasks.length === 0 ? (
          <TypographyH4 title="No such tasks." />
        ) : (
          tasks.map((task) => (
            <li key={task._id}>
              <Card className="opacity-70 hover:opacity-100">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{task.title}</CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                           <div className="line-clamp-1 flex gap-1 font-medium">
                                 {new Date(task.createdAt).toLocaleDateString()}
                                 <Button className="cursor-pointer p-0 h-auto w-auto opacity-70 hover:opacity-100" variant="destructive" onClick={()=>{
                                  handleDeleteTask(task._id)
                                 }}><Trash2/></Button>

                                 <Button className="cursor-pointer p-0 h-auto w-auto opacity-70 hover:opacity-100" size="icon" variant="ghost" onClick={()=>{
                                  navigator.clipboard.writeText(task.title);
                                  toast.success("Task copied to clipboard");
                                 }} ><Copy className="w-4 h-4"/></Button>
                            </div>
                            
                </CardFooter>
              </Card>
            </li>
          ))
        )}
      </ul>

      
      <div className="w-full flex justify-center">
        {hasMore && (
            <Button onClick={() => setPage((p) => p + 1)} disabled={loading} className="cursor-pointer hover:scale-105">
            {loading ? "Loading..." : "Load More"}
            </Button>
        )}
      </div>
    </div>
  );
}


    

//     return (
//     <div className="max-w-xl mx-auto mt-10 space-y-4 ">
//       <TypographyH1 title="My Tasks" />

//       <form onSubmit={handleAddTask} className="flex gap-2">
//         <Input type="text" placeholder="Enter task title..." name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
//         <Button disabled={loading} className="cursor-pointer hover:scale-105">{loading ? "Adding" : "Add"}</Button>
        
//       </form>

      
//             <Input
//                 placeholder="Search tasks..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="mb-4"
//             />

        

      
//         <ul className="space-y-2 mt-4">
//             {filteredTasks.length === 0 ? (
//             <TypographyH4 title="No such tasks yet." />
//             ) : (
//             filteredTasks.map((task) => (
//                 <li key={task._id}>
//                     <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
//                         <Card className="@container/card opacity-70 hover:opacity-100 transition duration-100">
//                             <CardHeader>
                            
//                             <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//                                 {task.title}
//                             </CardTitle>
                            
//                             </CardHeader>
//                             <CardFooter className="flex-col items-start gap-1.5 text-sm">
//                             <div className="line-clamp-1 flex gap-2 font-medium">
//                                  {new Date(task.createdAt).toLocaleDateString()}
//                             </div>
                            
//                             </CardFooter>
//                         </Card>
                    
//                     </div>
//                 </li>
//             ))
//             )}
//          </ul>

//          {hasMore && (
//             <Button onClick={() => setPage(p => p + 1)} disabled={loading}>
//                 {loading ? "Loading..." : "Load More"}
//             </Button>
//         )}
      
//     </div>
//   );
// }
