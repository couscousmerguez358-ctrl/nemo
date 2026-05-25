"use client";

import React, { useState } from "react";
import { Users, Flame, MessageSquare, Award, ArrowUp, Send, Check } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";

export default function Community() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "Marie (Pro)",
      avatarColor: "from-primary to-accent-cyan",
      content: "Quelqu'un a réussi à charger Pyodide en moins de 500ms ? J'optimise mon Service Worker mais j'aimerais comparer !",
      time: "Il y a 10 min",
      replies: 4,
      upvotes: 12,
      upvoted: false,
    },
    {
      id: 2,
      author: "Thomas",
      avatarColor: "from-accent-cyan to-accent-green",
      content: "Je viens de valider le défi SQL avec Zustand ! La persistance IndexedDB (Dexie) fonctionne de manière incroyable.",
      time: "Il y a 45 min",
      replies: 2,
      upvotes: 8,
      upvoted: true,
    },
    {
      id: 3,
      author: "Julie (Pro)",
      avatarColor: "from-accent-warning to-[#8b5cf6]",
      content: "Une astuce pour retenir les patterns RLS complexes de Supabase ? J'avoue que la syntaxe des jointures me perd un peu...",
      time: "Il y a 2h",
      replies: 7,
      upvotes: 19,
      upvoted: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([
      {
        id: messages.length + 1,
        author: "Alexandre (Vous)",
        avatarColor: "from-primary to-[#8b5cf6]",
        content: newMessage,
        time: "À l'instant",
        replies: 0,
        upvotes: 0,
        upvoted: false,
      },
      ...messages,
    ]);
    setNewMessage("");
  };

  const handleUpvote = (id: number) => {
    setMessages(
      messages.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            upvotes: m.upvoted ? m.upvotes - 1 : m.upvotes + 1,
            upvoted: !m.upvoted,
          };
        }
        return m;
      })
    );
  };

  const leaderboard = [
    { rank: 1, name: "Marie (Pro)", xp: "2 450 XP", streak: "12 j", isCurrentUser: false },
    { rank: 2, name: "Alexandre (Vous)", xp: "1 850 XP", streak: "5 j", isCurrentUser: true },
    { rank: 3, name: "Thomas", xp: "1 500 XP", streak: "8 j", isCurrentUser: false },
    { rank: 4, name: "Julie (Pro)", xp: "1 420 XP", streak: "15 j", isCurrentUser: false },
  ];

  return (
    <div className="flex flex-col gap-6 relative select-none text-left">
      
      {/* Title */}
      <div className="flex flex-col gap-1.5 md:mt-4">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground flex items-center gap-2">
          <Users className="h-7 w-7 text-primary" /> Communauté de Codeurs
        </h1>
        <p className="text-xs sm:text-sm text-textSecondary">
          Partagez vos astuces de code, posez des questions et défiez les meilleurs élèves de la plateforme.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Forum Board (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <Card variant="default" padding="lg" className="flex flex-col">
            <h3 className="font-display font-bold text-sm text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="h-4.5 w-4.5 text-primary" /> Lancer une discussion
            </h3>
            
            <form onSubmit={handlePostMessage} className="flex gap-3 items-end">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Partagez un défi ou posez une question aux autres développeurs..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" variant="primary" className="py-3 px-4.5">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </Card>

          {/* Discussions feed */}
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <Card key={msg.id} variant="default" padding="md" className="flex flex-col">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg bg-gradient-to-tr ${msg.avatarColor} flex items-center justify-center font-bold text-white text-xs`}>
                    {msg.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">{msg.author}</span>
                    <span className="text-[9px] text-textMuted">{msg.time}</span>
                  </div>
                </div>

                <p className="text-xs text-textSecondary mt-3.5 leading-relaxed">
                  {msg.content}
                </p>

                <div className="flex items-center justify-between border-t border-border/40 pt-3 mt-4 text-[10px] text-textMuted font-bold">
                  <button
                    onClick={() => handleUpvote(msg.id)}
                    className={`flex items-center gap-1 hover:text-foreground transition-colors ${
                      msg.upvoted ? "text-primary hover:text-primary-hover" : ""
                    }`}
                  >
                    <ArrowUp className="h-3.5 w-3.5" /> Upvote ({msg.upvotes})
                  </button>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                    <MessageSquare className="h-3.5 w-3.5" /> Répondre ({msg.replies})
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard Panel (1 col) */}
        <div className="flex flex-col gap-6">
          <Card variant="default" padding="lg" className="flex flex-col">
            <h3 className="font-display font-bold text-sm text-foreground mb-4 flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-accent-warning" /> Classement Semestriel
            </h3>

            <div className="flex flex-col gap-3.5">
              {leaderboard.map((item) => (
                <div
                  key={item.rank}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    item.isCurrentUser
                      ? "bg-primary-glow border-primary/45 shadow-[0_0_12px_rgba(99,91,255,0.15)]"
                      : "bg-secondary/40 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-black w-4 text-center ${
                      item.rank === 1 ? "text-accent-warning" : item.rank === 2 ? "text-primary" : "text-textMuted"
                    }`}>
                      #{item.rank}
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-foreground leading-tight">{item.name}</span>
                      <span className="text-[9px] text-textMuted mt-0.5 flex items-center gap-1">
                        <Flame className="h-3 w-3 text-accent-warning fill-accent-warning" /> Série: {item.streak}
                      </span>
                    </div>
                  </div>

                  <span className="font-display font-black text-xs text-foreground shrink-0">{item.xp}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
