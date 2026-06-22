---
name: Mussum Dark Mode
colors:
  surface: '#0e1416'
  surface-dim: '#0e1416'
  surface-bright: '#333a3c'
  surface-container-lowest: '#080f11'
  surface-container-low: '#161d1f'
  surface-container: '#1a2123'
  surface-container-high: '#242b2d'
  surface-container-highest: '#2f3638'
  on-surface: '#dde4e6'
  on-surface-variant: '#e4beba'
  inverse-surface: '#dde4e6'
  inverse-on-surface: '#2b3234'
  outline: '#ab8985'
  outline-variant: '#5b403d'
  surface-tint: '#ffb3ad'
  primary: '#ffb3ad'
  on-primary: '#680009'
  primary-container: '#d63031'
  on-primary-container: '#fff5f4'
  inverse-primary: '#ba1921'
  secondary: '#ffb3b0'
  on-secondary: '#680210'
  secondary-container: '#881d24'
  on-secondary-container: '#ff9996'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#727171'
  on-tertiary-container: '#faf6f6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb3ad'
  on-primary-fixed: '#410003'
  on-primary-fixed-variant: '#930011'
  secondary-fixed: '#ffdad8'
  secondary-fixed-dim: '#ffb3b0'
  on-secondary-fixed: '#410006'
  on-secondary-fixed-variant: '#881d24'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#0e1416'
  on-background: '#dde4e6'
  surface-variant: '#2f3638'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1280px
---

## Brand & Style

The design system is engineered for an immersive "tech-cozy" experience, blending the high-energy pulse of tech with the relaxed, effortless vibe suggested by the name. It strikes a balance between professional capability and playful accessibility. 

The aesthetic is heavily rooted in **Glassmorphism** and **Modern Dark Mode** principles. It utilizes translucent layers, vibrant background blurs, and smooth gradients to create depth. The interface feels like a series of luminous surfaces floating over a deep, shifting void. It is designed to feel high-end, contemporary, and visually stimulating while maintaining the "lazy" (effortless) usability that defines the brand.

## Colors

This design system uses a deep, multi-layered dark palette. The foundation is **Midnight Navy** (#0F1123) for background shaders, paired with **Deep Charcoal** (#121212) for primary surfaces. 

The hero color is **Mussum Red** (#D63031), a vibrant, high-energy red used for primary actions and brand identifiers. This is complemented by **Secondary Pink** (#FF7675) and **Accent Pink** (#E84393) to create smooth, warm-toned gradients that contrast sharply against the dark background. 

- **Surfaces:** Use semi-transparent variants of the neutral colors (15-40% opacity) for glass effects.
- **Accents:** Use gradients transitioning from Mussum Red to Accent Pink for high-intent UI elements.

## Typography

The typography utilizes **Plus Jakarta Sans** across all levels to maintain a cohesive, modern, and welcoming feel. The font's inherent roundness complements the shape language of the design system.

- **Headlines:** Use heavy weights (700-800) with tight letter spacing for a punchy, editorial look.
- **Body:** Use generous line heights (1.6x) to ensure readability against dark backgrounds.
- **Labels:** Use uppercase and increased letter spacing for small metadata or category labels to ensure clarity.

## Layout & Spacing

The layout philosophy follows a **fluid grid** model with a soft 8px rhythm. 

- **Desktop:** 12-column grid with 24px gutters and wide 64px margins to allow the background shaders to breathe.
- **Mobile:** 4-column grid with 16px margins.
- **Rhythm:** Elements are spaced using multiples of 8px. Use larger gaps (48px+) between major sections to emphasize the "minimalist" aspect of the tech-cozy aesthetic.
- **Alignment:** Content should feel centered and floating, avoiding edge-to-edge containers where possible to preserve the glassmorphic silhouette.

## Elevation & Depth

Depth is conveyed through **Backdrop Blurs** and **Tonal Layers** rather than heavy shadows.

1.  **Level 0 (Base):** Midnight Navy background with animated mesh gradients/shaders.
2.  **Level 1 (Cards/Containers):** Semi-transparent charcoal (#121212 at 40% opacity) with a `blur(20px)` backdrop filter and a thin 1px border (White at 10% opacity).
3.  **Level 2 (Modals/Popovers):** Higher opacity (#121212 at 80%) with a subtle glow shadow tinted in Mussum Red (#D63031 at 15% opacity, 30px blur).

Avoid pure black surfaces. Use the "inner glow" technique (a subtle top-left light border) to give glass elements a physical edge.

## Shapes

The shape language is defined by significant roundedness to mirror the friendly "bucket hat" logo and the "tech-cozy" narrative.

- **Primary Elements:** Buttons and Input fields use `rounded-lg` (1rem / 16px).
- **Cards:** Major containers use `rounded-xl` (1.5rem / 24px).
- **Icon Containers:** Small utility items or chips use circular/pill shapes.
- **Smoothness:** Always use "Squircle" (continuous corner) rounding if the platform supports it to enhance the premium feel.

## Components

### Buttons
- **Primary:** Solid Mussum Red to Pink gradient. Text is White. Heavy drop shadow in Red (20% opacity).
- **Secondary:** Glass-style. Transparent background, 1px white border (20% opacity), backdrop blur.
- **Interactive state:** On hover, buttons should "grow" slightly (scale 1.02) and increase glow intensity.

### Input Fields
- Dark transparent background (Charcoal at 20%).
- Bottom border only or full subtle border depending on context.
- Active state: Border transitions to Mussum Red with a subtle outer glow.

### Chips
- Pill-shaped. Use for tags or categories.
- Background: #2D3436 at 50% opacity.
- Text: Plus Jakarta Sans Bold, 12px.

### Cards
- Always use backdrop blur.
- Border: 1px linear gradient (Top-left: White 20% to Bottom-right: White 0%).
- Padding: 24px or 32px to maintain the "cozy" spacious feel.

### Selection Controls
- **Checkboxes/Radios:** Circular when active, filled with the primary red gradient.
- **Switches:** Use a soft "pill" track with a high-contrast white knob.