"use client";

import { TypographyH1 } from "@/components/TypographyH1"; // Optional: You can replace with standard h1 if you prefer
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  Trash2, 
  Copy, 
  FileText, 
  Plus, 
  Search, 
  Calendar, 
  PenLine 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Notes {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const NotesClient = () => {
  const router = useRouter();

  const [notes, setNote] = useState<Notes[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6); // Increased limit slightly for grid view
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  
  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  // Loading States
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const loadFunction = async (reset = false) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/notes/?page=${page}&limit=${limit}&query=${query}`, {
        method: "GET",
        credentials: "include"
      });

      if (!res.ok) {
        toast.error("Session expired, Please login again.");
        router.push("/signin");
        return;
      }

      const data = await res.json();
      if (reset) {
        setNote(data.notes);
      } else {
        setNote((prev) => [...prev, ...data.notes]);
      }

      setHasMore(data.page < data.totalPages);
    } catch (e) {
      toast.error("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFunction(true);
  }, []);

  useEffect(() => {
    if (page > 1) loadFunction(false);
  }, [page]);

  useEffect(() => {
    setPage(1);
    loadFunction(true);
  }, [query]);

  const handleAddNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title can't be empty");
    if (!content.trim()) return toast.error("Content can't be empty");

    setAdding(true);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, content })
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Failed to add note.");
        return;
      }

      toast.success("Note added successfully.");
      setTitle("");
      setContent("");
      setPage(1);
      loadFunction(true);
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    // Optimistic update
    const previousNotes = [...notes];
    setNote(notes.filter(n => n._id !== id));

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (!res.ok) {
        setNote(previousNotes); // Revert
        const data = await res.json();
        toast.error(data.error || "Failed to delete");
        return;
      }
      toast.success("Note deleted");
    } catch (e) {
      setNote(previousNotes);
      toast.error("Error deleting note");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-8 px-4 md:px-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <FileText className="w-8 h-8 text-indigo-500" />
          Knowledge Base
        </h1>
        <p className="text-muted-foreground text-lg">
          Capture ideas, snippets, and documentation.
        </p>
      </div>

      {/* Editor & Search Section */}
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        
        {/* Editor Panel (Left Side - Sticky on large screens) */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-foreground font-medium">
                    <PenLine className="w-4 h-4 text-indigo-400" /> New Entry
                </div>
                <form onSubmit={handleAddNotes} className="space-y-4">
                    <Input 
                        type="text" 
                        placeholder="Title" 
                        name="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={adding}
                        className="bg-white/5 border-white/10 focus-visible:ring-indigo-500"
                    />
                    <Textarea 
                        placeholder="Write something..." 
                        name="content" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        disabled={adding}
                        className="min-h-[150px] bg-white/5 border-white/10 focus-visible:ring-indigo-500 resize-none"
                    />
                    <Button 
                        disabled={adding} 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
                    >
                        {adding ? "Saving..." : <span className="flex items-center gap-2">Save Note <Plus className="w-4 h-4"/></span>}
                    </Button>
                </form>
            </div>
        </div>

        {/* Content Area (Right Side) */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search knowledge base..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9 h-12 bg-white/5 border-white/10 focus-visible:ring-indigo-500 transition-all hover:bg-white/[0.07]"
                />
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading && notes.length === 0 ? (
                    // Loading Skeletons
                    Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-xl bg-white/5" />
                    ))
                ) : notes.length === 0 ? (
                    // Empty State
                    <div className="col-span-full flex flex-col items-center justify-center py-16 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                        <FileText className="w-12 h-12 text-muted-foreground/20 mb-4" />
                        <h4 className="text-lg font-medium text-muted-foreground">No notes found</h4>
                        <p className="text-sm text-muted-foreground/60">Start writing to build your knowledge base.</p>
                    </div>
                ) : (
                    notes.map((note) => (
                        <Card 
                            key={note._id} 
                            className="group relative flex flex-col justify-between overflow-hidden border-white/10 bg-white/5 transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/[0.08] hover:shadow-lg"
                        >
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start gap-2 mb-2">
                                    <Badge variant="secondary" className="bg-black/20 text-muted-foreground font-mono text-[10px] border-white/5">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {new Date(note.createdAt).toLocaleDateString()}
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg font-semibold leading-tight text-foreground/90 group-hover:text-indigo-400 transition-colors">
                                    {note.title}
                                </CardTitle>
                            </CardHeader>
                            
                            <CardContent className="pb-4">
                                <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                                    {note.content}
                                </p>
                            </CardContent>

                            <CardFooter className="pt-0 flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-8 w-8 hover:bg-white/10 hover:text-white"
                                    onClick={() => {
                                        navigator.clipboard.writeText(note.content);
                                        toast.success("Content copied");
                                    }}
                                >
                                    <Copy className="w-4 h-4" />
                                </Button>
                                <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-8 w-8 hover:bg-red-500/20 hover:text-red-400"
                                    onClick={() => handleDeleteNote(note._id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </CardFooter>

                             {/* Decorative Gradient on Hover */}
                             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </Card>
                    ))
                )}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center pt-4">
                {hasMore && (
                    <Button 
                        variant="outline"
                        onClick={() => setPage((p) => p + 1)} 
                        disabled={loading}
                        className="bg-transparent border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 hover:border-white/20 min-w-[150px]"
                    >
                        {loading ? "Loading..." : "Load Older Notes"}
                    </Button>
                )}
            </div>

        </div>
      </div>
    </div>
  );
};

export default NotesClient;