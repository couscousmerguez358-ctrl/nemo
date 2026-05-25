"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main className="relative flex flex-col pt-28 pb-20 bg-background text-foreground min-h-screen">
        <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-3xl mx-auto w-full px-6 select-none text-left">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground mb-8">
            Politique de Confidentialité
          </h1>

          <Card variant="default" padding="lg" className="flex flex-col gap-6 text-textSecondary text-xs leading-relaxed">
            <div>
              <h2 className="font-display font-bold text-sm text-foreground mb-2">1. Collecte des données</h2>
              <p>Nous collectons les informations nécessaires pour gérer vos progrès d'apprentissage et votre abonnement premium :</p>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
                <li>Adresse e-mail de connexion sécurisée (via Supabase Auth).</li>
                <li>Historique d'activité de code, score XP et série d'apprentissage (Streak).</li>
                <li>Données bancaires traitées exclusivement et de manière chiffrée par Stripe (nous ne stockons aucun numéro de carte).</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display font-bold text-sm text-foreground mb-2">2. Durée de conservation</h2>
              <p>Vos progressions locales sauvegardées par autosave via Dexie.js dans l'IndexedDB de votre navigateur restent à 100% chez vous. Les données synchronisées en base Supabase sont conservées tant que votre compte reste actif.</p>
            </div>

            <div>
              <h2 className="font-display font-bold text-sm text-foreground mb-2">3. Vos droits</h2>
              <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles depuis votre panneau de paramètres ou par simple demande.</p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
