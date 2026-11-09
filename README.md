# Bugorithm

Bugorithm is an untimed Python 3 debugging lab. Draw a short challenge, read the backstory, repair the marked code, and run public examples or your own input. On submission, the judge stops at the first failing private test and reveals that input so you can reproduce the failure. A successful fix unlocks a walkthrough and a brief celebration.

Try the [first playable sample](https://sahilshah2904.github.io/Bugorithm/). It has one story-based challenge with real Python execution and a walkthrough. The [roadmap](docs/ROADMAP.md) tracks the private judge and later content milestones.

## Reproduce the current milestone

Install Git and Node.js 24. Run these commands from a terminal.

```text
git clone https://github.com/sahilshah2904/Bugorithm.git
cd Bugorithm
git switch --detach v0.0.2
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
