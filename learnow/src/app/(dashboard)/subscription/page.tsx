"use client";

import React, { useState } from "react";
import { CreditCard, Calendar, ShieldCheck, AlertTriangle, Download, ChevronRight, Check, X } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function Subscription() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelStep, setCancelStep] = useState(1);
  const [cancelReason, setCancelReason] = useState("");
  const [isPremiumActive, setIsPremiumActive] = useState(true);

  // Mock subscription state
  const sub = {
    plan: "pro",
    status: "active",
    amount: "9,99€",
    billingCycle: "mensuel",
    nextBillingDate: "25 juin 2026",
    cardBrand: "Visa",
    cardLast4: "4242",
  };

  const invoices = [
    { date: "25 mai 2026", amount: "9,99€", status: "Payé", pdf: "#" },
    { date: "25 avril 2026", amount: "9,99€", status: "Payé", pdf: "#" },
    { date: "25 mars 2026", amount: "9,99€", status: "Payé", pdf: "#" },
  ];

  const handleCancelSubscription = () => {
    setIsPremiumActive(false);
    setShowCancelModal(false);
    alert("Votre abonnement a été annulé avec succès. Vous conservez votre accès premium jusqu'au 25 juin 2026. 🥺");
  };

  return (
    <div className="flex flex-col gap-6 relative select-none">
      
      {/* Header */}
      <div className="flex flex-col text-left">
        <h1 className="font-display font-extrabold text-2xl text-foreground">
          Gestion de l'abonnement
        </h1>
        <p className="text-xs text-textSecondary mt-1">
          Gérez votre forfait de facturation, mettez à jour votre carte de crédit et téléchargez vos factures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Plan details (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Active Plan Detail Card */}
          <Card variant="elevated" padding="lg" className="flex flex-col text-left bg-gradient-to-br from-secondary/80 to-[#101016]/40 border-primary/25 relative overflow-hidden">
            <div className="absolute top-[-50%] left-[-20%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-textMuted font-bold uppercase tracking-wider">Abonnement Actuel</span>
                <div className="flex items-center gap-2 mt-2">
                  <h2 className="font-display font-extrabold text-xl text-foreground">LearnNow {sub.plan.toUpperCase()}</h2>
                  {isPremiumActive ? (
                    <Badge variant="green" outline className="text-[9px] font-black uppercase py-0 px-2 border-accent-green/30">Actif</Badge>
                  ) : (
                    <Badge variant="danger" outline className="text-[9px] font-black uppercase py-0 px-2 border-accent-danger/30">Annulé</Badge>
                  )}
                </div>
                <p className="text-xs text-textSecondary mt-2">
                  Prochaine facturation le <span className="text-foreground font-semibold">{sub.nextBillingDate}</span> pour un montant de <span className="text-foreground font-bold">{sub.amount}</span>.
                </p>
              </div>

              {/* Action buttons */}
              {isPremiumActive ? (
                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <Button
                    variant="secondary"
                    onClick={() => (window.location.href = "/pricing")}
                    className="py-2.5 px-4 text-xs font-bold"
                  >
                    Changer de plan
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setCancelStep(1);
                      setShowCancelModal(true);
                    }}
                    className="py-2.5 px-4 text-xs text-accent-danger hover:bg-accent-danger/10"
                  >
                    Annuler l'abonnement
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => (window.location.href = "/pricing")}
                  className="py-2.5 px-6 text-xs font-bold"
                >
                  Réactiver le forfait Premium
                </Button>
              )}
            </div>
          </Card>

          {/* Invoice History widget */}
          <Card variant="default" padding="lg" className="flex flex-col text-left">
            <h3 className="font-display font-bold text-sm text-foreground mb-4">
              Historique des factures
            </h3>

            <div className="rounded-xl overflow-hidden border border-border/80 text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary/40 border-b border-border/80">
                    <th className="p-4 font-bold text-textSecondary">Date</th>
                    <th className="p-4 font-bold text-textSecondary text-center">Montant</th>
                    <th className="p-4 font-bold text-textSecondary text-center">Statut</th>
                    <th className="p-4 font-bold text-textSecondary text-right">Télécharger</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-textSecondary">
                  {invoices.map((inv, idx) => (
                    <tr key={idx} className="hover:bg-secondary/20 transition-colors">
                      <td className="p-4 font-medium text-foreground">{inv.date}</td>
                      <td className="p-4 text-center font-bold">{inv.amount}</td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[10px] text-accent-green font-bold bg-accent-green/5 px-2 py-0.5 rounded border border-accent-green/10">
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <a href={inv.pdf} className="inline-flex items-center gap-1.5 text-primary hover:text-primary-hover font-semibold transition-colors outline-none">
                          <Download className="h-3.5 w-3.5" /> PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>

        {/* Right Column: Payment Cards methods brief (1 col) */}
        <div className="flex flex-col gap-6">
          <Card variant="default" padding="lg" className="flex flex-col text-left">
            <h3 className="font-display font-bold text-sm text-foreground mb-4">
              Moyen de paiement
            </h3>

            <div className="p-4 rounded-xl border border-border/80 bg-[#101016] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                  <CreditCard className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">{sub.cardBrand} •••• {sub.cardLast4}</span>
                  <span className="text-[10px] text-textMuted mt-0.5">Expire le 12/28</span>
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              className="w-full mt-4 text-xs font-semibold py-3 border border-border/80"
            >
              Mettre à jour la carte
            </Button>
          </Card>

          <span className="text-[10px] text-textMuted text-center block">
            🔒 Sécurité PCI DSS assurée. Les transactions de LearnNow sont entièrement gérées sur les serveurs de Stripe.
          </span>
        </div>

      </div>

      {/* 2-Step Retention Cancellation Modal Flow */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <Card variant="elevated" padding="lg" className="max-w-md w-full bg-[#101016] border border-accent-danger/20 text-center relative overflow-hidden glow-purple">
            <div className="absolute top-[-50%] left-[-20%] w-[300px] h-[300px] bg-accent-danger/5 rounded-full blur-[100px] pointer-events-none" />
            
            {/* STEP 1: Retention Warning */}
            {cancelStep === 1 && (
              <div className="flex flex-col items-center text-center">
                <AlertTriangle className="h-11 w-11 text-accent-danger mb-4 animate-bounce" />
                <h3 className="font-display font-extrabold text-xl text-foreground">
                  Êtes-vous sûr(e) de vouloir partir ? 🥺
                </h3>
                <p className="text-xs text-textSecondary mt-2 leading-relaxed">
                  Si vous annulez, vous perdrez instantanément l'accès aux avantages exclusifs suivants de votre forfait :
                </p>

                <div className="w-full rounded-xl bg-accent-danger/5 border border-accent-danger/10 p-4 text-left my-6 flex flex-col gap-2 text-[11px] text-textSecondary select-none">
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-accent-danger shrink-0" />
                    <span>L'intégralité des parcours (18+ technos)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-accent-danger shrink-0" />
                    <span>Les compilations WebAssembly illimitées</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-accent-danger shrink-0" />
                    <span>Les certifications professionnelles de compétences</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-accent-danger shrink-0" />
                    <span>L'assistant IA pédagogique de correction</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full">
                  <Button
                    variant="primary"
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 py-3 text-xs"
                  >
                    Garder mon abonnement
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setCancelStep(2)}
                    className="flex-1 py-3 text-xs text-textMuted hover:text-accent-danger"
                  >
                    Continuer
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Optional cancellation reason survey */}
            {cancelStep === 2 && (
              <div className="flex flex-col items-center text-center">
                <h3 className="font-display font-extrabold text-xl text-foreground">
                  Aidez-nous à nous améliorer ! 🛠️
                </h3>
                <p className="text-xs text-textSecondary mt-2">
                  Pourquoi souhaitez-vous mettre fin à votre aventure premium ?
                </p>

                <div className="w-full flex flex-col gap-3 mt-6">
                  {[
                    "C'est trop cher pour mon budget",
                    "Je n'ai plus le temps de pratiquer",
                    "Je trouve l'interface trop complexe",
                    "Autre raison"
                  ].map((reason) => {
                    const isSelected = cancelReason === reason;
                    return (
                      <button
                        key={reason}
                        onClick={() => setCancelReason(reason)}
                        className={cn(
                          "w-full text-left px-5 py-4 rounded-xl border transition-all text-xs font-semibold flex items-center justify-between",
                          {
                            "bg-accent-danger/10 border-accent-danger/40 text-foreground": isSelected,
                            "bg-secondary border-border/80 text-textSecondary hover:border-border-hover hover:text-foreground": !isSelected,
                          }
                        )}
                      >
                        <span>{reason}</span>
                        {isSelected && <Check className="h-4 w-4 text-accent-danger" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-4 w-full border-t border-border/40 pt-6 mt-8">
                  <Button
                    variant="secondary"
                    onClick={() => setCancelStep(1)}
                    className="flex-1 py-3 text-xs"
                  >
                    Précédent
                  </Button>
                  <Button
                    variant="primary"
                    disabled={!cancelReason}
                    onClick={handleCancelSubscription}
                    className="flex-1 py-3 text-xs bg-accent-danger text-white hover:bg-accent-danger/80"
                  >
                    Confirmer l'annulation
                  </Button>
                </div>
              </div>
            )}

          </Card>
        </div>
      )}

    </div>
  );
}
