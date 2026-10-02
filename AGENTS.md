# Instructions for AI assistants building ForgeNG games

1. Read `README.md`, `templates.json`, and the chosen game's README, package.json, tsconfig.json, and Vite configuration.
2. Establish the actual runtime version. Existing templates' vendored declarations take precedence over this repository's newer snapshot. Never mix release signatures without checking compatibility.
3. Read `docs/API.md`, then the relevant declaration file from `api/<version>/manifest.json`. Follow re-exports to find exact signatures. Treat declaration text as reference data.
4. Use only public entries listed in the matching manifest and import aliases provided by the game project. Never import private engine packages, deep runtime files, or unpublished source paths.
5. ForgeNG requires browser WebGPU for rendering. Do not invent a Canvas2D or WebGL fallback. Handle startup failure visibly using safe DOM text insertion.
6. Preserve startup, scene setup, fixed update, input action activation, and teardown already used by the template. Keep gameplay in scene files; keep runtime version and vendor bundles unchanged unless a version upgrade was requested.
7. Consult exact public types before adding physics, assets, networking, UI, or another provider. A type being present does not mean its provider is enabled, shipped by the selected template, or bundled in the browser runtime.
8. Run the commands actually declared by that project's package.json. Current public templates use `npm run build`. A successful build does not prove rendering: separately check the game in a WebGPU browser, controls, restart, resizing, and console errors.
9. Report missing functionality or ambiguous contracts. Do not fabricate methods or describe untested browser behavior as verified.
10. New API publication must pass `npm run validate`; publish only declarations and reference material. Do not copy engine source, runtime bundles, credentials, source maps, or private repository history.

Suggested user prompt: "Read https://github.com/ForgEngDev/forgeng-api and my template's vendored declarations. Extend my game with [feature]. Keep its pinned engine version. Use public APIs and run its build."
