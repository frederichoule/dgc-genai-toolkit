# UI Guide

Design system and component reference for DGC AI. Keep this file in sync whenever tokens, components, or shared patterns change.

## Stack

- **Framework**: SvelteKit 2, Svelte 5 (runes mode enforced)
- **Styling**: TailwindCSS v4 via `@tailwindcss/vite`
- **Plugins**: `@tailwindcss/forms`, `@tailwindcss/typography`
- **Icons**: `lucide-svelte`
- **i18n**: Paraglide (`$lib/paraglide`)
- **Components live in**: `src/lib/components/`
- **Theme tokens live in**: `src/routes/layout.css` (`@theme` block)

## Typography

Primary typeface: **Figtree** (Google Fonts). Loaded via `@import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap')` at the top of `src/routes/layout.css`. It's a variable font, so any weight from `300` to `900` (upright or italic) is available.

The theme token `--font-sans` resolves to `'Figtree', system-ui, -apple-system, sans-serif`, and `body` inherits it — so all text is Figtree by default.

## Theme tokens

Defined in `src/routes/layout.css`. All tokens are exposed as Tailwind utilities (e.g. `bg-background`, `text-text-primary`, `text-brand-lime`).

### Colors

| Token                     | Value     | Tailwind class examples                        |
| ------------------------- | --------- | ---------------------------------------------- |
| `--color-background`      | `#060e08` | `bg-background`                                |
| `--color-background-soft` | `#0b150f` | `bg-background-soft` (footer, raised surfaces) |
| `--color-text-primary`    | `#ffffff` | `text-text-primary`                            |
| `--color-text-secondary`  | `#e6e7e6` | `text-text-secondary`                          |
| `--color-text-tertiary`   | `#b4b7b5` | `text-text-tertiary`                           |
| `--color-brand-lime`      | `#cff154` | `text-brand-lime`, `ring-brand-lime`           |
| `--color-brand-mint`      | `#a6edb4` | `text-brand-mint`                              |
| `--color-brand-spring`    | `#60d086` | `text-brand-spring`                            |
| `--color-brand-forest`    | `#30b354` | `bg-brand-forest/20`, `border-brand-forest`    |

The site is dark-themed: `#060e08` background with white/near-white text and lime/forest green accents.

## Motion

- **Default transition**: `transition-colors` on interactive elements (links, buttons). No explicit duration — relies on Tailwind's default (**150ms**, ease `cubic-bezier(0.4, 0, 0.2, 1)`).
- When adding a new interactive element, prefer the same bare `transition-colors` so hover timing stays consistent across the app.

## Components

### `Button` — `src/lib/components/Button.svelte`

Reusable CTA. Polymorphic: renders `<a>` when `href` is provided, otherwise `<button>`.

#### Props

| Prop        | Type                              | Default    | Notes                                                                    |
| ----------- | --------------------------------- | ---------- | ------------------------------------------------------------------------ |
| `variant`   | `'white' \| 'outline'`            | `'white'`  | Visual style.                                                            |
| `size`      | `'sm' \| 'md' \| 'lg'`            | `'md'`     | Controls padding, font size, icon size, radius.                          |
| `href`      | `string`                          | —          | If set, renders `<a>`. Otherwise `<button>`.                             |
| `type`      | `'button' \| 'submit' \| 'reset'` | `'button'` | Only applied when rendering as `<button>`.                               |
| `disabled`  | `boolean`                         | `false`    | Anchors get `aria-disabled` + `tabindex="-1"` + pointer-events disabled. |
| `fullWidth` | `boolean`                         | `false`    | Stretches to container via `w-full`.                                     |
| `arrow`     | `boolean`                         | `false`    | Shows trailing `ArrowRight` from lucide.                                 |
| `icon`      | `Snippet`                         | —          | Custom trailing icon snippet. Overrides `arrow` when provided.           |
| `onclick`   | `(e: MouseEvent) => void`         | —          |                                                                          |
| `class`     | `string`                          | `''`       | Escape hatch for one-off overrides.                                      |
| `children`  | `Snippet` (required)              | —          | Label content.                                                           |

#### Variants

- **`white`** — `bg-white text-black hover:bg-white/90`. Primary CTA. Pairs well with `arrow`.
- **`outline`** — `bg-transparent text-text-tertiary border border-white/15 hover:text-text-primary hover:border-white/30`. Secondary CTA.

#### Sizes

| Size | Padding       | Text        | Icon     |
| ---- | ------------- | ----------- | -------- |
| `sm` | `px-4 py-2`   | `text-sm`   | `size-4` |
| `md` | `px-6 py-3.5` | `text-base` | `size-5` |
| `lg` | `px-8 py-5`   | `text-lg`   | `size-6` |

