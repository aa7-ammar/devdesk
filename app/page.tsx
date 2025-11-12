"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TestPage() {
  return (
    <div className="p-10">
      <Button
        onClick={() => toast("Hello world!", { description: "This works fine" })}
      >
        Test Toast
      </Button>
    </div>
  );
}

