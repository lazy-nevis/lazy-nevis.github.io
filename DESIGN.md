# LazyNevis Landing — Design System

Visual alinhado ao app (`lazy-nevis`): neutros **zinc** + laranja de marca (`24 94% 53%` ≈ `#f97316`). A landing suporta **tema escuro (padrão) e claro**, com toggle no Header/Footer. Tom de voz: humano, direto, sem jargão.

## Princípios

- **Mostrar o produto**: o Hero e as seções usam screenshots reais do app, no tema atual do visitante.
- **Dois temas, uma fonte de verdade**: tokens em `src/index.css` (`:root` = escuro, `:root[data-theme='light']`, e `prefers-color-scheme: light` quando não há escolha salva). Nunca hex solto no JSX.
- **Acessível**: contraste AA, `focus-visible` em tudo, `prefers-reduced-motion` desliga animações decorativas, alvos de toque ≥ 36px.
- **Responsivo**: testado em 375, 768 e 1280px, sem scroll horizontal.

## Tema

| Mecanismo | Detalhe |
|-----------|---------|
| Escolha do usuário | `data-theme` em `<html>`; chave `lazynevis-theme` no `localStorage` (hook `useTheme`) |
| Sem escolha | segue `prefers-color-scheme`; padrão escuro |
| Antes do paint | script inline em `index.html` aplica o tema salvo (evita flash) |
| Screenshots | `AppShot` troca entre `<arquivo>-dark.webp` e `<arquivo>-light.webp` |
| Logo | `BrandLogo` usa `logo-on-dark` / `logo-on-light` |

## Paleta

### Marca

| Token | Hex | Uso |
|-------|-----|-----|
| `--primary-container` | `#f97316` | CTA sólido, ícones ativos, gradiente do título |
| `--primary` | `#fb923c` escuro / `#c2410c` claro | **Texto** de destaque e links (contraste AA em cada tema) |
| `--primary-foreground` | `#1c0a00` | Texto sobre laranja |
| `--brand-pink` | `#f472b6` / `#db2777` | Fim do gradiente (`text-gradient`, `btn-gradient`) |

### Superfícies e texto

| Token | Escuro | Claro |
|-------|--------|-------|
| `--background` | `#0f0f11` | `#fcfcfd` |
| `--foreground` | `#f4f4f5` | `#18181b` |
| `--card` | `#151518` | `#ffffff` |
| `--muted` / `--accent` | `#232326` | `#f4f4f5` |
| `--muted-foreground` | `#a1a1aa` | `#52525b` |
| `--border` | `white / 10%` | `zinc-900 / 12%` |
| `--ring` | `#fb923c` | `#c2410c` |
| `--surface-container-lowest` (footer) | `#0b0b0d` | `#f4f4f5` |

Feedback: `--success`, `--warning`, `--destructive` com variantes por tema. Efeitos: `--glow-a/b` (brilho do Hero), `--shadow-shot` (sombra dos mockups).

> Sobre laranja use `text-primary-foreground`; para texto laranja sobre o fundo use `text-primary` (não `text-primary-container`).

## Tipografia

**Plus Jakarta Sans**, única família.

| Classe | Tamanho | Peso |
|--------|---------|------|
| `text-display` | 48px (36 mob) | 800 / 700 |
| `text-headline-lg` | 32px (28 mob) | 700 |
| `text-headline-md` | 24px | 600 |
| `text-body-lg` / `text-body-md` | 18 / 16px | 400 |
| `text-label-md` / `text-label-sm` | 14 / 12px | 600 / 500 |

## Espaçamento, raios, breakpoints

Grid de 8px. `px-container` 16px (mob) / 24px; `py-section` 56px (mob) / 80px; container `max-w-7xl`. Cards `rounded-2xl`/`rounded-3xl`, botões e pills `rounded-full`. Breakpoints Tailwind padrão (`sm` 640, `md` 768, `lg` 1024, `xl` 1280).

## Efeitos e animação

| Classe | Uso |
|--------|-----|
| `hero-glow` | Brilho radial laranja/rosa atrás do Hero e do mockup de telas |
| `shot-frame` | Sombra dos screenshots (`--shadow-shot`) |
| `text-gradient` | Gradiente laranja → rosa no destaque do título |
| `btn-gradient` | CTA com gradiente e brilho laranja |
| `animate-drift` | Flutuação leve dos mockups flutuantes do Hero (7s) |
| `animate-fade-in-up` | Entrada da tela ao trocar de aba em Screenshots |

`prefers-reduced-motion` zera `animate-drift` e as entradas. Evite `scale` que cause layout shift.

## Componentes

- **Hero**: badge, título com `text-gradient`, descrição, CTAs (baixar / GitHub), lista de confiança, mockup grande do painel e dois mockups flutuantes (bandeja, compacto — ocultos no mobile).
- **Features**: grid *bento* para Pomodoro, Hábitos, Lembretes e Calendário (cada card com recorte do screenshot) + grade de 9 recursos essenciais.
- **Screenshots**: abas (Painel, Pomodoro, Hábitos, Lembretes, Calendário, Checklist, Histórico, Compacto, Bandeja, Alerta); clique abre PhotoSwipe (import dinâmico).
- **Footer**: colunas Explorar / Links, doação, seletor de idioma e de tema.
- **Cards**: `bg-card/60 border border-border rounded-2xl`; hover só em borda/opacidade.

## Mapeamento shadcn/ui

Variáveis em `src/index.css` (`:root` + `@theme inline`). Use classes semânticas (`bg-card`, `text-foreground`, `text-primary`, `border-border`) — nunca hex.

## Referências do 21st.dev

Usadas como inspiração de estrutura/estilo (código adaptado aos tokens do projeto, não copiado literalmente):

| Referência | Autor | Onde influenciou |
|------------|-------|------------------|
| Hero with Mockup (#1492) | serafimcloud | Hero: título centralizado + mockup grande com brilho |
| Hero Section with Device Mockups (#24478) | solaceui | Mockups flutuantes (bandeja / compacto) |
| Feature Section with Bento Grid (#1327) | tommyjepsen | Grid *bento* de Features |
| Footer section with theme toggle (#1520) | arihantcodes | Footer com toggle de tema |
| Mega Sitemap Footer (#28165) | olewandowski1 | Footer em colunas |
| Theme toggle buttons (#7272) / Theme Toggle (#554) | reuno-ui / campsite | `ThemeToggle` |

## Anti-patterns

- Emojis como ícones (use `@tabler/icons-react`).
- Hex solto no JSX; `text-primary-container` para texto pequeno (contraste).
- `hover:bg-white/*` (quebra no tema claro) — use `hover:bg-foreground/*`.
- Trocar a ordem das seções sem pedido explícito.
