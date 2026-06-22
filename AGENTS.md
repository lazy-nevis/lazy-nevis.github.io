# LazyNevis Landing — Agent Guide

Visão geral para agentes de IA (Cursor, Claude Code, etc.) trabalhando neste repositório.

## O que é este projeto

Landing page open-source do **LazyNevis**, publicada em [lazy-nevis.github.io](https://lazy-nevis.github.io). Repositório: [lazy-nevis/lazy-nevis.github.io](https://github.com/lazy-nevis/lazy-nevis.github.io).

O app desktop vive em repositório separado: **[lazy-nevis/lazy-nevis](https://github.com/lazy-nevis/lazy-nevis)** (Tauri + Rust + React). Esta landing **não** contém código do app — apenas marketing, download links e documentação de apoio.

Autor: [SimStm](https://github.com/SimStm) · portfolio [SIMSDEV](https://sims.dev.br).

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Estilo | Tailwind CSS v4 (`@theme` em `src/index.css`) |
| i18n | next-intl (`en-US`, `pt-BR`) — mensagens em `src/i18n/messages/` |
| Componentes | shadcn/ui (primitivos em `src/components/ui/`) |
| Carrossel | Swiper 12 |
| Lightbox | PhotoSwipe 5 (dynamic import no primeiro clique) |
| Hero | Canvas 2D mesh gradient (`MeshGradientCanvas.tsx`) |
| Deploy | GitHub Pages (`.github/workflows/deploy.yml`) |

## Estrutura de pastas

```
src/
  assets/brand/       # Logo SVG (substituir pelo repo principal)
  components/
    hero/             # MeshGradientCanvas
    layout/           # Header, Footer, Section
    sections/         # Uma seção por arquivo
    seo/              # JSON-LD
    ui/               # shadcn primitives
  data/content.ts     # Textos, links, FAQ — fonte única de conteúdo
  hooks/use-ui.ts     # reduced-motion, scroll reveal
public/
  screenshots/        # Placeholders → substituir por docs/screenshots do app
  favicon*, og-image, robots.txt, sitemap.xml, site.webmanifest
DESIGN.md             # Design tokens — consultar antes de estilizar
RTK.md                # Decisões técnicas da landing
ASSETS.md             # Como gerar ícones/favicons a partir do logo oficial
```

## Comandos

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # tsc + vite build → dist/
pnpm preview      # preview da build
pnpm lint
```

Deploy: push na branch `main` dispara GitHub Actions.

## Convenções de código

1. **Tokens only** — Nunca hex/px soltos no JSX. Usar classes de `DESIGN.md` / `src/index.css` (`text-foreground`, `py-section`, `glass-panel`, etc.).
2. **Conteúdo** — Textos traduzíveis em `src/i18n/messages/{en-US,pt-BR}.json`. URLs e dados estáticos em `src/data/content.ts`.
3. **i18n** — `useTranslations('namespace')` nos componentes. Detecção automática de `pt-*` / regiões lusófonas; padrão `en-US`. SEO (`index.html`, JSON-LD) permanece em inglês.
3. **Componentes** — Um arquivo por seção; props tipadas; sem `any`.
4. **Ícones** — `@tabler/icons-react` apenas (sem emojis como ícones UI).
5. **Acessibilidade** — `aria-label` em botões icon-only; headings sem pular níveis; `prefers-reduced-motion` respeitado.
6. **Performance** — PhotoSwipe lazy; imagens `loading="lazy"` fora do hero; canvas pausa em `visibilitychange`.
7. **Ordem das seções** — Header → Hero → Sobre → Features → Como Funciona → Instalação → Screenshots → Contribua → FAQ → Footer (obrigatório).

## Relação com o repo principal

| Recurso | Origem |
|---------|--------|
| Landing (este repo) | [lazy-nevis/lazy-nevis.github.io](https://github.com/lazy-nevis/lazy-nevis.github.io) |
| README / features / FAQ | `lazy-nevis/lazy-nevis` README |
| Screenshots | `docs/screenshots/` no repo principal |
| Logo / app icon | `src/assets/brand/` no repo principal |
| Releases / download | `github.com/lazy-nevis/lazy-nevis/releases` |
| Install guides | `docs/install/{macos,windows,linux}.md` |

## Protótipos de referência

Layouts HTML originais em `.docs/prototypes/landing-1/` e `landing-2/` — **não** editar para produção; `DESIGN.md` na raiz é a fonte de verdade mesclada.
