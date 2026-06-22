# Geração de assets — LazyNevis Landing

Instruções para produzir favicons, manifest icons, OG image e logo de header a partir dos arquivos oficiais do repositório principal.

## Fontes oficiais

No repositório **[SimStm/lazy-nevis](https://github.com/SimStm/lazy-nevis)** ou na pasta local `public/logo/`:

```bash
cp public/logo/logo-light.png ./source-logo.png
cp public/logo/icon-light.png ./source-icon.png
```

> **Nota macOS:** neste ambiente `magick` é GraphicsMagick. Use `magick convert` (não apenas `magick`).

Use `logo-light.png` para header (fundo escuro da landing) ou exporte SVG se disponível.

---

## Opção A — sharp (recomendado, Node.js)

### Instalação

```bash
pnpm add -D sharp
```

### Script completo (GraphicsMagick / `magick convert`)

```bash
# Header logo
magick convert public/logo/logo-light.png -resize x36 -quality 90 src/assets/brand/logo-header.webp
magick convert public/logo/logo-light.png -resize x36 src/assets/brand/logo-header.png

# Hero icon
magick convert public/logo/icon-light.png -resize 512x512 -quality 90 src/assets/brand/app-icon.webp

# Favicons
magick convert public/logo/icon-light.png -background "#0b0f10" -gravity center -resize 16x16 -extent 16x16 public/favicon-16x16.png
magick convert public/logo/icon-light.png -background "#0b0f10" -gravity center -resize 32x32 -extent 32x32 public/favicon-32x32.png
# ... 180, 192, 512 idem

# Screenshots → WebP
mkdir -p public/screenshots/webp
for f in public/screenshots/app/*.png; do
  base=$(basename "$f" .png)
  magick convert "$f" -quality 82 "public/screenshots/webp/${base}.webp"
done
```

### favicon.ico multi-resolução (ImageMagick)

```bash
brew install imagemagick   # macOS
# ou: sudo apt install imagemagick

magick source-icon.png -define icon:auto-resize=16,32,48 public/favicon.ico
```

---

## Opção B — ImageMagick (sem Node)

```bash
# PNGs individuais
for SIZE in 16 32 180 192 512; do
  magick source-icon.png -resize ${SIZE}x${SIZE} -background "#0b0f10" -gravity center -extent ${SIZE}x${SIZE} public/favicon-${SIZE}x${SIZE}.png
done

magick source-icon.png -define icon:auto-resize=16,32,48 public/favicon.ico
magick source-icon.png -resize x36 src/assets/brand/logo-header.png

# OG 1200×630
magick -size 1200x630 xc:"#0b0f10" \
  \( source-icon.png -resize 200x200 \) -geometry +500+215 -composite \
  -gravity south -fill white -pointsize 48 -annotate +0+80 "LazyNevis" \
  public/og-image.png
```

---

## Opção C — Ferramentas online

1. [realfavicongenerator.net](https://realfavicongenerator.net/) — upload `app-icon.png`, baixe pacote completo
2. [og-image.vercel.app](https://og-image.vercel.app/) ou Figma frame 1200×630 para `og-image.png`

Coloque arquivos em `public/` e atualize `site.webmanifest` se nomes diferirem.

---

## Checklist pós-geração

| Arquivo | Destino | Dimensões |
|---------|---------|-----------|
| `favicon.ico` | `public/` | 16, 32, 48 |
| `favicon-16x16.png` | `public/` | 16×16 |
| `favicon-32x32.png` | `public/` | 32×32 |
| `favicon-192x192.png` | `public/` | 192×192 |
| `favicon-512x512.png` | `public/` | 512×512 |
| `apple-touch-icon.png` | `public/` | 180×180 |
| `og-image.png` | `public/` | 1200×630 |
| `logo-header.png` | `src/assets/brand/` | altura 32–40px |
| `site.webmanifest` | `public/` | referenciar 192 e 512 |

## Otimização

- PNG: `pngquant` ou sharp `compressionLevel: 9`
- WebP: qualidade 80–85 para ícones grandes
- OG: manter < 300 KB para WhatsApp/Twitter
- Não commitar PNGs source sem compressão

## Atualizar imports no código

Após gerar `logo-header.png`:

```tsx
import logo from '@/assets/brand/logo-header.png'
```

Substitua referências a `logo.svg` em `Header.tsx`, `Footer.tsx`, `Hero.tsx` se usar PNG oficial.

## Screenshots reais

```bash
cp /tmp/lazy-nevis/docs/screenshots/*.png public/screenshots/
```

Atualize `SCREENSHOTS` em `src/data/content.ts` com paths, dimensões e `alt` descritivos.
