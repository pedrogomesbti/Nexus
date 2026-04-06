# NEXUS — Consulta Operacional

Sistema interno de consulta rápida de **clientes** e **fornecedores** para o operacional NEXUS.

## Problema que resolve

No Alterdata (ERP), não existe nenhuma tela, relatório ou consulta nativa que exiba o **ID de integração** usado pelos sistemas legados. O único dado visível é o `Cod.Pessoa`, que **não pode ser utilizado** para integrações com o ERP. Este front-end fornece a relação completa:

| Campo          | Descrição                                      |
| -------------- | ---------------------------------------------- |
| Cód. Pessoa    | Código interno do cadastro no Alterdata/Bimer  |
| ID Integração  | Identificador usado pelos sistemas legados     |
| Nome           | Razão social ou nome da pessoa                 |
| CNPJ/CPF       | Documento formatado automaticamente            |
| Tipo           | Cliente ou Fornecedor (segregados por aba)     |

> **Atenção:** Se uma pessoa é cliente E fornecedor, ela aparece nas duas listagens.

## Regras de negócio

- **Somente consulta** — sem permissão de escrita, edição ou exclusão.
- **Sem login/autenticação** — acesso direto via URL do portal Alterdata.
- **Sem logs** — não há histórico de buscas ou acessos.
- **Pesquisa por:** parte do nome, CNPJ/CPF ou código da pessoa.
- **Segregação:** a visão é dividida entre Cliente e Fornecedor via abas.

---

## Stack tecnológica

| Tecnologia       | Uso                                        |
| ---------------- | ------------------------------------------ |
| Next.js 15       | Framework React com App Router             |
| TypeScript       | Tipagem estática em todo o projeto         |
| Tailwind CSS v4  | Estilização utilitária                     |
| Framer Motion    | Animações de UI (transições, loading, tabs)|
| next-themes      | Alternância light/dark mode                |
| Lucide React     | Ícones SVG                                 |

---

## Estrutura de arquivos

```
src/
├── app/
│   ├── layout.tsx          # Layout raiz (fontes, metadata, favicon, ThemeProvider)
│   ├── page.tsx            # Página principal (monta tudo)
│   ├── globals.css         # Estilos globais, variáveis CSS, animações firefly
│   └── favicon.ico         # Favicon (sobrescrito via metadata para usar logo PNG)
│
├── components/
│   ├── features/
│   │   ├── consulta-view.tsx   # Componente principal da consulta
│   │   ├── search-bar.tsx      # Barra de pesquisa com abas Cliente/Fornecedor
│   │   ├── results-table.tsx   # Tabela de resultados com colunas da relação
│   │   └── state-views.tsx     # Estados visuais (idle, loading, empty, error)
│   │
│   ├── providers/
│   │   └── theme-provider.tsx  # Provider do next-themes (light/dark)
│   │
│   └── ui/
│       ├── fireflies.tsx       # Partículas firefly animadas no fundo
│       ├── loading-screen.tsx  # Tela de carregamento com caminhão animado
│       ├── skeleton.tsx        # Skeleton placeholder para loading
│       └── theme-toggle.tsx    # Botão de alternar tema (sol/lua)
│
├── data/
│   └── mock.ts             # Dados mockados para desenvolvimento
│
├── lib/
│   └── utils.ts            # Utilitários (formatCnpjCpf, cn, normalizeSearch)
│
├── services/
│   └── consulta.ts         # Serviço de consulta (mock agora, API futura)
│
├── types/
│   └── index.ts            # Tipos TypeScript (Person, PersonType, ViewState)
│
└── public/
    └── iTracker_ID_logo_COR N V P.png  # Logo da empresa (usado no header e favicon)
```

---

## Componentes — o que cada um faz

### `page.tsx` — Página principal
Monta a estrutura da página:
- Renderiza a `LoadingScreen` (tela de carregamento inicial de 4.3s)
- Renderiza os orbs de fundo animados (`bg-orb`)
- Renderiza as `Fireflies` (partículas flutuantes)
- Posiciona o `ThemeToggle` no canto superior direito
- Renderiza o `ConsultaView` como conteúdo principal
- Rodapé com texto institucional

### `consulta-view.tsx` — Componente principal da consulta
Gerencia todo o estado e fluxo da busca:
- **`query`** — texto digitado pelo usuário
- **`selectedType`** — aba ativa: `"cliente"` ou `"fornecedor"`
- **`viewState`** — estado atual da UI: `idle | loading | success | empty | error`
- **`results`** — array de `Person[]` retornado pela busca
- **`lastQuery`** — último termo pesquisado (usado na mensagem de "sem resultados")

**Funções:**
- **`handleSearch()`** — dispara a busca via `fetchPersons()`, atualiza viewState
- **`handleClear()`** — limpa busca e volta ao estado idle
- **`handleTypeChange(type)`** — troca entre Cliente/Fornecedor e reseta resultados

**Subcomponente `FeatureCard`:**
- Card informativo com ícone, título e descrição (Clientes, Fornecedores, Busca Rápida)

