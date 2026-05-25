"use client";

import React, { useState } from "react";
import { Sparkles, Send, Bot, User, HelpCircle, Code } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Bonjour Alexandre ! Je suis ton tuteur IA personnel. Je connais parfaitement tout le contenu de tes cours (React, Next.js, Python, SQL) et je peux t'aider à débloquer tes exercices de programmation ou t'expliquer des concepts complexes. Que veux-tu apprendre aujourd'hui ?",
      time: "À l'instant",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      sender: "user",
      text: inputVal,
      time: "À l'instant",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      let responseText = "C'est une excellente question ! Dans le cadre de ton cours actif sur React & Zustand, n'oublie pas que Zustand utilise des sélecteurs pour éviter les rendus inutiles. Tu peux écrire par exemple : `const streak = useProgressStore((state) => state.streak)` au lieu d'importer tout le store.";
      
      if (userMsg.text.toLowerCase().includes("next") || userMsg.text.toLowerCase().includes("server action")) {
        responseText = "Dans Next.js 14, les Server Actions te permettent d'exécuter du code serveur directement depuis des composants clients. Elles sont sécurisées et réduisent le besoin de routes d'API REST classiques. Utilise la directive `'use server';` en haut de ta fonction serveur !";
      } else if (userMsg.text.toLowerCase().includes("stripe")) {
        responseText = "Pour sécuriser Stripe, assure-toi de toujours valider la signature des événements reçus sur ta route d'API Webhook via `stripe.webhooks.constructEvent()`. Cela empêche les fausses requêtes d'activer des privilèges premium.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "bot",
          text: responseText,
          time: "À l'instant",
        },
      ]);
    }, 1500);
  };

  const suggestions = [
    "Explique-moi les Server Actions Next.js",
    "Comment optimiser Zustand ?",
    "Comment sécuriser un Webhook Stripe ?",
  ];

  return (
    <div className="flex flex-col gap-6 relative select-none text-left">
      
      {/* Title */}
      <div className="flex flex-col gap-1.5 md:mt-4">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-primary fill-primary animate-pulse-glow" /> Tuteur IA LearnNow
        </h1>
        <p className="text-xs sm:text-sm text-textSecondary">
          Posez des questions sur le cours, demandez des explications de code ou faites corriger vos bugs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Chat Area (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <Card variant="default" padding="none" className="flex flex-col h-[500px] overflow-hidden bg-gradient-to-b from-[#101016]/40 to-[#070709]/10">
            {/* Header */}
            <div className="p-4 border-b border-border/40 bg-[#101016]/40 flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">Assistant Personnel IA</span>
                <span className="text-[9px] text-accent-green font-bold">En ligne • Version Pro</span>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isBot ? "self-start" : "self-end flex-row-reverse"}`}>
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border ${
                      isBot 
                        ? "bg-primary/20 text-primary border-primary/20" 
                        : "bg-secondary text-foreground border-border"
                    }`}>
                      {isBot ? <Bot className="h-4.5 w-4.5" /> : <User className="h-4.5 w-4.5" />}
                    </div>

                    <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isBot 
                        ? "bg-secondary/40 text-textSecondary rounded-tl-none border border-border/40" 
                        : "bg-gradient-to-r from-primary to-[#8b5cf6] text-white rounded-tr-none shadow-[0_0_12px_rgba(99,91,255,0.15)]"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex gap-3 max-w-[80%] self-start">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border bg-primary/20 text-primary border-primary/20">
                    <Bot className="h-4.5 w-4.5" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-secondary/40 text-textMuted rounded-tl-none border border-border/40 text-xs flex items-center gap-1">
                    <span>L'IA réfléchit</span>
                    <span className="animate-bounce font-black">.</span>
                    <span className="animate-bounce delay-100 font-black">.</span>
                    <span className="animate-bounce delay-200 font-black">.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-4 border-t border-border/40 bg-[#101016]/40">
              <form onSubmit={handleSend} className="flex gap-3 items-end">
                <div className="flex-grow">
                  <Input
                    type="text"
                    placeholder="Posez votre question de code..."
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button type="submit" variant="primary" className="py-3 px-5 text-xs font-bold gap-1">
                  Envoyer <Send className="h-3.5 w-3.5" />
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Suggested Prompts (1 col) */}
        <div className="flex flex-col gap-6">
          <Card variant="default" padding="lg" className="flex flex-col">
            <h3 className="font-display font-bold text-sm text-foreground mb-4 flex items-center gap-2">
              <HelpCircle className="h-4.5 w-4.5 text-primary" /> Questions Fréquentes
            </h3>

            <div className="flex flex-col gap-2.5">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputVal(s)}
                  className="w-full text-left p-3 rounded-xl border border-border/60 bg-secondary/20 hover:bg-secondary/40 hover:border-border text-xs text-textSecondary hover:text-foreground font-semibold transition-all leading-tight"
                >
                  {s}
                </button>
              ))}
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
