import React from "react";
import { Cpu, Lock, Database, CreditCard } from "lucide-react";
import Card from "../ui/Card";

export default function FeaturesSection() {
  const features = [
    {
      title: "Moteurs WebAssembly Locaux",
      description:
        "Compilez et exécutez du JS, du Python (Pyodide) et du SQL (SQL.js) localement en 0ms. Zéro latence réseau, exécution infinie et 100% gratuite.",
      icon: Cpu,
      hover: "glow-purple" as const,
    },
    {
      title: "Assertions Sécurisées SHA-256",
      description:
        "Notre système valide vos codes par empreintes cryptographiques SHA-256 salées. Impossible de tricher en lisant les tests unitaires locaux.",
      icon: Lock,
      hover: "glow-cyan" as const,
    },
    {
      title: "IndexedDB Auto-Save Session",
      description:
        "Toutes les 5 secondes, Dexie.js sauvegarde l'état binaire de votre base SQLite et vos codes. Fermez l'onglet sereinement, rien n'est perdu.",
      icon: Database,
      hover: "glow-green" as const,
    },
    {
      title: "Paiements Stripe Elements",
      description:
        "Abonnez-vous en toute confiance grâce au formulaire Stripe Elements intégré. Révocation ultra-rapide en 60 secondes en cas d'annulation.",
      icon: CreditCard,
      hover: "glow-purple" as const,
    },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full border-b border-border/40">
      <div className="text-center max-w-2xl mx-auto mb-16 select-none">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
          Pourquoi LearnNow est différent
        </h2>
        <p className="text-xs sm:text-sm text-textSecondary mt-3 max-w-md mx-auto leading-relaxed">
          Nous repoussons les limites techniques du navigateur web pour vous offrir l'expérience d'apprentissage la plus fluide du marché.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <Card
              key={idx}
              variant="default"
              hoverEffect={f.hover}
              padding="lg"
              className="flex flex-col gap-4 text-left group"
            >
              <div className="h-11 w-11 rounded-xl bg-secondary border border-border flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base text-foreground mt-2">
                {f.title}
              </h3>
              <p className="text-xs text-textSecondary leading-relaxed">
                {f.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
