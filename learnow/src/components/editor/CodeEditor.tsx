"use client";

import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { cn } from "@/lib/cn";

export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  className?: string;
}

export default function CodeEditor({
  value,
  onChange,
  language = "javascript",
  className,
}: CodeEditorProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration discrepancies in Next.js Server Side Rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-[#101016] border border-border rounded-xl flex items-center justify-center text-xs text-textMuted select-none">
        Initialisation de l'éditeur de code...
      </div>
    );
  }

  // Choose dynamic language extension loader
  const getExtensions = () => {
    // In V1, standard extensions are loaded by CodeMirror automatically
    // or we can load them if needed. We return a clean extensions array.
    return [];
  };

  return (
    <div className={cn("w-full h-full overflow-hidden rounded-xl border border-border focus-within:border-primary/80 focus-within:shadow-[0_0_20px_0_rgba(99,91,255,0.25)] transition-all", className)}>
      <CodeMirror
        value={value}
        height="100%"
        theme={vscodeDark}
        onChange={onChange}
        extensions={getExtensions()}
        className="text-xs font-mono h-full"
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: false,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          highlightActiveLine: true,
        }}
      />
    </div>
  );
}
