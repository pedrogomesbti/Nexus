"use client";

import { motion, LayoutGroup } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { PersonType } from "@/types";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  selectedType: PersonType;
  onTypeChange: (type: PersonType) => void;
  onSearch: () => void;
  onClear: () => void;
  isLoading: boolean;
}

export function SearchBar({
  query,
  onQueryChange,
  selectedType,
  onTypeChange,
  onSearch,
  onClear,
  isLoading,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Type Selector — animated pill tabs */}
      <LayoutGroup>
        <div className="flex items-center gap-1 rounded-full p-1" style={{ background: "var(--tab-bg)", border: "1px solid var(--tab-border)" }}>
          <TypeTab
            label="Clientes"
            active={selectedType === "cliente"}
            onClick={() => onTypeChange("cliente")}
            activeColor="#3b82f6"
          />
          <TypeTab
            label="Fornecedores"
            active={selectedType === "fornecedor"}
            onClick={() => onTypeChange("fornecedor")}
            activeColor="#f97316"
          />
        </div>
      </LayoutGroup>

      {/* Search Card — exact EarlyBird pill input */}
      <div className="eb-search-card flex w-full items-center pl-6 pr-2 py-2">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nome, CNPJ/CPF ou código..."
          className="h-10 flex-1 bg-transparent text-[15px] placeholder:text-[#bbb] focus:outline-none dark:placeholder:text-[#555]"
          style={{ color: "var(--heading-color)" }}
          aria-label="Campo de pesquisa"
        />
        <button
          onClick={onSearch}
          disabled={!query.trim() || isLoading}
          className="eb-btn-dark ml-2 h-10 shrink-0"
          aria-label="Pesquisar"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Pesquisar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function TypeTab({
  label,
  active,
  onClick,
  activeColor,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  activeColor: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={[
        "relative rounded-full px-5 py-2 text-[13px] font-semibold outline-none transition-colors duration-200",
        active
          ? ""
          : "text-[#888] hover:text-[#555] dark:text-[#666] dark:hover:text-[#aaa]",
      ].join(" ")}
      style={active ? { color: "var(--tab-active-text)" } : {}}
      role="tab"
      aria-selected={active}
    >
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-full"
          style={{ zIndex: 0, background: activeColor, boxShadow: `0 2px 10px ${activeColor}44` }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}
