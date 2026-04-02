"use client";

import { motion } from "framer-motion";
import { Hexagon } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full pt-6 pb-2"
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-text dark:bg-text-dark">
            <Hexagon className="h-4 w-4 text-white dark:text-bg-dark" strokeWidth={2.5} />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[14px] font-semibold tracking-tight text-text dark:text-text-dark">
              ITRACKER
            </span>
            <span className="hidden text-[13px] text-text-secondary sm:block">
              Consulta Operacional
            </span>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
