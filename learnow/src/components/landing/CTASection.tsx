import React from "react";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";

export default function CTASection() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto w-full select-none text-center">
      <Card
        variant="elevated"
        padding="lg"
        className="w-full relative overflow-hidden bg-gradient-to-tr from-secondary via-secondary to-[#181028]/20 flex flex-col items-center py-16"
      >
        {/* Ambient background meshes */}
        <div className="absolute top-[-50%] left-[-20%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center">
          <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary mb-6 animate-bounce">
            <Trophy className="h-4.5 w-4.5" />
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight leading-tight">
            Prêt à Débloquer Ton Prochain Level ?
          </h2>
          <p className="text-xs sm:text-sm text-textSecondary mt-4 max-w-sm mx-auto leading-relaxed">
            Rejoignez des milliers de développeurs qui ont arrêté les tutoriels passifs pour passer à la pratique active.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 w-full sm:w-auto">
            <Link href="/register" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full gap-2 px-8">
                Créer mon compte <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" className="w-full px-8">
                Voir les abonnements
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
}
