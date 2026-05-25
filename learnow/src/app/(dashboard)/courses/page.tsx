"use client";

import React from "react";
import { Compass, Sparkles, BookOpen, Clock, Award, ShieldAlert } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";

export default function Courses() {
  const coursesList = [
    {
      id: "react",
      title: "Mastering React 19 & Next.js 14",
      desc: "Apprends à concevoir des applications web ultra-performantes avec l'App Router, les Server Actions, et la gestion d'états Zustand.",
      tech: "React / Next.js",
      lessons: 20,
      duration: "10h",
      xp: "2 500 XP",
      progress: 45,
      completed: 9,
      isPremium: false,
      active: true,
      nextLessonId: "react-state-zustand",
    },
    {
      id: "javascript",
      title: "JavaScript moderne & TypeScript de A à Z",
      desc: "Domine les concepts avancés du langage (Closures, Asynchronisme, Promesses) et sécurise tes scripts avec TypeScript.",
      tech: "JavaScript",
      lessons: 15,
      duration: "8h",
      xp: "1 800 XP",
      progress: 0,
      completed: 0,
      isPremium: false,
      active: false,
      nextLessonId: "js-fundamentals",
    },
    {
      id: "python",
      title: "Python Data Science & Algorithmes",
      desc: "Analyse des données volumineuses, manipule Pandas/NumPy et entraîne tes premiers modèles de Machine Learning locaux en WebAssembly.",
      tech: "Python",
      lessons: 25,
      duration: "12h",
      xp: "3 000 XP",
      progress: 0,
      completed: 0,
      isPremium: true,
      active: false,
      nextLessonId: "python-basics",
    },
    {
      id: "sql",
      title: "Bases de Données SQL & Modélisation",
      desc: "Apprends à écrire des requêtes complexes, indexer tes tables et modéliser des bases relationnelles SQL.js performantes.",
      tech: "SQL",
      lessons: 12,
      duration: "6h",
      xp: "1 500 XP",
      progress: 0,
      completed: 0,
      isPremium: true,
      active: false,
      nextLessonId: "sql-select",
    },
  ];

  return (
    <div className="flex flex-col gap-6 relative select-none text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:mt-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground flex items-center gap-2">
            <Compass className="h-7 w-7 text-primary" /> Vos Parcours d'Apprentissage
          </h1>
          <p className="text-xs sm:text-sm text-textSecondary">
            Explorez des cours interactifs animés par des bacs à sable WebAssembly sécurisés.
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {coursesList.map((course) => {
          return (
            <Card
              key={course.id}
              variant={course.active ? "elevated" : "default"}
              padding="lg"
              className={`flex flex-col relative h-full bg-gradient-to-br from-secondary/80 to-[#101016]/40 ${
                course.active ? "border-primary/25" : ""
              }`}
            >
              {course.active && (
                <div className="absolute top-[-50%] left-[-20%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
              )}

              <div className="flex items-center justify-between gap-2 mb-4">
                <Badge
                  variant={course.tech === "React / Next.js" ? "primary" : course.tech === "Python" ? "cyan" : "outline"}
                  className="text-[9px] uppercase tracking-widest font-black"
                >
                  {course.tech}
                </Badge>
                
                {course.isPremium && (
                  <Badge variant="cyan" outline className="text-[9px] uppercase tracking-widest font-black flex items-center gap-1 border-accent-cyan/30">
                    <Sparkles className="h-3 w-3 fill-accent-cyan" /> PRO
                  </Badge>
                )}
              </div>

              <h2 className="font-display font-extrabold text-base sm:text-lg text-foreground mb-2">
                {course.title}
              </h2>
              
              <p className="text-xs text-textSecondary mb-6 flex-grow leading-relaxed">
                {course.desc}
              </p>

              {/* Course Meta Info */}
              <div className="grid grid-cols-3 gap-2 border-t border-border/40 pt-4 mb-5 text-[10px] text-textMuted font-bold">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" /> {course.lessons} Chapitres
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {course.duration} de code
                </span>
                <span className="flex items-center gap-1 text-primary">
                  <Award className="h-3.5 w-3.5" /> {course.xp}
                </span>
              </div>

              {/* Progress and CTA */}
              <div className="mt-auto">
                {course.progress > 0 ? (
                  <div className="mb-4">
                    <ProgressBar value={course.progress} height="xs" variant="success" />
                    <div className="flex justify-between text-[9px] text-textMuted font-semibold mt-1">
                      <span>{course.completed} validés</span>
                      <span>{course.progress}% complété</span>
                    </div>
                  </div>
                ) : null}

                <Button
                  variant={course.active ? "primary" : "secondary"}
                  onClick={() => (window.location.href = `/lessons/${course.nextLessonId}`)}
                  className="w-full py-3.5 text-xs font-bold gap-2"
                >
                  {course.progress > 0 
                    ? "Continuer l'aventure" 
                    : course.isPremium 
                      ? "Débloquer avec le forfait Pro" 
                      : "Démarrer le parcours"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
