import React from 'react';
import { 
  CheckSquare, 
  FileText, 
  Code2, 
  Sparkles, 
  ArrowRight,
  Trello, // Placeholder for Jira
  Slack,
  Figma, // Placeholder for Notion
  Github
} from 'lucide-react';

export default function WhyDevDesk() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- Text Side (Left) --- */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Stop tab roulette.
            </h2>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              The average developer switches between 10+ tools daily. 
              DevDesk consolidates your essential context—tasks, docs, and code—into a single, 
              frictionless interface.
            </p>
          </div>

          {/* --- Visual Side (Right) --- */}
          <div className="relative h-[450px] w-full rounded-2xl border border-white/10 bg-white/5 p-8 overflow-hidden group perspective-1000">
            
            {/* Background Glow for the "After" state */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-80 h-80 bg-indigo-500/20 blur-[100px] rounded-full -z-10" />

            <div className="absolute inset-0 flex items-center justify-between px-12">
              
              {/* 1. "Before" State (Chaotic Cluster) */}
              <div className="relative w-40 h-60 flex-shrink-0">
                {/* Tangled SVG Lines */}
                <svg className="absolute inset-0 w-full h-full text-white/10" viewBox="0 0 160 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 40 C 60 40, 60 120, 90 120" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M130 60 C 100 60, 100 180, 70 180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M40 190 C 60 150, 100 150, 120 110" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>
                
                {/* Scattered Icons */}
                <ChaosIcon Icon={Trello} top="10%" left="5%" rotate="-12deg" color="text-blue-400/40" />
                <ChaosIcon Icon={Figma} top="25%" right="10%" rotate="15deg" color="text-purple-400/40" />
                <ChaosIcon Icon={Github} bottom="20%" left="15%" rotate="-8deg" color="text-zinc-400/40" />
                <ChaosIcon Icon={Slack} bottom="5%" right="5%" rotate="20deg" color="text-emerald-400/40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground/50 uppercase tracking-widest">
                  Fragmented
                </div>
              </div>


              {/* 2. The Transition Arrow */}
              <div className="flex-shrink-0 relative z-10">
                <ArrowRight className="w-12 h-12 text-white/20 animate-pulse" />
                {/* Subtle gradient overlay on the arrow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent mix-blend-overlay" />
              </div>


              {/* 3. "After" State (Organized Hub) */}
              <div className="relative w-64 h-64 flex-shrink-0">
                
                {/* Center Hub Icon (DevDesk) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#0A0A0A] border border-indigo-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)] z-20">
                    <span className="font-bold text-xl bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">&gt;_</span>
                </div>

                {/* Clean Connection Lines */}
                <svg className="absolute inset-0 w-full h-full text-indigo-500/40" viewBox="0 0 256 256" fill="none">
                  {/* Top to Center */}
                  <line x1="128" y1="40" x2="128" y2="90" stroke="currentColor" strokeWidth="2" />
                  {/* Bottom to Center */}
                  <line x1="128" y1="216" x2="128" y2="166" stroke="currentColor" strokeWidth="2" />
                  {/* Left to Center */}
                  <line x1="40" y1="128" x2="90" y2="128" stroke="currentColor" strokeWidth="2" />
                  {/* Right to Center */}
                  <line x1="216" y1="128" x2="166" y2="128" stroke="currentColor" strokeWidth="2" />
                </svg>
                
                {/* Organized Module Icons */}
                <HubIcon Icon={CheckSquare} position="top" color="text-blue-400" label="Tasks" />
                <HubIcon Icon={FileText} position="bottom" color="text-emerald-400" label="Notes" />
                <HubIcon Icon={Code2} position="left" color="text-orange-400" label="Code" />
                <HubIcon Icon={Sparkles} position="right" color="text-purple-400" label="AI" />
                
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


// --- Helper Components for the Visual ---

// For the chaotic icons on the left
function ChaosIcon({ Icon, top, left, right, bottom, rotate, color }: any) {
  return (
    <div 
      className={`absolute p-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:border-white/10 hover:bg-white/5 ${color}`}
      style={{ top, left, right, bottom, transform: `rotate(${rotate})` }}
    >
      <Icon className="w-6 h-6 opacity-70" />
    </div>
  );
}

// For the organized icons on the right
// 1. Define the allowed keys explicitly
type HubPosition = 'top' | 'bottom' | 'left' | 'right';

// 2. Update the helper component with specific types instead of 'any'
function HubIcon({ 
  Icon, 
  position, 
  color, 
  label 
}: { 
  Icon: React.ElementType; 
  position: HubPosition; 
  color: string; 
  label: string; 
}) {
  
  // 3. Now TypeScript knows 'position' will always match one of these keys
  const positions: Record<HubPosition, string> = {
    top: 'top-0 left-1/2 -translate-x-1/2',
    bottom: 'bottom-0 left-1/2 -translate-x-1/2',
    left: 'left-0 top-1/2 -translate-y-1/2',
    right: 'right-0 top-1/2 -translate-y-1/2',
  };

  return (
    <div className={`absolute ${positions[position]} flex flex-col items-center gap-2 z-10`}>
      <div className={`p-3 rounded-xl border border-white/10 bg-[#0A0A0A] shadow-lg ${color} group-hover:ring-1 ring-inset ring-white/5 transition-all`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  );
}