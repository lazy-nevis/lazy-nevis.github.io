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
  assets/brand/       # Logo SVG / header
  components/
    hero/             # MeshGradientCanvas
    layout/           # Header, Footer, Section
    sections/         # Uma seção por arquivo
    seo/              # JSON-LD
    ui/               # shadcn primitives
  data/content.ts     # Textos, links, FAQ, SCREENSHOT_SET — fonte única
  hooks/use-ui.ts     # reduced-motion, scroll reveal
public/
  screenshots/
    app/<version>-<platform>/   # Sets versionados (WebP + manifest.json)
    webp/                       # Set legado (não apagar; histórico)
    mac/ windows/               # Screenshots de instalação / OS (não apagar)
  favicon*, og-image, robots.txt, sitemap.xml, site.webmanifest
DESIGN.md             # Design tokens — consultar antes de estilizar
RTK.md                # Decisões técnicas da landing
ASSETS.md             # Favicons, OG e pipeline de screenshots
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
4. **Componentes** — Um arquivo por seção; props tipadas; sem `any`.
5. **Ícones** — `@tabler/icons-react` apenas (sem emojis como ícones UI). Mapear novos ícones em `src/components/icons/maps.ts`.
6. **Acessibilidade** — `aria-label` em botões icon-only; headings sem pular níveis; `prefers-reduced-motion` respeitado.
7. **Performance** — PhotoSwipe lazy; imagens `loading="lazy"` fora do hero; canvas pausa em `visibilitychange`.
8. **Ordem das seções** — Header → Hero → Sobre → Features → Como Funciona → Instalação → Screenshots → Contribua → FAQ → Footer (obrigatório).

## Relação com o repo principal

