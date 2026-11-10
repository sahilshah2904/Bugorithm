import { lessons } from './lessons.js';
import { mountLessonTrace } from './lesson-trace.js';
import { motionEnabled, revealPage, startReactor, stopCelebration, stopReactor } from './motion.js';
import { preparePython, runPythonSnippet } from './python.js';
import { questions } from './questions.js';

const pages = new Map([...document.querySelectorAll('[data-page]')].map((page) => [page.dataset.page, page]));
const learnPage = pages.get('learn');
const lessonPage = pages.get('lesson');
const root = document.documentElement;
const lanes = [27, 45, 70, 57, 29, 44, 72, 55];

function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch { /* Preferences still work for this visit. */ }
}

const progressKey = 'bugorithm:lessons:v1';
const savedProgress = read(progressKey, []);
const completed = new Set(Array.isArray(savedProgress)
  ? savedProgress.filter((level) => Number.isInteger(level) && level > 0 && level <= lessons.length)
  : []);
let mapFrame;
let lastLevel;
let stopTrace;

function preference(selector, key, dataAttribute, fallback) {
  const select = document.querySelector(selector);
  const stored = read(key, fallback);
  select.value = [...select.options].some((option) => option.value === stored) ? stored : fallback;
  root.dataset[dataAttribute] = select.value;
  select.addEventListener('change', () => {
    root.dataset[dataAttribute] = select.value;
    save(key, select.value);
    if (!motionEnabled()) stopCelebration();
  });
}

preference('#text-setting', 'bugorithm:text-size', 'textSize', 'standard');
preference('#motion-setting', 'bugorithm:motion', 'motion', 'system');

function updateProgress() {
  const summary = learnPage.querySelector('#map-summary');
  if (!summary) return;
  summary.textContent = `${completed.size} / ${lessons.length} complete`;
  learnPage.querySelectorAll('.level-link').forEach((link, index) => {
    const passed = completed.has(index + 1);
    link.dataset.complete = passed;
    link.setAttribute('aria-label', `Level ${index + 1}, ${lessons[index].title}${passed ? ', complete' : ''}`);
  });
}

function renderMap() {
  const row = 140;
  const height = row * lessons.length;
  const points = lessons.map((_, index) => ({ x: lanes[index % lanes.length] * 10, y: index * row + row / 2 }));
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const mid = (previous.y + current.y) / 2;
    path += ` C ${previous.x} ${mid}, ${current.x} ${mid}, ${current.x} ${current.y}`;
  }
  learnPage.innerHTML = `
    <header class="page-heading map-heading">
      <div>
        <p class="trail-label">Chapter 1 · First signals</p>
        <h1 tabindex="-1">Python Trail</h1>
        <p>Follow each lesson from story to code.</p>
      </div>
      <p id="map-summary" class="trail-label"></p>
    </header>
    <div class="level-map">
      <svg class="map-track" viewBox="0 0 1000 ${height}" preserveAspectRatio="none" aria-hidden="true">
        <defs><clipPath id="track-window"><rect width="1000" height="${height}"></rect></clipPath></defs>
        <path class="track-base" d="${path}"></path>
        <path class="track-progress" d="${path}" clip-path="url(#track-window)"></path>
      </svg>
      <ol class="level-list">
        ${lessons.map((lesson, index) => `
          <li class="level" style="--lane:${points[index].x / 10}%" data-side="${points[index].x < 500 ? 'right' : 'left'}">
            <a class="level-link" href="#/learn/${index + 1}" id="level-${index + 1}" aria-describedby="preview-${index + 1}">${index + 1}</a>
            <span class="level-label" aria-hidden="true">
              <strong>${lesson.title}</strong><span class="level-preview">${lesson.preview}</span>
            </span>
            <span class="sr-only" id="preview-${index + 1}">${lesson.preview}</span>
          </li>
        `).join('')}
      </ol>
    </div>
    <p class="map-end"><a href="https://github.com/sahilshah2904/Bugorithm/blob/main/docs/PYTHON_TRAIL.md">View the 300-level curriculum ↗</a></p>
  `;
  updateProgress();
}

