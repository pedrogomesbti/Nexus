"use client";

import { useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Truck, Search as SearchIcon } from "lucide-react";
import { SearchBar } from "@/components/features/search-bar";
import { ResultsTable } from "@/components/features/results-table";
import { ResultsModal } from "@/components/ui/results-modal";
import {
  EmptyState,
  ErrorState,
} from "@/components/features/state-views";
import { TruckLoader } from "@/components/ui/truck-loader";
import { fetchAllPersons, SearchAllResult } from "@/services/consulta";
import { Person, PersonType, ViewState } from "@/types";

export function ConsultaView() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<PersonType>("cliente");
  const [viewState, setViewState] = useState<ViewState>("idle");
  const [allResults, setAllResults] = useState<SearchAllResult>({ clientes: [], fornecedores: [] });
  const [lastQuery, setLastQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<PersonType>("cliente");

  const handleSearch = useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setViewState("loading");
    setLastQuery(trimmed);
    setModalTab(selectedType);
    setIsModalOpen(true);

    try {
      const data = await fetchAllPersons(trimmed);
      setAllResults(data);
      const hasClientes = data.clientes.length > 0;
      const hasFornecedores = data.fornecedores.length > 0;
      if (hasClientes || hasFornecedores) {
        setViewState("success");
        // Se o tipo selecionado não tem resultados, muda pra aba que tem
        if (selectedType === "cliente" && !hasClientes && hasFornecedores) {
          setModalTab("fornecedor");
        } else if (selectedType === "fornecedor" && !hasFornecedores && hasClientes) {
          setModalTab("cliente");
        }
      } else {
        setViewState("empty");
      }
    } catch {
      setViewState("error");
    }
  }, [query, selectedType]);

  const handleClear = useCallback(() => {
    setQuery("");
    setAllResults({ clientes: [], fornecedores: [] });
    setViewState("idle");
    setLastQuery("");
    setIsModalOpen(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleTypeChange = useCallback(
    (type: PersonType) => {
      setSelectedType(type);
    },
    []
  );

  // Dados ativos na aba do modal
  const activeResults: Person[] = modalTab === "cliente" ? allResults.clientes : allResults.fornecedores;
  const hasClientes = allResults.clientes.length > 0;
  const hasFornecedores = allResults.fornecedores.length > 0;
  const hasBothTypes = hasClientes && hasFornecedores;

  // Cor do accent muda conforme aba do modal
  const modalAccent = modalTab === "cliente" ? "#3b82f6" : "#f97316";

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6">
      {/* ─── Hero Section ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center pb-3 text-center sm:pb-4"
      >
        {/* Company logo */}
        <div className="mb-2 flex items-center justify-center overflow-hidden rounded-full sm:mb-3" style={{ width: "clamp(48px, 6vw, 60px)", height: "clamp(48px, 6vw, 60px)", background: "var(--heading-color)" }}>
          <Image
            src={isDark ? "/iTracker_ID_logo_COR H.png" : "/iTracker_ID_logo_COR N V P.png"}
            alt="Logo"
            width={44}
            height={44}
            className="object-contain"
            style={{ width: "clamp(32px, 5vw, 44px)", height: "auto" }}
          />
        </div>

        {/* Status badge — pulsing green dot */}
        <div className="mb-2 inline-flex items-center gap-2 sm:mb-3">
          <div className="pulse-dot h-[6px] w-[6px] rounded-full bg-emerald-500 sm:h-[7px] sm:w-[7px]" />
          <span className="text-[12px] font-medium text-[#555] dark:text-[#999] sm:text-[13px]">
            Sistema ativo
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="font-heading text-[28px] font-semibold leading-[1.1] sm:text-[34px] md:text-[38px] lg:text-[42px]"
          style={{ color: "var(--heading-color)" }}
        >
          NEXUS
        </h1>

        {/* Subtitle */}
        <p className="mt-2 max-w-[400px] text-[12px] leading-[1.6] text-[#555] dark:text-[#999] sm:mt-3 sm:max-w-[440px] sm:text-[14px] sm:leading-[1.7]">
          Pesquise por nome, CNPJ/CPF ou código e acesse
          os registros de forma rápida e organizada.
        </p>
      </motion.div>

      {/* ─── Search Bar ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[480px] sm:max-w-[520px]"
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

      {/* ─── Feature Cards ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 grid w-full max-w-[680px] grid-cols-1 gap-3 sm:mt-8 sm:gap-3.5 md:mt-10 md:grid-cols-3 md:gap-4"
      >
        <FeatureCard
          icon={<Users className="h-4 w-4" />}
          title="Clientes"
          description="Consulte dados cadastrais de clientes"
        />
        <FeatureCard
          icon={<Truck className="h-4 w-4" />}
          title="Fornecedores"
          description="Acesse registros de fornecedores"
        />
        <FeatureCard
          icon={<SearchIcon className="h-4 w-4" />}
          title="Busca Rápida"
          description="Pesquisa por nome, CPF ou código"
        />
      </motion.div>

      {/* ─── Results Modal ─── */}
      <ResultsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalTab === "cliente" ? "Clientes" : "Fornecedores"}
        subtitle={lastQuery ? `Pesquisa: "${lastQuery}"` : undefined}
        accentColor={modalAccent}
        resultCount={viewState === "success" ? activeResults.length : undefined}
      >
        {/* Tabs dentro do modal quando há resultados em ambos os tipos */}
        {viewState === "success" && hasBothTypes && (
          <div className="mb-5 flex items-center gap-1 rounded-full p-1" style={{ background: "var(--tab-bg)", border: "1px solid var(--tab-border)" }}>
            <ModalTab
              label="Clientes"
              count={allResults.clientes.length}
              active={modalTab === "cliente"}
              color="#3b82f6"
              onClick={() => setModalTab("cliente")}
            />
            <ModalTab
              label="Fornecedores"
              count={allResults.fornecedores.length}
              active={modalTab === "fornecedor"}
              color="#f97316"
              onClick={() => setModalTab("fornecedor")}
            />
          </div>
        )}

        {viewState === "loading" && <TruckLoader />}
        {viewState === "empty" && <EmptyState query={lastQuery} />}
        {viewState === "error" && <ErrorState onRetry={handleSearch} />}
        {viewState === "success" && activeResults.length > 0 && (
          <ResultsTable data={activeResults} resultCount={activeResults.length} />
        )}
        {viewState === "success" && activeResults.length === 0 && (
          <EmptyState query={lastQuery} />
        )}
      </ResultsModal>
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
      <div className="eb-icon-circle mb-3">
        {icon}
      </div>
      <h3 className="text-[13px] font-semibold" style={{ color: "var(--heading-color)" }}>
        {title}
      </h3>
      <p className="mt-1 text-[12px] leading-[1.5]" style={{ color: "var(--text-secondary)" }}>
        {description}
      </p>
    </div>
  );
}

function ModalTab({
  label,
  count,
  active,
  color,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-semibold outline-none transition-colors duration-200"
      style={active ? { color: "#fff" } : { color: "var(--text-secondary)" }}
    >
      {active && (
        <motion.div
          layoutId="modalActiveTab"
          className="absolute inset-0 rounded-full"
          style={{ zIndex: 0, background: color, boxShadow: `0 2px 10px ${color}44` }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
      <span
        className="relative z-10 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold tabular-nums"
        style={active
          ? { background: "rgba(255,255,255,0.25)", color: "#fff" }
          : { background: "rgba(0,0,0,0.06)", color: "var(--text-secondary)" }
        }
      >
        {count}
      </span>
    </motion.button>
  );
}
