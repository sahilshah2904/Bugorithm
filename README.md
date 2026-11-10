# Bugorithm

Bugorithm is an untimed Python 3 lab for learning concepts and repairing short programs. [Open Bugorithm](https://sahilshah2904.github.io/Bugorithm/) · [v0.0.6 release](https://github.com/sahilshah2904/Bugorithm/releases/tag/v0.0.6)

- **Algo Fixes** includes the Last Shuttle challenge. Edit between the markers, run examples or custom input, and check your fix against five browser-side sample cases. The first failure exposes its input. A full pass opens the walkthrough and celebration.
- **Python Trail** offers 50 playable levels across three chapters, from syntax and loops through string slicing and f-strings. Open a level to read its story, step through an animated execution trace, and test your own code. Chapter progress is saved in your browser. [300-level curriculum](docs/PYTHON_TRAIL.md)
- **100 Questions** lists searchable, filterable links to interview problems. **About** introduces the project and **Settings** saves text size and motion preferences.

## What's next

Continue Python Trail with levels 51–60 to complete Text and sequences. The broader roadmap covers private grading for Last Shuttle, the original debugging challenge bank, and the separate interview practice track. [Project handoff](docs/HANDOFF.md) · [Roadmap](docs/ROADMAP.md)

## Reproduce the current milestone

Install Git and Node.js 24. Run these commands from a terminal.

```text
git clone https://github.com/sahilshah2904/Bugorithm.git
cd Bugorithm
git switch --detach v0.0.6
cd apps/web
npm ci
npm run dev
```

Open the local address printed by Vite. See the [web app README](apps/web/README.md) for the production build and a walkthrough of the sample. Use `git switch main` to return to ongoing development.

## Repository layout

| Location | Purpose |
| --- | --- |
| [`apps/web/`](apps/web/README.md) | Browser UI, lessons, code editor, and challenge workspace |
| [`services/judge/`](services/judge/README.md) | Submission grading and the boundary between public results and private tests |
| [`content/`](content/README.md) | Original lessons, public challenge examples, and the later interview library |
| [`docs/`](docs/README.md) | Roadmap, release procedure, and contributor handoffs |
| [`scripts/`](scripts/check_repo.py) | Repository checks that also run in GitHub Actions |

See [Contributing](CONTRIBUTING.md) for the branch and review workflow and the [Changelog](CHANGELOG.md) for version history.
