"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Sparkles, LayoutDashboard, Settings, MessageSquare, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function CheckoutSuccess() {
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    // Small timeout to launch XP progression animation smoothly
    setTimeout(() => {
      setShowProgress(true);
    }, 800);
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative flex flex-col pt-28 pb-20 bg-background text-foreground min-h-screen items-center justify-center">
        {/* Glow meshes background */}
        <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-accent-green/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-xl mx-auto w-full px-6 text-center select-none flex flex-col items-center">
          
          {/* Animated Draw checkmark */}
          <div className="h-16 w-16 rounded-2xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center text-accent-green mb-6 shadow-[0_0_25px_0_rgba(0,229,117,0.2)] animate-pulse">
            <Check className="h-8 w-8 stroke-[3px]" />
          </div>

          {/* Congratulations Title */}
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-foreground tracking-tight leading-tight">
            Paiement Confirmé ! 🎉
          </h1>
          <p className="text-xs sm:text-sm text-textSecondary mt-3 max-w-sm leading-relaxed">
            Bienvenue dans l'aventure Premium LearnNow ! Votre compte a été mis à jour avec succès. Débloquez maintenant votre plein potentiel de code.
          </p>

          {/* XP Bonus credit block */}
          <div className="my-8 inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-accent-green/10 border border-accent-green/20 text-accent-green font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
            <Sparkles className="h-5 w-5 animate-pulse" /> +100 XP Bonus Premium Crédités !
          </div>

          {/* Multi action route cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-2 text-left">
            <Link href="/dashboard" className="w-full">
              <Card variant="default" padding="sm" className="h-full flex flex-col gap-2 border-border/60 hover:border-primary/40 hover:-translate-y-1 transition-all">
                <LayoutDashboard className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold text-foreground">Dashboard</span>
                <span className="text-[10px] text-textMuted leading-tight">Commencer mes leçons</span>
              </Card>
            </Link>

            <Link href="/ai-assistant" className="w-full">
              <Card variant="default" padding="sm" className="h-full flex flex-col gap-2 border-border/60 hover:border-accent-cyan/40 hover:-translate-y-1 transition-all">
                <MessageSquare className="h-5 w-5 text-accent-cyan" />
                <span className="text-xs font-bold text-foreground">Assistant IA</span>
                <span className="text-[10px] text-textMuted leading-tight">Poser des questions</span>
              </Card>
            </Link>

            <Link href="/settings" className="w-full">
              <Card variant="default" padding="sm" className="h-full flex flex-col gap-2 border-border/60 hover:border-accent-green/40 hover:-translate-y-1 transition-all">
                <Settings className="h-5 w-5 text-accent-green" />
                <span className="text-xs font-bold text-foreground">Abonnement</span>
                <span className="text-[10px] text-textMuted leading-tight">Gérer mes factures</span>
              </Card>
            </Link>
          </div>

          {/* Action button */}
          <Link href="/dashboard" className="w-full mt-10">
            <Button variant="primary" size="lg" className="w-full py-4 text-xs font-bold gap-2">
              Aller à la console d'apprentissage <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>

        </div>
      </main>
      <Footer />
    </>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
