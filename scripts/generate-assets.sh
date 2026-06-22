#!/usr/bin/env bash
# Gera favicons, logo de header, ícone do hero, OG image e WebPs de screenshots.
# Requer ImageMagick 7+ (magick) ou GraphicsMagick (magick convert / gm convert).
#
# Uso:
#   ./scripts/generate-assets.sh
#   bash scripts/generate-assets.sh

set -euo pipefail

# ─── Imagens de origem (edite aqui) ───────────────────────────────────────────

SOURCE_LOGO="public/logo/logo-light.png"
SOURCE_ICON="public/logo/icon-dark.png"

# Screenshots PNG → WebP (deixe vazio para pular)
SOURCE_SCREENSHOTS_DIR="public/screenshots/app"

# OG image: use arquivo customizado (true) ou gere a partir do logo (false)
USE_CUSTOM_OG_IMAGE=true
OG_CUSTOM_IMAGE="public/logo/lazynevis-og-image-v2.png"

# ─── Parâmetros de saída ──────────────────────────────────────────────────────

LOGO_HEADER_HEIGHT=100
APP_ICON_SIZE=512
OG_WIDTH=1200
OG_HEIGHT=630
OG_ICON_SIZE=500
OG_TITLE="LazyNevis"
BG_COLOR="#0b0f10"

WEBP_QUALITY=90
SCREENSHOT_WEBP_QUALITY=82
OG_PNG_QUALITY=82

# ─── Destinos (relativos à raiz do repo) ──────────────────────────────────────

OUT_BRAND_DIR="src/assets/brand"
OUT_PUBLIC_DIR="public"
OUT_SCREENSHOTS_WEBP_DIR="public/screenshots/webp"

# ─── Runtime ──────────────────────────────────────────────────────────────────

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

IM_BACKEND=""
IM_CMD=()

die() {
  echo "erro: $*" >&2
  exit 1
}

info() {
  echo "→ $*"
}

detect_imagemagick() {
  local magick_bin gm_bin convert_bin

  magick_bin="$(command -v magick 2>/dev/null || true)"
  if [[ -n "$magick_bin" ]]; then
    if "$magick_bin" -version 2>/dev/null | grep -qi 'ImageMagick'; then
      IM_BACKEND="ImageMagick 7"
      IM_CMD=("$magick_bin")
      return 0
    fi
    if "$magick_bin" -version 2>/dev/null | grep -qi 'GraphicsMagick'; then
      IM_BACKEND="GraphicsMagick (magick convert)"
      IM_CMD=("$magick_bin" convert)
      return 0
    fi
    if "$magick_bin" identify -version 2>/dev/null | grep -qi 'ImageMagick'; then
      IM_BACKEND="ImageMagick 7"
      IM_CMD=("$magick_bin")
      return 0
    fi
  fi

  gm_bin="$(type -P gm 2>/dev/null || true)"
  if [[ -n "$gm_bin" ]] && "$gm_bin" version 2>/dev/null | grep -qi 'GraphicsMagick'; then
    IM_BACKEND="GraphicsMagick (gm convert)"
    IM_CMD=("$gm_bin" convert)
    return 0
  fi

  convert_bin="$(command -v convert 2>/dev/null || true)"
  if [[ -n "$convert_bin" ]] && "$convert_bin" -version 2>/dev/null | grep -qi 'ImageMagick'; then
    IM_BACKEND="ImageMagick 6 (convert)"
    IM_CMD=("$convert_bin")
    return 0
  fi

  return 1
}

img() {
  "${IM_CMD[@]}" "$@"
}

require_source() {
  local path="$1"
  local label="$2"
  [[ -f "$path" ]] || die "arquivo de origem não encontrado ($label): $path"
}

favicon_png() {
  local size="$1"
  local out="$2"
  img "$SOURCE_ICON" \
    -background "$BG_COLOR" \
    -gravity center \
    -resize "${size}x${size}" \
    -extent "${size}x${size}" \
    "$out"
}

generate_favicon_ico() {
  local out="$OUT_PUBLIC_DIR/favicon.ico"

  if [[ "$IM_BACKEND" == ImageMagick* ]]; then
    info "favicon.ico (multi-resolução)"
    img "$SOURCE_ICON" \
      -background "$BG_COLOR" \
      -gravity center \
      -define icon:auto-resize=16,32,48 \
      "$out"
    return
  fi

  info "favicon.ico (fallback 32×32 — GraphicsMagick)"
  cp "$OUT_PUBLIC_DIR/favicon-32x32.png" "$out"
}

