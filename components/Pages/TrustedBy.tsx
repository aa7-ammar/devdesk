

export default function TrustedBy() {
  const logos = [
    { name: "Vercel", Logo: VercelLogo },
    { name: "Stripe", Logo: StripeLogo },
    { name: "GitHub", Logo: GithubLogo },
    { name: "Next.js", Logo: NextLogo },
    { name: "AWS", Logo: AWSLogo },
    { name: "Linear", Logo: LinearLogo },
  ];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <h3 className="text-center text-sm font-medium text-muted-foreground mb-10 uppercase tracking-widest">
          Trusted by developers at innovative companies
        </h3>

        <div 
          className="relative w-full max-w-5xl mx-auto"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="flex overflow-hidden group">
            
            {/* First Set */}
            <div className="flex animate-marquee gap-12 min-w-full justify-around items-center px-12">
              {logos.map((logo, index) => (
                <div key={index} className="flex items-center justify-center">
                  <logo.Logo className="h-8 w-auto text-muted-foreground/50 hover:text-white transition-colors duration-300 grayscale hover:grayscale-0" />
                </div>
              ))}
            </div>

            {/* Second Set */}
            <div aria-hidden="true" className="flex animate-marquee gap-12 min-w-full justify-around items-center px-12">
              {logos.map((logo, index) => (
                <div key={`dup-${index}`} className="flex items-center justify-center">
                   <logo.Logo className="h-8 w-auto text-muted-foreground/50 hover:text-white transition-colors duration-300 grayscale hover:grayscale-0" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


function VercelLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1155 1000" fill="currentColor" className={className}>
      <path d="M577.344 0L1154.69 1000H0L577.344 0Z" />
    </svg>
  );
}

function NextLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" fill="currentColor" className={className}>
      <path d="M90 0C40.3 0 0 40.3 0 90s40.3 90 90 90 90-40.3 90-90S139.7 0 90 0zM75.3 133.5L52.5 107V52.5h15v34.1l29.4 34.6-21.6 12.3zm56.8-5.3l-51-60.2V52.5h15v47l55.8 65.8c-6.1 6-13.3 10.8-21.2 14.2l1.4-1.3z" />
    </svg>
  );
}

function StripeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 25" fill="currentColor" className={className}>
      <path d="M59.6 11.2c-1.6-.7-4.1-1.3-6.5-1.3-2.9 0-4.9 1.4-4.9 4.3 0 4.7 6.4 3.9 6.4 6 0 1.5-1.3 2.1-3.6 2.1-2.4 0-5.1-.9-6.9-2l-1.3 3c2.1 1.2 4.9 2.1 7.9 2.1 3.5 0 5.4-1.6 5.4-4.5 0-5.1-6.5-4.1-6.5-6.2 0-1.2 1.1-1.8 3.2-1.8 2 0 4 .6 5.5 1.4l1.3-3.1zM28 25h4.6V.4h-4.6V25zm-17.5 0h4.5v-9.7c0-3.3.6-5.4 3.9-5.4.5 0 .9.1 1.4.1l.3-4.4c-.6-.1-1.2-.1-1.7-.1-2.9 0-4.4 1.7-4.9 4.8h-.1V10h-3.4v15zm-7-23.7C1.5 1.3 0 2.8 0 4.8s1.6 3.5 3.5 3.5c2 0 3.5-1.6 3.5-3.5S5.5 1.3 3.5 1.3zm-2.2 23.7h4.5V10h-4.5v15zm29.8 0h4.5V13.8c0-2 .9-3.4 2.8-3.4 1.7 0 2.4 1.2 2.4 3.4V25h4.5V13.2c0-4.1-2.3-5.9-5.4-5.9-2.5 0-4 1.3-4.7 3.2h-.1V10H31v15z" />
    </svg>
  );
}

function GithubLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 98 96" fill="currentColor" className={className}>
      <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
    </svg>
  );
}

