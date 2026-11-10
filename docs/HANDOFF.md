# Project handoff

## Python Trail · 10 November 2026

Renamed the learning area to Python Trail and preserved the existing lesson URLs and saved progress. The redesign uses a calm background, restrained marker states, and an aurora that starts at the selected level. The eight playable lessons now introduce Python through a coastal field station story. Each trace ties the code line to changing values and console output. The design review drew on Damir Sokolovsky's Unslop and VizLearn's execution walkthrough. [Unslop](https://github.com/heydamir/unslop) · [VizLearn](https://vizlearn.app/algorithms/sorting/bubble-sort)

Continue with levels 9–20 from the curriculum. Add the story, runnable example, exercise, and trace frames for each level. Compare the final trace output with the real Python example, then verify that the practice answer completes the level. Preserve existing level numbers so browser progress and deep links still work. [Curriculum](PYTHON_TRAIL.md) · [Live Python Trail](https://sahilshah2904.github.io/Bugorithm/#/learn)

## Session recap · 9 November 2026

- **Plan and repository.** Set the ten-phase roadmap around untimed, story-based debugging, with Python Learn alongside it and interview practice as a separate track. Created the public repository, contributor and release guides, and automated checks. `v0.0.1` captures the setup.
- **First playable preview.** Published Last Shuttle to GitHub Pages in `v0.0.2`. The editor preserves drafts and locks the scaffold outside the marked region. Python runs in a browser worker. Run the public examples or custom input, then use **Check fix** to see the first failing sample case. A full pass opens a walkthrough and confetti.
- **Dark workspace and learning map.** Published `v0.0.3` with separate Algo Fixes, Python Learn, 100 Questions, About, and Settings pages. Added larger Inter and IBM Plex Mono text, a full-width terminal theme, and Anime.js transitions. Python Learn has eight levels with hover and focus previews, runnable examples, exercises, and locally saved completion. The question library contains 100 searchable LeetCode links. Settings saves text size and motion locally.

The `v0.0.3` app release is tagged at commit `1aa92d8`. Browser testing on the deployed site covered all eight exercises, map scrolling, phone layout, saved progress and preferences, library search, and the original debugging flow. [Live preview](https://sahilshah2904.github.io/Bugorithm/) · [Release](https://github.com/sahilshah2904/Bugorithm/releases/tag/v0.0.3) · [GitHub Actions](https://github.com/sahilshah2904/Bugorithm/actions/runs/42625016398)

## Reproduce and continue

Start from `main` for new work or use the README commands to reproduce the tagged preview. The web app README lists the repair and lesson flows to try. [Repository README](../README.md) · [Web app README](../apps/web/README.md)

1. **Private grading for Last Shuttle.** Define the Submit request and response and wire one challenge to the judge. Run hidden cases in a fixed order, stop at the first failure, and return only that case's position, failure type, and input. Let the learner load the input into Custom input and retry. Verify failure, retry, and the full pass in one browser flow. Choose where the judge runs. Keep real hidden cases outside the public repository and use synthetic fixtures for integration checks. [Judge README](../services/judge/README.md)
2. **Expand the core experience.** Use feedback on the layout and lesson format to add more focused Python levels. Build toward the first 10 original debugging challenges and add random selection with draft recovery.
3. **Expand interview practice separately.** Start from the existing 100 references and add original in-app Fix and Build exercises in batches. [Roadmap](ROADMAP.md)

## Update this handoff

At each milestone, record the version or commit, what works, the commands used to reproduce it, any open decisions, and the next concrete task. Keep release notes in the [changelog](../CHANGELOG.md).
