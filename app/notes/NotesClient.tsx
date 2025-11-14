"use client";
import { TypographyH1 } from "@/components/TypographyH1";
import { TypographyH4 } from "@/components/TypographyH4";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    const [title , setTitle] = useState("");
    const [content , setContent] = useState("");
    const [loading ,setLoading] = useState(false);

    const fetchNotes = async()=>{
        try{
            const res = await fetch("/api/notes",{
                method : "GET",
                credentials : "include"
            });

            if(!res.ok){
                toast.error("Session expired , please login again");
                router.push("/signin");
                return;
            }

            const data = await res.json();
            setNote(data);
        }
        catch(e){
            toast.error("Failed to get Notes");
        }
    }

    useEffect(()=>{
        fetchNotes();
    },[]);

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
            fetchNotes();
        }
        finally{
            setLoading(false);
        }
    }
    
    return (
        <div className="max-w-xl mx-auto mt-10 space-y-6 ">
        <TypographyH1 title="My Notes" />

        <form onSubmit={handleAddNotes} className="flex flex-col gap-2">
            
                <Input type="text" placeholder="Enter Note Title..." name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <Textarea  placeholder="Enter Note content..." name="content" value={content} onChange={(e)=>setContent(e.target.value)}/>
                <Button disabled={loading} className="cursor-pointer hover:scale-105">{loading ? "Adding" : "Add"}</Button>
            
            
            
        </form>

        
            <ul className="space-y-2 mt-4">
                {notes.length === 0 ? (
                <TypographyH4 title="No notes yet." />
                ) : (
                notes.map((note) => (
                    <li key={note._id}>
                        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                            <Card className="@container/card hover:scale-101">
                                <CardHeader>
                                
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-xl">
                                    {note.title}
                                </CardTitle>
                                <CardDescription className="text-lg font-semibold tabular-nums @[250px]/card:text-lg">{note.content}</CardDescription>
                                
                                </CardHeader>
                                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    {new Date(note.createdAt).toLocaleDateString()}
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

export default NotesClient;

