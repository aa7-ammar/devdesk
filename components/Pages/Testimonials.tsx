import React from 'react';
import Image from 'next/image'; // Using Next.js Image for optimization

// Data structure for testimonials
const testimonials = [
  {
    quote: "DevDesk replaced my sticky notes, three different notion pages, and my gist manager. It's shockingly fast and the search is instant.",
    author: "Sarah Chen",
    role: "Senior Frontend Engineer",
    company: "Vercel",
    // Using a placeholder image service that provides grayscale portraits
    avatarUrl: "https://i.pravatar.cc/150?u=sarah", 
  },
  {
    quote: "The AI copilot is actually useful. It doesn't just generate code, it explains complex regex and refactors legacy functions in seconds. Huge time saver.",
    author: "Alex Plumber",
    role: "Tech Lead",
    company: "Stripe",
    avatarUrl: "https://i.pravatar.cc/150?u=alex",
  },
  {
    quote: "I was skeptical about another 'all-in-one' tool, but the Vim mode integration and local-first speed won me over. It's now open on my second monitor all day.",
    author: "David Rakowski",
    role: "Backend Developer",
    company: "Shopify",
    avatarUrl: "https://i.pravatar.cc/150?u=david",
  },
  {
    quote: "Finally, a developer tool that looks and feels as good as the products we build. The dark mode implementation is flawless.",
    author: "Emily Zhang",
    role: "UI/UX Designer",
    company: "Figma",
    avatarUrl: "https://i.pravatar.cc/150?u=emily",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by builders.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Here's what the community is saying about their new workflow.
          </p>
        </div>

        {/* Horizontal Scroll Container 
          - 'flex overflow-x-auto': Enables horizontal scrolling.
          - 'snap-x snap-mandatory': Makes the scroll snap to each card.
          - 'scrollbar-hide': (Optional) You might want to add a utility class to hide the default scrollbar for a cleaner look.
          - '-mx-4 px-4': Allows cards to scroll edge-to-edge on mobile while keeping container padding.
        */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((item, index) => (
            <div 
              key={index}
              // Individual Card
              // 'flex-none': Prevents the card from shrinking.
              // 'w-[85vw] md:w-[400px]': Sets a good width for both mobile and desktop.
              // 'snap-center': Tells the container to snap this element to the center on scroll stop.
              className="flex-none snap-center w-[85vw] md:w-[400px] rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-sm transition-all hover:bg-white/[0.04] hover:border-white/20"
            >
              
              {/* Quote Icon (Subtle visual cue) */}
              <svg className="h-8 w-8 text-indigo-500/40 mb-6 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
                
              {/* Quote Body */}
              <blockquote className="text-lg text-foreground/90 leading-relaxed mb-8">
                "{item.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {/* Avatar with Grayscale Filter */}
                <div className="relative h-12 w-12 rounded-full overflow-hidden ring-1 ring-white/10 grayscale">
                  <Image 
                    src={item.avatarUrl} 
                    alt={item.author} 
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                
                <div>
                  <div className="font-medium text-foreground">
                    {item.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.role} <span className="text-muted-foreground/60">@ {item.company}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
          
          {/* Padding element at the end to ensure the last card can be scrolled 
            to the center and doesn't get cut off by the container's edge.
          */}
          <div className="flex-none w-4 md:w-0"></div>
        </div>

      </div>
    </section>
  );
}