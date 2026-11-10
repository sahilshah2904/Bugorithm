# Web app

Algo Fixes includes the Last shuttle challenge, a CodeMirror editor, public examples, custom inputs, and a step-through explanation. Python Trail offers 50 levels across three chapter maps with editable exercises, real Python output, and local completion tracking. The separate 100 Questions page lists filterable LeetCode references.

Python runs in a browser worker using Pyodide. Anime.js animates route changes, level markers, and successful fixes. Text size and motion preferences are available in Settings.

Use Node.js 24 and npm.

```sh
cd apps/web
npm ci
npm run dev
```

Run `npm run build` to generate `dist/` and `npm run preview` to serve the production build locally. The build copies the pinned Pyodide runtime from npm into the site so it can load Python from the same host. GitHub Actions publishes only `dist/` to GitHub Pages after a successful build on `main`.

In Algo Fixes, run the examples, select **Check fix**, and load the first failing input into the custom panel. Change the comparison to `>=` and check again. In Python Trail, open Level 1, run the example, then edit and check the exercise. Check that the completed level is marked when you return to the map. Use the chapter links to jump to levels 21 or 41.

The private submission judge and further lessons follow the [roadmap](../../docs/ROADMAP.md).
