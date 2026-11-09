# Web app

The playable sample includes the Last shuttle challenge, a CodeMirror editor, public examples, custom inputs, and a step-through explanation. Python runs in a browser worker using Pyodide. Anime.js handles the entrance, trace accents, and celebration with a reduced-motion fallback.

Use Node.js 24 and npm.

```sh
cd apps/web
npm ci
npm run dev
```

Run `npm run build` to generate `dist/` and `npm run preview` to serve the production build locally. The build copies the pinned Pyodide runtime from npm into the site so it can load Python from the same host. GitHub Actions publishes only `dist/` to GitHub Pages after a successful build on `main`.

Try both examples, then select **Check fix** to see the first failing input. Use **Load failing input into Custom input** to reproduce it. Change the comparison to `>=` and check again to see the full pass and walkthrough. All sample checks run in the browser. The private submission judge and the rest of the curriculum follow the [roadmap](../../docs/ROADMAP.md).
