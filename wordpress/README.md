# GOV.KAB WordPress theme

A native WordPress block theme for the GOV.KAB Government Design System.

## Theme location

Copy or mount `wp-content/themes/gov-kab` into a WordPress installation, then activate **GOV.KAB Government Design System** from **Appearance > Themes**.

## Gutenberg structure

- `theme.json`: editor settings, GOV.KAB palette, typography and layout tokens
- `templates/`: front page, pages, posts, archive and 404 templates
- `parts/`: reusable header and footer block template parts
- `patterns/`: reusable GOV.KAB hero and service entry-point patterns
- `assets/`: local GOV.KAB emblem and flags
- `style.css`: theme metadata and accessibility baseline
- `functions.php`: theme support, pattern category and font loading

The theme does not require a build step or a JavaScript framework. Gutenberg provides the editing experience directly in WordPress.
