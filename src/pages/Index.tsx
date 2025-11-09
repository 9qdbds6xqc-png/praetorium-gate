import { useEffect, useState } from "react";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(207_40%_15%/0.15),transparent_50%)]" />
      
      {/* Cursor glow effect */}
      <div
        className="pointer-events-none fixed h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl transition-all duration-500"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        {/* Brand name */}
        <h1 className="fade-in mb-8 text-sm font-light uppercase tracking-[0.3em] text-muted-foreground">
          Praetorium
        </h1>

        {/* Main message */}
        <h2 className="fade-in-delay mb-6 text-4xl font-light leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Enabling startups and KMUs to access the defence market.
        </h2>

        {/* Subline */}
        <p className="fade-in-delay-2 mb-16 text-lg font-light text-muted-foreground sm:text-xl">
          Quietly building the bridge between technology and defence.
        </p>

        {/* Contact */}
        <a
          href="mailto:contact@praetorium.tech"
          className="fade-in-delay-2 group relative text-sm font-light tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          contact@praetorium.tech
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        </a>
      </div>
    </main>
  );
};

export default Index;
