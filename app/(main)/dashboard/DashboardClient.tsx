"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge"; 
import { 
  Copy, 
  Trash2, 
  Plus, 
  Search, 
  CalendarDays, 
  CheckCircle2,
  TerminalSquare
} from "lucide-react";

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
  const [adding, setAdding] = useState(false); // Separate loading state for adding

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
    if (!title.trim()) return toast.error("Title cannot be empty");

    setAdding(true);

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error || "Failed to add task");
      setAdding(false);
      return;
    }

    toast.success("Task added to stack");
    setTitle("");
    setPage(1);
    loadFunction(true);
    setAdding(false);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      // Optimistic update for snappier feel
      const previousTasks = [...tasks];
      setTasks(tasks.filter((t) => t._id !== id));

      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        // Revert if failed
        setTasks(previousTasks);
        const data = await res.json();
        toast.error(data.error || "Failed to delete");
        return;
      }
      toast.success("Task cleared");
    } catch (e) {
      toast.error("Error deleting task");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-8 px-4 md:px-6 pb-20">
      
      {/* Header Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <TerminalSquare className="w-8 h-8 text-indigo-500" />
          Task Command
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your daily stack. Stay focused.
        </p>
      </div>

      {/* Control Panel (Add & Search) */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Add Task Form - Takes up 2 columns */}
        <form onSubmit={handleAddTask} className="md:col-span-2 relative group">
          <div className="relative">
            <Input
              placeholder="Initialize new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={adding}
              className="pl-4 pr-24 h-12 bg-white/5 border-white/10 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all hover:bg-white/[0.07]"
            />
            <Button 
              disabled={adding || !title.trim()} 
              type="submit"
              size="sm"
              className="absolute right-1.5 top-1.5 bottom-1.5 bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
            >
              {adding ? (
                <span className="animate-pulse">Adding...</span>
              ) : (
                <div className="flex items-center gap-1">
                  Add <Plus className="w-3 h-3" />
                </div>
              )}
            </Button>
          </div>
        </form>

        {/* Search Bar - Takes up 1 column */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Filter stack..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-12 bg-white/5 border-white/10 focus-visible:ring-indigo-500 transition-all hover:bg-white/[0.07]"
          />
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {loading && tasks.length === 0 ? (
           // Loading Skeletons
           Array.from({ length: 3 }).map((_, i) => (
             <Skeleton key={i} className="h-20 w-full rounded-xl bg-white/5" />
           ))
        ) : tasks.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
            <CheckCircle2 className="w-12 h-12 text-muted-foreground/20 mb-4" />
            <h4 className="text-lg font-medium text-muted-foreground">Stack empty</h4>
            <p className="text-sm text-muted-foreground/60">No tasks found. Add one to get started.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div 
              key={task._id}
              className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]"
            >
              {/* Left Side: Title */}
              <div className="flex items-start gap-4">
                {/* Visual Checkbox (Decorative) */}
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/20 group-hover:border-indigo-500/50 transition-colors">
                    <div className="h-2.5 w-2.5 rounded-[1px] bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="space-y-1">
                    <span className="text-base font-medium text-foreground/90 group-hover:text-white transition-colors">
                        {task.title}
                    </span>
                </div>
              </div>

              {/* Right Side: Metadata & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-6 pl-9 md:pl-0">
                {/* Date Badge */}
                <Badge variant="secondary" className="bg-black/20 text-muted-foreground hover:bg-black/40 font-mono text-[10px] uppercase tracking-wider gap-1.5 px-2 py-1 h-7 border-white/5">
                   <CalendarDays className="w-3 h-3" />
                   {new Date(task.createdAt).toLocaleDateString()}
                </Badge>

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                    <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10"
                        onClick={() => {
                            navigator.clipboard.writeText(task.title);
                            toast.success("Copied to clipboard");
                        }}
                    >
                        <Copy className="w-4 h-4" />
                        <span className="sr-only">Copy</span>
                    </Button>
                    
                    <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors"
                        onClick={() => handleDeleteTask(task._id)}
                    >
                        <Trash2 className="w-4 h-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-4">
        {hasMore && (
          <Button 
            variant="outline"
            onClick={() => setPage((p) => p + 1)} 
            disabled={loading}
            className="bg-transparent border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 hover:border-white/20 min-w-[150px]"
          >
            {loading ? "Syncing..." : "Load Older Tasks"}
          </Button>
        )}
      </div>
    </div>
  );
}