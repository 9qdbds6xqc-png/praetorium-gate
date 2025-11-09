import { useEffect, useState, useRef } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const Banner = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [language, setLanguage] = useState<"en" | "de">("en");
  
  // Drag-and-drop state
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [headlinePosition, setHeadlinePosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<'logo' | 'headline' | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Load saved positions from localStorage
  useEffect(() => {
    const savedLogo = localStorage.getItem('banner-logo-position');
    const savedHeadline = localStorage.getItem('banner-headline-position');
    if (savedLogo) setLogoPosition(JSON.parse(savedLogo));
    if (savedHeadline) setHeadlinePosition(JSON.parse(savedHeadline));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });

      // Handle dragging
      if (dragging && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - dragOffset.x;
        const y = e.clientY - rect.top - dragOffset.y;

        // Boundary checking
        const maxX = rect.width / 2;
        const maxY = rect.height / 2;
        const boundedX = Math.max(-maxX, Math.min(maxX, x));
        const boundedY = Math.max(-maxY, Math.min(maxY, y));

        if (dragging === 'logo') {
          setLogoPosition({ x: boundedX, y: boundedY });
        } else if (dragging === 'headline') {
          setHeadlinePosition({ x: boundedX, y: boundedY });
        }
      }
    };

    const handleMouseUp = () => {
      if (dragging) {
        // Save positions to localStorage
        if (dragging === 'logo') {
          localStorage.setItem('banner-logo-position', JSON.stringify(logoPosition));
        } else if (dragging === 'headline') {
          localStorage.setItem('banner-headline-position', JSON.stringify(headlinePosition));
        }
        setDragging(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, dragOffset, logoPosition, headlinePosition]);

  const handleMouseDown = (element: 'logo' | 'headline', e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const currentPos = element === 'logo' ? logoPosition : headlinePosition;
      
      setDragOffset({
        x: e.clientX - rect.left - currentPos.x,
        y: e.clientY - rect.top - currentPos.y
      });
      setDragging(element);
    }
  };

  const resetPositions = () => {
    setLogoPosition({ x: 0, y: 0 });
    setHeadlinePosition({ x: 0, y: 0 });
    localStorage.removeItem('banner-logo-position');
    localStorage.removeItem('banner-headline-position');
  };

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

      {/* Reset button */}
      <div className="fade-in absolute left-6 top-6 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={resetPositions}
          title="Reset layout"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

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
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl" 
        style={{ aspectRatio: '6/1' }}
      >
        <div className="flex h-full w-full items-center justify-between gap-8 px-4">
          {/* Center: Logo and Brand name - Draggable */}
          <div 
            className={`fade-in absolute left-1/2 top-1/2 flex flex-col items-center justify-center select-none ${
              dragging === 'logo' ? 'cursor-grabbing opacity-80' : 'cursor-move'
            } ${dragging === null ? 'transition-transform duration-200' : ''}`}
            style={{
              transform: `translate(calc(-50% + ${logoPosition.x}px), calc(-50% + ${logoPosition.y}px))`
            }}
            onMouseDown={(e) => handleMouseDown('logo', e)}
          >
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="mb-3 text-accent pointer-events-none"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            
            <h1 className="text-xl font-light uppercase tracking-[0.3em] text-foreground pointer-events-none">
              Praetorium
            </h1>
          </div>

          {/* Right section: Headline text - Draggable */}
          <div 
            className={`fade-in-delay absolute left-1/2 top-1/2 flex items-center text-center select-none ${
              dragging === 'headline' ? 'cursor-grabbing opacity-80' : 'cursor-move'
            } ${dragging === null ? 'transition-transform duration-200' : ''}`}
            style={{
              transform: `translate(calc(-50% + ${headlinePosition.x}px), calc(-50% + ${headlinePosition.y}px))`
            }}
            onMouseDown={(e) => handleMouseDown('headline', e)}
          >
            <h2 className="text-base font-light leading-tight tracking-tight text-foreground sm:text-lg md:text-xl pointer-events-none">
              {content[language].headline}
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Banner;
