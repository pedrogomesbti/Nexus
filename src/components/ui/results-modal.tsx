"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  accentColor?: string;
  resultCount?: number;
  children: ReactNode;
}

export function ResultsModal({
  isOpen,
  onClose,
  title,
  subtitle,
  accentColor = "#3b82f6",
  resultCount,
  children,
}: ResultsModalProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  // Fecha ao pressionar ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-4xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:px-4"
          >
            <div
              className="overflow-hidden rounded-t-2xl shadow-2xl sm:rounded-2xl"
              style={{
                background: isDark ? "#1a1a1a" : "#ffffff",
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {/* ─── Header with gradient accent ─── */}
              <div
                className="relative overflow-hidden px-4 py-4 sm:px-6 sm:py-5"
                style={{
                  background: isDark
                    ? `linear-gradient(135deg, ${accentColor}18, transparent 60%)`
                    : `linear-gradient(135deg, ${accentColor}12, transparent 60%)`,
                }}
              >
                {/* Decorative accent line at top */}
                <div
                  className="absolute left-0 top-0 h-[3px] w-full"
                  style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}66, transparent)` }}
                />

                <div className="flex items-center justify-between">
                  {/* Left: Back button + Logo + Title */}
                  <div className="flex items-center gap-2.5 sm:gap-4">
                    {/* Voltar button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                        color: "var(--heading-color)",
                      }}
                      aria-label="Voltar"
                      title="Voltar à pesquisa"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </motion.button>

                    {/* Logo circle */}
                    <div
                      className="hidden h-10 w-10 items-center justify-center overflow-hidden rounded-full sm:flex"
                      style={{ background: "var(--heading-color)" }}
                    >
                      <Image
                        src={isDark ? "/iTracker_ID_logo_COR H.png" : "/iTracker_ID_logo_COR N V P.png"}
                        alt="Logo"
                        width={30}
                        height={30}
                        className="object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>

                    {/* Title + subtitle */}
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h2 className="text-[17px] font-semibold" style={{ color: "var(--heading-color)" }}>
                          {title}
                        </h2>
                        {resultCount !== undefined && resultCount > 0 && (
                          <span
                            className="inline-flex h-5 min-w-[22px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold tabular-nums text-white"
                            style={{ background: accentColor }}
                          >
                            {resultCount}
                          </span>
                        )}
                      </div>
                      {subtitle && (
                        <p className="mt-0.5 text-[12px]" style={{ color: "var(--text-secondary)" }}>
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Close button */}
                  <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:rotate-90"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                      color: "var(--text-secondary)",
                    }}
                    aria-label="Fechar"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* ─── Content ─── */}
              <div
                className="max-h-[60dvh] overflow-y-auto px-4 pb-4 pt-3 sm:max-h-[calc(85vh-100px)] sm:px-6 sm:pb-6 sm:pt-4"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: isDark ? "#333 transparent" : "#ddd transparent",
                }}
              >
                {children}
              </div>

              {/* ─── Footer ─── */}
              <div
                className="flex items-center justify-between px-4 py-3 sm:px-6"
                style={{
                  borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                  background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
                }}
              >
                <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                  NEXUS &middot; Consulta Operacional
                </span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-semibold transition-colors"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                    color: "var(--heading-color)",
                  }}
                >
                  <ArrowLeft className="h-3 w-3" />
                  Voltar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
