"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Flame, LayoutDashboard, Compass, Trophy, Award, 
  Settings, ChevronLeft, ChevronRight, GraduationCap, ShieldCheck
} from "lucide-react";
import ProgressBar from "../ui/ProgressBar";
import { cn } from "@/lib/cn";

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Mock data for user progression
  const [userProgress, setUserProgress] = useState({
    level: 3,
    title: "Développeur",
    currentXp: 1850,
    maxXp: 3500,
    streak: 5,
    isPremium: true,
  });

  const sidebarLinks = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Mes parcours", href: "/courses", icon: Compass },
    { label: "Progression", href: "/profile", icon: Trophy },
    { label: "Récompenses", href: "/profile#achievements", icon: Award },
    { label: "Paramètres", href: "/settings", icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col fixed top-20 bottom-0 left-0 z-40 bg-[#101016]/30 border-r border-border/60 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
        {
          "w-64": !isCollapsed,
          "w-20": isCollapsed,
        }
      )}
    >
      {/* Collapsible toggle trigger */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 -right-3 h-6 w-6 rounded-full bg-secondary border border-border flex items-center justify-center text-textSecondary hover:text-foreground hover:bg-secondary-hover transition-all z-50 select-none outline-none"
      >
        {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>

      {/* Profile Section Brief */}
      <div className={cn("p-6 flex flex-col items-center border-b border-border/40", { "p-4": isCollapsed })}>
        <div className="relative select-none">
          <div
            className={cn(
              "h-16 w-16 rounded-2xl bg-gradient-to-tr from-primary/20 to-accent-cyan/20 flex items-center justify-center text-primary font-bold text-xl border border-border transition-all duration-300 relative",
              {
                "h-10 w-10 text-sm rounded-xl": isCollapsed,
              }
            )}
          >
            <span>A</span>
            {userProgress.isPremium && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-accent-green border-2 border-[#101016] shadow-[0_0_6px_rgba(0,229,117,0.8)]" />
            )}
          </div>
        </div>

        {!isCollapsed && (
          <div className="flex flex-col items-center text-center mt-3 w-full">
            <h3 className="font-bold text-sm text-foreground truncate max-w-[180px]">Alexandre</h3>
            <p className="text-[10px] text-textMuted font-medium uppercase tracking-wider mt-0.5 flex items-center gap-1">
              <GraduationCap className="h-3 w-3" /> {userProgress.title} (Lvl {userProgress.level})
            </p>
            
            {/* Level up XP indicators */}
            <div className="w-full mt-4 flex flex-col gap-1">
              <ProgressBar value={userProgress.currentXp} max={userProgress.maxXp} height="sm" variant="primary" />
              <div className="flex items-center justify-between text-[10px] text-textMuted font-medium">
                <span>{userProgress.currentXp} XP</span>
                <span>{userProgress.maxXp} XP</span>
              </div>
            </div>

            {/* Streak daily badge with pulse animations */}
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent-warning/10 border border-accent-warning/20 text-accent-warning select-none animate-pulse-glow shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
              <Flame className="h-4.5 w-4.5 text-accent-warning fill-accent-warning animate-flame-pulse" />
              <span className="text-xs font-bold font-display">{userProgress.streak} jours d'affilée</span>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="mt-3 flex flex-col items-center gap-2 select-none">
            <span className="text-xs font-black text-primary font-display">Lvl {userProgress.level}</span>
            <Flame className="h-5 w-5 text-accent-warning fill-accent-warning animate-flame-pulse" />
          </div>
        )}
      </div>

      {/* Sidebar navigation links */}
      <nav className="flex-1 p-4 flex flex-col gap-1.5">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3.5 px-4 py-3 text-xs font-medium text-textSecondary rounded-xl hover:text-foreground hover:bg-secondary/40 transition-all select-none duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] relative group",
                {
                  "text-foreground font-semibold bg-secondary/80 border-l-2 border-primary": isActive,
                }
              )}
            >
              <Icon className="h-4.5 w-4.5 group-hover:scale-105 transition-transform" />
              {!isCollapsed && <span>{link.label}</span>}
              {isCollapsed && (
                <div className="absolute left-20 hidden group-hover:block bg-[#101016] border border-border text-foreground px-3 py-1.5 rounded-lg text-[10px] whitespace-nowrap pointer-events-none shadow-xl z-50">
                  {link.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
