"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, ArrowLeft, CreditCard, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "pro";
  const billing = searchParams.get("billing") || "monthly";

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const planTitle = plan.toUpperCase();
  const price = plan === "pro" 
    ? (billing === "annual" ? "7,99€" : "9,99€") 
    : (billing === "annual" ? "17,99€" : "22,00€");
  
  const totalAmount = plan === "pro"
    ? (billing === "annual" ? "95,88€" : "9,99€")
    : (billing === "annual" ? "215,88€" : "22,00€");

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCvc) {
      setError("Veuillez remplir toutes les informations bancaires.");
      return;
    }
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Stripe Card confirmation will hook here
      window.location.href = "/checkout/success";
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <main className="relative flex flex-col pt-28 pb-20 bg-background text-foreground min-h-screen">
        <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start select-none">
          
          {/* Back button */}
          <div className="lg:col-span-12 flex justify-start -mb-4">
            <Link href="/pricing" className="text-xs text-textSecondary hover:text-foreground transition-colors flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <ArrowLeft className="h-4 w-4" /> Retour aux abonnements
            </Link>
          </div>

          {/* Left Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card variant="elevated" padding="lg" className="flex flex-col text-left bg-gradient-to-br from-secondary/80 to-[#101016]/40">
              <h2 className="font-display font-extrabold text-lg text-foreground border-b border-border/40 pb-4">
                Résumé de la commande
              </h2>
              
              <div className="flex flex-col gap-5 mt-5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-foreground">Abonnement LearnNow {planTitle}</span>
                    <span className="text-[10px] text-textMuted uppercase font-bold tracking-wider mt-0.5">
                      Facturation {billing === "annual" ? "Annuelle" : "Mensuelle"}
                    </span>
                  </div>
                  <span className="font-display font-bold text-sm text-foreground">{price}/{billing === "annual" ? "m" : "mois"}</span>
                </div>

                {billing === "annual" && (
                  <Badge variant="cyan" outline className="text-[9px] font-black w-fit border-accent-cyan/30 py-0.5">
                    ✨ Vous économisez ~24€/an
                  </Badge>
                )}

                <div className="h-px bg-border/40 w-full my-1" />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-textSecondary font-semibold">Sous-total</span>
                  <span className="text-foreground font-semibold">{totalAmount}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-textSecondary font-semibold">TVA (0%)</span>
                  <span className="text-foreground font-semibold">0,00€</span>
                </div>

                <div className="h-px bg-border/40 w-full my-1" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">Total à payer</span>
                  <span className="font-display font-black text-xl text-primary drop-shadow-[0_0_12px_rgba(99,91,255,0.3)]">{totalAmount}</span>
                </div>
              </div>
            </Card>

            <span className="text-[10px] text-textMuted text-center block">
              💳 Facturé par Stripe. TVA applicable incluse. En validant, vous acceptez nos CGU.
            </span>
          </div>

          {/* Right Column: Stripe Payment Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Card variant="default" padding="lg" className="flex flex-col text-left">
              <h3 className="font-display font-bold text-base text-foreground flex items-center gap-2 mb-6">
                <CreditCard className="h-4.5 w-4.5 text-primary" /> Informations de paiement
              </h3>

              <form onSubmit={handlePay} className="flex flex-col gap-4">
                <Input
                  type="text"
                  label="Nom sur la carte"
                  placeholder="Alexandre Dev"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  error={error && !cardName ? error : undefined}
                />

                <Input
                  type="text"
                  label="Numéro de carte"
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  error={error && !cardNumber ? error : undefined}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    label="Date d'expiration"
                    placeholder="MM/AA"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    error={error && !cardExpiry ? error : undefined}
                  />
                  <Input
                    type="text"
                    label="CVC"
                    placeholder="123"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    error={error && !cardCvc ? error : undefined}
                  />
                </div>

                {error && cardName && cardNumber && cardExpiry && cardCvc && (
                  <div className="flex items-start gap-2 text-accent-danger bg-accent-danger/5 border border-accent-danger/10 px-4 py-3 rounded-xl mt-2 select-none">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold">{error}</span>
                  </div>
                )}

                {/* Secure checkout badge */}
                <div className="mt-4 flex items-center justify-between text-xs text-textMuted select-none">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-accent-green" /> Paiement chiffré SSL
                  </span>
                  <span>🔒 Sécurisé par Stripe</span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="w-full mt-6 py-4 text-xs font-bold gap-2"
                >
                  <Sparkles className="h-4 w-4 fill-white" /> Confirmer le paiement & Débloquer {planTitle}
                </Button>
              </form>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

export default function Checkout() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center select-none">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider text-textSecondary">Chargement du paiement...</span>
        </div>
      </div>
    }>
      <CheckoutContent />
    </React.Suspense>
  );
}
