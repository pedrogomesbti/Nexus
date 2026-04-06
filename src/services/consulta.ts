import { mockData } from "@/data/mock";
import { Person, PersonType } from "@/types";

/**
 * Serviço de consulta preparado para integração futura com backend.
 * Atualmente utiliza dados mockados locais.
 * Para integrar com API real, basta substituir a implementação interna
 * mantendo a mesma interface pública.
 */

const SIMULATED_DELAY_MS = 3000;

function simulateDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function cleanDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function matchesPerson(person: Person, normalizedQuery: string, digitsOnly: string): boolean {
  const matchesName = normalize(person.nome).includes(normalizedQuery);
  const matchesCodPessoa = digitsOnly
    ? person.codPessoa.includes(digitsOnly)
    : false;
  const matchesCnpjCpf = digitsOnly
    ? person.cnpjCpf.includes(digitsOnly)
    : false;
  const matchesIdIntegracao = normalize(person.idIntegracao).includes(normalizedQuery);

  return matchesName || matchesCodPessoa || matchesCnpjCpf || matchesIdIntegracao;
}

/** Busca filtrada por tipo */
export async function fetchPersons(
  query: string,
  type: PersonType
): Promise<Person[]> {
  await simulateDelay();

  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  const normalizedQuery = normalize(trimmedQuery);
  const digitsOnly = cleanDigits(trimmedQuery);

  return mockData.filter((person) => {
    if (person.tipo !== type) return false;
    return matchesPerson(person, normalizedQuery, digitsOnly);
  });
}

/** Resultado da busca em ambos os tipos */
export interface SearchAllResult {
  clientes: Person[];
  fornecedores: Person[];
}

/** Busca em AMBOS os tipos simultaneamente */
export async function fetchAllPersons(query: string): Promise<SearchAllResult> {
  await simulateDelay();

  const trimmedQuery = query.trim();
  if (!trimmedQuery) return { clientes: [], fornecedores: [] };

  const normalizedQuery = normalize(trimmedQuery);
  const digitsOnly = cleanDigits(trimmedQuery);

  const clientes: Person[] = [];
  const fornecedores: Person[] = [];

  for (const person of mockData) {
    if (matchesPerson(person, normalizedQuery, digitsOnly)) {
      if (person.tipo === "cliente") {
        clientes.push(person);
      } else {
        fornecedores.push(person);
      }
    }
  }

  return { clientes, fornecedores };
}
