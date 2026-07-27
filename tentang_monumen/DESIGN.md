---
name: Modern Historical AR
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fd'
  on-surface: '#0b1c2f'
  on-surface-variant: '#44474e'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#485f82'
  primary: '#001128'
  on-primary: '#ffffff'
  primary-container: '#0b2646'
  on-primary-container: '#778eb3'
  inverse-primary: '#b0c8f0'
  secondary: '#1f5fa7'
  on-secondary: '#ffffff'
  secondary-container: '#7ab0fd'
  on-secondary-container: '#00427d'
  tertiary: '#00131c'
  on-tertiary: '#ffffff'
  tertiary-container: '#002939'
  on-tertiary-container: '#0097c9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#b0c8f0'
  on-primary-fixed: '#001c3b'
  on-primary-fixed-variant: '#304869'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#a6c8ff'
  on-secondary-fixed: '#001c3b'
  on-secondary-fixed-variant: '#004787'
  tertiary-fixed: '#c2e8ff'
  tertiary-fixed-dim: '#76d1ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004d67'
  background: '#f8f9ff'
  on-background: '#0b1c2f'
  surface-variant: '#d3e4fd'
typography:
  display-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  page-title:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  section-title:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  button-text:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  display-bold-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  safe-area-bottom: 34px
  gutter: 16px
  margin-mobile: 20px
---

## Brand & Style

The design system is engineered for "AR Monumen Mandala," an educational augmented reality platform that bridges the gap between historical heritage and futuristic technology. The brand personality is **scholarly yet innovative**, maintaining the gravity of Indonesian history while utilizing the excitement of immersive AR.

The visual style follows a **Corporate-Modern** aesthetic with **Glassmorphic** overlays specifically for the AR viewport. It prioritizes clarity and legibility to ensure that the educational content remains the focus. The user interface uses deep navies to establish authority, while vibrant cyan and blue accents represent the "digital lens" through which history is rediscovered. High-quality whitespace and structured grids ensure the experience feels professional and accessible to students and tourists alike.

## Colors

This design system utilizes a tiered blue palette to distinguish between physical history and digital interaction. 

- **Primary Navy (#0B2646)**: Used for the main brand identity, app bars, and high-level navigation.
- **Deep Navy (#061935)**: Primarily used at 70% opacity for AR overlays and scanning interfaces to ensure high contrast against real-world backgrounds.
- **AR Blue & Bright AR Blue**: Designated for interactive elements and call-to-actions. These colors signal "interactivity" within the AR space.
- **Surface Detection Cyan (#42BFF5)**: Reserved exclusively for technical AR feedback, such as plane detection dots, reticles, and scanning progress.
- **Semantic Colors**: Success, Warning, and Error colors follow standard patterns but are adjusted for high visibility on both light surfaces and dark AR overlays.

## Typography

The design system uses **Plus Jakarta Sans** for all interfaces. This typeface was chosen for its modern, geometric construction which provides excellent legibility on mobile screens and within 3D environments.

- **Headlines**: Use Bold (700) weight for Display and Page titles to create a strong information hierarchy.
- **Body**: Set in Regular (400) weight with generous line height (1.5x) to ensure historical narratives are easy to read.
- **Interactions**: Buttons and labels use Semibold (600) to distinguish interactive text from static informational text.
- **AR Context**: When text is displayed over the AR camera feed, it must use a subtle text shadow or be placed on a 70% opacity navy backing to maintain AAA contrast ratios.

## Layout & Spacing

This design system is optimized for a **360x800 dp Android frame**. It uses a fluid grid based on an **8px baseline scale**.

- **Grid System**: A 4-column layout for mobile with 16px gutters and 20px side margins.
- **Safe Areas**: Strict adherence to the top status bar (24dp) and bottom navigation bar/home indicator (typically 34dp). 
- **Unity Canvas Integration**: For AR views, UI elements are anchored to the screen corners with a minimum 24px inset to account for varying device aspect ratios and camera punch-holes.
- **Vertical Rhythm**: Content blocks are separated by 24px (lg) increments, while related internal elements use 8px (base) or 12px (sm) spacing.

## Elevation & Depth

Visual hierarchy is managed through **Tonal Layering** and **Glassmorphism**:

- **Standard UI**: Uses a flat design with subtle low-contrast outlines (1px #EEF3F8) for cards. High-elevation components like Bottom Sheets use a soft ambient shadow (Y: 4, Blur: 12, Opacity: 0.08) to suggest they sit above the map or AR view.
- **AR Overlays**: Depth is communicated via backdrop blurs (10px–15px) and 70% opacity Navy backgrounds. This "Glass" effect allows the user to remain aware of their physical surroundings while reading digital information.
- **Active State**: Primary buttons use a slight inner glow or brightness increase rather than heavy shadows to maintain a clean, professional look.

## Shapes

The design system uses a **Rounded** shape language to feel welcoming and modern.

- **Standard Containers**: All cards, input fields, and menu items use a **16px (1rem)** corner radius.
- **Bottom Sheets**: Top corners are rounded at 24px to emphasize the "drawer" metaphor.
- **Buttons**: Follow the 16px radius to match the primary container style, ensuring a cohesive block-based visual rhythm.
- **Scanning Reticle**: Uses a mix of rounded corners and circular elements to suggest technical precision.

## Components

- **Primary Buttons**: 48dp or 56dp height, utilizing **AR Blue (#185BA3)** with white text and a leading icon (24dp).
- **Feature & Collection Cards**: White surfaces with 1px borders and 16px rounded corners. Image aspect ratio is 16:9 for collections.
- **Draggable Bottom Sheets**: Use a handle (bar) at the top, 40x4px, rounded. They contain scrollable historical text or artifact details.
- **AR Reticle**: A centered, 42BFF5 (Cyan) frame with animated corner brackets indicating the scanning area.
- **Quiz Options**: Large, 56dp height selectable rows with 16px rounding. Neutral state is secondary surface; Success/Error states use full-color fills with white text.
- **Audio Player**: A compact floating bar with Play/Pause, Progress Slider, and "X" to close, using the 70% Navy glassmorphism style.
- **Notifications**: Toast-style popups that appear at the top of the screen, utilizing semantic colors (Success/Error) with high-contrast icons.