learnPage.addEventListener('click', (event) => {
  const node = event.target.closest('.level-link');
  if (!node || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  history.pushState(null, '', node.hash);
  route(true, node);
});

function updateTrack() {
  if (learnPage.hidden || learnPage.inert || mapFrame) return;
  mapFrame = requestAnimationFrame(() => {
    mapFrame = undefined;
    if (learnPage.hidden || learnPage.inert) return;
    const bounds = learnPage.querySelector('.level-map').getBoundingClientRect();
    const progress = motionEnabled() ? (innerHeight * .72 - bounds.top) / bounds.height : 1;
    learnPage.querySelector('#track-window rect').setAttribute('height', Math.max(0, Math.min(1, progress)) * lessons.length * 140);
  });
}

window.addEventListener('scroll', updateTrack, { passive: true });
window.addEventListener('resize', updateTrack);
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', updateTrack);

function renderLesson(level) {
  const lesson = lessons[level - 1];
  lessonPage.innerHTML = `
    <header class="page-heading lesson-header">
      <a class="back-link" href="#/learn">← Python Trail</a>
      <p class="trail-label">Level ${level} · First signals</p>
      <h1 tabindex="-1">${lesson.title}</h1>
    </header>
    <section class="lesson-story" aria-labelledby="story-heading">
      <h2 id="story-heading">${lesson.storyTitle}</h2>
    </section>
    <section class="lesson-trace" aria-label="Execution trace"></section>
    <div class="lesson-body">
      <section aria-labelledby="practice-heading">
        <h2 id="practice-heading">Try it</h2>
        <label for="lesson-code">${lesson.prompt}</label>
        <textarea id="lesson-code" class="code-input" spellcheck="false" autocapitalize="off" autocomplete="off"></textarea>
        <div class="lesson-controls">
          <button class="button button-primary" id="check-lesson" type="button">Check answer</button>
          <button class="text-button" id="reset-lesson" type="button">Reset</button>
        </div>
        <p id="lesson-status" class="status" role="status">${completed.has(level) ? 'Level complete' : ''}</p>
        <pre class="lesson-output" id="practice-output" aria-label="Practice output" hidden></pre>
        <a class="lesson-next" href="${level < lessons.length ? `#/learn/${level + 1}` : '#/learn'}">${level < lessons.length ? 'Next level →' : 'Back to the map →'}</a>
      </section>
    </div>
  `;
  const find = (selector) => lessonPage.querySelector(selector);
  for (const paragraph of lesson.story) {
    const text = document.createElement('p');
    text.textContent = paragraph;
    find('.lesson-story').append(text);
  }
  stopTrace = mountLessonTrace(find('.lesson-trace'), lesson);
  const traceControls = find('.lesson-trace-controls');
  const exampleButton = document.createElement('button');
  exampleButton.className = 'button button-light run-trace-example';
  exampleButton.type = 'button';
  exampleButton.textContent = 'Run example';
  const exampleOutput = document.createElement('pre');
  exampleOutput.className = 'lesson-output';
  exampleOutput.setAttribute('aria-live', 'polite');
  exampleOutput.hidden = true;
  traceControls.append(exampleButton);
  traceControls.after(exampleOutput);
  const editor = find('#lesson-code');
  editor.value = lesson.example;
  const checkButton = find('#check-lesson');
  const reset = find('#reset-lesson');
  const status = find('#lesson-status');
  const practiceOutput = find('#practice-output');

  async function run(isPractice) {
    const output = isPractice ? practiceOutput : exampleOutput;
    output.hidden = false;
    output.textContent = 'Running Python…';
    [exampleButton, checkButton, reset].forEach((button) => { button.disabled = true; });
    const code = isPractice ? editor.value : lesson.example;
    try {
      const result = await runPythonSnippet(code, () => { output.textContent = 'Starting Python…'; });
      output.textContent = result.error ?? (result.output || '(No output)');
      if (isPractice && editor.value === code) {
        const pass = !result.error && result.output.replace(/\n$/, '') === lesson.expected;
        status.textContent = pass ? 'Passed · Level complete' : 'Try again · Compare the output with the prompt';
        status.dataset.tone = pass ? 'pass' : 'fail';
        if (pass) {
          completed.add(level);
          save(progressKey, [...completed]);
          updateProgress();
        }
      } else if (isPractice) {
        status.textContent = 'Code changed. Check the current draft again.';
      }
    } catch (error) {
      output.textContent = error.message;
      if (isPractice) status.textContent = 'Run stopped';
    } finally {
      [exampleButton, checkButton, reset].forEach((button) => { button.disabled = false; });
    }
  }

  editor.addEventListener('input', () => {
    status.textContent = '';
    status.removeAttribute('data-tone');
    practiceOutput.hidden = true;
  });
  exampleButton.addEventListener('click', () => run(false));
  checkButton.addEventListener('click', () => run(true));
  reset.addEventListener('click', () => {
    editor.value = lesson.example;
    status.textContent = '';
    practiceOutput.hidden = true;
    editor.focus();
  });
}

const search = document.querySelector('#question-search');
const topicFilter = document.querySelector('#question-topic');
const list = document.querySelector('#question-list');
for (const topic of new Set(questions.map((question) => question[2]))) {
  topicFilter.add(new Option(topic, topic));
}

function renderQuestions() {
  const query = search.value.trim().toLowerCase();
  const filtered = questions.filter(([number, title, topic]) =>
    (!topicFilter.value || topicFilter.value === topic) && `${number} ${title} ${topic}`.toLowerCase().includes(query));
  document.querySelector('#question-count').textContent = filtered.length ? `${filtered.length} of ${questions.length} references` : 'No matching questions';
  list.replaceChildren(...filtered.map(([number, title, topic, slug]) => {
    const row = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'question-link';
    link.href = `https://leetcode.com/problems/${slug}/`;
    link.setAttribute('aria-label', `${title} on LeetCode`);
    link.innerHTML = '<span class="question-number"></span><strong></strong><span class="question-topic"></span><span aria-hidden="true">↗</span>';
    [number, title, topic].forEach((value, index) => { link.children[index].textContent = value; });
    row.append(link);
    return row;
  }));
}

