import React from 'react';
import { Command, TerminalSquare, Palette } from 'lucide-react';

export default function UIShowcase() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Built for flow state.
          </h2>
          <p className="text-muted-foreground text-lg">
            A keyboard-first interface designed to keep up with your thought process. 
            Experience frictionless development.
          </p>
        </div>

        {/* Browser Frame Container */}
        {/* We use 'relative' here so the absolute highlights position correctly within this frame */}
        <div className="relative mx-auto max-w-6xl rounded-[1.25rem] border border-white/10 bg-[#0A0A0A] shadow-2xl backdrop-blur-sm overflow-hidden perspective-1000 group">
          
          {/* 1. Browser Top Bar (Traffic Lights & Address) */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/[0.03]">
            <div className="flex gap-1.5 p-1">
              <div className="h-3 w-3 rounded-full bg-[#FF5F57] shadow-sm"></div>
              <div className="h-3 w-3 rounded-full bg-[#FEBC2E] shadow-sm"></div>
              <div className="h-3 w-3 rounded-full bg-[#28C840] shadow-sm"></div>
            </div>
            {/* Fake Address Bar - centered */}
            <div className="mx-auto w-full max-w-lg -ml-14 rounded-md border border-white/5 bg-black/20 py-1.5 px-4 text-center text-xs font-medium text-muted-foreground/40 font-mono flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 opacity-50"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>
              app.devdesk.com/snippets/
            </div>
          </div>

          {/* 2. The Main Content Area (Placeholder for Image) */}
          {/* IMPORTANT: When you have your screenshot, replace the div below with:
              <Image src="/your-screenshot.png" alt="App Screenshot" width={1200} height={800} className="w-full h-auto" />
          */}
          <div className="relative aspect-[16/10] w-full bg-grid-white/[0.02] bg-[size:60px_60px] border-b border-white/5">
             {/* This is just a visual placeholder to mimic the layout you described until you add the image. 
                It creates a subtle glowing wireframe layout.
             */}
             <div className="absolute inset-0 bg-gradient-to-tr from-background via-background to-background/80"></div>
             <div className="absolute inset-0 grid grid-cols-3 gap-px p-px opacity-30">
                 <div className="col-span-2 border-r border-dashed border-indigo-500/30 relative">
                    {/* Mimic Tasks Popover */}
                    <div className="absolute bottom-8 right-8 w-48 h-32 rounded-lg border border-dashed border-indigo-500/30 bg-indigo-500/5"></div>
                 </div>
                 <div className="col-span-1 bg-indigo-500/5"></div>
             </div>
             <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-mono text-sm pointer-events-none">
                [ Insert high-fidelity app screenshot here ]
             </div>
          </div>


          {/* 3. The Highlights (Floating Pointers on top) */}
          {/* Adjust top/left percentages to match locations on your final screenshot.
             Colors used here assume a purple/indigo primary accent.
          */}

          {/* Highlight 1: Command Palette (Top Center) */}
          <HighlightPoint top="15%" left="40%" label="Cmd+K Command Palette" icon={Command} delay="0ms" />

          {/* Highlight 2: Dark Theme (Middle Left Code Area) */}
          <HighlightPoint top="45%" left="25%" label="Tokyo Night Syntax Theme" icon={Palette} delay="500ms" position="right" />

           {/* Highlight 3: Vim Mode (Bottom Left Status Bar) */}
          <HighlightPoint top="85%" left="10%" label="Vim Mode Toggle" icon={TerminalSquare} delay="1000ms" position="right"/>

           {/* Highlight 4: AI Assistant (Right Sidebar) */}
          <HighlightPoint top="30%" left="80%" label="Context-aware AI Copilot" color="blue" delay="1500ms" position="left" />

        </div>
      </div>
    </section>
  );
}


// --- Sub-Component for the Glowing Pointers ---

interface HighlightPointProps {
  top: string;
  left: string;
  label: string;
  icon?: React.ElementType;
  position?: 'left' | 'right'; // Where the label sits relative to the dot
  color?: 'purple' | 'blue'; // Optional color variant
  delay?: string; // Animation delay so they don't pulse in sync
}

function HighlightPoint({ top, left, label, icon: Icon, position = 'left', color = 'purple', delay = '0ms' }: HighlightPointProps) {
    // Define color styles based on the prop
    const colorStyles = {
        purple: {
            dotBg: "bg-purple-500",
            shadow: "shadow-[0_0_20px_rgba(168,85,247,0.6)]",
            ping: "bg-purple-500",
            border: "border-purple-500/20 group-hover:border-purple-500/50",
        },
        blue: {
            dotBg: "bg-blue-500",
            shadow: "shadow-[0_0_20px_rgba(59,130,246,0.6)]",
            ping: "bg-blue-500",
            border: "border-blue-500/20 group-hover:border-blue-500/50",
        },
    }[color];

  return (
    <div 
      className={`absolute z-20 flex items-center gap-3 group/point pointer-events-none ${position === 'left' ? 'flex-row-reverse' : 'flex-row'}`} 
      style={{ top, left, animationDelay: delay }}
    >
      {/* The Label Box */}
      {/* We use group-hover on the main container to make these appear */}
      <div className={`
        flex items-center gap-2 rounded-lg border ${colorStyles.border} 
        bg-gray-950/80 px-3 py-2 text-xs font-medium text-white 
        backdrop-blur-md shadow-xl transition-all duration-300
        opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
      `}>
        {Icon && <Icon className="h-3.5 w-3.5 opacity-70" />}
        {label}
      </div>

       {/* The Glowing Dot Container */}
       <div className="relative flex items-center justify-center">
         {/* The connecting line (optional, subtle) */}
         <div className={`absolute h-px w-4 bg-gradient-to-r from-transparent via-${color}-500/50 to-transparent ${position === 'left' ? 'right-full' : 'left-full'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

         {/* The pinging outer ring */}
        <div 
            className={`absolute inline-flex h-8 w-8 animate-ping-slow rounded-full ${colorStyles.ping} opacity-20`} 
            style={{ animationDelay: delay }}
        ></div>
        
        {/* The central solid dot */}
        <div className={`relative inline-flex h-3 w-3 rounded-full ${colorStyles.dotBg} ${colorStyles.shadow} ring-1 ring-white/20`}></div>
      </div>
    </div>
  );
}