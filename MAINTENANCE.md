# Maintenance runbook — Meron & Tirhas wedding site

Safe workflow for edits, local testing, and GitHub Pages deploy. Pair with **`README.md`** (setup) and **`CONTRIBUTING.md`** (commits).

## Core rule

Prefer predictable CSS classes and one place per behavior (e.g. one nav toggle path). Avoid duplicate scroll/click handlers.

## Files you usually edit

| File | What to change |
|------|----------------|
| `js/wedding-config.js` | Names, dates, venue, Maps key, RSVP URL, invite codes, slideshow images, `ogImage`, Uber link |
| `index.html` | Section copy, structure |
| `sass/styles.scss` | Base layout and components |
| `css/queries.css` | Mobile / breakpoint overrides |

## Build and local preview

1. **Build**

   ```bash
   npx gulp
   ```

2. **Preview**

   ```bash
   npm run dev
   ```

   Open **http://localhost:8080**.

3. **Optional — watch mode**

   ```bash
   npm run watch
   ```

   Use a second terminal for `npm run dev` if you want live reload by manual refresh.

4. **Hard refresh** after CSS/JS changes (macOS: **Cmd + Shift + R**).

## Nav stability

- One source of truth: JS toggles `open` / `fixed`; CSS owns appearance.
- Do not duplicate click handlers on the same nav links.
- Avoid writing inline `style` on header/nav from scroll handlers.

## Hero

- Keep slideshow stacking below the fixed nav (z-index).
- After spacing changes, check desktop, iPhone width, and a common Android width.

## Before deploying to GitHub Pages

1. **`js/wedding-config.js`**
   - `mapsApiKey` — real key; restrict by referrer after URL is known
   - `googleAppsScriptUrl` — your Apps Script web app (or intentionally blank)
   - `validInviteCodes` — matches server-side validation
   - `heroSlideshow.images` — paths exist under `img/`
   - **`ogImage`** — after first deploy, set to a full `https://...` image URL on your live site (link previews)
2. Run **`npm run prepare:deploy`** (runs `npx gulp` + `scripts/predeploy-check.js`).
3. Test locally; check the browser console for errors.
4. Push to GitHub; verify the Pages URL on a real phone.

## Common problems

| Symptom | Things to check |
|---------|------------------|
| Old version in browser | Cache; use hard refresh; confirm you did not skip `npx gulp` |
| Port 8080 in use | Stop the other server or change the port in `package.json` `dev` script |
| Nav not clickable on mobile | z-index / `pointer-events`; duplicate handlers |
| Engagement images missing on Pages | `.nojekyll` at repo root; filenames/paths; `_` prefix in names |
