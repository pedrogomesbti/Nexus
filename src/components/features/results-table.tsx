"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { formatCnpjCpf } from "@/lib/utils";
import { Person } from "@/types";

interface ResultsTableProps {
  data: Person[];
  resultCount: number;
}

export function ResultsTable({ data, resultCount }: ResultsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      {/* Results count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-[#888]">Resultados</span>
          <span
            className="inline-flex h-5 min-w-[22px] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold tabular-nums"
            style={{ background: "#1a1a1a", color: "#fff" }}
          >
            {resultCount}
          </span>
        </div>
        <span className="text-[11px] text-[#bbb]">
          {resultCount} registro{resultCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="eb-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-[#999] sm:px-5 sm:py-3 sm:text-[11px]">
                  Código
                </th>
                <th className="hidden px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-[#999] sm:table-cell sm:px-5 sm:py-3 sm:text-[11px]">
                  ID Integração
                </th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-[#999] sm:px-5 sm:py-3 sm:text-[11px]">
                  Nome
                </th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-[#999] sm:px-5 sm:py-3 sm:text-[11px]">
                  CNPJ/CPF
                </th>
                <th className="hidden px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-[#999] sm:table-cell sm:px-5 sm:py-3 sm:text-[11px]">
                  Tipo
                </th>
                <th className="hidden px-3 py-2.5 text-right sm:table-cell sm:px-5 sm:py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {data.map((person, index) => (
                  <TableRow
                    key={`${person.codPessoa}-${person.tipo}-${index}`}
                    person={person}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function TableRow({ person, index }: { person: Person; index: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(person.cnpjCpf);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API may not be available
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group transition-colors duration-150 hover:bg-[#f0f0ee] dark:hover:bg-[#2a2a2a]"
      style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
    >
      <td className="whitespace-nowrap px-3 py-2.5 sm:px-5 sm:py-3.5">
        <span
          className="inline-flex items-center rounded-md px-1.5 py-0.5 font-mono text-[11px] font-semibold sm:px-2 sm:text-[12px]"
          style={{ background: "rgba(0,0,0,0.04)", color: "#1a1a1a" }}
        >
          {person.codPessoa}
        </span>
      </td>
      <td className="hidden whitespace-nowrap px-3 py-2.5 sm:table-cell sm:px-5 sm:py-3.5">
        <span className="font-mono text-[12px]" style={{ color: "var(--heading-color)" }}>
          {person.idIntegracao}
        </span>
      </td>
      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5">
        <span className="text-[12px] font-semibold sm:text-[13px]" style={{ color: "var(--heading-color)" }}>
          {person.nome}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-2.5 sm:px-5 sm:py-3.5">
        <span className="font-mono text-[11px] sm:text-[12px]" style={{ color: "var(--heading-color)", opacity: 0.7 }}>
          {formatCnpjCpf(person.cnpjCpf)}
        </span>
      </td>
      <td className="hidden whitespace-nowrap px-3 py-2.5 sm:table-cell sm:px-5 sm:py-3.5">
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
          style={{
            background: person.tipo === "cliente" ? "#3b82f6" : "#f97316",
            color: "#fff",
          }}
        >
          {person.tipo === "cliente" ? "Cliente" : "Fornecedor"}
        </span>
      </td>
      <td className="hidden whitespace-nowrap px-3 py-2.5 text-right sm:table-cell sm:px-5 sm:py-3.5">
        <div className="flex items-center justify-end opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <CopyButton
            onClick={handleCopy}
            copied={copied}
            tooltip="Copiar CNPJ/CPF"
          />
        </div>
      </td>
    </motion.tr>
  );
}

function CopyButton({
  onClick,
  copied,
  tooltip,
}: {
  onClick: () => void;
  copied: boolean;
  tooltip: string;
}) {
  return (
    <button
      onClick={onClick}
      className="focus-ring relative flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200"
      style={{ color: copied ? "#16a34a" : "#ccc" }}
      aria-label={tooltip}
      title={tooltip}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className="h-3.5 w-3.5" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Copy className="h-3.5 w-3.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
