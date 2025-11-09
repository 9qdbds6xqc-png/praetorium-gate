import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  const [language, setLanguage] = useState<"en" | "de">("en");

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: January 2025",
      sections: [
        {
          heading: "1. Information We Collect",
          text: "We collect information you provide directly to us, including name, email address, and any other information you choose to provide."
        },
        {
          heading: "2. How We Use Your Information",
          text: "We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our users."
        },
        {
          heading: "3. Information Sharing",
          text: "We do not share your personal information with third parties except as described in this privacy policy or with your consent."
        },
        {
          heading: "4. Data Security",
          text: "We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access."
        },
        {
          heading: "5. Your Rights",
          text: "You have the right to access, update, or delete your personal information. Contact us at contact@praetorium.tech for requests."
        },
        {
          heading: "6. Contact Us",
          text: "If you have any questions about this Privacy Policy, please contact us at contact@praetorium.tech"
        }
      ]
    },
    de: {
      title: "Datenschutzerklärung",
      lastUpdated: "Zuletzt aktualisiert: Januar 2025",
      sections: [
        {
          heading: "1. Informationen, die wir sammeln",
          text: "Wir sammeln Informationen, die Sie uns direkt zur Verfügung stellen, einschließlich Name, E-Mail-Adresse und andere Informationen, die Sie bereitstellen möchten."
        },
        {
          heading: "2. Wie wir Ihre Informationen verwenden",
          text: "Wir verwenden die gesammelten Informationen, um unsere Dienste bereitzustellen, zu pflegen und zu verbessern, mit Ihnen zu kommunizieren und unsere Nutzer zu schützen."
        },
        {
          heading: "3. Weitergabe von Informationen",
          text: "Wir geben Ihre persönlichen Informationen nicht an Dritte weiter, außer wie in dieser Datenschutzerklärung beschrieben oder mit Ihrer Zustimmung."
        },
        {
          heading: "4. Datensicherheit",
          text: "Wir ergreifen angemessene Maßnahmen, um Ihre persönlichen Informationen vor Verlust, Diebstahl, Missbrauch und unbefugtem Zugriff zu schützen."
        },
        {
          heading: "5. Ihre Rechte",
          text: "Sie haben das Recht, auf Ihre persönlichen Informationen zuzugreifen, sie zu aktualisieren oder zu löschen. Kontaktieren Sie uns unter contact@praetorium.tech für Anfragen."
        },
        {
          heading: "6. Kontakt",
          text: "Wenn Sie Fragen zu dieser Datenschutzerklärung haben, kontaktieren Sie uns bitte unter contact@praetorium.tech"
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

export default PrivacyPolicy;
