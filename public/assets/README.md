# Replaceable artwork

All displayed artwork is resolved by `src/assets/registry.ts`. The stable IDs and optimized dimensions are listed in `manifest.json`. Place authorized replacements in `public/assets/replacements/` and map each ID in `assetOverrides`, for example:

```ts
'iron-man': 'assets/replacements/iron-man.webp'
```

Local paths are relative to `public/`; the registry adds the GitHub Pages base automatically. Authorized HTTPS URLs also work. All images can be replaced with the original, explicitly labeled geometric placeholder by setting `VITE_ASSET_MODE=placeholder` before building. Image failures also show that placeholder.

`optimized/` contains WebP derivatives of the existing local development artwork in `public/images/`. The original source records remain in `public/asset-sources.json`. These records document provenance, not permission or a license grant. Existing Marvel imagery has no verified redistribution license recorded here; supply properly licensed replacements for a deployment requiring cleared artwork. Placeholder mode changes what is displayed; it does not remove the development files from the repository or Vite’s copied public directory. Remove unused, uncleared files before distributing an artifact that must contain only cleared artwork. No asset-fetching script is included.

To regenerate local optimized derivatives, install Python Pillow and run `python3 scripts/optimize_assets.py`. This optional authoring tool processes only existing local files; the application and Pages workflow do not require Python. Do not overwrite licensed replacements with development derivatives.
