# Claude Code — LazyNevis Landing

Instruções específicas para sessões Claude Code neste repositório. Contexto geral: **[AGENTS.md](./AGENTS.md)**.

## Antes de considerar uma tarefa concluída

```bash
pnpm lint && pnpm build
```

Corrija erros de TypeScript e ESLint antes de encerrar.

## Rodar localmente

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:5173`. Teste breakpoints ~375px, 768px, 1280px.

## Regras importantes

1. **Leia `DESIGN.md`** antes de alterar estilos ou adicionar componentes visuais.
2. **Não commite assets não otimizados** — PNGs grandes, screenshots sem compressão. Siga `ASSETS.md`.
3. **Não duplique conteúdo** — use `src/data/content.ts`.
4. **Não altere a ordem das seções** da landing sem pedido explícito.
5. **PhotoSwipe** — manter dynamic import; não importar no bundle principal.
6. **Commits** — só quando o usuário pedir.

## Assets do logo oficial

Origem: `lazy-nevis/lazy-nevis` → `src/assets/brand/logo-light.png`, `app-icon.png`.

Após copiar, rode o script de geração (ver `ASSETS.md`) e substitua `src/assets/brand/logo.svg` se tiver PNG/SVG oficial.

## Features e screenshots do app

Ao atualizar marketing a partir de um novo RC:

1. Features: `FEATURE_KEYS` em `src/data/content.ts` + i18n `features.items.*` (en-US e pt-BR) + `JsonLd.tsx`.
2. Screenshots: copiar set de `lazy-nevis/scripts/screenshots/out/<version>-<platform>/` para `public/screenshots/app/<version>-<platform>/` como WebP; **não** apagar pastas antigas; atualizar `SCREENSHOT_SET` + `SCREENSHOTS` + captions i18n.

Procedimento detalhado: `AGENTS.md` (seções **Atualizar features** e **Atualizar screenshots**).

## Troubleshooting comum

| Problema | Solução |
|----------|---------|
| Path alias `@/` não resolve | Verificar `vite.config.ts` e `tsconfig.app.json` paths |
| Tailwind classes ignoradas | Tokens em `@theme` dentro de `src/index.css` |
| Swiper sem estilo | Imports em `index.css` |
| Build GH Pages quebrado | `base: '/'` em `vite.config.ts` |

## Documentação relacionada

- `DESIGN.md` — tokens
- `RTK.md` — decisões arquiteturais
- `ASSETS.md` — favicons e OG image