| Recurso | Origem |
|---------|--------|
| Landing (este repo) | [lazy-nevis/lazy-nevis.github.io](https://github.com/lazy-nevis/lazy-nevis.github.io) |
| README / features / FAQ | `lazy-nevis/lazy-nevis` README (+ OpenSpec changes recentes) |
| Screenshots do app | `lazy-nevis/scripts/screenshots/out/<version>-<platform>/` |
| Logo / app icon | `src/assets/brand/` no repo principal |
| Releases / download | `github.com/lazy-nevis/lazy-nevis/releases` |
| Install guides | `docs/install/{macos,windows,linux}.md` |

---

## Seção Instalar (helpers + passos)

O browser **não pode** abrir Terminal/PowerShell nem colar comandos. O fluxo oficial da landing é:

1. CTA **Baixar instalador** → Blob gerado em `src/lib/install-helpers.ts` (não há arquivos estáticos em `public/install/`).
2. Passos numerados por plataforma em `install.steps.*` (i18n).
3. Opção avançada recolhida: copiar comando (`getInstallCommand` em `src/data/content.ts`).

| Plataforma | Arquivo gerado | Comportamento |
|---|---|---|
| macOS | `LazyNevis-install.command` | Duplo clique abre Terminal e roda `install.sh` |
| Windows | `LazyNevis-install.cmd` | Duplo clique abre **CMD** (janela preta, esperado); o `.cmd` lança PowerShell com o `install.ps1` oficial |
| Linux | `LazyNevis-install.sh` | Detecta a família da distro (`/etc/os-release` + `ID_LIKE` / package manager), instala libs (apt/dnf/yum/pacman/zypper) e só então roda `install.sh` |

- URLs dos scripts oficiais: `INSTALL_SCRIPT_URLS` em `src/data/content.ts` (única fonte — UI + helpers).
- UI: `src/components/sections/InstallSection.tsx`.
- **Não** tentar deep-link `x-terminal://` ou similar.
- Copy curto, imperativo, sem jargão; troubleshooting só da plataforma ativa.

---

## Atualizar features do site

Quando o app ganha capacidades novas (ex.: checklist, tray panel, compact mode):

1. Ler o README (e `README.pt-BR.md`) do repo principal e, se útil, proposals/specs OpenSpec recentes.
2. Atualizar `FEATURE_KEYS` e `FEATURE_ICONS` em `src/data/content.ts`.
3. Adicionar ícone Tabler em `src/components/icons/maps.ts` se for um nome novo.
4. Escrever `features.items.<key>.title` e `.description` em **ambos** `en-US.json` e `pt-BR.json`.
5. Atualizar `featureList` em `src/components/seo/JsonLd.tsx` (inglês, curto).
6. Revisar FAQ / About / How it works se a feature mudar a narrativa (só se necessário).
7. Validar: `pnpm lint && pnpm build`.

Não inventar features que o app não tem. Preferir textos curtos alinhados ao README.

---

## Atualizar screenshots do app (release set)

Fonte canônica: pasta gerada pelo orquestrador no repo do app:

```text
lazy-nevis/scripts/screenshots/out/<version>-<platform>/
  manifest.json
  dashboard-running-dark.png
  …
```

Documentação no app: `docs/screenshots/README.md`.

### Regras

1. **Não apagar nem sobrescrever** pastas históricas (`public/screenshots/webp/`, `mac/`, `windows/`, nem sets antigos em `app/`).
2. **Sempre criar uma pasta nova** versionada:
   `public/screenshots/app/<version>-<platform>/`
   Ex.: `public/screenshots/app/0.10.0-rc.5-macos/`.
3. O **path público** deve manter a versão (histórico de CDN/cache e auditoria):
   `/screenshots/app/0.10.0-rc.5-macos/dashboard-running-dark.webp`
4. Commitar **WebP + `manifest.json`**. Não commitatar PNGs grandes do set (origem fica no repo do app).
5. Preferir tema **dark** na galeria (landing é dark-only).

### Passo a passo

```bash
# No repo do app (se ainda não gerou o set):
# bun run screenshots   → out/<version>-<platform>/

VERSION_DIR="0.10.0-rc.5-macos"   # nome da pasta em out/
APP_OUT="/path/to/lazy-nevis/scripts/screenshots/out/${VERSION_DIR}"
DEST="public/screenshots/app/${VERSION_DIR}"

mkdir -p "$DEST"
cp "$APP_OUT/manifest.json" "$DEST/"

# Converter PNGs → WebP (cwebp ou magick). Qualidade ~82.
for f in "$APP_OUT"/*.png; do
  base=$(basename "$f" .png)
  cwebp -q 82 "$f" -o "$DEST/${base}.webp"
done
```

Depois no código:

1. Atualizar `SCREENSHOT_SET` em `src/data/content.ts` para o novo `<version>-<platform>`.
2. Atualizar o array `SCREENSHOTS` (curadoria — não precisa expor todos os shots do manifest).
   - `src` via `screenshotSrc('<file-stem>')` (sem `.webp`).
   - `width` / `height` = dimensões reais do WebP (podem diferir do `manifest` por scale factor).
   - `id` = chave i18n estável em camelCase.
3. Atualizar `screenshots.items.<id>.caption` e `.alt` em **en-US** e **pt-BR**.
4. Usar `manifest.json` (`shots[].id`, `title`, `tags`, `feature`) para escolher a curadoria.
   Tags úteis: `readme`, `hero`, `docs`, `alerts`, `checklist`, `tray`, `compact`.
5. Validar: `pnpm lint && pnpm build` e conferir a seção Screenshots no `pnpm dev`.

### O que não fazer

- Não apontar a galeria para `/screenshots/webp/…` (legado).
- Não reutilizar nomes de pasta de versão já publicados.
- Não misturar screenshots de instalação (`mac/`, `windows/`) com o set do app.

Detalhes extras de compressão: `ASSETS.md`.

---

## Protótipos de referência

Layouts HTML originais em `.docs/prototypes/landing-1/` e `landing-2/` — **não** editar para produção; `DESIGN.md` na raiz é a fonte de verdade mesclada.
