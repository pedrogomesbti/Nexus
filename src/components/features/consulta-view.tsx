"use client";

import { useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Truck, Search as SearchIcon } from "lucide-react";
import { SearchBar } from "@/components/features/search-bar";
import { ResultsTable } from "@/components/features/results-table";
import {
  IdleState,
  EmptyState,
  LoadingState,
  ErrorState,
} from "@/components/features/state-views";
import { fetchPersons } from "@/services/consulta";
import { Person, PersonType, ViewState } from "@/types";

export function ConsultaView() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<PersonType>("cliente");
  const [viewState, setViewState] = useState<ViewState>("idle");
  const [results, setResults] = useState<Person[]>([]);
  const [lastQuery, setLastQuery] = useState("");

  const handleSearch = useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setViewState("loading");
    setLastQuery(trimmed);

    try {
      const data = await fetchPersons(trimmed, selectedType);
      setResults(data);
      setViewState(data.length > 0 ? "success" : "empty");
    } catch {
      setViewState("error");
    }
  }, [query, selectedType]);

  const handleClear = useCallback(() => {
    setQuery("");
    setResults([]);
    setViewState("idle");
    setLastQuery("");
  }, []);

  const handleTypeChange = useCallback(
    (type: PersonType) => {
      setSelectedType(type);
      if (results.length > 0 || viewState === "empty") {
        setResults([]);
        setViewState("idle");
      }
    },
    [results.length, viewState]
  );

  return (
    <div className="flex flex-col items-center">
      {/* ─── Hero Section (exact EarlyBird layout) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center pt-8 pb-6 px-6 text-center"
      >
        {/* Company logo — COR N V P (white text) for light mode, COR H (dark text) for dark mode */}
        <div className="mb-5 flex items-center justify-center overflow-hidden rounded-full" style={{ width: 70, height: 70, background: "var(--heading-color)" }}>
          <Image
            src={isDark ? "/iTracker_ID_logo_COR H.png" : "/iTracker_ID_logo_COR N V P.png"}
            alt="iTracker Logo"
            width={52}
            height={52}
            className="object-contain"
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        {/* Status badge — pulsing green dot */}
        <div className="mb-5 inline-flex items-center gap-2.5">
          <div className="pulse-dot h-[7px] w-[7px] rounded-full bg-emerald-500" />
          <span className="text-[13px] font-medium text-[#555] dark:text-[#999]">
            Sistema ativo
          </span>
        </div>

        {/* Main heading — Playfair Display, professional */}
        <h1
          className="font-heading text-[42px] font-semibold leading-[1.15] sm:text-[52px]"
          style={{ color: "var(--heading-color)" }}
        >
          ITracker Nexus<br />
         
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-[480px] text-[15px] leading-[1.7] text-[#555] dark:text-[#999]">
          Pesquise por nome, CNPJ/CPF ou código e acesse
          os registros de forma rápida e organizada.
        </p>
      </motion.div>

      {/* ─── Search Bar (exact EarlyBird email input card) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[520px] px-6"
      >
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
          onSearch={handleSearch}
          onClear={handleClear}
          isLoading={viewState === "loading"}
        />
      </motion.div>

      {/* ─── Feature Cards (exact EarlyBird 3-column) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 grid w-full max-w-[780px] grid-cols-1 gap-5 px-6 sm:grid-cols-3"
      >
        <FeatureCard
          icon={<Users className="h-5 w-5" />}
          title="Clientes"
          description="Consulte dados cadastrais de clientes"
        />
        <FeatureCard
          icon={<Truck className="h-5 w-5" />}
          title="Fornecedores"
          description="Acesse registros de fornecedores"
        />
        <FeatureCard
          icon={<SearchIcon className="h-5 w-5" />}
          title="Busca Rápida"
          description="Pesquisa por nome, CPF ou código"
        />
      </motion.div>

      {/* ─── Results Area ─── */}
      <div className="w-full max-w-5xl px-6 mt-12">
        {viewState === "idle" && <IdleState />}
        {viewState === "loading" && <LoadingState />}
        {viewState === "empty" && <EmptyState query={lastQuery} />}
        {viewState === "error" && <ErrorState onRetry={handleSearch} />}
        {viewState === "success" && (
          <ResultsTable data={results} resultCount={results.length} />
        )}
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="eb-feature-card flex flex-col items-center text-center">
      <div className="eb-icon-circle mb-4">
        {icon}
      </div>
      <h3 className="text-[14px] font-semibold" style={{ color: "var(--heading-color)" }}>
        {title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-[1.5]" style={{ color: "var(--text-secondary)" }}>
        {description}
      </p>
    </div>
  );
}
