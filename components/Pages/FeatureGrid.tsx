import { 
  CheckSquare, 
  FileText, 
  Code2, 
  Sparkles, 
  BarChart3, 
  ShieldCheck, 
  LucideIcon 
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string; // Used for the subtle glow behind the icon
}

const features: Feature[] = [
  {
    title: "Task Command",
    description: "Keyboard-first task management with rapid entry, search, and pagination.",
    icon: CheckSquare,
    gradient: "from-blue-500/20 to-cyan-500/20 text-blue-400",
  },
  {
    title: "Knowledge Base",
    description: "Markdown-supported notes with instant global search. Your personal wiki.",
    icon: FileText,
    gradient: "from-emerald-500/20 to-teal-500/20 text-emerald-400",
  },
  {
    title: "Snippet Vault",
    description: "Save, categorize, and copy multi-language code blocks with full syntax highlighting.",
    icon: Code2,
    gradient: "from-orange-500/20 to-amber-500/20 text-orange-400",
  },
  {
    title: "AI Copilot",
    description: "Explain complex regex, refactor functions, or generate boilerplate instantly.",
    icon: Sparkles,
    gradient: "from-purple-500/20 to-pink-500/20 text-purple-400",
  },
  {
    title: "Developer Analytics",
    description: "Visualize your activity, commit streaks, and productivity patterns.",
    icon: BarChart3,
    gradient: "from-rose-500/20 to-red-500/20 text-rose-400",
  },
  {
    title: "Fortified Security",
    description: "Enterprise-grade JWT authentication, secure refresh tokens, and rate limiting.",
    icon: ShieldCheck,
    gradient: "from-indigo-500/20 to-violet-500/20 text-indigo-400",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Everything you need in one tab
          </h2>
          <p className="text-muted-foreground text-lg">
            Stop switching between Jira, Notion, and GitHub Gists. 
            DevDesk consolidates your essential tools into a unified, high-performance dashboard.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-8 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.07]"
            >
              
              {/* Icon Container with Gradient Background */}
              <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient}`}>
                <feature.icon className="h-6 w-6" />
              </div>

              {/* Text Content */}
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Gradient Blob on Hover (Optional aesthetic touch) */}
              <div 
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}