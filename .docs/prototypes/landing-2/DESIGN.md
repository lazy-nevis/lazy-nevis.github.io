---
name: Cozy Focus
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#e4beba'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#ab8985'
  outline-variant: '#5b403d'
  surface-tint: '#ffb3ad'
  primary: '#ffb3ad'
  on-primary: '#680009'
  primary-container: '#d63031'
  on-primary-container: '#fff5f4'
  inverse-primary: '#ba1921'
  secondary: '#c5c5d8'
  on-secondary: '#2e2f3e'
  secondary-container: '#464858'
  on-secondary-container: '#b6b7ca'
  tertiary: '#c5c6cf'
  on-tertiary: '#2e3037'
  tertiary-container: '#707179'
  on-tertiary-container: '#f7f7ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb3ad'
  on-primary-fixed: '#410003'
  on-primary-fixed-variant: '#930011'
  secondary-fixed: '#e1e1f4'
  secondary-fixed-dim: '#c5c5d8'
  on-secondary-fixed: '#191b28'
  on-secondary-fixed-variant: '#444655'
  tertiary-fixed: '#e2e2eb'
  tertiary-fixed-dim: '#c5c6cf'
  on-tertiary-fixed: '#191b22'
  on-tertiary-fixed-variant: '#45464e'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  gutter: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system is centered on the concept of "Cozy Focus"—a sanctuary for productivity and digital leisure. It balances the high-energy "Mussum Red" primary accent with a foundation of deep, ink-like charcoals and muted navy tones. The personality is approachable but sophisticated, evoking the feeling of a dimly lit, modern library or a high-end tech lounge.

The visual style is a fusion of **Modern Minimalism** and **Subtle Glassmorphism**. We utilize deep background layers to minimize eye strain while using high-contrast typography and semi-transparent "frosted" containers to create a sense of tactile depth without visual clutter.

## Colors
The palette is optimized for a superior dark-mode experience.

- **Primary (Mussum Red):** Used sparingly for critical calls to action, active states, and brand identifiers. It provides the "spark" within the dark environment.
- **Surface Foundations:** We use `#0C0E14` (Deep Navy) for the base background and `#12131A` (Charcoal) for primary content containers. 
- **Accents:** Secondary surfaces use a slightly lighter `#1E202E` to create distinction in layered UI.
- **Typography:** Primary text uses `#F8FAFC` (Off-white) to ensure high readability without the harshness of pure white. Muted text uses a desaturated slate tint to recede into the background.

## Typography
Plus Jakarta Sans is the sole typeface, chosen for its clean, geometric bones and warm, humanist terminals. 

- **Hierarchy:** We use generous font weights (600-700) for headlines to provide structural anchors.
- **Readability:** Body text is set with slightly increased line heights to enhance the "Cozy" feel, ensuring the eye can glide across content easily.
- **Micro-copy:** Labels and captions use medium weights with slight letter spacing to maintain legibility against dark backgrounds.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a maximum content width of 1280px for desktop. 

- **Desktop (1024px+):** 12-column grid, 24px gutters, 40px side margins.
- **Tablet (768px - 1023px):** 8-column grid, 16px gutters, 24px side margins.
- **Mobile (Up to 767px):** 4-column grid, 16px gutters, 16px side margins.

We employ a "Generous Spacing" philosophy. Vertical stack margins (48px+) are used between major sections to prevent the UI from feeling cramped, reinforcing the calm, focused nature of the system.

## Elevation & Depth
Depth is created through **Backdrop Blurs** and **Tonal Layering** rather than traditional heavy shadows.

- **Level 0 (Base):** Deep Navy (`#0C0E14`).
- **Level 1 (Card/Surface):** Charcoal (`#12131A`) with a subtle 1px inner border of 10% white to define edges.
- **Level 2 (Modals/Popovers):** Semi-transparent Charcoal (80% opacity) with a 20px Backdrop Blur.
- **Overlays:** A very faint glow effect using the Primary Red at 5% opacity may be used behind focused elements to provide a "halo" of depth.

## Shapes
The shape language is defined by "Generous Roundness." All primary containers, cards, and buttons utilize a `rounded-2xl` (1rem / 16px) radius. 

Smaller utility elements like tags or checkboxes should scale down to `rounded-lg` (8px). This consistent curvature softens the interface, making the dark mode feel inviting rather than cold or clinical.

## Components

### Buttons
- **Primary:** Solid Mussum Red (`#D63031`) with White text. High-radius corners.
- **Secondary:** Glass-style with a 10% white fill and 20px backdrop blur. 1px white border at 15% opacity.
- **Ghost:** No background, primary red text, 600 weight.

### Input Fields
- Background uses the Secondary color (`#1E202E`).
- Borders are 1px solid at 10% white, turning into 2px Primary Red on focus.
- Placeholder text is desaturated navy-grey.

### Cards
- Surface: `#12131A`.
- Corner Radius: 16px.
- Hover State: Subtle scale-up (1.02x) and an increase in the inner border brightness.

### Chips & Tags
- Pill-shaped with a dark secondary background.
- Active state uses a desaturated version of the Primary Red for a softer look.

### Checkboxes & Radios
- Custom styled with 4px radius for checkboxes.
- Checked state is fully Primary Red with a white checkmark icon.