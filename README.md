# Marvel Universe — The Avengers

A cinematic, responsive Avengers experience built with React, TypeScript, Vite, Tailwind CSS, GSAP, Framer Motion, and Lucide icons. The site is a fully static frontend with no backend or API keys.

## Run locally

Use Node.js 22 or newer.

```sh
npm install
npm run dev
```

Open the URL printed by Vite, including the `/marvel-universe/` base path.

```sh
npm run build
npm run preview
```

The production build is written to `dist/`.

## GitHub Pages

The Vite base path is `/marvel-universe/`, so the production site works at `https://akhoshsajeev.github.io/marvel-universe/`. In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions**. Push the project to the repository's `main` branch; the included workflow builds and deploys `dist/`.

If you rename the repository, update `base` in `vite.config.ts`. Assets in `public/` should be referenced using `import.meta.env.BASE_URL` so that they continue to work under the repository path.

## Project structure

- `src/App.tsx` assembles the experience.
- `src/components/` holds reusable interface components.
- `src/data/` keeps character and movie content separate from presentation.
- `src/styles.css` defines shared typography, navigation, and the film archive.
- `src/cinema.css` defines the cinematic hero and character archive.
- `src/dossier.css` defines the full-screen character experience.
- `public/` contains static imagery and assets.
- `.github/workflows/deploy.yml` builds and deploys the static site.

This is an unofficial fan project. Marvel names, characters, and related trademarks belong to their respective owners.

## Experience and accessibility

Explore 18 full-screen character dossiers, search and filter the roster, and open each film's official trailer. Each dossier includes identity, an interactive qualitative ability constellation, equipment, and a horizontally scrollable story timeline. Left/right arrow keys switch characters outside the ability and timeline controls. Dialogs support Escape, trap keyboard focus, and return focus to the launch button. The optional sound switch creates a quiet ambient drone with the Web Audio API; it starts only after a user click and turns off when the tab is hidden.

GSAP handles entrance and scroll animation; Framer Motion handles interactive transitions. Both respect the operating system's reduced-motion setting. Images and fonts are local. Trailer playback uses YouTube's privacy-enhanced embed after clicking play and requires internet access; an official external trailer link is also provided.

Artwork sources and transformations are recorded in `public/asset-sources.json`. Font licenses are in `public/fonts/`. Ability diagrams describe capabilities without numerical power rankings. Each profile declares its story snapshot; most cover the Infinity Saga through Endgame, and Scarlet Witch extends through WandaVision. Timeline years are film/series release years rather than in-universe dates.

## Verification

With Google Chrome installed:

```sh
npm run build
npm run test:e2e
```

The Playwright smoke tests run against the production preview and cover local asset loading, hero navigation, search and filters, full-screen dialog focus, ability selection, equipment, timeline scrolling, trailer integration, mobile navigation, and responsive layouts. The trailer test mocks YouTube's network response; actual video availability depends on YouTube.

# marvel-universe
