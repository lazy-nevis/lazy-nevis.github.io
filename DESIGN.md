# LazyNevis Landing — Design System

Sistema unificado mesclando **layout-1** (tech-cozy, gradientes vibrantes, hero lateral) e **layout-2** (Cozy Focus, tipografia estruturada, cards generosos). Dark-only por padrão — o produto é foco noturno e privacidade.

## Decisões de mesclagem

| Aspecto | Layout 1 | Layout 2 | Decisão unificada | Justificativa |
|---------|----------|----------|-------------------|---------------|
| Fundo base | `#0e1416` | `#0b0f10` | `#0b0f10` | Mais profundo; reduz fadiga visual |
| Shader hero | Grid hexagonal WebGL | Mesh noise suave | **Mesh gradient Canvas 2D** | Orgânico, performático, alinhado ao brief |
| Botão primário | Gradiente red→pink | Sólido `#D63031` | **Gradiente** `primary-container → secondary` | Mais energia de marca sem perder legibilidade |
| Border radius cards | `rounded-2xl` (24px) | `rounded-3xl` (24px) | **`rounded-2xl` (16px)** cards, **`rounded-3xl`** hero/feature destaque | Equilíbrio: acolhedor sem exagero |
| Botões / pills | `rounded-full` | `rounded-full` | **`rounded-full`** | Consistente em ambos |
| Nav | Margens 64px desktop | `h-20`, padding 24px | **Sticky glass** + `max-w-7xl` + blur | Layout-2 estrutura + layout-1 transparência |
| Secondary accent | Pink quente `#ffb3b0` | Lavanda `#c5c5d8` | **Lavanda** como secondary | Contraste mais calmo para corpo UI |
| Display weight | 800 | 700 | **800** desktop, **700** mobile | Impacto editorial no hero |
| Espaçamento seções | `space-y-32` | `stack-lg` 48px | **`section-py` 80px** desktop, **56px** mobile | Respiração generosa sem excesso |

---

## Paleta de cores

### Brand

| Token | Hex | Uso |
|-------|-----|-----|
| `brand-red` | `#D63031` | CTA sólido, ícones ativos, Mussum Red |
| `brand-red-soft` | `#FFB3AD` | Texto primary em dark, highlights |
| `brand-pink` | `#FF9996` | Gradiente primário (fim) |
| `brand-accent` | `#E84393` | Glows e acentos raros |

### Superfícies (Material 3 adaptado)

| Token CSS | Hex | Tailwind |
|-----------|-----|----------|
| `--background` | `#0b0f10` | `bg-background` |
| `--foreground` | `#e0e3e5` | `text-foreground` |
| `--card` | `#12131a` @ 60% | `bg-card` |
| `--card-foreground` | `#e0e3e5` | `text-card-foreground` |
| `--popover` | `#1d2022` @ 80% | `bg-popover` |
| `--primary` | `#ffb3ad` | `text-primary` / decorativo |
| `--primary-foreground` | `#fff5f4` | texto sobre vermelho |
| `--secondary` | `#c5c5d8` | `text-secondary` |
| `--secondary-foreground` | `#191b28` | |
| `--muted` | `#323537` | `bg-muted` |
| `--muted-foreground` | `#ab8985` | `text-muted-foreground` |
| `--accent` | `#1e202e` | `bg-accent` |
| `--accent-foreground` | `#e0e3e5` | |
| `--destructive` | `#ffb4ab` | erros |
| `--border` | `rgba(255,255,255,0.1)` | `border-border` |
| `--input` | `rgba(255,255,255,0.15)` | |
| `--ring` | `#d63031` | focus ring |

### Feedback

| Token | Hex | Uso |
|-------|-----|-----|
| `--success` | `#6ee7b7` | confirmações |
| `--warning` | `#fbbf24` | avisos RC/unsigned |
| `--error` | `#ffb4ab` | erros |

### Glass

```css
--glass-bg: rgba(18, 19, 26, 0.55);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-blur: 20px;
```

---

## Tipografia

**Família:** Plus Jakarta Sans (Google Fonts) — única família em todos os níveis.

