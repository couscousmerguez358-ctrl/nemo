"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ShieldCheck, Terminal } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Supabase credentials login will hook here
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-stretch">
      {/* Left side: Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 relative z-10 bg-[#070709]">
        {/* Decorative ambient background mesh */}
        <div className="absolute top-[10%] left-[10%] w-[250px] h-[250px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="mx-auto w-full max-w-md">
          {/* Logo link */}
          <Link href="/" className="inline-flex items-center gap-2 group outline-none select-none mb-10">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary to-accent-cyan flex items-center justify-center font-display font-black text-white">
              L
            </div>
            <span className="font-display font-bold text-base tracking-tight">
              Learn<span className="text-primary">Now</span>
            </span>
          </Link>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight select-none">
            Bon Retour Parmi Nous ! ⚡
          </h2>
          <p className="text-xs text-textSecondary mt-2 select-none">
            Connectez-vous pour reprendre votre quête de code là où vous l'avez laissée.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <Input
              type="email"
              label="Adresse Email"
              placeholder="curieux@learnnow.tech"
              icon={<Mail className="h-4.5 w-4.5" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && !email ? error : undefined}
            />

            <Input
              type="password"
              label="Mot de Passe"
              placeholder="••••••••••••"
              icon={<Lock className="h-4.5 w-4.5" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && !password ? error : undefined}
            />

            {error && email && password && (
              <span className="text-xs text-accent-danger font-medium select-none animate-pulse">
                {error}
              </span>
            )}

            <div className="flex items-center justify-between text-xs mt-1 select-none">
              <label className="flex items-center gap-2 text-textSecondary cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-primary h-4 w-4 rounded border-border bg-[#101016]"
                />
                Se souvenir de moi
              </label>
              <a href="#" className="text-primary hover:text-primary-hover font-semibold transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            <Button type="submit" variant="primary" isLoading={isLoading} className="w-full mt-2 py-3.5">
              Se connecter
            </Button>
          </form>

          {/* Social OAuth divider */}
          <div className="relative my-8 select-none">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/60"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#070709] px-4 text-textMuted font-bold tracking-wider">
                ou continuer avec
              </span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-4 select-none">
            <Button variant="secondary" className="gap-2.5 py-3 w-full border border-border/80">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.746-.08-1.32-.176-1.885H12.24z"/>
              </svg> Google
            </Button>
            <Button variant="secondary" className="gap-2.5 py-3 w-full border border-border/80">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg> GitHub
            </Button>
          </div>

          <p className="text-xs text-textSecondary text-center mt-10 select-none">
            Pas encore de compte ?{" "}
            <Link href="/register" className="text-primary hover:text-primary-hover font-bold transition-colors">
              Créer mon compte
            </Link>
          </p>
        </div>
      </div>

      {/* Right side: Immersive high-tech CSS mockup visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative bg-[#09090e] border-l border-border/40 overflow-hidden">
        {/* Subtle mesh background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-md w-full px-8 relative z-10 flex flex-col items-center">
          {/* Animated high-tech card */}
          <Card variant="elevated" padding="lg" className="w-full bg-[#101016]/80 text-left border-primary/20 glow-purple animate-pulse-glow select-none">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-accent-danger" />
                <span className="h-3 w-3 rounded-full bg-accent-warning" />
                <span className="h-3 w-3 rounded-full bg-accent-green" />
              </div>
              <Badge variant="cyan" outline className="text-[9px] uppercase tracking-widest font-black border-accent-cyan/30">
                <Terminal className="h-3 w-3" /> Sandbox active
              </Badge>
            </div>
            
            <p className="font-mono text-xs text-accent-cyan leading-relaxed mb-4">
              // Prépare-toi à débloquer ton potentiel...
            </p>
            <p className="font-mono text-[11px] text-textSecondary leading-relaxed">
              {"{"}<br />
              &nbsp;&nbsp;platform: <span className="text-accent-green">"LearnNow"</span>,<br />
              &nbsp;&nbsp;status: <span className="text-accent-green">"online"</span>,<br />
              &nbsp;&nbsp;level: <span className="text-primary">3</span>,<br />
              &nbsp;&nbsp;title: <span className="text-accent-warning">"Développeur"</span>,<br />
              &nbsp;&nbsp;streak: <span className="text-accent-warning">5</span>,<br />
              &nbsp;&nbsp;isPremium: <span className="text-accent-green">true</span><br />
              {"}"}
            </p>
          </Card>
          
          <h3 className="font-display font-extrabold text-xl text-center text-foreground mt-8 select-none">
            L'Éducation Devient un Jeu d'Aventure 🎮
          </h3>
          <p className="text-xs text-textSecondary text-center leading-relaxed mt-2 max-w-xs select-none">
            Gagnez des niveaux, débloquez des trophées uniques et résolvez des défis interactifs en local en temps réel.
          </p>
        </div>
      </div>
    </div>
  );
}
