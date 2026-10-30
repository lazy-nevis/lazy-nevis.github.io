# RTK — LazyNevis Landing Page

Registro de decisões técnicas (Runtime/Technical Knowledge) específicas desta landing.

## Stack e tooling

### Por que Vite + React SPA e não Next.js?

GitHub Pages hospeda estáticos. Vite gera bundle estático sem servidor Node. O scaffold já existia; zero necessidade de SSR para uma single-page marketing.

### Por que Tailwind v4 com `@theme`?

Tokens do `DESIGN.md` mapeiam diretamente para CSS variables em um único arquivo (`src/index.css`). Compatível com shadcn via variáveis semânticas (`--background`, `--primary`, etc.).

### Por que shadcn/ui copiado (não pacote npm)?

Controle total dos primitivos, sem dependência de versão publicada. Componentes em `src/components/ui/` consomem tokens locais (`glass-panel`, `btn-gradient`).

## Hero — mockup + brilho CSS

O Hero deixou de usar Canvas/mesh: agora é um layout centralizado com `hero-glow` (gradientes radiais em CSS) e um mockup real do app (`AppShot`). Vantagens: zero JS de animação, sem custo em mobile, `prefers-reduced-motion` respeitado só com CSS (`animate-drift`).

## Galeria — abas + PhotoSwipe

| Biblioteca | Papel |
|------------|-------|
| **PhotoSwipe 5** | Lightbox fullscreen, zoom, gestos touch |

A seção Screenshots usa abas acessíveis (`role="tablist"`) em vez de carrossel; o Swiper foi removido. PhotoSwipe segue em `import()` no primeiro clique.

## Conteúdo e SEO

- Textos derivados do README do repo principal (`lazy-nevis/lazy-nevis`).
- JSON-LD `SoftwareApplication` em `JsonLd.tsx`.
- HTML semântico: `<main>`, `<section>`, um `<h1>` no Hero.
- GEO: parágrafos auto-contidos em Sobre/FAQ para citação por LLMs.

## Performance

- `loading="lazy"` em screenshots
- Dynamic import PhotoSwipe
- Screenshots temáticos: só o variante do tema atual é baixado
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

- Analytics / telemetry na landing (coerente com marca privacy-first)

## Histórico

| Data | Decisão |
|------|---------|
| 2025-06 | Mesclagem layout-1 + layout-2 → `DESIGN.md` unificado |
| 2025-06 | SPA React com seções ordenadas conforme brief |
| 2025-06 | Mesh Canvas 2D substitui shaders WebGL dos protótipos (removido em 2026-10) |
| 2026-07 | Screenshots versionados em `public/screenshots/app/<version>-<platform>/`; features checklist + compact/tray |
| 2026-10 | Refresh visual: tema claro/escuro, paleta laranja do app, Hero com mockup, Features em bento (Pomodoro, Hábitos, Lembretes, Calendário), Screenshots em abas (set `1.0.1-macos`), Swiper e canvases removidos |
