export type PersonType = "cliente" | "fornecedor";

export interface Person {
  codPessoa: string;
  idIntegracao: string;
  nome: string;
  cnpjCpf: string;
  tipo: PersonType;
}

export interface SearchFilters {
  query: string;
  type: PersonType;
}

export type ViewState = "idle" | "loading" | "success" | "empty" | "error";
