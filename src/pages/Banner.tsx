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
    <main className="page-load relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
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

      <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left/Center section: Logo and Brand name - more prominent */}
        <div className="fade-in flex flex-col items-center justify-center">
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mb-6 text-accent"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
          
          <h1 className="text-2xl font-light uppercase tracking-[0.3em] text-foreground">
            Praetorium
          </h1>
        </div>

        {/* Right section: Headline text */}
        <div className="fade-in-delay flex items-center justify-end text-right">
          <h2 className="text-xl font-light leading-tight tracking-tight text-foreground sm:text-2xl md:text-3xl">
            {content[language].headline}
          </h2>
        </div>
      </div>
    </main>
  );
};

export default Banner;
