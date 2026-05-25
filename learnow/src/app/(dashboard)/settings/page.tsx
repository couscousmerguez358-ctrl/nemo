"use client";

import React, { useState } from "react";
import { Settings, Save, ShieldAlert, Sparkles, Sliders, Bell } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";

export default function SettingsPage() {
  const [name, setName] = useState("Alexandre");
  const [email, setEmail] = useState("alexandre@nemo.dev");
  const [dailyGoal, setDailyGoal] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSaveSuccess(false);

    setTimeout(() => {
      setIsLoading(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 relative select-none text-left">
      
      {/* Title */}
      <div className="flex flex-col gap-1.5 md:mt-4">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground flex items-center gap-2">
          <Settings className="h-7 w-7 text-primary" /> Vos Paramètres
        </h1>
        <p className="text-xs sm:text-sm text-textSecondary">
          Gérez votre profil, vos objectifs de code quotidien et vos préférences système.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left main form setting (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card variant="default" padding="lg">
            <h3 className="font-display font-bold text-sm text-foreground mb-6 flex items-center gap-2">
              <Sliders className="h-4.5 w-4.5 text-primary" /> Profil personnel
            </h3>

            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <Input
                type="text"
                label="Prénom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre prénom"
              />

              <Input
                type="email"
                label="Adresse Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                disabled
              />
              <span className="text-[9px] text-textMuted -mt-3.5 block font-medium">
                🔒 L'adresse e-mail est liée à vos identifiants d'authentification Supabase sécurisés.
              </span>

              <div className="h-px bg-border/40 w-full my-2" />

              <div className="flex flex-col gap-2 text-left">
                <label className="text-xs font-semibold text-textSecondary">Objectif d'apprentissage quotidien</label>
                <div className="grid grid-cols-3 gap-3 w-full mt-1">
                  {[15, 30, 60].map((mins) => {
                    const isSelected = dailyGoal === mins;
                    const label = mins === 15 ? "15m / jour" : mins === 30 ? "30m / jour" : "60m / jour";
                    return (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setDailyGoal(mins)}
                        className={`px-4 py-3 rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-primary-glow border-primary text-foreground shadow-[0_0_12px_rgba(99,91,255,0.15)]"
                            : "bg-secondary border-border/80 text-textSecondary hover:border-border-hover"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {saveSuccess && (
                <div className="flex items-start gap-2 text-accent-green bg-accent-green/5 border border-accent-green/10 px-4 py-3 rounded-xl select-none animate-fade-in">
                  <span className="text-xs font-semibold">✓ Vos paramètres ont été enregistrés avec succès !</span>
                </div>
              )}

              <Button type="submit" variant="primary" isLoading={isLoading} className="py-3.5 mt-4 text-xs font-bold gap-2">
                <Save className="h-4 w-4" /> Sauvegarder les modifications
              </Button>
            </form>
          </Card>
        </div>

        {/* Right side widgets settings (1 col) */}
        <div className="flex flex-col gap-6">
          <Card variant="default" padding="lg" className="flex flex-col">
            <h3 className="font-display font-bold text-sm text-foreground mb-4 flex items-center gap-2">
              <Bell className="h-4.5 w-4.5 text-accent-cyan" /> Notifications Preferences
            </h3>

            <div className="flex flex-col gap-4 text-left">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border bg-[#101016] text-primary focus:ring-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">Rappels de série</span>
                  <span className="text-[9px] text-textMuted mt-0.5">E-mail quotidien si vous risquez de perdre votre série</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border bg-[#101016] text-primary focus:ring-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">Nouveaux Chapitres</span>
                  <span className="text-[9px] text-textMuted mt-0.5">Alertez-moi lorsque de nouvelles leçons sont publiées</span>
                </div>
              </label>
            </div>
          </Card>

          <Card variant="default" padding="lg" className="flex flex-col border-accent-danger/25">
            <h3 className="font-display font-bold text-sm text-accent-danger mb-4 flex items-center gap-2">
              <ShieldAlert className="h-4.5 w-4.5" /> Zone de danger
            </h3>

            <div className="flex flex-col gap-4 text-left">
              <p className="text-[10px] text-textSecondary leading-relaxed">
                Effacez toutes les données stockées localement en IndexedDB (Dexie.js), y compris les sauvegardes automatiques de votre éditeur de code et vos sessions en mémoire SQLite SQL.js.
              </p>

              <Button
                variant="danger"
                onClick={() => {
                  if (confirm("Êtes-vous sûr de vouloir réinitialiser vos fichiers bac à sable locaux ? Cette action est irréversible.")) {
                    localStorage.clear();
                    alert("Fichiers et état réinitialisés avec succès !");
                    window.location.reload();
                  }
                }}
                className="py-3 text-[10px] font-bold"
              >
                Réinitialiser les fichiers bac à sable
              </Button>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
