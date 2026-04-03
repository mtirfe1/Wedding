# Meron & Tirhas — Wedding website

Static site on **GitHub Pages** — config in `js/wedding-config.js`, build with **Gulp**, responsive tweaks in `css/queries.css` (not compiled).

## Setup

```bash
npm install
npx gulp          # builds css/styles.min.css + js/scripts.min.js (what index.html loads)
npm run dev       # http://localhost:8080
```

Use `npm run watch` while editing Sass/JS. Before deploy: `npm run prepare:deploy` (build + checks).

## Customize

- **`js/wedding-config.js`** — copy, map, RSVP URL, calendar, social, `ogImage`, etc. Run **`npx gulp`** after changes (updates `scripts.min.js`).
- **`index.html`** — markup / sections not driven by config.
- **`sass/`** + **`css/queries.css`** — styles; run **`npx gulp`** after Sass edits.

## Deploy

Repo **Settings → Pages**: branch **`main`**, folder **`/`**. Push `main` to publish.

Keep **`.nojekyll`** at repo root if you use asset paths Jekyll might skip.

`mapsApiKey` and `googleAppsScriptUrl` are public in the browser — **restrict the Maps key** (HTTP referrers) in Google Cloud Console.

## License

GPL-3.0 — see `LICENSE`.