### `search-bar.tsx` — Barra de pesquisa
- **Abas animadas** com `LayoutGroup` do Framer Motion:
  - Clientes → fundo **azul** (`#3b82f6`) quando ativo
  - Fornecedores → fundo **laranja** (`#f97316`) quando ativo
  - Animação spring suave ao trocar de aba (`layoutId`)
  - `whileHover` e `whileTap` para feedback visual
- **Input** de texto com pesquisa por Enter ou botão
- **Botão "Pesquisar"** com spinner de loading

### `results-table.tsx` — Tabela de resultados
Exibe os dados retornados em uma tabela com as colunas:
- **Código** (`codPessoa`) — badge com fundo cinza
- **ID Integração** (`idIntegracao`) — fonte mono
- **Nome** (`nome`) — texto principal
- **CNPJ/CPF** (`cnpjCpf`) — formatado automaticamente (XXX.XXX.XXX-XX ou XX.XXX.XXX/XXXX-XX)
- **Tipo** — badge "Cliente" (preto) ou "Fornecedor" (cinza)
- **Ações** — botões de copiar CNPJ/CPF e Código (aparecem no hover da linha)

Cada linha entra com animação staggered (delay progressivo).

### `state-views.tsx` — Estados visuais
- **`IdleState`** — retorna `null` (nada exibido antes da primeira busca)
- **`LoadingState`** — skeletons animados simulando a tabela
- **`EmptyState`** — ícone + mensagem "Nenhum resultado" com o termo buscado
- **`ErrorState`** — ícone de erro + botão "Tentar novamente"

### `loading-screen.tsx` — Tela de carregamento
- Exibida por **4.3 segundos** ao entrar no site
- Caminhão SVG animado com:
  - Container **azul** com linhas de separação
  - Cabine **laranja** com janela
  - Rodas com animação spring
  - Fumaça do escapamento em loop
  - Estrada animada
- Barra de progresso com enchimento gradual
- Texto "NEXUS" com fonte Playfair Display
- Fade-out suave ao finalizar
- Cores adaptam para dark mode

### `fireflies.tsx` — Partículas de fundo
- 15 partículas CSS flutuando pela tela
- Light mode: cores alternadas **azul** e **laranja**
- Dark mode: todas **brancas**
- Cada partícula tem trajetória, velocidade e flash únicos (CSS keyframes)

### `theme-toggle.tsx` — Botão de tema
- Alterna entre light e dark mode
- Ícones animados de sol/lua com Framer Motion
- Posicionado fixo no canto superior direito

---

## Serviço de consulta — `services/consulta.ts`

```typescript
fetchPersons(query: string, type: PersonType): Promise<Person[]>
```

- Recebe o termo de busca e o tipo (cliente/fornecedor)
- Filtra por: nome (parcial), cod.pessoa, CNPJ/CPF, ID integração
- Normaliza acentos e caracteres especiais
- Atualmente usa **dados mockados** (`data/mock.ts`)
- **Para integrar com backend Python:** substituir a implementação interna mantendo a mesma interface

### Exemplo de integração futura com API:

```typescript
export async function fetchPersons(query: string, type: PersonType): Promise<Person[]> {
  const res = await fetch(`https://sua-api.com/consulta?q=${query}&tipo=${type}`);
  if (!res.ok) throw new Error("Erro na consulta");
  return res.json();
}
```

---

## Utilitários — `lib/utils.ts`

- **`cn(...inputs)`** — combina classes CSS com `clsx` + `tailwind-merge`
- **`formatCnpjCpf(value)`** — formata CPF (11 dígitos) ou CNPJ (14 dígitos) automaticamente
- **`normalizeSearch(value)`** — normaliza texto removendo acentos para busca

---

## Tipos — `types/index.ts`

```typescript
type PersonType = "cliente" | "fornecedor";

interface Person {
  codPessoa: string;      // Código da pessoa no Alterdata/Bimer
  idIntegracao: string;   // ID usado pelos sistemas legados para integração
  nome: string;           // Razão social ou nome completo
  cnpjCpf: string;        // Documento (CNPJ ou CPF, somente dígitos)
  tipo: PersonType;       // "cliente" ou "fornecedor"
}

type ViewState = "idle" | "loading" | "success" | "empty" | "error";
```

---

## Variáveis CSS (temas)

| Variável             | Light mode                  | Dark mode                   |
| -------------------- | --------------------------- | --------------------------- |
| `--heading-color`    | `#0a0a0a` (preto)           | `#ffffff` (branco)          |
| `--text-secondary`   | `#444444` (cinza escuro)    | `#bbbbbb` (cinza claro)     |
| `--tab-bg`           | `rgba(255,255,255,0.8)`     | `rgba(255,255,255,0.06)`    |
| `--tab-border`       | `rgba(0,0,0,0.08)`          | `rgba(255,255,255,0.08)`    |
| `--tab-active-text`  | `#0a0a0a` (preto)           | `#0a0a0a` (preto)           |

---

## Como rodar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build para produção

```bash
npm run build
npm start
```
