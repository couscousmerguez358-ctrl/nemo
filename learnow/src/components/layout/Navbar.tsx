"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Menu, X, User, Settings, LogOut, Shield } from "lucide-react";
import Button from "../ui/Button";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  // Mock auth state (will be connected to Zustand / Supabase later)
  const [user, setUser] = useState({
    name: "Alex",
    avatar: "",
    isPremium: true,
    plan: "pro",
  });

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Parcours", href: "/courses" },
    { label: "Tarifs", href: "/pricing" },
    { label: "Communauté", href: "/community" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass h-20 flex items-center border-b border-border/60">
      <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group outline-none select-none">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-accent-cyan flex items-center justify-center font-display font-bold text-white shadow-[0_0_15px_rgba(99,91,255,0.4)] group-hover:scale-105 transition-transform duration-300">
            L
          </div>
          <span className="font-display font-bold text-lg tracking-tight group-hover:text-primary transition-colors duration-300">
            Learn<span className="text-primary">Now</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium text-textSecondary hover:text-foreground transition-colors duration-300 relative py-1",
                  {
                    "text-foreground font-semibold": isActive,
                  }
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary shadow-[0_0_8px_rgba(99,91,255,0.6)] animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section Tools */}
        <div className="hidden md:flex items-center gap-4">
          {/* Quick Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-textMuted" />
            <input
              type="text"
              placeholder="Rechercher un parcours..."
              className="bg-[#101016]/80 text-xs text-foreground placeholder:text-textMuted rounded-xl border border-border px-4 py-2.5 pl-10 w-48 focus:w-64 focus:border-primary/60 outline-none transition-all duration-300"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl bg-secondary border border-border/80 hover:bg-secondary-hover text-textSecondary hover:text-foreground transition-all duration-300 outline-none select-none">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent-danger shadow-[0_0_8px_rgba(255,77,109,0.8)] animate-pulse" />
          </button>

          {/* User Profile dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 group outline-none select-none"
              >
                <div className="h-9 w-9 rounded-xl border border-border overflow-hidden bg-gradient-to-tr from-primary/30 to-accent-cyan/30 flex items-center justify-center text-primary font-bold text-sm relative">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="object-cover w-full h-full" />
                  ) : (
                    <span>{user.name[0]}</span>
                  )}
                  {user.isPremium && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-accent-green border-2 border-secondary shadow-[0_0_6px_rgba(0,229,117,0.8)]" />
                  )}
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 glass-elevated rounded-2xl p-2 flex flex-col gap-1 z-50">
                  <div className="px-4 py-3 border-b border-border/40 select-none">
                    <p className="text-xs font-semibold text-textMuted uppercase tracking-wider">Compte</p>
                    <p className="text-sm font-bold text-foreground truncate mt-0.5">{user.name}</p>
                    {user.isPremium && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accent-green uppercase tracking-widest mt-1 bg-accent-green/10 px-2 py-0.5 rounded border border-accent-green/20">
                        <Shield className="h-2.5 w-2.5" /> Premium {user.plan.toUpperCase()}
                      </span>
                    )}
                  </div>
                  
                  <Link
                    href="/dashboard"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-textSecondary hover:text-foreground hover:bg-secondary-hover rounded-xl transition-all"
                  >
                    <User className="h-4 w-4" /> Mon Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-textSecondary hover:text-foreground hover:bg-secondary-hover rounded-xl transition-all"
                  >
                    <Settings className="h-4 w-4" /> Paramètres
                  </Link>
                  
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      // handle logout
                    }}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-accent-danger hover:bg-accent-danger/10 rounded-xl transition-all border-t border-border/40 mt-1"
                  >
                    <LogOut className="h-4 w-4" /> Se déconnecter
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Connexion</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">S'inscrire</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-textSecondary hover:text-foreground outline-none select-none"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-[#070709] border-b border-border/80 p-6 flex flex-col gap-6 md:hidden z-50">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium text-textSecondary hover:text-foreground py-2 border-b border-border/30",
                    {
                      "text-foreground font-semibold border-primary/50": isActive,
                    }
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex flex-col gap-3">
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="secondary" size="md" className="w-full">Connexion</Button>
            </Link>
            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">S'inscrire</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
