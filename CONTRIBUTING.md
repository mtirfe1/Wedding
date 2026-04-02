# Contributing — Meron & Tirhas wedding site

Short guidelines so commits and history stay clear (typical for coursework or small teams).

## Branching

- **`main`** — production-ready; GitHub Pages should deploy from here.
- Feature work: create a branch `feature/short-description` or `fix/short-description`, then merge via pull request (or fast-forward if solo).

## Commit messages

Use **imperative mood** and a **type** prefix when it helps:

| Prefix | Use for |
|--------|---------|
| `feat:` | New user-facing behavior |
| `fix:` | Bug fix |
| `chore:` | Tooling, deps, config, copy-paste cleanup |
| `docs:` | README, MAINTENANCE, comments only |
| `style:` | CSS/Sass/visual tweaks |

**Examples:**

- `feat: add engagement gallery alt text`
- `fix: map panel overlap on mobile`
- `chore: run gulp after config change`
- `docs: update README deploy steps`

**Body (optional):** one line explaining *why* if the title is not obvious.

## Before you open a PR or push to `main`

1. `npm run prepare:deploy`
2. Quick pass in Chrome (and one mobile viewport if you changed layout).

## Secrets

Do not commit API keys in **new** files outside `wedding-config.js` unless you intend them to be public. The Maps key is already client-side; restrict it in Google Cloud.

## Upstream

Template source: [rampatra/wedding-website](https://github.com/rampatra/wedding-website). This fork is a personal wedding site, not the upstream project.
