import { TypographyBlockquote } from "@/components/BlockQuote";
import { TypographyH1 } from "@/components/TypographyH1";
import { TypographyH4 } from "@/components/TypographyH4";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* The Top Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] -z-10" />

      <section className="flex flex-col items-center text-center py-24 md:py-32 px-4 max-w-7xl mx-auto space-y-16">
        {/* Text Content Container */}
        <div className="space-y-8 max-w-5xl mx-auto">
          <div className="space-y-4">
            <TypographyH1 title="Your development workflow, unified." />

            <div className="max-w-2xl mx-auto text-muted-foreground">
              <TypographyH4 title="Manage tasks, notes, code snippets, and AI tools in one blazing-fast command center. Stop context switching and focus on shipping." />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup"><Button size="lg" className="cursor-pointer px-8 bg-indigo-600 hover:bg-indigo-700 shadow-[0_0_30px_rgba(79,70,229,0.3)]">Start Building</Button></Link>
              <Button variant="outline" size="lg" className="px-8 backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20">View Documentation</Button>
            </div>

            <div className="text-sm text-muted-foreground opacity-80">
              <TypographyBlockquote title="No credit card required. Open source viable." />
            </div>
          </div>
        </div>

        {/* 2. The Screenshot Section */}
        
        <div className="relative w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
            
            {/* A subtle glow behind the screenshot container to make it lift off the page */}
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl -z-10 rounded-[2rem]" />

            {/* The "Glass" Frame around the image */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-2 md:p-3 shadow-2xl backdrop-blur-md">
                
                {/* Inner container to clip corners and provide the dark border around the actual app screenshot */}
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A]">
                    
                    <Image
                        src="/dashboardimg.png" 
                        alt="DevDesk Application Dashboard Preview"
                        
                        width={1400} 
                        height={900}
                        
                        priority={true} 
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
        </div>

      </section>
    </div>
  );
};

export default Hero;