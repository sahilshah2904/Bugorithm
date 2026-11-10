# Project handoff

## Latest checkpoint · 100 Python Trail levels

The `v0.0.7` release at `660edb9` includes levels 1–100. Levels 51–60 finish Text and sequences with Unicode, bytes, lists, and tuples. Levels 61–80 cover collections and value semantics. Levels 81–100 cover functions, scope, closures, and recursion. Each level includes a story, a replayable trace, a runnable example, and a practice exercise. [Release](https://github.com/sahilshah2904/Bugorithm/releases/tag/v0.0.7) · [Start at level 51](https://sahilshah2904.github.io/Bugorithm/#/learn/51)

The midnight foliage theme is shared across the site. All five chapters sit on one continuous map with chapter dividers, a line that fills as you scroll, and a pinned dropdown that jumps to the chosen chapter. Follow-up commit `abfabd0` keeps the correct chapter selected when returning to its first lesson marker. [Live Python Trail](https://sahilshah2904.github.io/Bugorithm/#/learn)

The production build and repository checks passed. On the deployed site, all 100 examples matched their final trace output, all 100 exercises accepted a working edit, and the 50 new starters failed as expected. Browser checks also covered saved progress, keyboard and mobile navigation, returning from a lesson, and the Algo Fixes public examples. [GitHub Actions](https://github.com/sahilshah2904/Bugorithm/actions/runs/42743797516)

## Resume with levels 101–120

1. Start at **Reading a traceback**. Levels 101–110 cover syntax, runtime and logic errors, exception handling, and assertions. The current worker returns a compact error and the failing lesson line. Decide which frame and exception details the worked examples need for traceback and exception-chaining lessons.
2. Build levels 111–119 around paths, file I/O, encodings, CSV, JSON, and input validation. Use disposable example files so the shared browser worker can replay a lesson without carrying over a prior run's data. For level 120, decide how the breakpoint trace will show local variables and step through an assignment.
3. Add the chapter module under `apps/web/src/lessons` and register it in `apps/web/src/lessons.js`. Preserve lesson numbers for existing URLs and progress. Compare each final trace with the Python result, test a failing starter and a working edit, and check chapter jumps and return navigation on desktop and mobile. [Curriculum](PYTHON_TRAIL.md) · [Local setup](../README.md#reproduce-the-current-milestone)

## Earlier Python Trail milestones

The learning area was renamed Python Trail with eight playable lessons. Their coastal field station stories tie the active code line to changing values and console output. The design review drew on Damir Sokolovsky's Unslop and VizLearn's execution walkthrough. [Unslop](https://github.com/heydamir/unslop) · [VizLearn](https://vizlearn.app/algorithms/sorting/bubble-sort)

In v0.0.5, a reactor ripple starts at the selected level and expands as the lesson fades in. Reduced motion opens the lesson immediately. Trace playback advances on click and reserves room for each frame's state and output so the controls stay in place. The Trail prepares Python in a shared worker when the map or a lesson opens. Data Saver defers preparation until a run, and the runner can retry after startup errors or timeouts.

In v0.0.6, levels 9–50 extend the Trail across First signals, Decisions and repetition, and the first half of Text and sequences. The chapter maps show completion separately and preserve existing lesson links and progress. The new exercises can start with a separate practice draft. The comments exercise checks a Python comment token, and the print formatting exercise checks exact whitespace.

## Session recap · 9 November 2026

- **Plan and repository.** Set the ten-phase roadmap around untimed, story-based debugging, with Python Learn alongside it and interview practice as a separate track. Created the public repository, contributor and release guides, and automated checks. `v0.0.1` captures the setup.
- **First playable preview.** Published Last Shuttle to GitHub Pages in `v0.0.2`. The editor preserves drafts and locks the scaffold outside the marked region. Python runs in a browser worker. Run the public examples or custom input, then use **Check fix** to see the first failing sample case. A full pass opens a walkthrough and confetti.
- **Dark workspace and learning map.** Published `v0.0.3` with separate Algo Fixes, Python Learn, 100 Questions, About, and Settings pages. Added larger Inter and IBM Plex Mono text, a full-width terminal theme, and Anime.js transitions. Python Learn has eight levels with hover and focus previews, runnable examples, exercises, and locally saved completion. The question library contains 100 searchable LeetCode links. Settings saves text size and motion locally.

The `v0.0.3` app release is tagged at commit `1aa92d8`. Browser testing on the deployed site covered all eight exercises, map scrolling, phone layout, saved progress and preferences, library search, and the original debugging flow. [Live preview](https://sahilshah2904.github.io/Bugorithm/) · [Release](https://github.com/sahilshah2904/Bugorithm/releases/tag/v0.0.3) · [GitHub Actions](https://github.com/sahilshah2904/Bugorithm/actions/runs/42625016398)

## Other project tracks

Start from `main` for new work or use the README commands to reproduce the tagged preview. The web app README lists the repair and lesson flows to try. [Repository README](../README.md) · [Web app README](../apps/web/README.md)

1. **Private grading for Last Shuttle.** Define the Submit request and response and wire one challenge to the judge. Run hidden cases in a fixed order, stop at the first failure, and return only that case's position, failure type, and input. Let the learner load the input into Custom input and retry. Verify failure, retry, and the full pass in one browser flow. Choose where the judge runs. Keep real hidden cases outside the public repository and use synthetic fixtures for integration checks. [Judge README](../services/judge/README.md)
2. **Expand the core experience.** Use feedback on the layout and lesson format to add more focused Python levels. Build toward the first 10 original debugging challenges and add random selection with draft recovery.
3. **Expand interview practice separately.** Start from the existing 100 references and add original in-app Fix and Build exercises in batches. [Roadmap](ROADMAP.md)

## Update this handoff

At each milestone, record the version or commit, what works, the commands used to reproduce it, any open decisions, and the next concrete task. Keep release notes in the [changelog](../CHANGELOG.md).
