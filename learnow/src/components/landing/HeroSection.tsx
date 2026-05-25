"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play, Terminal } from "lucide-react";
import Button from "../ui/Button";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Dynamic high-tech coding particles
    const codeSnippets = [
      "const fn = () => {};",
      "import { useState } from 'react';",
      "async fn fetch()",
      "let x = y ?? z;",
      "<html>",
      "SELECT * FROM db;",
      "def learn_code():",
      "npm run dev",
      "git commit -m 'feat'",
      "const learn = true;",
      "for i in range(10):",
      "System.out.println()",
      "std::cout << 'hello'",
      "fn next_level()",
      "<div>",
    ];

    interface Particle {
      x: number;
      y: number;
      text: string;
      speed: number;
      fontSize: number;
      opacity: number;
    }

    // Limit particles to 30 to protect performance and memory
    const particles: Particle[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
      speed: 0.3 + Math.random() * 0.8,
      fontSize: 10 + Math.floor(Math.random() * 6),
      opacity: 0.05 + Math.random() * 0.15,
    }));

    const render = () => {
      ctx.fillStyle = "rgba(7, 7, 9, 0.2)"; // Soft trails
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.fillStyle = `rgba(99, 91, 255, ${p.opacity})`;
        ctx.font = `${p.fontSize}px var(--font-jetbrains-mono), monospace`;
        ctx.fillText(p.text, p.x, p.y);

        p.y += p.speed;

        // Reset particle on bottom exit
        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
          p.opacity = 0.05 + Math.random() * 0.15;
          p.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden py-24 px-6 border-b border-border/40">
      {/* Background Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Radiant Gradient Mesh blobs */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-accent-cyan/80% rounded-full blur-[140px] opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Luminous Top Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-widest mb-6 animate-pulse select-none">
          <Terminal className="h-3.5 w-3.5" /> L'apprentissage Next-Gen est arrivé
        </div>

        {/* Hero Title */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08] text-foreground max-w-3xl">
          Deviens Maître du Code avec{" "}
          <span className="bg-gradient-to-r from-primary via-[#8b5cf6] to-accent-cyan bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(99,91,255,0.35)]">
            LearnNow
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-textSecondary max-w-xl mt-6 leading-relaxed">
          Oubliez les tutoriels statiques assommants. Plongez dans une aventure de codage gamifiée interactive avec sandboxes WebAssembly instantanées et validation cryptographique.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto">
          <Link href="/register" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full gap-2">
              Commencer gratuitement <ArrowRight className="h-4.5 w-4.5" />
            </Button>
          </Link>
          <Link href="/courses" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full gap-2">
              <Play className="h-4 w-4 fill-primary text-primary" /> Découvrir les parcours
            </Button>
          </Link>
        </div>

        {/* Dynamic Micro metrics bar */}
        <div className="mt-14 pt-8 border-t border-border/40 w-full grid grid-cols-3 gap-4 text-center max-w-lg select-none">
          <div>
            <p className="font-display font-bold text-lg sm:text-2xl text-foreground">15k+</p>
            <p className="text-[10px] text-textMuted font-bold uppercase tracking-wider mt-0.5">Apprenants</p>
          </div>
          <div className="border-x border-border/40">
            <p className="font-display font-bold text-lg sm:text-2xl text-foreground">18+</p>
            <p className="text-[10px] text-textMuted font-bold uppercase tracking-wider mt-0.5">Technologies</p>
          </div>
          <div>
            <p className="font-display font-bold text-lg sm:text-2xl text-foreground">99.8%</p>
            <p className="text-[10px] text-textMuted font-bold uppercase tracking-wider mt-0.5">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
