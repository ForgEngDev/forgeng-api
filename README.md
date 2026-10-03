# ForgeNG public API for developers and AI assistants

Build a browser game with your preferred AI coding assistant using the public ForgeNG API. The engine implementation stays private. This repository contains versioned TypeScript declarations, an API entry map, examples, and links to runnable beginner templates.

**Start here:** [AI instructions](AGENTS.md) · [API map](docs/API.md) · [Beginner workflow](docs/GETTING_STARTED.md) · [Templates](templates.json) · [Serbian guide](docs/POCETAK.md)

## Choose a starting point

| Game | Public template |
| --- | --- |
| Platformer | [Platformer](https://github.com/ForgEngDev/forgeng-2d-platformer-template) |
| Top-down adventure | [Top-down](https://github.com/ForgEngDev/forgeng-2d-top-down-template) |
| Endless flyer | [Endless flyer](https://github.com/ForgEngDev/forgeng-2d-endless-flyer-template) |
| Space shooter | [Space shooter](https://github.com/ForgEngDev/forgeng-2d-space-shooter-template) |
| Survivor-like | [2D survivor](https://github.com/ForgEngDev/forgeng-2d-survivor-template) |
| Racing | [Top-down racing](https://github.com/ForgEngDev/forgeng-2d-top-down-racing-template) |
| 3D | [3D starter](https://github.com/ForgEngDev/forgeng-3d-template) |

Use **Use this template** on GitHub, then follow that template's README. Give your AI assistant this repository URL together with your game repository. GitHub publication does not automatically train a model or load these instructions into its context.

## Versioned API

- [3.4.5 complete public entry map](api/3.4.5/manifest.json): 47 public SDK entry points, exported from the locally built SDK. This is a declaration snapshot, not a claim that every template or CDN asset uses this version.
- Beginner templates may pin **3.4.2** or another release. Their vendored declarations, import aliases, and runtime version govern code generated for that template. Check them before using a newer API.
- Declarations describe types and signatures. They do not provide an executable engine, a REST service, or an MCP server.

The snapshot includes provider contracts, 2D and 3D SDK surfaces, scene and gameplay lifecycle, input/actions, assets, UI, audio, storage, animation, physics, networking, transport, composition, and diagnostics. Internal implementation files, shaders, JavaScript bundles, and source maps are excluded.

## Maintain and verify

Requires Node.js 22.22.2 or newer. No package installation is needed to validate this repository.

```sh
npm run validate
node scripts/export-api.mjs /path/to/built-engine
```

Review the generated diff before publishing each release. The exporter follows declaration imports from public package exports and records SHA-256 hashes. Three import references in the built snapshot are normalized to equivalent existing public entries: the V2 configuration surface to `forgeng`, network contracts to `forgeng/contracts/network`, and network interpolation to `forgeng/network`. No runtime behavior is changed.

See [LICENSE](LICENSE). Public API documentation does not change the license of the engine or templates. [ForgeNG documentation](https://forgeng.dev/en/forgeng-3.0/getting-started/overview).
