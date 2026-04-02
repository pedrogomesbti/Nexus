import { mockData } from "@/data/mock";
import { Person, PersonType } from "@/types";

/**
 * Serviço de consulta preparado para integração futura com backend.
 * Atualmente utiliza dados mockados locais.
 * Para integrar com API real, basta substituir a implementação interna
 * mantendo a mesma interface pública.
 */

const SIMULATED_DELAY_MS = 800;

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

    const matchesName = normalize(person.nome).includes(normalizedQuery);
    const matchesCodPessoa = person.codPessoa.includes(
      digitsOnly || normalizedQuery
    );
    const matchesCnpjCpf = person.cnpjCpf.includes(
      digitsOnly || normalizedQuery
    );
    const matchesIdIntegracao = normalize(person.idIntegracao).includes(
      normalizedQuery
    );

    return matchesName || matchesCodPessoa || matchesCnpjCpf || matchesIdIntegracao;
  });
}
