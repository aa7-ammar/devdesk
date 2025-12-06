"use client";

import { TypographyH1 } from "@/components/TypographyH1";
import { TypographyH3 } from "@/components/TypographyH3";
import { Card , CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountingNumber } from "@/components/ui/shadcn-io/counting-number";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";





const AnalyticsClient = ()=>{
    const router = useRouter();

    const [totalTasks , setTotalTasks] = useState(0);
    const [totalNotes , setTotalNotes] = useState(0);
    const [totalSnippets , setTotalSnippets] = useState(0);
    const [loading , setLoading] = useState(false);

    const loadFunction = async()=>{
        try{
            setLoading(true);
            const res = await fetch("/api/analytics" , {
                method : "GET",
                credentials : "include"
            });

            if(!res.ok){
                toast.error("Session expired , Please login again");
                router.push("/signin");
                return;
            }

            const data = await res.json();
            setTotalTasks(data.totalTasks);
            setTotalNotes(data.totalNotes);
            setTotalSnippets(data.totalSnippets);

        }
        catch(e){
            toast.error("Failed to fetch data");
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadFunction();
    },[]);

    

    return (
        <div className="max-w-5xl mx-auto mt-10 space-y-4">
            <TypographyH1 title="Analytics" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:scale-103 transition-all">
                        <CardHeader>
                            <CardTitle>
                                <TypographyH3 title="Total Notes"/>
                            </CardTitle>
                            
                        </CardHeader>
                        <CardContent>
                                <CountingNumber
                                    number={totalNotes}
                                    inView={true}
                                    transition={{stiffness:100 , damping : 30}}
                                    className="text-2xl font-bold"
                                />
                        </CardContent>
                    </Card>
                    <Card className="hover:scale-103 transition-all">
                        <CardHeader>
                            <CardTitle><TypographyH3 title="Total Tasks"/></CardTitle>
                            
                        </CardHeader>
                        <CardContent>
                                <CountingNumber
                                    number={totalTasks}
                                    inView={true}
                                    transition={{stiffness:100 , damping : 30}}
                                    className="text-2xl font-bold"
                                />
                        </CardContent>
                    </Card>
                    <Card className="hover:scale-103 transition-all">
                        <CardHeader>
                            <CardTitle><TypographyH3 title="Total Snippets"/></CardTitle>
                            
                        </CardHeader>
                        <CardContent>
                                <CountingNumber
                                    number={totalSnippets}
                                    inView={true}
                                    transition={{stiffness:100 , damping : 30}}
                                    className="text-2xl font-bold"
                                />
                        </CardContent>
                    </Card>
            </div>
        </div>
    )
}

export default AnalyticsClient;