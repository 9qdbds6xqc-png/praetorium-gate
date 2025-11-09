import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  const [language, setLanguage] = useState<"en" | "de">("en");

  const content = {
    en: {
      title: "Terms of Service",
      lastUpdated: "Last updated: January 2025",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          text: "By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement."
        },
        {
          heading: "2. Use License",
          text: "Permission is granted to temporarily access our services for personal, non-commercial transitory viewing only."
        },
        {
          heading: "3. Disclaimer",
          text: "The materials on our service are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties."
        },
        {
          heading: "4. Limitations",
          text: "In no event shall PRAETORIUM or its suppliers be liable for any damages arising out of the use or inability to use our services."
        },
        {
          heading: "5. Revisions",
          text: "We may revise these terms of service at any time without notice. By using this service you are agreeing to be bound by the current version of these terms."
        },
        {
          heading: "6. Governing Law",
          text: "These terms and conditions are governed by and construed in accordance with applicable laws and you irrevocably submit to the exclusive jurisdiction of the courts."
        },
        {
          heading: "7. Contact",
          text: "If you have any questions about these Terms, please contact us at contact@praetorium.tech"
        }
      ]
    },
    de: {
      title: "Nutzungsbedingungen",
      lastUpdated: "Zuletzt aktualisiert: Januar 2025",
      sections: [
        {
          heading: "1. Annahme der Bedingungen",
          text: "Durch den Zugriff auf und die Nutzung unserer Dienste akzeptieren Sie diese Bedingungen und stimmen zu, an diese gebunden zu sein."
        },
        {
          heading: "2. Nutzungslizenz",
          text: "Es wird die Erlaubnis erteilt, vorübergehend auf unsere Dienste für persönliche, nicht-kommerzielle Zwecke zuzugreifen."
        },
        {
          heading: "3. Haftungsausschluss",
          text: "Die Materialien auf unserem Service werden auf einer 'wie besehen' Basis bereitgestellt. Wir geben keine ausdrücklichen oder stillschweigenden Garantien ab."
        },
        {
          heading: "4. Haftungsbeschränkungen",
          text: "Unter keinen Umständen haften PRAETORIUM oder seine Lieferanten für Schäden, die aus der Nutzung oder Unfähigkeit zur Nutzung unserer Dienste entstehen."
        },
        {
          heading: "5. Änderungen",
          text: "Wir können diese Nutzungsbedingungen jederzeit ohne Vorankündigung überarbeiten. Durch die Nutzung dieses Services stimmen Sie der aktuellen Version dieser Bedingungen zu."
        },
        {
          heading: "6. Anwendbares Recht",
          text: "Diese Geschäftsbedingungen unterliegen den geltenden Gesetzen und Sie unterwerfen sich unwiderruflich der ausschließlichen Gerichtsbarkeit der Gerichte."
        },
        {
          heading: "7. Kontakt",
          text: "Wenn Sie Fragen zu diesen Bedingungen haben, kontaktieren Sie uns bitte unter contact@praetorium.tech"
        }
      ]
    }
  };

  return (
    <main className="page-load relative min-h-screen bg-background px-6 py-12">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(207_40%_15%/0.15),transparent_50%)]" />

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

      {/* Back button */}
      <Link 
        to="/" 
        className="fade-in absolute left-6 top-6 z-20 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {language === "en" ? "Back" : "Zurück"}
      </Link>

      <div className="relative z-10 mx-auto max-w-3xl pt-20">
        <h1 className="fade-in mb-2 text-4xl font-light tracking-tight text-foreground">
          {content[language].title}
        </h1>
        <p className="fade-in-delay mb-12 text-sm text-muted-foreground">
          {content[language].lastUpdated}
        </p>

        <div className="space-y-8">
          {content[language].sections.map((section, index) => (
            <div key={index} className="fade-in-delay">
              <h2 className="mb-3 text-xl font-light text-foreground">
                {section.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Terms;