function AWSLogo({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 512 512" fill="currentColor" className={className}>
            <path d="M373.9,258.8c0-3.3-0.7-6.5-1.8-9.4c-1.3-3.2-3-6.2-5-8.8c-2.3-2.9-5-5.3-8-7.3c-3.1-2-6.5-3.6-10-4.6 c-3.5-1-7.2-1.5-10.9-1.5c-4.3,0-8.5,0.7-12.4,2.1c-3.8,1.3-7.2,3.3-10.2,5.8c-2.8,2.4-5,5.3-6.6,8.8c-1.5,3.3-2.2,7.2-2.2,11.3 c0,3.6,0.6,6.7,1.8,9.5c1.3,2.9,3,5.4,5.3,7.6c2.3,2.2,5,4,8.2,5.3c3.2,1.3,6.8,2,10.6,2c4.8,0,9.1-0.9,13.1-2.8 c3.6-1.7,6.8-4.2,9.3-7.2l0.2-0.2c2.4-2.8,4.2-5.7,5.5-8.6C373,267.4,373.9,263.4,373.9,258.8z"/>
            <path d="M435.5,335.5l-23.7-7.9c-2-0.7-3.6-2.2-4.1-4.2c-0.6-2.3-0.2-4.8,1.3-6.7c3.2-3.8,6.1-8,8.5-12.4 c2.7-4.8,4.9-10,6.6-15.3c1.9-5.9,3.1-12,3.6-18.4c0.5-6.3,0.3-12.6-0.8-19.1c-1-6.2-2.8-12.5-5.3-18.3c-2.5-6-5.8-11.5-9.8-16.5 c-4.1-5-9-9.5-14.5-13.1c-5.7-3.8-12.1-6.8-18.8-9c-7.1-2.2-14.7-3.7-22.6-4.3c-7.8-0.6-15.9-0.5-24.1,0.2 c-8.1,0.7-16.1,2.1-23.9,4.2c-7.7,2-15.1,4.9-22,8.4c-6.8,3.5-13.1,7.8-18.9,12.7c-5.4,4.6-10.3,10.1-14.4,16.2 c-3.9,5.7-7,12.1-9.3,18.8c-2,5.9-3.3,12-3.8,18.3c-0.5,6.1-0.2,12.4,0.7,18.7c1,6.3,2.8,12.5,5.5,18.6c2.6,5.8,5.9,11.3,10,16.3 c4.3,5.3,9.2,9.9,14.6,13.7c5.8,4,12.1,7.2,19,9.5c6.5,2.2,13.5,3.7,20.8,4.4c8.4,0.8,16.7,0.7,24.8-0.3c6.9-0.8,13.8-2.3,20.6-4.4 c-0.1,0.2-0.2,0.4-0.3,0.5c-4.4,9.9-10.7,18.8-18.6,26.5c-8.9,8.7-19.9,15.6-32.3,20.2c-12,4.4-25.1,6.6-38.9,6.6 c-12.9,0-25.5-2.2-37.4-6.6c-11.6-4.3-22.3-10.5-31.8-18.4c-1.8-1.5-4.4-1.7-6.4-0.4l-19.7,12.5c-2.3,1.5-3.1,4.5-1.8,6.9 c14.2,25.6,35.2,45.4,61.1,57.5c24.6,11.5,52.3,17.4,80.7,16.9c25.4-0.4,49.8-5.3,72.4-14.5c21.2-8.6,39.9-20.9,55.5-36.5 c14.4-14.4,25.7-31.5,33.4-50.7C437.3,339.4,437.4,337,435.5,335.5z M235.3,257c-2.3-2.3-4.1-4.9-5.3-7.7 c-1.3-2.9-1.9-6-1.9-9.6c0-4.1,0.8-7.9,2.3-11.2c1.6-3.4,3.8-6.4,6.6-8.8c2.9-2.5,6.3-4.5,10.2-5.9c3.9-1.4,8.1-2.1,12.5-2.1 c3.6,0,7.2,0.5,10.7,1.4c3.4,1,6.8,2.5,9.8,4.5c3,2,5.7,4.5,8,7.3c2,2.6,3.6,5.6,4.9,8.9c1.1,2.9,1.7,6.1,1.7,9.4 c0,4.6-0.8,8.6-2.5,12.3c-1.4,3-3.2,5.9-5.6,8.7l-0.2,0.3c-2.5,3-5.7,5.5-9.3,7.2c-4,1.9-8.4,2.9-13.1,2.9c-3.8,0-7.3-0.7-10.6-2 C248.9,268.4,244.6,263.6,235.3,257z"/>
        </svg>
    )
}

function LinearLogo({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
          <path d="M64.004 0C28.69 0 .008 28.68.008 63.996c0 35.312 28.684 63.996 63.996 63.996 35.316 0 64.004-28.684 64.004-63.996C128.008 28.68 99.32 0 64.004 0zm0 14.86a48.96 48.96 0 0113.805 2.05L26.375 92.543A49.124 49.124 0 0114.86 63.996c0-27.1 22.035-49.136 49.144-49.136zm37.625 15.633L50.191 106.125a49.12 49.12 0 01-13.804-2.05l51.433-75.633a49.12 49.12 0 0113.809 2.05zm11.511 33.503c0 27.1-22.039 49.137-49.144 49.137a48.96 48.96 0 01-13.809-2.05l51.434-75.637a49.133 49.133 0 0111.52 28.55z" />
        </svg>
    );
}