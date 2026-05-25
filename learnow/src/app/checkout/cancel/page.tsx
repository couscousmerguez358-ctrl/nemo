import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, HelpCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function CheckoutCancel() {
  return (
    <>
      <Navbar />
      <main className="relative flex flex-col pt-28 pb-20 bg-background text-foreground min-h-screen items-center justify-center">
        <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-accent-danger/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-md mx-auto w-full px-6 text-center select-none flex flex-col items-center">
          
          <div className="h-14 w-14 rounded-2xl bg-accent-warning/10 border border-accent-warning/20 flex items-center justify-center text-accent-warning mb-6">
            <AlertCircle className="h-7 w-7" />
          </div>

          <h1 className="font-display font-extrabold text-2xl text-foreground">
            Achat suspendu... 😊
          </h1>
          <p className="text-xs text-textSecondary mt-2 leading-relaxed">
            Pas de souci, prenez votre temps ! Votre compte reste en accès gratuit NEWBIE pour continuer à pratiquer vos exercices fondamentaux.
          </p>

          <Card variant="default" padding="md" className="w-full text-left my-8 border-border/60 bg-[#101016]/40 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-primary" /> Rappel des avantages PRO :
            </h4>
            <ul className="flex flex-col gap-2 text-[11px] text-textSecondary pl-5 list-disc leading-relaxed">
              <li>Accès complet à tous les parcours de code (18+ technos).</li>
              <li>Exécution locale WebAssembly illimitée et sandboxée.</li>
              <li>100 requêtes de correction pédagogique d'assistant IA par jour.</li>
              <li>Certificats d'aptitudes professionnels signés numériquement.</li>
            </ul>
          </Card>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full">
            <Link href="/pricing" className="w-full">
              <Button variant="primary" className="w-full py-3.5 text-xs font-bold gap-2">
                Réessayer <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full">
              <Button variant="secondary" className="w-full py-3.5 text-xs font-bold">
                Aller au Dashboard
              </Button>
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
