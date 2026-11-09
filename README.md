# Bugorithm

Bugorithm is an untimed Python 3 debugging lab. Draw a short challenge, read the backstory, repair the marked code, and run public examples or your own input. On submission, the judge stops at the first failing private test and reveals that input so you can reproduce the failure. A successful fix unlocks a walkthrough and a brief celebration.

The `v0.0.1` milestone establishes the repository and contributor workflow. The [roadmap](docs/ROADMAP.md) tracks the playable app and later content milestones.

## Reproduce the current milestone

Install Git and Python 3. Run these commands from a terminal. On Windows, use `py -3` in place of `python3` if needed.

```text
git clone https://github.com/sahilshah2904/Bugorithm.git
cd Bugorithm
git switch --detach v0.0.1
python3 scripts/check_repo.py
```

The command checks the files tracked by Git for material that belongs outside the public repository. Use `git switch main` to return to ongoing development. Application setup commands will live in the component READMEs as each component becomes runnable.

## Repository layout

| Location | Purpose |
| --- | --- |
| [`apps/web/`](apps/web/README.md) | Browser UI, lessons, code editor, and challenge workspace |
| [`services/judge/`](services/judge/README.md) | Submission grading and the boundary between public results and private tests |
| [`content/`](content/README.md) | Original lessons, public challenge examples, and the later interview library |
| [`docs/`](docs/README.md) | Roadmap, release procedure, and contributor handoffs |
| [`scripts/`](scripts/check_repo.py) | Repository checks that also run in GitHub Actions |

See [Contributing](CONTRIBUTING.md) for the branch and review workflow and the [Changelog](CHANGELOG.md) for version history.
