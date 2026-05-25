import React from "react";
import { BookOpen, Code2, Play, Trophy } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Choisis ton parcours",
      description: "Naviguez dans notre catalogue de 18+ technologies (React, Python, SQL...) et sélectionnez votre quête éducative.",
      icon: BookOpen,
    },
    {
      step: "02",
      title: "Pratique immédiatement",
      description: "Écrivez vos scripts directement dans l'éditeur CodeMirror 6 intégré avec support responsive complet.",
      icon: Code2,
    },
    {
      step: "03",
      title: "Exécutez sans serveurs",
      description: "Exécutez vos codes en local en un clic grâce à nos sandboxes isolées basées sur WebAssembly.",
      icon: Play,
    },
    {
      step: "04",
      title: "Montez en compétences",
      description: "Gagnez de l'XP certifiée, complétez vos streaks quotidiens et débloquez des badges cryptographiques uniques.",
      icon: Trophy,
    },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full border-b border-border/40">
      <div className="text-center max-w-2xl mx-auto mb-20 select-none">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
          Comment fonctionne l'aventure ?
        </h2>
        <p className="text-xs sm:text-sm text-textSecondary mt-3 max-w-md mx-auto leading-relaxed">
          Quatre étapes simples pour passer de curieux à maître du développement logiciel, sans contraintes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="flex flex-col gap-4 text-left relative group">
              {/* Step indicator */}
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-4xl text-[#1d1d26] select-none group-hover:text-primary/20 transition-colors duration-300">
                  {s.step}
                </span>
                <div className="h-10 w-10 rounded-xl bg-[#101016] border border-border flex items-center justify-center text-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <h3 className="font-display font-bold text-base text-foreground mt-3">
                {s.title}
              </h3>
              <p className="text-xs text-textSecondary leading-relaxed">
                {s.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
