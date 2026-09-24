# RFK Design System

HTML/CSS/JavaScript reference for digital interfaces of the Federal Republic of Kabylia. The project presents an institutional documentation page with reusable components, public-service patterns, design tokens, and accessibility examples.

> **Status: reference prototype.** The page follows WCAG/RGAA-oriented practices, but it is not a conformance statement. Every production deployment must undergo accessibility, security, and content audits.

## Getting started

No installation or build step is required. From the repository root, start a local HTTP server:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000/Html%20Design%20System/index.html](http://localhost:8000/Html%20Design%20System/index.html).

Opening the HTML file directly may work for a demo, but a local server is recommended to reproduce normal website behavior and avoid local-file restrictions.

## Contents

- [Html Design System/index.html](Html%20Design%20System/index.html): interactive demo and documentation page.
- [rfk-tokens.css](rfk-tokens.css): colors, typography, spacing, radii, shadows, and themes.
- [rfk-components.css](rfk-components.css): component styling, layouts, responsive behavior, and accessibility states.
- [rfk-core.js](rfk-core.js): navigation interactions and behavioral components.
- [rfk-emblem.svg](rfk-emblem.svg), [rfk-flag-en.svg](rfk-flag-en.svg), [rfk-flag-fr.svg](rfk-flag-fr.svg), [rfk-flag-kab.svg](rfk-flag-kab.svg): local institutional assets.

Font dependencies are loaded from Google Fonts in the HTML page: Inter, Space Grotesk, Outfit, and Noto Sans Tifinagh. A local hosting strategy should be planned for deployments with availability or privacy requirements.

## Included features

- Responsive institutional header with primary navigation, mobile menu, search, and breadcrumbs.
- English, French, and Taqbaylit/Kabyle language selector with local preference persistence.
- Three appearances: light, dark, and high accessibility.
- Authentication, account creation, OTP, session expiration, and RFK digital identity patterns.
- Form patterns: live validation, address autocomplete, file upload, and autosave.
- Advanced search, filters, no-result states, tables, tabs, accordions, cards, notifications, and badges.
- Interactive components: native `dialog`, toast, cookie consent, printing, link copying, and feedback.
- Institutional footer with legal links, accessibility status, and multi-year plan.
- Desktop, tablet, and mobile responsive behavior, including `prefers-reduced-motion` support.

## Using the tokens

The HTML should load the tokens before the components:

```html
<link rel="stylesheet" href="rfk-tokens.css">
<link rel="stylesheet" href="rfk-components.css">
```

The main CSS variables are grouped by purpose:

- Colors: `--rfk-blue`, `--rfk-yellow`, `--rfk-red`, `--rfk-bg`, `--rfk-surface`, `--rfk-text`, `--rfk-border`.
- Typography: `--font-body`, `--font-heading`, `--font-heading-alt`, `--font-tifinagh`.
- Scale: `--s1` through `--s24`, plus `--fs-xs` through `--fs-display`.
- Shape and depth: `--r-sm` through `--r-xl`, plus `--shadow-sm` through `--shadow-lg`.

The theme is controlled with the `data-theme` attribute on the `html` element:

```html
<html data-theme="light">
```

Available values are `light`, `dark`, and `aaa`.

## JavaScript

The `rfk-core.js` file requires no framework. It initializes, among other things:

- theme and language persistence through `localStorage`;
- opening and closing menus, search, and accordions;
- focus return after closing a `dialog`;
- toasts and cookie consent;
- printing, link copying, tabs, and LTR/RTL direction tools.

To display a toast from an application script, the page exposes `window.rfkToast(message)` when the component is present.

## Accessibility

The demo includes a skip link, form labels, ARIA states, keyboard menu navigation, touch targets of at least 44 px, `:focus-visible` styles, and reduced-motion support. These mechanisms must be tested in the real context of each service.

Before publication, verify at least:

1. contrast and keyboard journeys with final content;
2. announcements with a screen reader;
3. form errors, loading states, and no-result cases;
4. data, upload, authentication, and consent security;
5. legal compliance and the accessibility audit result.

## Integration

The styles can be reused in a static website or adapted for WordPress and Drupal. Keep the tokens as the customization layer, then extend component classes in a dedicated stylesheet instead of changing the base values directly.

The project currently provides no npm package, bundler, or automated test suite. Verification is performed in a browser using accessibility tools and responsive tests targeting the journeys that are actually used.

## Version

The page displays reference **V12.10.5** and a last-updated date of **September 24, 2026**. Every component change should be accompanied by visual, keyboard, and responsive verification of the reference page.