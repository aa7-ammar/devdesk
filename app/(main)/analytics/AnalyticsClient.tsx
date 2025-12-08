"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountingNumber } from "@/components/ui/shadcn-io/counting-number";
import { Skeleton } from "@/components/ui/skeleton"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { 
  FileText, 
  CheckSquare, 
  Code2, 
  Activity 
} from "lucide-react";

const AnalyticsClient = () => {
  const router = useRouter();

  const [totalTasks, setTotalTasks] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);
  const [totalSnippets, setTotalSnippets] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadFunction = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/analytics", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        toast.error("Session expired, please login again");
        router.push("/signin");
        return;
      }

      const data = await res.json();
      setTotalTasks(data.totalTasks);
      setTotalNotes(data.totalNotes);
      setTotalSnippets(data.totalSnippets);
    } catch (e) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFunction();
  }, []);

  // Helper component for the Metric Cards
  const MetricCard = ({ title, value, icon: Icon, gradient }: any) => (
    <Card className="relative overflow-hidden border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-md bg-gradient-to-br ${gradient} bg-opacity-10`}>
           <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24 bg-white/10 rounded-md" />
        ) : (
          <div className="flex items-baseline gap-2">
            <CountingNumber
              number={value}
              inView={true}
              transition={{ stiffness: 100, damping: 30 }}
              className="text-3xl font-bold text-foreground"
            />
            <span className="text-xs text-emerald-500 flex items-center">
               +12% <Activity className="w-3 h-3 ml-1" />
            </span>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Active items in workspace
        </p>
      </CardContent>
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" 
      />
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-8 px-4 md:px-6">
      
      {/* Page Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Overview of your productivity and workspace stats.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Total Notes" 
          value={totalNotes} 
          icon={FileText}
          gradient="from-emerald-500/20 to-teal-500/20"
        />
        <MetricCard 
          title="Total Tasks" 
          value={totalTasks} 
          icon={CheckSquare}
          gradient="from-blue-500/20 to-cyan-500/20"
        />
        <MetricCard 
          title="Total Snippets" 
          value={totalSnippets} 
          icon={Code2}
          gradient="from-orange-500/20 to-amber-500/20"
        />
      </div>
      
      {/* Chart Section with Skeleton Loader */}
      {loading ? (
        <Skeleton className="w-full h-[300px] rounded-xl bg-white/5" />
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
          <div className="p-4 rounded-full bg-white/5 mb-4">
              <Activity className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-lg font-medium text-foreground">Activity Chart</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-2">
            Detailed contribution graphs and velocity metrics will appear here once you have more activity.
          </p>
        </div>
      )}

    </div>
  );
};

export default AnalyticsClient;