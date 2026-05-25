import React from "react";
import { Terminal, ShieldAlert, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface OutputConsoleProps {
  output: string;
  error: string | null;
  isLoading?: boolean;
}

export default function OutputConsole({
  output,
  error,
  isLoading = false,
}: OutputConsoleProps) {
  return (
    <div className="w-full h-full flex flex-col bg-[#070709] border border-border rounded-xl overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
      {/* Console Header */}
      <div className="px-4 py-3 bg-[#101016]/40 border-b border-border/80 flex items-center justify-between select-none">
        <span className="text-[10px] font-bold text-textSecondary uppercase tracking-widest flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5" /> Console de sortie
        </span>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-[9px] font-black text-textMuted uppercase tracking-wider">online</span>
        </div>
      </div>

      {/* Terminal Area */}
      <div className="flex-1 p-5 font-mono text-xs overflow-y-auto min-h-[140px] leading-relaxed">
        {isLoading && (
          <div className="h-full flex items-center justify-center text-textMuted select-none gap-2">
            <svg
              className="animate-spin h-4 w-4 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Exécution du script dans la sandbox...
          </div>
        )}

        {!isLoading && !error && !output && (
          <span className="text-textMuted select-none">// Le résultat de votre code s'affichera ici.</span>
        )}

        {!isLoading && error && (
          <div className="flex items-start gap-2 text-accent-danger bg-accent-danger/5 border border-accent-danger/10 px-4 py-3 rounded-xl">
            <ShieldAlert className="h-4.5 w-4.5 shrink-0 mt-0.5 animate-pulse" />
            <div className="flex flex-col">
              <span className="font-bold text-xs">Erreur de compilation :</span>
              <span className="mt-1 text-[11px] whitespace-pre-wrap">{error}</span>
            </div>
          </div>
        )}

        {!isLoading && !error && output && (
          <div className="flex items-start gap-2 text-accent-green bg-accent-green/5 border border-accent-green/10 px-4 py-3 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
            <Check className="h-4.5 w-4.5 shrink-0 mt-0.5" />
            <div className="flex flex-col w-full">
              <span className="font-bold text-xs select-none">Exécution réussie :</span>
              <span className="mt-1 text-[11px] text-foreground font-mono whitespace-pre-wrap">{output}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
