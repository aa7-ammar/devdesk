import { TypographyBlockquote } from "@/components/BlockQuote";
import { TypographyH1 } from "@/components/TypographyH1";
import { TypographyH4 } from "@/components/TypographyH4";
import { Button } from "@/components/ui/button";

const Hero = ()=>{
    return (
                <div className="relative overflow-hidden">
                {/* The Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] -z-10" />
                
                <section className="flex flex-col items-center text-center py-24 md:py-32 px-4 max-w-5xl mx-auto space-y-8">
                
                    
                    <div className="space-y-4">
                        <TypographyH1 title="Your development workflow, unified." />
                        
                        
                        <div className="max-w-2xl mx-auto text-muted-foreground">
                        <TypographyH4 title="Manage tasks, notes, code snippets, and AI tools in one blazing-fast command center. Stop context switching and focus on shipping." />
                        </div>
                    </div>

                    
                    <div className="flex flex-col items-center space-y-4">
                        
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="px-8">Start Building</Button>
                        <Button variant="outline" size="lg" className="px-8">View Documentation</Button>
                        </div>

                        
                        <div className="text-sm text-muted-foreground opacity-80">
                        <TypographyBlockquote title="No credit card required. Open source viable." />
                        </div>
                    </div>

                </section>
        </div>
    )
}

export default Hero;