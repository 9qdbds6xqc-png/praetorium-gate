import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";

const Banner = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [language, setLanguage] = useState<"en" | "de">("en");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const content = {
    en: {
      headline: "Enabling startups and SMEs to access the defence market."
    },
    de: {
      headline: "Startups und KMU den Zugang zum Verteidigungsmarkt ermöglichen."
    }
  };

  return (
    <main className="page-load relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-6">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(207_40%_15%/0.15),transparent_50%)]" />
      
      {/* Cursor glow effect */}
      <div 
        className="pointer-events-none fixed h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl transition-all duration-500" 
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }} 
      />

      {/* Theme and Language controls */}
      <div className="fade-in absolute right-6 top-6 z-20 flex items-center gap-3">
        <ThemeToggle />
        <Tabs value={language} onValueChange={(value) => setLanguage(value as "en" | "de")}>
          <TabsList>
            <TabsTrigger value="en">EN</TabsTrigger>
            <TabsTrigger value="de">DE</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 6:1 Aspect Ratio Container */}
      <div className="relative z-10 w-full max-w-7xl" style={{ aspectRatio: '6/1' }}>
        <div className="flex h-full w-full items-center justify-between gap-8 px-4">
          {/* Center: Logo and Brand name */}
          <div className="fade-in absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="mb-3 text-accent"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            
            <h1 className="text-xl font-light uppercase tracking-[0.3em] text-foreground">
              Praetorium
            </h1>
          </div>

          {/* Right section: Headline text */}
          <div className="fade-in-delay ml-auto flex items-center pr-4 text-right">
            <h2 className="text-base font-light leading-tight tracking-tight text-foreground sm:text-lg md:text-xl">
              {content[language].headline}
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Banner;
