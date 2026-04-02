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
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-[#999]">
                  Código
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-[#999]">
                  ID Integração
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-[#999]">
                  Nome
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-[#999]">
                  CNPJ/CPF
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-[#999]">
                  Tipo
                </th>
                <th className="px-5 py-3 text-right">
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
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(field);
      setTimeout(() => setCopied(null), 1500);
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
      className="group transition-colors duration-150 hover:bg-[#f9f9f6] dark:hover:bg-[#1a1a1a]"
      style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
    >
      <td className="whitespace-nowrap px-5 py-3.5">
        <span
          className="inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[12px] font-semibold"
          style={{ background: "rgba(0,0,0,0.04)", color: "#1a1a1a" }}
        >
          {person.codPessoa}
        </span>
      </td>
      <td className="whitespace-nowrap px-5 py-3.5">
        <span className="font-mono text-[12px] text-[#888]">
          {person.idIntegracao}
        </span>
      </td>
      <td className="px-5 py-3.5">
        <span className="text-[13px] font-medium text-[#1a1a1a] dark:text-[#e8e8e8]">
          {person.nome}
        </span>
      </td>
      <td className="whitespace-nowrap px-5 py-3.5">
        <span className="font-mono text-[12px] text-[#888]">
          {formatCnpjCpf(person.cnpjCpf)}
        </span>
      </td>
      <td className="whitespace-nowrap px-5 py-3.5">
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
          style={{
            background: person.tipo === "cliente" ? "#1a1a1a" : "rgba(0,0,0,0.06)",
            color: person.tipo === "cliente" ? "#fff" : "#666",
          }}
        >
          {person.tipo === "cliente" ? "Cliente" : "Fornecedor"}
        </span>
      </td>
      <td className="whitespace-nowrap px-5 py-3.5 text-right">
        <div className="flex items-center justify-end gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <CopyButton
            onClick={() => handleCopy(person.cnpjCpf, "cnpj")}
            copied={copied === "cnpj"}
            tooltip="Copiar CNPJ/CPF"
          />
          <CopyButton
            onClick={() => handleCopy(person.codPessoa, "cod")}
            copied={copied === "cod"}
            tooltip="Copiar Código"
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
