"use client";

import React from "react";
import { Award, Trophy, Flame, Play, BookOpen, Clock, Sparkles } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";

export default function Profile() {
  const stats = [
    { label: "Leçons Validées", value: "9 / 20", sub: "Mastering React 19", icon: BookOpen, color: "text-primary" },
    { label: "XP Cumulé", value: "1 850 XP", sub: "Niveau 3 - Développeur", icon: Trophy, color: "text-accent-warning" },
    { label: "Série Active", value: "5 jours", sub: "Record: 12 jours", icon: Flame, color: "text-accent-danger" },
  ];

  const achievements = [
    {
      id: "first_script",
      name: "Premier Script",
      desc: "A validé le premier exercice JS interactif.",
      icon: Sparkles,
      color: "bg-primary/20 text-primary border-primary/30",
      unlocked: true,
      date: "Il y a 3 jours",
    },
    {
      id: "streak_5",
      name: "Persévérance",
      desc: "A maintenu une série de 5 jours de code d'affilée.",
      icon: Flame,
      color: "bg-accent-warning/20 text-accent-warning border-accent-warning/30",
      unlocked: true,
      date: "Hier",
    },
    {
      id: "sql_explorer",
      name: "Data Explorer",
      desc: "A complété 3 requêtes SQLite locales complexes.",
      icon: Trophy,
      color: "bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30",
      unlocked: true,
      date: "Il y a 2 jours",
    },
    {
      id: "python_wizard",
      name: "Génie Algorithmique",
      desc: "Résoudre un algorithme complexe en Python via Pyodide.",
      icon: Award,
      color: "bg-[#2d2d3a]/50 text-textMuted border-border/40",
      unlocked: false,
      date: "Bloqué (Forfait Pro)",
    },
  ];

  return (
    <div className="flex flex-col gap-6 relative select-none text-left">
      
      {/* Title */}
      <div className="flex flex-col gap-1.5 md:mt-4">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground flex items-center gap-2">
          <Trophy className="h-7 w-7 text-accent-warning" /> Votre Profil Apprenant
        </h1>
        <p className="text-xs sm:text-sm text-textSecondary">
          Visualisez vos progrès, consultez vos trophées débloqués et préparez votre montée de niveau.
        </p>
      </div>

      {/* Main details */}
      <Card variant="elevated" padding="lg" className="relative overflow-hidden bg-gradient-to-br from-secondary/80 to-[#101016]/40 border-primary/25">
        <div className="absolute top-[-50%] left-[-20%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-primary/30 to-accent-cyan/30 flex items-center justify-center font-bold text-white text-3xl border border-primary/45 shadow-xl relative">
              <span>A</span>
              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-accent-green border-2 border-[#101016] shadow-[0_0_6px_rgba(0,229,117,0.8)]" />
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2">
                <h2 className="font-display font-extrabold text-xl text-foreground">Alexandre</h2>
                <Badge variant="cyan" className="text-[9px] font-black tracking-widest uppercase">PRO</Badge>
              </div>
              <p className="text-xs text-textSecondary mt-1">
                Membre premium depuis Mai 2026
              </p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-[10px] text-textMuted font-semibold">Niveau 3 (Développeur)</span>
                <span className="text-[10px] text-textMuted font-semibold">XP : 1850 / 3500</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-64">
            <ProgressBar value={1850} max={3500} height="md" variant="primary" showLabel={true} />
            <p className="text-[9px] text-textMuted font-bold text-right mt-1.5 uppercase">1 650 XP restants avant Lvl 4</p>
          </div>
        </div>
      </Card>

      {/* Grid Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card key={idx} variant="default" padding="md" className="flex items-center gap-4 text-left">
              <div className="h-11 w-11 rounded-xl bg-secondary border border-border flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                <Icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-textMuted font-bold uppercase tracking-wider">{s.label}</span>
                <span className="font-display font-black text-lg text-foreground mt-0.5">{s.value}</span>
                <span className="text-[9px] text-textSecondary font-semibold">{s.sub}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Achievements Section */}
      <div className="flex flex-col gap-4 mt-4 text-left" id="achievements">
        <h3 className="font-display font-extrabold text-lg text-foreground flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" /> Trophées & Badges Débloqués
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <Card
                key={ach.id}
                variant="default"
                padding="md"
                className={`flex gap-4 border transition-all ${
                  ach.unlocked 
                    ? "bg-[#101016]/40 border-border/60" 
                    : "bg-[#101016]/10 border-border/10 opacity-60"
                }`}
              >
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center border shrink-0 ${ach.color}`}>
                  <Icon className="h-5 w-5 animate-pulse-glow" />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{ach.name}</span>
                    {!ach.unlocked && <Badge variant="outline" className="text-[8px] border-border/40 py-0.5">Bloqué</Badge>}
                  </div>
                  <p className="text-[10px] text-textSecondary mt-1 leading-normal max-w-[200px]">{ach.desc}</p>
                  <span className="text-[8px] text-textMuted mt-2.5 font-bold uppercase tracking-wider">{ach.date}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

    </div>
  );
}
