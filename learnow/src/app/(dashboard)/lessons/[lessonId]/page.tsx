"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Play, BookOpen, ChevronLeft, ChevronRight, 
  Terminal, Sparkles, Check, ArrowRight, ShieldCheck, Heart
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import CodeEditor from "@/components/editor/CodeEditor";
import OutputConsole from "@/components/editor/OutputConsole";
import { SandboxAdapter } from "@/services/sandbox/SandboxAdapter";
import { useAutoSave } from "@/hooks/useAutoSave";

// SHA-256 Native Web Cryptography utility helper
const sha256 = async (message: string): Promise<string> => {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export default function Lesson() {
  const [activeTab, setActiveTab] = useState<"theory" | "code" | "output">("theory");
  const [isLoading, setIsLoading] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [consoleError, setConsoleError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Mock static lesson data (simulating Supabase lookup)
  const lesson = {
    id: "react-state-zustand",
    title: "Zustand : La Gestion d'État Moderne",
    tech: "JavaScript",
    estimatedMinutes: 15,
    xpReward: 50,
    theoryMarkdown: `
# Zustand ⚡
Zustand est une bibliothèque de gestion d'état globale pour React qui se veut extrêmement simple, rapide et minimaliste. Contrairement à Redux, il n'y a pas besoin de boilerplate complexe (actions, reducers, dispatchers). Tout tourne autour d'un simple store en écriture directe.

## Le principe du Store :
Un store Zustand est créé à l'aide de la fonction \`create\`. Cette fonction reçoit une fonction de définition qui prend un paramètre \`set\`. Le \`set\` permet de mettre à jour l'état de manière simple et réactive.

### Défi du Jour :
Créez une fonction de calcul nommée \`multiplier(a, b)\` qui multiplie deux arguments \`a\` et \`b\` et renvoie le résultat. 
Votre script doit obligatoirement inclure un \`console.log(multiplier(3, 4))\` pour valider le test unitaire.
    `,
    starterCode: `// Écris ta fonction multiplier(a, b) ci-dessous :
function multiplier(a, b) {
  // Complète le code
}

// Validation : affiche la multiplication de 3 et 4 dans la console
console.log(multiplier(3, 4));`,
    // Hashed expected answer sha256("12" + "salt_learnow")
    expectedHash: "ef131b79f046dc87f7bcfcfd89d4608c0fb2dc46e03c621867c4dfbbd87b328a",
  };

  // Wire auto-save to IndexedDB via custom hook
  const { code, setCode, isSaving, lastSaved } = useAutoSave(lesson.id, lesson.starterCode);

  const handleRunCode = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    setConsoleOutput("");
    setConsoleError(null);

    try {
      // Execute code via Strategy Pattern Adapter
      const result = await SandboxAdapter.execute(code, "js");
      setIsLoading(false);

      if (result.error) {
        setConsoleError(result.error);
        setConsoleOutput("");
        return;
      }

      setConsoleOutput(result.output);
      setConsoleError(null);

      // Cryptographic SHA-256 validation (SHA-256 of output + salt)
      const userOutputClean = result.output.trim();
      const hashInput = userOutputClean + "salt_learnow";
      const userHash = await sha256(hashInput);

      if (userHash === lesson.expectedHash) {
        setIsSuccess(true);
        setShowConfetti(true);
        // Play success check sound or trigger XP in BDD
      } else {
        setConsoleError("Presque ! Le résultat imprimé dans la console n'est pas celui attendu (12). Vérifie ta logique.");
      }
    } catch (err: any) {
      setIsLoading(false);
      setConsoleError("Erreur système lors du traitement du code.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-112px)] flex flex-col gap-6 relative select-none">
      
      {/* Lesson Header Navigation */}
      <div className="flex items-center justify-between border-b border-border/40 pb-4 mt-2">
        <div className="flex items-center gap-3 text-left">
          <Link href="/courses">
            <button className="p-2 rounded-xl bg-secondary border border-border/80 text-textSecondary hover:text-foreground transition-all outline-none">
              <ChevronLeft className="h-4 w-4" />
            </button>
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Badge variant="primary" className="text-[9px] uppercase tracking-widest font-black py-0 px-2">
                Leçon active
              </Badge>
              <Badge variant="cyan" outline className="text-[9px] uppercase tracking-widest font-black py-0 px-2">
                {lesson.tech}
              </Badge>
            </div>
            <h1 className="font-display font-extrabold text-sm sm:text-base text-foreground mt-1">
              {lesson.title}
            </h1>
          </div>
        </div>

        {/* Dynamic Autosave badge */}
        <div className="flex items-center gap-2">
          {isSaving ? (
            <span className="text-[10px] text-primary font-medium animate-pulse select-none">Sauvegarde...</span>
          ) : lastSaved ? (
            <span className="text-[10px] text-textMuted select-none">Sauvegardé localement</span>
          ) : null}
          <div className="h-8 px-3.5 rounded-xl bg-accent-green/10 border border-accent-green/20 text-accent-green flex items-center gap-1.5 font-bold text-xs select-none">
            <Sparkles className="h-3.5 w-3.5" /> +{lesson.xpReward} XP
          </div>
        </div>
      </div>

      {/* Desktop Layout: 3 Columns split */}
      <div className="hidden lg:grid grid-cols-12 gap-6 items-stretch flex-1 min-h-[480px]">
        {/* Column 1: Course Markdown Theory (35%) */}
        <div className="col-span-4 flex flex-col">
          <Card variant="default" padding="lg" className="flex-1 text-left overflow-y-auto max-h-[520px] bg-[#101016]/40 border-border/60 select-text leading-relaxed">
            <div className="prose prose-invert max-w-none text-xs text-textSecondary flex flex-col gap-4">
              <h2 className="font-display font-black text-lg text-foreground mb-2 flex items-center gap-2">
                <BookOpen className="h-4.5 w-4.5 text-primary" /> {lesson.title}
              </h2>
              <div className="h-px bg-border/40 w-full mb-2" />
              <p>
                <strong>Zustand ⚡</strong> est une bibliothèque de gestion d'état globale pour React qui se veut extrêmement simple, rapide et minimaliste.
              </p>
              <p>
                Tout tourne autour d'un simple store en écriture directe créé à l'aide de la fonction <code className="bg-[#1a1a28] text-primary px-1.5 py-0.5 rounded font-mono text-[10px]">create</code>.
              </p>
              <h3 className="font-display font-bold text-sm text-foreground mt-4">Défi du Jour :</h3>
              <p>
                Créez une fonction de calcul nommée <code className="bg-[#1a1a28] text-accent-cyan px-1.5 py-0.5 rounded font-mono text-[10px]">multiplier(a, b)</code> qui multiplie deux arguments <code className="bg-[#1a1a28] text-textSecondary px-1.5 py-0.5 rounded font-mono text-[10px]">a</code> et <code className="bg-[#1a1a28] text-textSecondary px-1.5 py-0.5 rounded font-mono text-[10px]">b</code> et renvoie le résultat.
              </p>
              <p>
                Votre script doit obligatoirement inclure un <code className="bg-[#1a1a28] text-accent-green px-1.5 py-0.5 rounded font-mono text-[10px]">console.log(multiplier(3, 4))</code> pour valider le test unitaire.
              </p>
            </div>
          </Card>
        </div>

        {/* Column 2: CodeEditor Workspace (45%) */}
        <div className="col-span-5 flex flex-col gap-4">
          <Card variant="default" padding="none" className="flex-1 flex flex-col h-[520px]">
            <div className="px-4 py-3 bg-[#101016]/40 border-b border-border/80 flex items-center justify-between select-none">
              <span className="text-[10px] font-bold text-textSecondary uppercase tracking-widest flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5" /> Éditeur de code
              </span>
              <Badge variant="cyan" outline className="text-[9px] uppercase tracking-wider">CodeMirror 6</Badge>
            </div>
            <div className="flex-1 p-2">
              <CodeEditor value={code} onChange={setCode} language="javascript" className="h-full" />
            </div>
            {/* Actions Button */}
            <div className="p-4 border-t border-border/80 bg-[#101016]/20 flex items-center justify-end gap-3 select-none">
              <Button
                variant="secondary"
                onClick={() => setCode(lesson.starterCode)}
                className="py-2.5 px-4 text-xs font-semibold"
              >
                Réinitialiser
              </Button>
              <Button
                variant="primary"
                isLoading={isLoading}
                onClick={handleRunCode}
                className="py-2.5 px-6 text-xs gap-2"
              >
                <Play className="h-3.5 w-3.5 fill-white" /> Exécuter le code (Ctrl+Entrée)
              </Button>
            </div>
          </Card>
        </div>

        {/* Column 3: Output Console (20%) */}
        <div className="col-span-3 flex flex-col h-[520px]">
          <OutputConsole output={consoleOutput} error={consoleError} isLoading={isLoading} />
        </div>
      </div>

      {/* Mobile Responsive Layout: Tabs navigation */}
      <div className="flex flex-col gap-4 lg:hidden flex-1 select-none">
        {/* Navigation Tabs bar */}
        <div className="grid grid-cols-3 gap-2 bg-[#101016] border border-border p-1 rounded-xl">
          {(["theory", "code", "output"] as const).map((tab) => {
            const label = tab === "theory" ? "Théorie" : tab === "code" ? "Editeur" : "Console";
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn("py-2.5 text-xs font-bold rounded-lg transition-all", {
                  "bg-primary text-white shadow-lg": isSelected,
                  "text-textSecondary hover:text-foreground": !isSelected,
                })}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Active tab content area */}
        <div className="flex-1 flex flex-col min-h-[360px]">
          {activeTab === "theory" && (
            <Card variant="default" padding="lg" className="flex-1 text-left overflow-y-auto max-h-[400px]">
              <div className="prose prose-invert max-w-none text-xs text-textSecondary flex flex-col gap-3">
                <h2 className="font-display font-black text-base text-foreground mb-2 flex items-center gap-2">
                  <BookOpen className="h-4.5 w-4.5 text-primary" /> Zustand ⚡
                </h2>
                <p>Zustand est une gestion d'état globale ultra-rapide.</p>
                <h3 className="font-display font-bold text-xs text-foreground mt-4">Défi du jour :</h3>
                <p>Créez la fonction <code className="bg-[#1a1a28] text-accent-cyan px-1.5 py-0.5 rounded font-mono text-[10px]">multiplier(a, b)</code> et faites un <code className="bg-[#1a1a28] text-accent-green px-1.5 py-0.5 rounded font-mono text-[10px]">console.log(multiplier(3, 4))</code>.</p>
              </div>
            </Card>
          )}

          {activeTab === "code" && (
            <Card variant="default" padding="none" className="flex-1 flex flex-col">
              <div className="flex-1 p-2 min-h-[280px]">
                <CodeEditor value={code} onChange={setCode} language="javascript" className="h-full" />
              </div>
              <div className="p-4 border-t border-border/80 bg-[#101016]/20 flex items-center justify-end gap-3">
                <Button variant="secondary" onClick={() => setCode(lesson.starterCode)} className="py-2.5 px-4 text-xs">
                  Réinitialiser
                </Button>
                <Button variant="primary" isLoading={isLoading} onClick={handleRunCode} className="py-2.5 px-6 text-xs gap-2">
                  <Play className="h-3.5 w-3.5 fill-white" /> Exécuter
                </Button>
              </div>
            </Card>
          )}

          {activeTab === "output" && (
            <div className="flex-1 flex flex-col">
              <OutputConsole output={consoleOutput} error={consoleError} isLoading={isLoading} />
            </div>
          )}
        </div>
      </div>

      {/* Success Celebration Overlay modal */}
      {isSuccess && showConfetti && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <Card variant="elevated" padding="lg" className="max-w-md w-full bg-[#101016] border border-primary/20 text-center relative overflow-hidden glow-green animate-pulse-glow">
            <div className="absolute top-[-50%] left-[-20%] w-[300px] h-[300px] bg-accent-green/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="h-12 w-12 rounded-xl bg-accent-green/15 border border-accent-green/20 flex items-center justify-center text-accent-green mx-auto mb-6">
              <Check className="h-6 w-6 stroke-[3px]" />
            </div>

            <h2 className="font-display font-extrabold text-2xl text-foreground">
              Quête validée ! 🎉
            </h2>
            <p className="text-xs text-textSecondary mt-2">
              Excellent travail ! Votre code a compilé avec succès et s'est exécuté sans erreur dans la sandbox locale.
            </p>

            <div className="my-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-green/10 border border-accent-green/20 text-accent-green font-bold text-sm">
              <Sparkles className="h-4.5 w-4.5 animate-pulse" /> +{lesson.xpReward} XP Crédités !
            </div>

            <div className="flex items-center gap-4 w-full border-t border-border/40 pt-6">
              <Button
                variant="ghost"
                onClick={() => setShowConfetti(false)}
                className="flex-1 py-3 text-xs"
              >
                Revoir mon code
              </Button>
              <Button
                variant="primary"
                onClick={() => (window.location.href = "/dashboard")}
                className="flex-1 py-3 text-xs gap-1.5"
              >
                Suivant <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
}
