"use client";
import { TypographyH1 } from "@/components/TypographyH1";
import { TypographyH4 } from "@/components/TypographyH4";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 , Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


interface Notes {
    _id : string;
    title : string;
    content : string;
    createdAt : string;
}

const NotesClient = ()=>{
    const router = useRouter();

    const [notes , setNote] = useState<Notes[]>([]);
    const [page , setPage] = useState(1); 
    const [limit] = useState(5);
    const [query , setQuery] = useState("");
    const [hasMore , setHasMore] = useState(true);
    const [title , setTitle] = useState("");
    const [content , setContent] = useState("");
    const [loading ,setLoading] = useState(false);
   

    const loadFunction = async(reset = false)=>{
        try{
            setLoading(true);

            const res = await fetch(`/api/notes/?page=${page}&limit=${limit}&query=${query}`, {
                method : "GET",
                credentials : "include"
            });

            if(!res.ok){
                toast.error("Session expired , Please login again.");
                router.push("/signin");
                return;
            }

            const data = await res.json();
            if(reset){
                setNote(data.notes);
            }else{
                setNote((prev)=> [...prev , ...data.notes])
            }

            setHasMore(data.page < data.totalPages);
        }catch(e){
            toast.error("Failed to fetch notes");
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadFunction(true);
    },[]);

    useEffect(()=>{
        if(page > 1)loadFunction(false);
    },[page]);

    useEffect(()=>{
        setPage(1);
        loadFunction(true);
    },[query]);

    const handleAddNotes = async(e : React.FormEvent)=>{
        e.preventDefault();
        if(!title.trim())return toast.error("Title can't be empty");
        if(!content.trim())return toast.error("Content can't be empty");

        setLoading(true);

        try{
            const res = await fetch("/api/notes",{
                method : "POST",
                headers : {"Content-type" : "application/json"},
                body : JSON.stringify({title , content})
            });

            if(!res.ok){
                const data = await res.json();
                toast.error(data.error || "Failed to add note.");
                return;
            }

            toast.success("Note added successfully.");
            setTitle("");
            setContent("");
            setPage(1);
            loadFunction(true);
            
        }
        finally{
            setLoading(false);
        }
    }

    const handleDeleteNote = async(id : string)=> {
        try{
            const res = await fetch(`/api/notes/${id}`, {
                method : "DELETE",
                credentials : "include"
            });

            if(!res.ok){
                const data = await res.json();
                toast.error(data.error || "Failed to delete");
                return;
            }
            toast.success("Note deleted");
            setPage(1);
            loadFunction(true);

        }
        catch(e){
            toast.error("Error deleting note");
        }
    }

    // const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase()));
    
    return (
        <div className="max-w-xl mx-auto mt-10 space-y-6 ">
        <TypographyH1 title="My Notes" />

        <form onSubmit={handleAddNotes} className="flex flex-col gap-2">
            
                <Input type="text" placeholder="Enter Note Title..." name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <Textarea  placeholder="Enter Note content..." name="content" value={content} onChange={(e)=>setContent(e.target.value)}/>
                <Button disabled={loading} className="cursor-pointer hover:scale-105">{loading ? "Adding..." : "Add"}</Button>
            
        </form>

        <Input 
        placeholder="Search notes..."
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        className="mb-4" />

        
            <ul className="space-y-2 mt-4">
                {notes.length === 0 ? (
                <TypographyH4 title="No notes yet." />
                ) : (
                notes.map((note) => (
                    <li key={note._id}>
                        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                            <Card className="@container/card opacity-70 hover:opacity-100 transition duration-100">
                                <CardHeader>
                                
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-xl">
                                    {note.title}
                                </CardTitle>
                                <CardDescription className="text-lg font-semibold tabular-nums @[250px]/card:text-lg">{note.content}</CardDescription>
                                
                                </CardHeader>
                                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    {new Date(note.createdAt).toLocaleDateString()}
                                    <Button variant="destructive" onClick={()=>handleDeleteNote(note._id)} className="cursor-pointer p-0 h-auto w-auto opacity-70 hover:opacity-100"><Trash2/></Button>
                                    <Button variant="ghost" size="icon" className="cursor-pointer p-0 h-auto w-auto opacity-70 hover:opacity-100" onClick={()=>{
                                        navigator.clipboard.writeText(note.content);
                                        toast.success("Content copied to clipboard");
                                    }}><Copy className="w-4 h-4"/></Button>
                                </div>
                                
                                </CardFooter>
                            </Card>
                        
                        </div>
                    </li>
                ))
                )}
            </ul>

            <div className="w-full flex justify-center">
                {hasMore && (
                    <Button onClick={()=>{
                        setPage((p)=>p+1)
                    }} disabled={loading} className="cursor-pointer hover:scale-105">
                        {loading ? "Loading..." : "Load More"}
                    </Button>
                )}
            </div>
        
        </div>
    );
}

export default NotesClient;

