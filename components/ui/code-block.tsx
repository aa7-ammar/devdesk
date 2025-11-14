import { ScrollArea } from "@/components/ui/scroll-area";

export function CodeBlock({ code }: { code: string }) {
  return (
    <ScrollArea className="w-full rounded-lg border bg-zinc-950 text-zinc-200 p-4">
      <pre className="whitespace-pre-wrap font-mono text-sm">
        {code}
      </pre>
    </ScrollArea>
  );
}
