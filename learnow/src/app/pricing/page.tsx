"use client";

import React, { useState } from "react";
import { Check, X, ShieldCheck, Flame, Compass, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Accordion from "@/components/ui/Accordion";
import { cn } from "@/lib/cn";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = (planName: string) => {
    setLoadingPlan(planName);
    setTimeout(() => {
      setLoadingPlan(null);
      // Stripe checkout session call will hook here
      window.location.href = `/checkout?plan=${planName.toLowerCase()}&billing=${
        isAnnual ? "annual" : "monthly"
      }`;
    }, 1500);
  };

  const faqItems = [
    {
      title: "Puis-je annuler mon abonnement à tout moment ?",
      content:
        "Oui, absolument. Tous nos abonnements sont sans engagement. Vous pouvez annuler votre renouvellement en un clic depuis votre espace paramètres ou via le portail Stripe officiel. Votre accès restera actif jusqu'à la fin de la période facturée.",
    },
    {
      title: "Comment fonctionne la sandbox WebAssembly ?",
      content:
        "Toutes nos leçons pratiques compilent et exécutent votre code (JavaScript, Python, SQL) directement au sein de votre navigateur grâce à la puissance de WebAssembly. Cela signifie zéro latence réseau, une sécurité totale et la possibilité de coder hors-ligne.",
    },
    {
      title: "Quelles cartes bancaires acceptez-vous ?",
      content:
        "Nous acceptons la totalité des cartes de crédit majeures (Visa, Mastercard, American Express) ainsi que Google Pay et Apple Pay. Tous les paiements sont sécurisés et cryptés de bout en bout par l'infrastructure mondiale de Stripe.",
    },
    {
      title: "Proposez-vous une offre pour les étudiants ?",
      content:
        "Le plan NEWBIE gratuit donne accès à tous les concepts fondamentaux du code. Si vous êtes étudiant et avez besoin d'accéder au plan PRO, contactez notre support avec un justificatif pour bénéficier d'une réduction de 50%.",
    },
  ];

  const plans = [
    {
      name: "NEWBIE",
      priceMonthly: "0€",
      priceAnnual: "0€",
      subText: "Idéal pour démarrer",
      features: [
        "Accès limité aux leçons de base",
        "Éditeur CodeMirror standard",
        "Mini-projets théoriques",
        "Régulateur d'XP standard",
        "Communauté d'aide publique",
        "10 requêtes d'assistant IA / jour",
      ],
      cta: "Commencer gratuitement",
      variant: "default" as const,
      hover: "lift" as const,
      isPopular: false,
    },
    {
      name: "PRO",
      priceMonthly: "9,99€",
      priceAnnual: "7,99€",
      subText: "Accélère ton apprentissage",
      features: [
        "Accès complet à tous les parcours (18+)",
        "Toutes les sandboxes WASM illimitées",
        "Projets réels de fin d'études",
        "Badge premium & Streaks colorés",
        "Certifications de compétences signées",
        "100 requêtes d'assistant IA / jour",
        "Support technique prioritaire",
      ],
      cta: "Passer à Pro",
      variant: "elevated" as const,
      hover: "glow-purple" as const,
      isPopular: true,
    },
    {
      name: "EXPERT",
      priceMonthly: "22€",
      priceAnnual: "17,99€",
      subText: "L'expérience de code absolue",
      features: [
        "Accès complet illimité aux parcours",
        "Sandboxes WASM + WebContainers",
        "Projets experts exclusifs",
        "Assistant IA prioritaire illimité",
        "Coaching de groupe hebdomadaire",
        "Certifications de niveau Expert",
        "Support VIP ultra-prioritaire 24/7",
      ],
      cta: "Devenir Expert",
      variant: "default" as const,
      hover: "glow-cyan" as const,
      isPopular: false,
    },
  ];

  const comparisonRows = [
    { name: "Accès aux parcours", newbie: "Basique", pro: "Complet", expert: "Complet & VIP" },
    { name: "Sandboxes WebAssembly", newbie: "Limitées", pro: "Illimitées", expert: "Illimitées" },
    { name: "Environnement WebContainers", newbie: "✗", pro: "✗", expert: "✓ (Node.js complet)" },
    { name: "Assistant IA Éducatif", newbie: "10 mess. / jour", pro: "100 mess. / jour", expert: "Illimité prioritaire" },
    { name: "Streaks & XP Booster", newbie: "Basique", pro: "Premium (+20%)", expert: "Boost maximum (+50%)" },
    { name: "Certifications de quête", newbie: "✗", pro: "✓", expert: "✓ (Niveau Expert)" },
    { name: "Support technique", newbie: "Standard", pro: "Prioritaire", expert: "Canal VIP dédié 24/7" },
  ];

  return (
    <>
      <Navbar />
      <main className="relative flex flex-col pt-28 pb-20 bg-background text-foreground min-h-screen">
        {/* Glow meshes background */}
        <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-accent-cyan/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Pricing Header Title */}
        <div className="max-w-4xl mx-auto w-full px-6 text-center select-none mb-14">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
            Des Tarifs Clairs, sans Frais Cachés.
          </h1>
          <p className="text-xs sm:text-sm text-textSecondary mt-4 max-w-md mx-auto leading-relaxed">
            Rejoignez la guilde LearnNow. Commencez gratuitement, progressez à votre rythme et débloquez la puissance premium quand vous êtes prêt.
          </p>

          {/* Billing Switch Toggle */}
          <div className="flex items-center justify-center gap-3.5 mt-8">
            <span
              className={cn("text-xs font-semibold text-textSecondary select-none transition-colors", {
                "text-foreground": !isAnnual,
              })}
            >
              Mensuel
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6.5 w-12 items-center rounded-full bg-[#101016] border border-border outline-none transition-colors select-none duration-300 active:scale-95"
            >
              <span
                className={cn(
                  "inline-block h-4.5 w-4.5 rounded-full bg-primary shadow-[0_0_8px_rgba(99,91,255,0.8)] transition-transform duration-300",
                  {
                    "translate-x-6.5 bg-accent-cyan shadow-[0_0_8px_rgba(0,216,246,0.8)]": isAnnual,
                  }
                )}
              />
            </button>
            <span
              className={cn("text-xs font-semibold text-textSecondary select-none transition-colors flex items-center gap-2", {
                "text-foreground": isAnnual,
              })}
            >
              Annuel
              <Badge variant="cyan" outline className="text-[10px] py-0 px-2 font-black select-none border-accent-cyan/40">
                Économise 20%
              </Badge>
            </span>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24">
          {plans.map((p, idx) => {
            const price = isAnnual ? p.priceAnnual : p.priceMonthly;
            const isPro = p.isPopular;
            return (
              <Card
                key={idx}
                variant={p.variant}
                hoverEffect={p.hover}
                padding="lg"
                className={cn("flex flex-col relative justify-between", {
                  "scale-100 md:scale-105 z-10 border-primary/40": isPro,
                })}
              >
                {isPro && (
                  <div className="absolute top-4 right-4 select-none">
                    <Badge variant="primary" outline className="animate-pulse-glow border-primary/50 text-[10px] font-black uppercase tracking-wider">
                      Le plus populaire
                    </Badge>
                  </div>
                )}
                
                {/* Plan Info */}
                <div className="flex flex-col text-left">
                  <span className="text-xs font-black text-textMuted uppercase tracking-widest font-display">
                    {p.name}
                  </span>
                  <div className="flex items-baseline gap-2 mt-4 select-none">
                    <span className="font-display font-black text-4xl sm:text-5xl text-foreground">
                      {price}
                    </span>
                    <span className="text-xs text-textSecondary font-semibold">
                      /{isAnnual ? "an" : "mois"}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-textSecondary mt-2">
                    {p.subText}
                  </span>

                  {/* Divider */}
                  <div className="h-px bg-border/40 w-full my-6" />

                  {/* Bullet points features list */}
                  <ul className="flex flex-col gap-3.5 text-xs text-textSecondary">
                    {p.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-accent-green shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan CTA button */}
                <div className="mt-8">
                  <Button
                    variant={isPro ? "primary" : "secondary"}
                    isLoading={loadingPlan === p.name}
                    onClick={() => handleSubscribe(p.name)}
                    className="w-full text-xs py-3.5"
                  >
                    {p.cta}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Comparison Table Section */}
        <div className="max-w-4xl mx-auto w-full px-6 mb-24 select-none">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl text-foreground">
              Comparatif Détaillé des Fonctionnalités
            </h2>
            <p className="text-xs text-textSecondary mt-2">
              Analysez la profondeur de chaque niveau d'accès.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden glass border border-border/80">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-secondary/40 border-b border-border/80">
                  <th className="p-4 font-bold text-textSecondary uppercase tracking-wider">Fonctionnalité</th>
                  <th className="p-4 font-bold text-foreground text-center font-display uppercase tracking-widest">NEWBIE</th>
                  <th className="p-4 font-bold text-primary text-center font-display uppercase tracking-widest">PRO</th>
                  <th className="p-4 font-bold text-accent-cyan text-center font-display uppercase tracking-widest">EXPERT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {comparisonRows.map((row, ridx) => (
                  <tr key={ridx} className="hover:bg-secondary/30 transition-colors">
                    <td className="p-4 font-medium text-textSecondary">{row.name}</td>
                    <td className="p-4 text-center text-textMuted font-medium">{row.newbie}</td>
                    <td className="p-4 text-center text-textSecondary font-semibold">{row.pro}</td>
                    <td className="p-4 text-center text-foreground font-bold">{row.expert}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing FAQ Section */}
        <div className="max-w-3xl mx-auto w-full px-6 select-none">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl text-foreground">
              Foire Aux Questions
            </h2>
            <p className="text-xs text-textSecondary mt-2">
              Des réponses claires à toutes vos questions sur la facturation.
            </p>
          </div>
          <Accordion items={faqItems} allowMultiple={false} />
        </div>
      </main>
      <Footer />
    </>
  );
}
