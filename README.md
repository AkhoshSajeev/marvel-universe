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
- `src/explorer.css` styles the timeline, formations, network, threats and stones.
- `src/data/timeline.ts`, `connections.ts`, `threats.ts`, and `stones.ts` hold the universe exploration content.
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

## Universe chapters

- **MCU timeline:** all 37 films from Iron Man (2008) through The Fantastic Four: First Steps (July 2025), grouped into six phases. Dates follow US theatrical release order, not in-universe chronology. Film selections reveal local posters, summaries, characters and connections. The four Avengers films retain official trailer playback.
- **Team formations:** original Avengers, the closing Age of Ultron lineup, and a selected group of Endgame allies. Replayable, staggered entrances respect reduced motion.
- **Marvel connections:** a curated portrait graph with 18 selectable characters and six relationship categories. Select a node to recenter, filter relationships, or open the center character’s dossier. The adjacent text list describes every displayed edge.
- **Threats:** nine MCU villain files link directly to hero dossiers and the relevant timeline chapter. Loki’s file focuses on The Avengers (2012); Doctor Doom is explicitly an upcoming Doomsday preview, not a completed storyline.
- **Infinity Saga:** six glowing, floating crystals reveal powers, appearances and events, with colored connections to Thanos.

The historical film archive has a July 2025 cutoff. The separate Doctor Doom preview uses [Disney’s official Doomsday overview](https://www.disneyplus.com/explore/articles/avengers-doomsday), checked October 2, 2026. Film metadata can be cross-checked against the [official Marvel film archive](https://www.marvel.com/movies). Character and Infinity Stone stories are scoped to the films named in each entry; the relationship archive extends through Endgame and WandaVision as labeled.

The expanded browser suite also checks all 37 timeline images, phase counts, cross-section navigation, every villain, all six stones, relationship filters and keyboard selection, team formation membership, and mobile widths down to 320px. `qa/explorer-visual.mjs` captures desktop and mobile chapter screenshots against the local development server.
