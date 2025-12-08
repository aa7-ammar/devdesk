"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { 
  Trash2, 
  Copy, 
  Sparkles, 
  Code2, 
  Plus, 
  Search, 
  Terminal,
  Calendar
} from "lucide-react";

// Imports for the Editor
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism-dark.css"; 

interface Snippets {
  _id: string;
  language: string;
  code: string;
  createdAt: string;
}

const SnippetsClient = () => {
  const router = useRouter();
  const [snippets, setSnippet] = useState<Snippets[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  
  
  const [language, setLanguage] = useState("javascript"); // Default to prevent prism errors
  const [code, setCode] = useState("");
  
  
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [aiLoadingId, setAiLoadingId] = useState<string | null>(null);

  const askAi = async (id: string, code: string) => {
    try {
      setAiLoadingId(id);
      toast.loading("AI is optimizing your code...");

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code, snippetId: id }),
        credentials: "include"
      });

      if (!res.ok) {
        const text = await res.text();
        toast.dismiss();
        toast.error("AI failed: " + (text || res.statusText));
        return;
      }

      const { improved } = await res.json();
      toast.dismiss();

      const keep = confirm("AI has optimized your code. \n\nClick OK to overwrite with the improved version.\nClick Cancel to keep original.");
      
      if (!keep) {
        toast.info("Original code kept.");
        return;
      }

      const updt = await fetch(`/api/snippets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: improved }),
        credentials: "include"
      });

      if (!updt.ok) {
        toast.error("Failed to save the improved code");
        return;
      }

      toast.success("Code updated successfully!");
      setPage(1);
      loadFunction(true);
    } catch (e) {
      toast.error("AI service error");
    } finally {
      setAiLoadingId(null);
    }
  };

  const loadFunction = async (reset = false) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/snippets/?page=${page}&limit=${limit}&query=${query}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!res.ok) {
        toast.error("Session expired, Please login again");
        router.push("/signin");
        return;
      }

      const data = await res.json();
      if (reset) {
        setSnippet(data.snippets);
      } else {
        setSnippet((prev) => [...prev, ...data.snippets]);
      }

      setHasMore(data.page < data.totalPages);
    } catch (e) {
      toast.error("Failed to fetch snippets");
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

  const handleAddSnippets = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!language) return toast.error("Please select a language.");
    if (!code.trim()) return toast.error("Code can't be empty");

    setAdding(true);

    try {
      const res = await fetch("/api/snippets", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ language, code })
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Failed to add snippet.");
        return;
      }

      toast.success("Snippet stored in vault");
      // Keep language selected for convenience
      setCode(""); 
      setPage(1);
      loadFunction(true);
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteSnippets = async (id: string) => {
    try {
      const res = await fetch(`/api/snippets/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Failed to delete");
        return;
      }
      toast.success("Snippet deleted");
      setPage(1);
      loadFunction(true);
    } catch (e) {
      toast.error("Error deleting snippets");
    }
  };

  // Helper to map language names to PrismJS grammar keys
  const getLanguageGrammar = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'javascript': return languages.js;
      case 'typescript': return languages.ts;
      case 'css': return languages.css;
      case 'html': return languages.html;
      case 'c++': return languages.cpp;
      case 'c': return languages.c;
      case 'java': return languages.java;
      default: return languages.js; // Fallback
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-8 px-4 md:px-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Code2 className="w-8 h-8 text-indigo-500" />
          Snippet Vault
        </h1>
        <p className="text-muted-foreground text-lg">
          Store, refactor, and retrieve your code blocks.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-start">
        
        {/* Left Column: Add Snippet Form */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-foreground font-medium">
                    <Terminal className="w-4 h-4 text-indigo-400" /> New Snippet
                </div>
                
                <form onSubmit={handleAddSnippets} className="space-y-4">
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-full bg-white/5 border-white/10 focus:ring-indigo-500">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Javascript">Javascript</SelectItem>
                            <SelectItem value="Typescript">Typescript</SelectItem>
                            <SelectItem value="C++">C++</SelectItem>
                            <SelectItem value="Java">Java</SelectItem>
                            <SelectItem value="HTML">HTML</SelectItem>
                            <SelectItem value="CSS">CSS</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    
                    <div className="relative min-h-[200px] rounded-md border border-white/10 bg-[#1e1e1e] focus-within:ring-2 focus-within:ring-indigo-500 overflow-hidden">
                      <Editor
                        value={code}
                        onValueChange={code => setCode(code)}
                        placeholder="Write or paste code..."
                        highlight={code => highlight(code, getLanguageGrammar(language), language)}
                        padding={15}
                        textareaClassName="focus:outline-none"
                        className="font-mono text-sm"
                        style={{
                          fontFamily: '"Fira code", "Fira Mono", monospace',
                          fontSize: 12,
                          backgroundColor: "#1e1e1e",
                          color: "#d4d4d4",
                          minHeight: "200px"
                        }}
                      />
                    </div>
                    
                    <Button 
                        disabled={adding} 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
                    >
                        {adding ? "Saving..." : <span className="flex items-center gap-2">Save to Vault <Plus className="w-4 h-4"/></span>}
                    </Button>
                </form>
            </div>
        </div>

        {/* Right Column: Snippet List */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search by language or code..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9 h-12 bg-white/5 border-white/10 focus-visible:ring-indigo-500 transition-all hover:bg-white/[0.07]"
                />
            </div>

            <ul className="space-y-4">
                {loading && snippets.length === 0 ? (
                     Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-40 w-full rounded-xl bg-white/5" />
                    ))
                ) : snippets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                        <Code2 className="w-12 h-12 text-muted-foreground/20 mb-4" />
                        <h4 className="text-lg font-medium text-muted-foreground">Vault empty</h4>
                        <p className="text-sm text-muted-foreground/60">Save your first code snippet to get started.</p>
                    </div>
                ) : (
                    snippets.map((snippet) => (
                        <li key={snippet._id}>
                             <Card className="overflow-hidden border-white/10 bg-[#1e1e1e] shadow-lg transition-all hover:border-white/20">
                                {/* Snippet Header */}
                                <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/[0.05] py-3 px-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex gap-1.5">
                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
                                            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
                                        </div>
                                        <Badge variant="outline" className="border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
                                            {snippet.language}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(snippet.createdAt).toLocaleDateString()}
                                    </div>
                                </CardHeader>
                                
                                {/* Read-Only View */}
                                <CardContent className="p-0">
                                    <SyntaxHighlighter
                                        language={snippet.language.toLowerCase()}
                                        style={vscDarkPlus}
                                        showLineNumbers
                                        customStyle={{ 
                                            margin: 0, 
                                            padding: "1.5rem", 
                                            fontSize: "0.875rem",
                                            background: "transparent"
                                        }}
                                    >
                                        {snippet.code}
                                    </SyntaxHighlighter>
                                </CardContent>

                                {/* Footer Actions */}
                                <CardFooter className="flex items-center justify-between border-t border-white/5 bg-white/[0.02] py-2 px-4">
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={() => askAi(snippet._id, snippet.code)}
                                        disabled={aiLoadingId === snippet._id}
                                        className="text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 gap-2"
                                    >
                                        {aiLoadingId === snippet._id ? (
                                            <span className="animate-pulse">Optimizing...</span>
                                        ) : (
                                            <>
                                                <Sparkles className="w-3.5 h-3.5" /> 
                                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">Ask AI to Improve</span>
                                            </>
                                        )}
                                    </Button>

                                    <div className="flex items-center gap-1">
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-8 w-8 hover:bg-white/10 hover:text-white"
                                            onClick={() => {
                                                navigator.clipboard.writeText(snippet.code);
                                                toast.success("Code copied");
                                            }}
                                        >
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-8 w-8 hover:bg-red-500/20 hover:text-red-400"
                                            onClick={() => handleDeleteSnippets(snippet._id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </li>
                    ))
                )}
            </ul>

            <div className="flex justify-center pt-4">
                {hasMore && (
                    <Button 
                        variant="outline"
                        onClick={() => setPage((p) => p + 1)} 
                        disabled={loading}
                        className="bg-transparent border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 hover:border-white/20 min-w-[150px]"
                    >
                        {loading ? "Loading..." : "Load Older Snippets"}
                    </Button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetsClient;