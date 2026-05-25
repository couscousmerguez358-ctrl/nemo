import React from "react";
import Card from "../ui/Card";

export default function StatsSection() {
  const stats = [
    {
      value: "1 250 000+",
      label: "Exercices exécutés en WASM",
      sub: "Zéro latence réseau, zéro serveur.",
    },
    {
      value: "15 000+",
      label: "Développeurs actifs",
      sub: "Une communauté grandissante.",
    },
    {
      value: "100%",
      label: "Gamifié et interactif",
      sub: "Oubliez les cours statiques.",
    },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full border-b border-border/40 select-none">
      <Card variant="elevated" padding="lg" className="w-full relative overflow-hidden bg-gradient-to-br from-secondary/80 to-[#101016]/40">
        <div className="absolute inset-0 shimmer-bg opacity-10 pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center relative z-10">
          {stats.map((s, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="font-display font-black text-4xl sm:text-5xl bg-gradient-to-r from-primary via-[#8b5cf6] to-accent-cyan bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(99,91,255,0.25)]">
                {s.value}
              </span>
              <span className="text-xs font-bold text-foreground uppercase tracking-wider mt-1">
                {s.label}
              </span>
              <span className="text-[10px] text-textMuted font-medium">
                {s.sub}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