| Token | Size | Weight | Line-height | Letter-spacing | Classe Tailwind |
|-------|------|--------|-------------|----------------|-----------------|
| `text-display` | 48px / 36px mob | 800 / 700 mob | 1.1 | -0.02em | `text-display` |
| `text-headline-lg` | 32px / 28px mob | 700 | 1.25 | -0.01em | `text-headline-lg` |
| `text-headline-md` | 24px | 600 | 1.33 | 0 | `text-headline-md` |
| `text-body-lg` | 18px | 400 | 1.56 | 0 | `text-body-lg` |
| `text-body-md` | 16px | 400 | 1.5 | 0 | `text-body-md` |
| `text-label-md` | 14px | 600 | 1.25 | 0.04em | `text-label-md` |
| `text-label-sm` | 12px | 500 | 1.33 | 0.04em | `text-label-sm` |
| `text-xs` | 12px | 400 | 1.33 | 0 | `text-xs` |

---

## Espaçamento (grid 8px)

| Token | Valor | Tailwind |
|-------|-------|----------|
| `space-1` | 4px | `1` |
| `space-2` | 8px | `2` |
| `space-3` | 12px | `3` |
| `space-4` | 16px | `4` |
| `space-6` | 24px | `6` |
| `space-8` | 32px | `8` |
| `space-12` | 48px | `12` |
| `space-16` | 64px | `16` |
| `space-20` | 80px | `20` |
| `container-padding` | 16px mob / 24px tab+ | `px-container` |
| `section-gap` | 56px mob / 80px desk | `py-section` |
| `container-max` | 1280px | `max-w-7xl` |

---

## Border radius

| Token | Valor | Uso |
|-------|-------|-----|
| `radius-sm` | 4px | chips pequenos |
| `radius-md` | 8px | inputs, checkboxes |
| `radius-lg` | 12px | botões secundários |
| `radius-xl` | 16px | cards padrão |
| `radius-2xl` | 24px | cards destaque, modais |
| `radius-full` | 9999px | pills, CTAs |

Tailwind/shadcn: `--radius: 0.75rem` (12px base), extend com `rounded-xl`, `rounded-2xl`, `rounded-3xl`.

---

## Sombras e elevação

| Nível | Estilo |
|-------|--------|
| 0 Base | Mesh gradient animado, sem sombra |
| 1 Card glass | `inset 0 1px 0 rgba(255,255,255,0.05)`, border `white/10` |
| 2 Elevated | `0 8px 32px rgba(0,0,0,0.4)` |
| 3 CTA glow | `0 4px 20px rgba(214,48,49,0.25)` |
| 4 Modal | `0 16px 48px rgba(0,0,0,0.5)` + blur 24px |

---

## Animação

| Token | Valor | Uso |
|-------|-------|-----|
| `duration-fast` | 150ms | hovers micro |
| `duration-normal` | 200ms | transições padrão |
| `duration-slow` | 300ms | cards, reveal |
| `duration-slower` | 500ms | hero parallax |
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | geral |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | entradas suaves |

**Regras:** `prefers-reduced-motion` desativa mesh, parallax e scroll-reveal. Hover em cards: `opacity/border-color`, não `scale` que cause layout shift (máx. `scale-[1.02]` em containers isolados).

---

## Breakpoints

| Nome | Min-width | Colunas |
|------|-----------|---------|
| `sm` | 640px | 4 |
| `md` | 768px | 8 |
| `lg` | 1024px | 12 |
| `xl` | 1280px | 12 (max container) |
| `2xl` | 1536px | 12 |

---

## Componentes

### Botão primário
Gradiente `from-primary-container to-brand-pink`, texto branco, `rounded-full`, shadow glow, `hover:brightness-110`.

### Botão secundário (glass)
`bg-glass`, `border border-border`, `backdrop-blur-glass`, hover `bg-white/10`.

### Card
`bg-card/60 backdrop-blur-glass border border-border rounded-xl p-6 md:p-8`.

### Nav
Fixo topo, `bg-background/40 backdrop-blur-glass border-b border-border`, altura 64px mob / 72px desk.

### Section heading
`text-headline-lg text-foreground` + subtítulo `text-body-lg text-muted-foreground`.

---

## Mapeamento shadcn/ui

Variáveis em `src/index.css` dentro de `@theme` e `:root`. Componentes shadcn consomem `--background`, `--foreground`, `--primary`, `--card`, `--border`, `--ring`, `--radius`.

**Nunca** usar hex solto no JSX — apenas classes semânticas (`text-foreground`, `bg-primary-container`, `text-muted-foreground`) ou tokens custom (`text-display`, `py-section`).

---

## Anti-patterns

- Emojis como ícones → Lucide SVG
- `border-white/10` em light (N/A — dark only)
- Hex grid shader (muito “cyber”, conflita com cozy)
- Texto body em `slate-400` equivalente — mínimo `muted-foreground`
- Nav colado em `top-0` sem padding visual em mobile
