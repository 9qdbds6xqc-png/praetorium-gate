import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";

const Banner = () => {
  const [language, setLanguage] = useState<"en" | "de">("en");
  const content = {
    en: {
      headline: "Enabling startups and SMEs to access the defence market."
    },
    de: {
      headline: "Startups und KMU den Zugang zum Verteidigungsmarkt ermöglichen."
    }
  };
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background p-6">
      {/* Theme and Language controls */}
      <div className="absolute right-6 top-6 z-20 flex items-center gap-3">
        <ThemeToggle />
        <Tabs value={language} onValueChange={value => setLanguage(value as "en" | "de")}>
          <TabsList>
            <TabsTrigger value="en">EN</TabsTrigger>
            <TabsTrigger value="de">DE</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Centered content */}
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Logo and Brand name */}
        <div className="flex flex-col items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 text-accent">
            <polyline points="18 15 12 9 6 15" />
          </svg>
          
          <h1 className="text-xl font-light uppercase tracking-[0.3em] text-foreground -mr-[0.3em]">
            Praetorium
          </h1>
        </div>

        {/* Headline text */}
        <p className="text-center text-base font-light text-muted-foreground max-w-2xl">
          {content[language].headline}
        </p>
      </div>
    </main>
  );
};
export default Banner;