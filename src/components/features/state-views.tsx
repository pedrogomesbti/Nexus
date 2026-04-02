"use client";

import { motion } from "framer-motion";
import { Database, AlertCircle, RotateCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function IdleState() {
  return null;
}

export function EmptyState({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center py-16"
    >
      <div className="eb-icon-circle mb-5">
        <Database className="h-5 w-5" />
      </div>
      <h3 className="font-serif text-[22px]" style={{ color: "var(--heading-color)" }}>
        Nenhum resultado
      </h3>
      <p className="mt-2 max-w-[360px] text-center text-[14px] leading-[1.6]" style={{ color: "var(--text-secondary)" }}>
        Sem registros para{" "}
        <span className="font-medium" style={{ color: "var(--heading-color)" }}>
          &ldquo;{query}&rdquo;
        </span>
        . Verifique o termo e tente novamente.
      </p>
    </motion.div>
  );
}

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-8 rounded-full" />
      </div>
      <div className="eb-card overflow-hidden">
        <div className="border-b px-5 py-3" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <div className="flex gap-12">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-12 border-b px-5 py-3.5 last:border-b-0"
            style={{ borderColor: "rgba(0,0,0,0.04)" }}
          >
            <Skeleton className="h-5 w-14 rounded-md" />
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-3.5 w-48" />
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-5 w-18 rounded-full" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center py-16"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "#fee2e2" }}>
        <AlertCircle className="h-5 w-5 text-red-500" />
      </div>
      <h3 className="font-serif mt-5 text-[22px]" style={{ color: "var(--heading-color)" }}>
        Erro ao consultar
      </h3>
      <p className="mt-2 max-w-[360px] text-center text-[14px] leading-[1.6]" style={{ color: "var(--text-secondary)" }}>
        Ocorreu um erro inesperado. Tente novamente.
      </p>
      <button
        onClick={onRetry}
        className="eb-btn-dark mt-5"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Tentar novamente
      </button>
    </motion.div>
  );
}
