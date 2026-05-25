"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Play, BookOpen, Compass, Award, Flame, 
  Hourglass, Trophy, Sparkles, Check, ChevronRight, GraduationCap 
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";

function DashboardContent() {
  const searchParams = useSearchParams();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  
  // Onboarding form states
  const [experience, setExperience] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [dailyGoal, setDailyGoal] = useState(30);

  useEffect(() => {
    if (searchParams.get("onboarding") === "true") {
      setShowOnboarding(true);
    }
  }, [searchParams]);

  const handleTechToggle = (tech: string) => {
    if (selectedTechs.includes(tech)) {
      setSelectedTechs(selectedTechs.filter((t) => t !== tech));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // Award 50 XP and display success notification in real code
    alert("Félicitations ! +50 XP obtenus pour avoir complété ton profil d'onboarding ! 🎉");
  };

  // Mock data for Dashboard widgets
  const stats = [
    { label: "XP Total", value: "1 850 XP", sub: "Niveau 3", icon: Trophy, color: "text-primary" },
    { label: "Série Active", value: "5 jours", sub: "Record: 12 jours", icon: Flame, color: "text-accent-warning" },
    { label: "Temps d'étude", value: "140 min", sub: "Objectif: 30m/j", icon: Hourglass, color: "text-accent-cyan" },
  ];

  const activePath = {
    title: "Mastering React 19 & Next.js 14",
    tech: "react",
    progress: 45,
    lessonsCompleted: 9,
    totalLessons: 20,
    nextLesson: "Gestion globale des états avec Zustand",
    nextLessonId: "react-state-zustand",
  };

  const recentBadges = [
    { name: "Premier Script", desc: "Validé un exercice JS", icon: Sparkles, color: "bg-primary/20 text-primary" },
    { name: "Persévérance", desc: "Streak de 5 jours", icon: Flame, color: "bg-accent-warning/20 text-accent-warning" },
    { name: "Data Explorer", desc: "Validé 3 exercices SQL", icon: Compass, color: "bg-accent-cyan/20 text-accent-cyan" },
  ];

  // Mock contribution heatmap grid
  const daysInYear = Array.from({ length: 53 * 7 }, (_, i) => {
    const val = Math.random();
    if (val > 0.85) return 3; // high activity
    if (val > 0.6) return 2; // medium
    if (val > 0.3) return 1; // low
    return 0; // none
  });

  return (
    <div className="flex flex-col gap-6 relative select-none">
      
      {/* Personalized Welcome Header banner */}
      <div className="flex flex-col gap-1.5 text-left md:mt-4">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground">
          Bon retour, Alexandre 👋
        </h1>
        <p className="text-xs sm:text-sm text-textSecondary">
          Prêt à relever ton défi de code quotidien ? Ta quête du jour t'attend.
        </p>
      </div>

      {/* Main Grid Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left main area: Active Path + Heatmap */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Active Course Path Card */}
          <Card variant="elevated" padding="lg" className="flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-br from-secondary/90 to-[#12121a]/40 border-primary/25">
            <div className="absolute top-[-50%] left-[-20%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="flex-1 flex flex-col text-left">
              <div className="flex items-center gap-2">
                <Badge variant="primary" outline className="text-[9px] uppercase tracking-widest font-black">
                  Parcours Actif
                </Badge>
                <Badge variant="cyan" className="text-[9px] uppercase tracking-widest font-black">
                  React
                </Badge>
              </div>
              <h2 className="font-display font-extrabold text-lg sm:text-xl text-foreground mt-3">
                {activePath.title}
              </h2>
              <p className="text-xs text-textSecondary mt-2">
                Prochaine leçon : <span className="text-foreground font-semibold">{activePath.nextLesson}</span>
              </p>

              {/* Progress bar info */}
              <div className="mt-5">
                <ProgressBar value={activePath.progress} height="sm" variant="success" showLabel={true} />
                <div className="flex justify-between text-[10px] text-textMuted font-medium mt-1">
                  <span>{activePath.lessonsCompleted} leçons validées</span>
                  <span>{activePath.totalLessons} leçons</span>
                </div>
              </div>
            </div>

            {/* Play CTA Button */}
            <div className="shrink-0 w-full md:w-auto">
              <Button
                variant="primary"
                onClick={() => (window.location.href = `/lessons/${activePath.nextLessonId}`)}
                className="w-full md:w-auto py-3.5 px-6 gap-2"
              >
                <Play className="h-4 w-4 fill-white text-white" /> Continuer la quête
              </Button>
            </div>
          </Card>

          {/* Activity Heatmap widget */}
          <Card variant="default" padding="lg" className="flex flex-col text-left">
            <h3 className="font-display font-bold text-sm text-foreground mb-4">
              Activité de Code
            </h3>
            
            {/* Grid Map */}
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[3px]">
                {daysInYear.map((level, i) => (
                  <div
                    key={i}
                    className={cn("aspect-square rounded-[2px]", {
                      "bg-[#101016] border border-border/20": level === 0,
                      "bg-primary/20": level === 1,
                      "bg-primary/50": level === 2,
                      "bg-primary shadow-[0_0_8px_rgba(99,91,255,0.4)]": level === 3,
                    })}
                  />
                ))}
              </div>
              
              <div className="flex items-center justify-between text-[10px] text-textMuted mt-1">
                <span>Dernière année</span>
                <div className="flex items-center gap-1.5">
                  <span>Moins</span>
                  <div className="h-2.5 w-2.5 rounded-[2px] bg-[#101016]" />
                  <div className="h-2.5 w-2.5 rounded-[2px] bg-primary/20" />
                  <div className="h-2.5 w-2.5 rounded-[2px] bg-primary/50" />
                  <div className="h-2.5 w-2.5 rounded-[2px] bg-primary" />
                  <span>Plus</span>
                </div>
              </div>
            </div>
          </Card>

        </div>

        {/* Right side area: Quick stats + Unlocked badges */}
        <div className="flex flex-col gap-6">
          
          {/* Stats widgets list */}
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Card key={idx} variant="default" padding="md" className="flex items-center gap-4 text-left">
                <div className={cn("h-11 w-11 rounded-xl bg-secondary border border-border flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]", s.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-textMuted font-bold uppercase tracking-wider">{s.label}</span>
                  <span className="font-display font-black text-lg text-foreground mt-0.5">{s.value}</span>
                  <span className="text-[9px] text-textSecondary font-semibold">{s.sub}</span>
                </div>
              </Card>
            );
          })}

          {/* Badges recent obtained list */}
          <Card variant="default" padding="lg" className="flex flex-col text-left">
            <h3 className="font-display font-bold text-sm text-foreground mb-4">
              Trophées Récents
            </h3>
            
            <div className="flex flex-col gap-3.5">
              {recentBadges.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div key={idx} className="flex items-center gap-3.5">
                    <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0 border border-border/40", b.color)}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-foreground leading-tight">{b.name}</span>
                      <span className="text-[10px] text-textMuted mt-0.5">{b.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

        </div>

      </div>

      {/* 3-Step Onboarding Wizard Modal Overlay */}
      {showOnboarding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <Card variant="elevated" padding="lg" className="max-w-md w-full bg-[#101016] border border-primary/20 text-center relative overflow-hidden glow-purple">
            <div className="absolute top-[-50%] left-[-20%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={cn("h-1.5 rounded-full transition-all duration-300", {
                    "w-8 bg-primary": onboardingStep === step,
                    "w-2 bg-[#2d2d3a]": onboardingStep !== step,
                  })}
                />
              ))}
            </div>

            {/* STEP 1: Experience Selection */}
            {onboardingStep === 1 && (
              <div className="flex flex-col items-center text-center animate-fade-in">
                <GraduationCap className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-display font-extrabold text-xl text-foreground">
                  Quel est ton niveau en code ?
                </h3>
                <p className="text-xs text-textSecondary mt-2">
                  Nous adapterons le matériel pédagogique à ton profil.
                </p>
                
                <div className="w-full flex flex-col gap-3 mt-6">
                  {["beginner", "intermediate", "advanced"].map((lvl) => {
                    const label = lvl === "beginner" ? "Débutant (J'apprends de zéro)" : lvl === "intermediate" ? "Intermédiaire (Je connais les bases)" : "Avancé (Je veux me perfectionner)";
                    const isSelected = experience === lvl;
                    return (
                      <button
                        key={lvl}
                        onClick={() => setExperience(lvl)}
                        className={cn(
                          "w-full text-left px-5 py-4 rounded-xl border transition-all text-xs font-semibold flex items-center justify-between",
                          {
                            "bg-primary-glow border-primary text-foreground shadow-[0_0_12px_rgba(99,91,255,0.2)]": isSelected,
                            "bg-secondary border-border/80 text-textSecondary hover:border-border-hover hover:text-foreground": !isSelected,
                          }
                        )}
                      >
                        <span>{label}</span>
                        {isSelected && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Favorite Tech Selection */}
            {onboardingStep === 2 && (
              <div className="flex flex-col items-center text-center">
                <Compass className="h-10 w-10 text-accent-cyan mb-4" />
                <h3 className="font-display font-extrabold text-xl text-foreground">
                  Quelles technos veux-tu apprendre ?
                </h3>
                <p className="text-xs text-textSecondary mt-2">
                  Sélectionnez-en au moins une (plusieurs possibles).
                </p>

                <div className="grid grid-cols-2 gap-3 w-full mt-6">
                  {["javascript", "python", "react", "sql"].map((tech) => {
                    const isSelected = selectedTechs.includes(tech);
                    const label = tech === "javascript" ? "JavaScript" : tech === "python" ? "Python" : tech === "react" ? "React" : "SQL DB";
                    return (
                      <button
                        key={tech}
                        onClick={() => handleTechToggle(tech)}
                        className={cn(
                          "px-4 py-4 rounded-xl border transition-all text-xs font-semibold flex items-center justify-between",
                          {
                            "bg-accent-cyan/10 border-accent-cyan text-foreground shadow-[0_0_12px_rgba(0,216,246,0.2)]": isSelected,
                            "bg-secondary border-border/80 text-textSecondary hover:border-border-hover hover:text-foreground": !isSelected,
                          }
                        )}
                      >
                        <span>{label}</span>
                        {isSelected && <Check className="h-4 w-4 text-accent-cyan" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Daily learning objective */}
            {onboardingStep === 3 && (
              <div className="flex flex-col items-center text-center">
                <Hourglass className="h-10 w-10 text-accent-warning mb-4 animate-spin-slow" />
                <h3 className="font-display font-extrabold text-xl text-foreground">
                  Définis ton objectif d'étude
                </h3>
                <p className="text-xs text-textSecondary mt-2">
                  Une pratique quotidienne courte est la clé du succès.
                </p>

                <div className="w-full flex flex-col gap-3 mt-6">
                  {[15, 30, 60].map((mins) => {
                    const isSelected = dailyGoal === mins;
                    const label = mins === 15 ? "15 minutes / jour (Quête Rapide)" : mins === 30 ? "30 minutes / jour (Quête Normale)" : "60 minutes / jour (Quête Intense)";
                    return (
                      <button
                        key={mins}
                        onClick={() => setDailyGoal(mins)}
                        className={cn(
                          "w-full text-left px-5 py-4 rounded-xl border transition-all text-xs font-semibold flex items-center justify-between",
                          {
                            "bg-accent-warning/10 border-accent-warning text-foreground shadow-[0_0_12px_rgba(255,179,71,0.2)]": isSelected,
                            "bg-secondary border-border/80 text-textSecondary hover:border-border-hover hover:text-foreground": !isSelected,
                          }
                        )}
                      >
                        <span>{label}</span>
                        {isSelected && <Check className="h-4 w-4 text-accent-warning" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center gap-4 mt-8 w-full border-t border-border/40 pt-6">
              {onboardingStep > 1 && (
                <Button
                  variant="secondary"
                  onClick={() => setOnboardingStep(onboardingStep - 1)}
                  className="flex-1 py-3 text-xs"
                >
                  Précédent
                </Button>
              )}
              {onboardingStep < 3 ? (
                <Button
                  variant="primary"
                  disabled={onboardingStep === 1 && !experience || onboardingStep === 2 && selectedTechs.length === 0}
                  onClick={() => setOnboardingStep(onboardingStep + 1)}
                  className="flex-1 py-3 text-xs gap-1.5"
                >
                  Continuer <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleOnboardingComplete}
                  className="flex-1 py-3 text-xs"
                >
                  Terminer l'onboarding
                </Button>
              )}
            </div>

          </Card>
        </div>
      )}

    </div>
  );
}

export default function Dashboard() {
  return (
    <React.Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[50vh] select-none">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider text-textSecondary">Chargement du tableau de bord...</span>
        </div>
      </div>
    }>
      <DashboardContent />
    </React.Suspense>
  );
}
