"use client";
import { TypographyH1 } from "@/components/TypographyH1";
import { TypographyH4 } from "@/components/TypographyH4";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { Select, SelectTrigger, SelectContent , SelectItem, SelectValue } from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


interface Snippets{
    _id : string;
    language : string;
    code : string;
    createdAt : string;
}


const SnippetsClient = ()=>{
    const router = useRouter();
    const [snippets , setSnippet] = useState<Snippets[]>([]);
    const [language , setLanguage] = useState("");
    const [code , setCode] = useState("");
    const [loading , setLoading] = useState(false);

    const fetchSnippets = async()=>{
        try{
            const res = await fetch("/api/snippets" , {
                method : "GET",
                credentials : "include"
            });

            if(!res.ok){
                toast.error("Session expired , please login again.");
                router.push("/signin");
                return;
            }

            const data = await res.json();
            setSnippet(data);
        }
        catch(e){
            toast.error("Failed to fetch snippets.")
        }
    }

    useEffect(()=>{
        fetchSnippets();
    },[]);

    const handleAddSnippets = async(e : React.FormEvent)=>{
        e.preventDefault();
        if(!language)return toast.error("Please select language.");
        if(!code.trim())return toast.error("Code can't be empty");

        setLoading(true);

        try{
            const res = await fetch("/api/snippets" , {
                method : "POST",
                headers : {"Content-type" : "application/json"},
                body : JSON.stringify({language , code})
            })

            if(!res.ok){
                const data = await res.json();
                toast.error(data.error || "Failed to add snippet.");
                return;
            }

            toast.success("Snippet added successfully");
            setLanguage("");
            setCode("");
            fetchSnippets();
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-10 space-y-6 ">
        <TypographyH1 title="My Snippets" />

        <form onSubmit={handleAddSnippets} className="flex flex-col gap-2">
            <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent >
                    <SelectItem value="C++">C++</SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Typescript">Typescript</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="Go">Go</SelectItem>
                    <SelectItem value="C#">C#</SelectItem>
                </SelectContent>
            </Select>
            <Textarea  placeholder="Code..." name="content" value={code} onChange={(e)=>setCode(e.target.value)}/>
            <Button disabled={loading} className="cursor-pointer hover:scale-105">{loading ? "Adding" : "Add"}</Button>
        </form>

        
            <ul className="space-y-2 mt-4">
                {snippets.length === 0 ? (
                <TypographyH4 title="No snippets yet." />
                ) : (
                snippets.map((snippet) => (
                    <li key={snippet._id}>
                        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                            <Card className="@container/card hover:scale-101">
                                <CardHeader>
                                
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-xl">
                                    {snippet.language}
                                </CardTitle>
                                {/* <CardDescription className="text-lg font-semibold tabular-nums @[250px]/card:text-lg">{snippet.code}</CardDescription> */}
                                <CodeBlock code={snippet.code}/>
                                
                                </CardHeader>
                                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    {new Date(snippet.createdAt).toLocaleDateString()}
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

export default SnippetsClient;