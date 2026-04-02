# Meron & Tirhas — Wedding website

Static wedding site: hero slideshow, story, events, engagement gallery, optional YouTube background, Google Map, RSVP via Google Apps Script → Google Sheet, “Add to calendar,” and optional Uber deep link. Hosted on **[GitHub Pages](https://pages.github.com/)** (no backend server).

| Document | Purpose |
|----------|---------|
| **This file (`README.md`)** | Setup, customize, build, deploy |
| **`MAINTENANCE.md`** | Runbook: nav/hero checks, predeploy, troubleshooting |
| **`CONTRIBUTING.md`** | How we commit and collaborate (course-style) |
| **`CHANGELOG.md`** | What changed between versions |
| **`LICENSE`** | GPL-3.0 (inherited from upstream template) |

**Upstream:** Based on [rampatra/wedding-website](https://github.com/rampatra/wedding-website) ([demo](http://wedding.rampatra.com/), [blog](https://blog.rampatra.com/wedding-website)).

---

## Requirements

- **Node.js** (build: Sass → CSS, minify JS)
- A local **HTTP server** for preview (`file://` is not supported for full behavior)

## Quick start

```bash
git clone <your-github-repo-url>.git
cd <your-repo-folder>
npm install
npx gulp
npm run dev
```

Open **http://localhost:8080**.

| Command | What it does |
|---------|----------------|
| `npx gulp` | Builds `css/styles.min.css` and `js/scripts.min.js` (what `index.html` loads) |
| `npm run dev` | Serves the site on port **8080** |
| `npm run watch` | Rebuilds on changes to `sass/**` and `js/scripts.js` |
| `npm run prepare:deploy` | `npx gulp` + predeploy checks (run before pushing to `main`) |

## Customize

1. Edit **`js/wedding-config.js`** — titles, dates, venue, map, calendar, RSVP URL, invite codes, Uber link, `ogImage`, etc.
2. Edit **`index.html`** for section copy not driven by config.
3. Styles: **`sass/styles.scss`** (compiled) and **`css/queries.css`** (hand-written breakpoints).
4. After changing **`wedding-config.js`**, `js/scripts.js`, Sass, or anything the minifier touches, run **`npx gulp`** before commit.

## Deploy (GitHub Pages)

1. Create the repo on GitHub and push branch **`main`** (or your default branch).
2. **Settings → Pages:** deploy from that branch, folder **`/` (root)**.
3. Keep **`.nojekyll`** at the repo root if you use filenames starting with `_` under `img/`.
4. After the site URL exists, set **`ogImage`** in `wedding-config.js` to a full **`https://...`** URL of an image on the live site; then `npx gulp`, commit, push.

**Security note:** `mapsApiKey` and `googleAppsScriptUrl` are public in the client bundle. Restrict the Maps API key by **HTTP referrer** in Google Cloud Console.

## Project layout (essentials)

| Path | Role |
|------|------|
| `index.html` | Main page |
| `js/wedding-config.js` | All configurable copy + integrations |
| `sass/` → `css/styles.min.css` | Main stylesheet (Gulp output) |
| `css/queries.css` | Responsive overrides (not compiled) |
| `js/scripts.js` → `js/scripts.min.js` | Behavior (Gulp output) |
| `img/`, `fonts/` | Images and icon fonts |
| `scripts/predeploy-check.js` | `npm run check:predeploy` |

## `package.json` metadata

**`repository`**, **`homepage`**, and **`bugs`** point at this site’s GitHub repo; if you fork or rename the repo, update those fields to match.

## License

See **`LICENSE`** (GPL-3.0).