Buttons have **square corners** (no border radius) across all sizes.

#### Behavior

- Layout is `inline-flex items-center justify-between gap-6` — label sits left, icon (if any) is pushed to the right edge.
- Focus ring: `focus-visible:ring-2 focus-visible:ring-brand-lime` with `ring-offset-background`.
- Hover transitions use `transition-colors` (see Motion).

#### Usage

```svelte
<script>
	import Button from '$lib/components/Button.svelte';
</script>

<Button variant="white" arrow href="/calculator" fullWidth>Estimate your AI footprint</Button>

<Button variant="outline" href="/guide" fullWidth>Explore the Best Practices</Button>
```

### `Navbar` — `src/lib/components/Navbar.svelte`

Sticky top navigation. Dark background, responsive (desktop list + mobile hamburger). Uses Svelte 5 `$state` / `$derived` and Paraglide for i18n. Locale toggle swaps between `en`/`fr`.

- Default link: `text-text-secondary` → hover `text-text-primary` via `transition-colors`
- Active link: `text-text-primary` + `underline underline-offset-8 decoration-1`, plus `aria-current="page"`. Active state is determined by `page.url.pathname.endsWith(href)`.
- Logo mark: lime-on-forest square with `DGC` wordmark
- Mobile menu uses an inline SVG hamburger/close icon

### `Tooltip` — `src/lib/components/Tooltip.svelte`

Small info bubble anchored above a trigger button. Use next to form labels or anywhere a short explanation helps without cluttering the layout. Works identically on desktop (click) and mobile (tap) — opens on trigger click, dismisses on outside click or Escape.

#### Props

| Prop      | Type     | Default              | Notes                                                           |
| --------- | -------- | -------------------- | --------------------------------------------------------------- |
| `content` | `string` | — (required)         | Tooltip body text.                                              |
| `label`   | `string` | `'More information'` | `aria-label` for the trigger button. Localize when user-facing. |

#### Behavior

- Renders an `Info` icon (lucide) as the trigger. Sized `16`, `strokeWidth={1.75}`, `text-text-tertiary` → hover `text-text-primary`.
- Bubble positions above the trigger (`bottom-full`, centred), with a rotated-square down-arrow.
- Bubble width clamps to `min(20rem, 100vw − 2rem)` so it stays inside the viewport on mobile.
- Focus ring matches the rest of the app (`focus-visible:ring-2 focus-visible:ring-brand-lime`).

#### Usage

Standalone:

```svelte
<Tooltip content="Short explanation goes here." />
```

Most often passed via `Select.tooltip` — see below.

### `Select` — `src/lib/components/Select.svelte`

Styled `<select>` with a label. Passes the `tooltip` prop to render an info icon + `Tooltip` next to the label.

| Prop      | Type       | Default      | Notes                                             |
| --------- | ---------- | ------------ | ------------------------------------------------- |
| `id`      | `string`   | — (required) | `<select>` id + `<label for>` target.             |
| `label`   | `string`   | — (required) | Label text.                                       |
| `value`   | `string`   | — (required) | Bindable (`bind:value`).                          |
| `options` | `Option[]` | — (required) | `{ value, label }` list.                          |
| `tooltip` | `string`   | —            | When set, renders an info icon next to the label. |

### `Footer` — `src/lib/components/Footer.svelte`

Site-wide footer on `bg-background-soft`. Two-column layout: logo + eco-impact notice on the left, primary/secondary link columns on the right with a locale toggle below. A copyright line plus Legals / Privacy Policy links sit at the bottom. All strings go through Paraglide (`footer_*`, `nav_*`).

- Nav links use the same active-state treatment as `Navbar` (`text-text-primary` + `underline underline-offset-8 decoration-1`, `aria-current="page"`); default `text-text-secondary` → hover `text-text-primary`.
- Uses the same `isActive` helper pattern as `Navbar`.

## Conventions

- **Svelte 5 runes** only: `$props`, `$state`, `$derived`. No legacy `export let`, no stores for local state.
- **TypeScript**: `<script lang="ts">`. Props typed via a local `interface Props { ... }` passed to `$props()`.
- **Tailwind classes inline** — no scoped `<style>` blocks unless there's a clear reason.
- **Icons**: prefer `lucide-svelte` for new components. Existing inline SVGs (e.g. Navbar hamburger) can stay.
- **i18n**: user-facing strings go through Paraglide (`m.some_key`) and routes through `localizeHref(...)`.
- **Component files**: PascalCase `.svelte` files under `src/lib/components/`, imported via `$lib/components/Name.svelte`.