search.addEventListener('input', renderQuestions);
topicFilter.addEventListener('change', renderQuestions);

function route(focus = false, marker) {
  stopReactor();
  stopTrace?.();
  stopTrace = undefined;
  const [requested, value] = location.hash.replace(/^#\//, '').split('/');
  const level = /^\d+$/.test(value ?? '') ? Number(value) : 0;
  const isLesson = requested === 'learn' && level >= 1 && level <= lessons.length;
  const key = isLesson ? 'lesson' : pages.has(requested) && requested !== 'lesson' ? requested : 'fixes';
  const page = pages.get(key);
  const returningToMap = key === 'learn' && !lessonPage.hidden && lastLevel;
  const revealLesson = marker && isLesson && motionEnabled() ? startReactor(marker, learnPage) : undefined;
  pages.forEach((element) => { element.hidden = element !== page && !(revealLesson && element === learnPage); });
  if (key === 'learn') renderMap();
  else if (isLesson) {
    lastLevel = level;
    renderLesson(level);
  } else if (key === 'questions') renderQuestions();
  if (key !== 'fixes') stopCelebration();
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === (isLesson ? 'learn' : key)) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const heading = page.querySelector('h1');
  document.title = `${heading.textContent} | Bugorithm`;
  if (returningToMap) {
    const node = document.querySelector(`#level-${lastLevel}`);
    node.focus({ preventScroll: true });
    node.scrollIntoView({ block: 'center', behavior: 'instant' });
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (focus) heading.focus({ preventScroll: true });
  }
  if (location.hash === '#field-note') document.querySelector('#field-note').scrollIntoView();
  if (revealLesson) revealLesson(page);
  else if (key !== 'learn') revealPage(heading);
  if (key === 'learn' || isLesson) void preparePython();
  updateTrack();
}

document.querySelector('.skip').addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector('main').focus();
});

window.addEventListener('hashchange', () => route(true));
route();
