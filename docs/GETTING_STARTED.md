# Build your first game with an AI assistant

1. Choose a template from the README. Click **Use this template** to make your game repository.
2. Follow its installation requirements. Clone your game, run `npm install`, then `npm run dev`.
3. Open the displayed local URL in a browser with WebGPU support. Confirm the unchanged game starts before editing it.
4. Ask your AI assistant to read this API repository and your game's local configuration and declarations. Start with one concrete change, such as adjusting platform positions, movement speed, score, or camera behavior.
5. Run `npm run build` after the change. Play the result and check controls, restart, resize, and console errors.

## Platformer file map

The public platformer template's `src/main.ts` creates the 2D game, configures providers and actions, registers a scene, enables its action map, and starts the loop. `src/scene/mainScene.ts` supplies `render`, `colliders`, `setup`, and `fixedUpdate`. `controller.ts` handles controls; `motion.ts` handles movement; `ground.ts` defines platforms; `camera.ts` controls the camera; `hud.ts` handles UI. Its UI provider is enabled explicitly, while assets and storage are disabled in startup configuration.

For a runnable example, use [the complete platformer startup](https://github.com/ForgEngDev/forgeng-2d-platformer-template/blob/main/src/main.ts) and [scene definition](https://github.com/ForgEngDev/forgeng-2d-platformer-template/blob/main/src/scene/mainScene.ts). Check the repository's default branch if these links change. These examples use the template's release and aliases; they are not a migration recipe for 3.4.5.

## Common problems

| Symptom | What to inspect |
| --- | --- |
| Import cannot be resolved | Project tsconfig paths, Vite aliases, vendored files, and API manifest; a public API in a newer version may not exist in the template. |
| WebGPU startup fails | Browser WebGPU availability, secure context, adapter availability, and the original error message. |
| Input does nothing | Action map configuration and activation, focus, and template controller setup. |
| Feature provider unavailable | Enabled providers and the runtime modules actually delivered by the template. |
| Works once but fails on restart | Scene teardown, subscriptions, action scopes, and object ownership. |

Use exact method and option signatures from the project's declarations. Preserve the original diagnostic message; no single repair applies to every failure.
