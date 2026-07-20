# RTK — LazyNevis Landing Page

Registro de decisões técnicas (Runtime/Technical Knowledge) específicas desta landing.

## Stack e tooling

### Por que Vite + React SPA e não Next.js?

GitHub Pages hospeda estáticos. Vite gera bundle estático sem servidor Node. O scaffold já existia; zero necessidade de SSR para uma single-page marketing.

### Por que Tailwind v4 com `@theme`?

Tokens do `DESIGN.md` mapeiam diretamente para CSS variables em um único arquivo (`src/index.css`). Compatível com shadcn via variáveis semânticas (`--background`, `--primary`, etc.).

### Por que shadcn/ui copiado (não pacote npm)?

Controle total dos primitivos, sem dependência de versão publicada. Componentes em `src/components/ui/` consomem tokens locais (`glass-panel`, `btn-gradient`).

## Hero — mesh gradient

### Canvas 2D vs WebGL (protótipos)

Protótipos usavam WebGL (hex grid + noise). Escolhemos **Canvas 2D com radial gradients animados** porque:

- Brief pedia Canvas API (evitar Three.js)
- Menor custo em mobile (menos blobs em `<768px`)
- Degrada graciosamente com `prefers-reduced-motion` (frame estático)
- Pausa em `document.visibilitychange`

Parallax: offset de blobs baseado em mouse + `scrollY * 0.02`.

## Galeria — Swiper + PhotoSwipe

| Biblioteca | Papel |
|------------|-------|
| **Swiper** | Carrossel responsivo na página (`slidesPerView` por breakpoint) |
| **PhotoSwipe 5** | Lightbox fullscreen, zoom, gestos touch |

PhotoSwipe carregado via `import()` no primeiro clique — reduz bundle inicial (~conforme recomendação da lib).

Swiper no mobile da seção Features: carrossel horizontal quando grid 4 colunas não cabe.

## Conteúdo e SEO

- Textos derivados do README do repo principal (`lazy-nevis/lazy-nevis`).
- JSON-LD `SoftwareApplication` em `JsonLd.tsx`.
- HTML semântico: `<main>`, `<section>`, um `<h1>` no Hero.
- GEO: parágrafos auto-contidos em Sobre/FAQ para citação por LLMs.

## Performance

- `loading="lazy"` em screenshots
- Dynamic import PhotoSwipe
- Canvas: `devicePixelRatio` capped em 2
- `motion-safe:` prefix para animações decorativas

## Deploy

GitHub Actions em `push main` → `npm ci` + `npm run build` → `dist/` → Pages.

**Nota:** workflow usa `npm`; projeto local usa `pnpm`. Lockfiles devem permanecer sincronizados ou migrar workflow para pnpm.

## Assets

- Favicons / OG: `ASSETS.md`.
- Screenshots do app: sets versionados em `public/screenshots/app/<version>-<platform>/` (WebP + `manifest.json`), apontados por `SCREENSHOT_SET` em `src/data/content.ts`.
- Pastas `webp/`, `mac/`, `windows/` e sets antigos em `app/` permanecem para histórico — novos releases **adicionam** pasta, não substituem.
- Fonte de captura: `lazy-nevis/scripts/screenshots/out/<version>-<platform>/`.

## Não implementado (deliberado)

- Light mode na landing (design system dark-only; app tem tema claro internamente — galeria prefere shots dark)
- Analytics / telemetry na landing (coerente com marca privacy-first)

## Histórico

| Data | Decisão |
|------|---------|
| 2025-06 | Mesclagem layout-1 + layout-2 → `DESIGN.md` unificado |
| 2025-06 | SPA React com seções ordenadas conforme brief |
| 2025-06 | Mesh Canvas 2D substitui shaders WebGL dos protótipos |
| 2026-07 | Screenshots versionados em `public/screenshots/app/<version>-<platform>/`; features checklist + compact/tray |
