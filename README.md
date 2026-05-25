# Lunar Tear Website

The website for [Lunar Tear](https://lunar-tear.com) — a fan-made, non-commercial preservation project for *NieR Re[in]carnation*.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

## Development

```bash
npm install
npm run dev
```

Dev server runs at <http://localhost:4321>.

## Build

```bash
npm run build
```

Static output is written to `./dist`.

## Releases page

The `/changelog` page fetches releases live from the GitHub API for [`Walter-Sparrow/lunar-tear`](https://github.com/Walter-Sparrow/lunar-tear) at build time. To avoid unauthenticated rate limits in CI, the deploy workflow passes `GITHUB_TOKEN` to the build step.

## Project structure

```
public/                # static assets (favicon, CNAME)
src/
  assets/              # images bundled into pages
  content/docs/        # Starlight docs collection
    index.mdx          # hero landing page
    guide/             # guide articles
  pages/
    changelog.astro    # GitHub releases page
astro.config.mjs       # Starlight config: title, logo, sidebar, social
```

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `./dist` to the `gh-pages` branch (served from the `lunar-tear.com` CNAME).