generate_og_image() {
  local out="$OUT_PUBLIC_DIR/og-image.png"

  if [[ "$USE_CUSTOM_OG_IMAGE" == true ]]; then
    require_source "$OG_CUSTOM_IMAGE" "OG image customizada"
    info "og-image.png (${OG_WIDTH}×${OG_HEIGHT}) — custom: $OG_CUSTOM_IMAGE"
    img "$OG_CUSTOM_IMAGE" \
      -strip \
      -resize "${OG_WIDTH}x${OG_HEIGHT}^" \
      -gravity center \
      -extent "${OG_WIDTH}x${OG_HEIGHT}" \
      -quality "$OG_PNG_QUALITY" \
      "$out"
    return
  fi

  local x=$(( (OG_WIDTH - OG_ICON_SIZE) / 2 ))
  local y=$(( (OG_HEIGHT - OG_ICON_SIZE) ))
  local image="$SOURCE_LOGO"

  info "og-image.png (${OG_WIDTH}×${OG_HEIGHT}) — gerada"

  if [[ "$IM_BACKEND" == ImageMagick* ]]; then
    img -size "${OG_WIDTH}x${OG_HEIGHT}" "xc:${BG_COLOR}" \
      \( "$image" -resize "${OG_ICON_SIZE}x${OG_ICON_SIZE}" \) \
      -geometry "+${x}+${y}" -composite \
      -gravity south \
      -fill white \
      -pointsize 48 \
      -annotate +0+80 "$OG_TITLE" \
      "$out"
    return
  fi

  local tmp_bg tmp_icon composite_bin
  tmp_bg="$(mktemp "${TMPDIR:-/tmp}/lazynevis-og-bg.XXXXXX")"
  tmp_icon="$(mktemp "${TMPDIR:-/tmp}/lazynevis-og-icon.XXXXXX")"
  tmp_bg="${tmp_bg}.png"
  tmp_icon="${tmp_icon}.png"

  img -size "${OG_WIDTH}x${OG_HEIGHT}" "xc:${BG_COLOR}" "$tmp_bg"
  img "$image" -resize "${OG_ICON_SIZE}x${OG_ICON_SIZE}" "$tmp_icon"

  composite_bin="$(command -v magick 2>/dev/null || true)"
  if [[ -n "$composite_bin" ]]; then
    "$composite_bin" composite -geometry "+${x}+${y}" "$tmp_icon" "$tmp_bg" "$out"
  else
    "$(type -P gm)" composite -geometry "+${x}+${y}" "$tmp_icon" "$tmp_bg" "$out"
  fi

  rm -f "$tmp_bg" "$tmp_icon"
}

generate_screenshots_webp() {
  local dir="$SOURCE_SCREENSHOTS_DIR"
  local count=0

  [[ -n "$dir" ]] || return 0
  [[ -d "$dir" ]] || {
    info "screenshots: diretório ausente, pulando ($dir)"
    return 0
  }

  mkdir -p "$OUT_SCREENSHOTS_WEBP_DIR"

  shopt -s nullglob
  local files=("$dir"/*.png "$dir"/*.PNG "$dir"/*.jpg "$dir"/*.jpeg)
  shopt -u nullglob

  if ((${#files[@]} == 0)); then
    info "screenshots: nenhum PNG/JPEG em $dir"
    return 0
  fi

  for f in "${files[@]}"; do
    local base
    base="$(basename "$f")"
    base="${base%.*}"
    img "$f" -quality "$SCREENSHOT_WEBP_QUALITY" "$OUT_SCREENSHOTS_WEBP_DIR/${base}.webp"
    count=$((count + 1))
  done

  info "screenshots: $count arquivo(s) → $OUT_SCREENSHOTS_WEBP_DIR/"
}

main() {
  detect_imagemagick || die "ImageMagick/GraphicsMagick não encontrado. Instale com: brew install graphicsmagick (ou brew install imagemagick)"

  echo "LazyNevis — generate-assets"
  echo "backend: $IM_BACKEND"
  echo "og:      $([ "$USE_CUSTOM_OG_IMAGE" == true ] && echo "custom ($OG_CUSTOM_IMAGE)" || echo "gerada")"
  echo "raiz:    $ROOT"
  echo

  require_source "$SOURCE_LOGO" "logo do header"
  require_source "$SOURCE_ICON" "ícone do app"

  mkdir -p "$OUT_BRAND_DIR" "$OUT_PUBLIC_DIR"

  info "logo-header (${LOGO_HEADER_HEIGHT}px altura)"
  img "$SOURCE_LOGO" -resize "x${LOGO_HEADER_HEIGHT}" -quality "$WEBP_QUALITY" \
    "$OUT_BRAND_DIR/logo-header.webp"
  img "$SOURCE_LOGO" -resize "x${LOGO_HEADER_HEIGHT}" \
    "$OUT_BRAND_DIR/logo-header.png"

  info "app-icon (${APP_ICON_SIZE}×${APP_ICON_SIZE})"
  img "$SOURCE_ICON" -resize "${APP_ICON_SIZE}x${APP_ICON_SIZE}" -quality "$WEBP_QUALITY" \
    "$OUT_BRAND_DIR/app-icon.webp"
  img "$SOURCE_ICON" -resize "${APP_ICON_SIZE}x${APP_ICON_SIZE}" \
    "$OUT_BRAND_DIR/app-icon.png"

  info "favicons PNG"
  favicon_png 16 "$OUT_PUBLIC_DIR/favicon-16x16.png"
  favicon_png 32 "$OUT_PUBLIC_DIR/favicon-32x32.png"
  favicon_png 180 "$OUT_PUBLIC_DIR/apple-touch-icon.png"
  favicon_png 192 "$OUT_PUBLIC_DIR/favicon-192x192.png"
  favicon_png 512 "$OUT_PUBLIC_DIR/favicon-512x512.png"

  generate_favicon_ico
  generate_og_image
  generate_screenshots_webp

  echo
  echo "Concluído. Arquivos gerados:"
  echo "  $OUT_BRAND_DIR/logo-header.{webp,png}"
  echo "  $OUT_BRAND_DIR/app-icon.{webp,png}"
  echo "  $OUT_PUBLIC_DIR/favicon*.{png,ico}"
  echo "  $OUT_PUBLIC_DIR/apple-touch-icon.png"
  echo "  $OUT_PUBLIC_DIR/og-image.png"
  [[ -d "$OUT_SCREENSHOTS_WEBP_DIR" ]] && echo "  $OUT_SCREENSHOTS_WEBP_DIR/*.webp"
}

main "$@"
