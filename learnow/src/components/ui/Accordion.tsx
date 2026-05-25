"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  className?: string;
  allowMultiple?: boolean;
}

export default function Accordion({
  items,
  className,
  allowMultiple = false,
}: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      if (openIndexes.includes(index)) {
        setOpenIndexes([]);
      } else {
        setOpenIndexes([index]);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div
            key={index}
            className="rounded-xl overflow-hidden glass border border-border/80 transition-colors hover:border-border-hover"
          >
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex items-center justify-between p-5 text-left font-medium text-sm text-foreground select-none outline-none focus:bg-secondary/40"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-textSecondary transition-transform duration-300",
                  {
                    "rotate-180 text-primary": isOpen,
                  }
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="px-5 pb-5 text-sm text-textSecondary border-t border-border/40 pt-4 leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
