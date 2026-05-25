"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";

export default function Legal() {
  return (
    <>
      <Navbar />
      <main className="relative flex flex-col pt-28 pb-20 bg-background text-foreground min-h-screen">
        <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-3xl mx-auto w-full px-6 select-none text-left">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground mb-8">
            Mentions Légales
          </h1>

          <Card variant="default" padding="lg" className="flex flex-col gap-6 text-textSecondary text-xs leading-relaxed">
            <div>
              <h2 className="font-display font-bold text-sm text-foreground mb-2">1. Édition du site</h2>
              <p>En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet **LearnNow** l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :</p>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
                <li>Propriétaire : LearnNow Corp.</li>
                <li>Responsable publication : Alexandre Dev — alexandre@nemo.dev</li>
                <li>Hébergeur : Vercel Inc. — 340 S Lemon Ave #4133 Walnut, CA 91789, USA</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display font-bold text-sm text-foreground mb-2">2. Propriété intellectuelle et contrefaçons</h2>
              <p>LearnNow Corp est propriétaire des droits de propriété intellectuelle ou détient les droits d'usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.</p>
            </div>

            <div>
              <h2 className="font-display font-bold text-sm text-foreground mb-2">3. Limitations de responsabilité</h2>
              <p>LearnNow Corp ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site internet **LearnNow**.</p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
