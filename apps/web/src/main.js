import { examples, expectedCount, sampleCases } from './challenge.js';
import { createEditor } from './editor.js';
import { accent, celebrate, revealPage, stopCelebration } from './motion.js';
import { runPythonCase } from './python.js';

const find = (selector) => document.querySelector(selector);
const status = find('#status');
const results = find('#results');
const review = find('#review');
const loadCase = find('#load-case');
const customPanel = find('#custom-panel');
const arrivalsInput = find('#arrivals');
const cutoffInput = find('#cutoff');
const buttons = [find('#run'), find('#submit'), find('#run-custom'), find('#reset')];
let busy = false;
let failingCase;

function setStatus(message, tone = '') {
  status.lastElementChild.textContent = message;
  status.dataset.tone = tone;
}

function clearFeedback() {
  results.replaceChildren();
  review.hidden = true;
  loadCase.hidden = true;
  failingCase = undefined;
  stopCelebration();
}

const editor = createEditor(
  find('#editor'),
  () => {
    if (!busy) setStatus('Edit only between ### START and ### END.');
  },
  () => {
    if (!busy) {
      clearFeedback();
      setStatus('Draft updated · Ready to run');
    }
  },
);

function showResult(test, expected, result, pass) {
  const row = document.createElement('li');
  const label = document.createElement('strong');
  const input = document.createElement('code');
  const output = document.createElement('span');
  row.dataset.pass = String(pass);
  label.textContent = `${test.label} · ${pass ? 'Passed' : 'Failed'}`;
  input.textContent = `${JSON.stringify(test.arrivals)}, cutoff = ${test.cutoff}`;
  output.textContent = result.error ?? `Expected ${expected} · Got ${result.value}`;
  row.append(label, input, output);
  results.append(row);
}

async function run(cases, checking = false) {
  if (busy) return;
  busy = true;
  const snapshot = editor.code();
  clearFeedback();
  buttons.forEach((button) => { button.disabled = true; });
  setStatus('Running Python…');
  let passed = 0;
  try {
    for (const test of cases) {
      const expected = expectedCount(test);
      const result = await runPythonCase(snapshot, test, () => setStatus('Starting Python…'));
      if (editor.code() !== snapshot) {
        clearFeedback();
        setStatus('Code changed during the run. Run the current draft again.');
        return;
      }
      const pass = result.value === expected && !result.error;
      showResult(test, expected, result, pass);
      if (pass) passed += 1;
      if (checking && !pass) {
        failingCase = test;
        loadCase.hidden = false;
        setStatus(`Stopped at check ${passed + 1} of ${cases.length} · Fix the first failure`, 'fail');
        return;
      }
    }
    const allPassed = passed === cases.length;
    setStatus(`${passed} of ${cases.length} ${checking ? 'sample checks' : 'cases'} passed`, allPassed ? 'pass' : 'fail');
    if (checking && allPassed) {
      review.hidden = false;
      celebrate();
    }
  } catch (error) {
    setStatus(error.message, 'fail');
  } finally {
    busy = false;
    buttons.forEach((button) => { button.disabled = false; });
  }
}

find('#run').addEventListener('click', () => run(examples));
find('#submit').addEventListener('click', () => run(sampleCases, true));
find('#reset').addEventListener('click', () => {
  editor.reset();
  clearFeedback();
  setStatus('Starter code restored.');
});

loadCase.addEventListener('click', () => {
  if (!failingCase) return;
  arrivalsInput.value = JSON.stringify(failingCase.arrivals);
  cutoffInput.value = failingCase.cutoff;
  customPanel.open = true;
  arrivalsInput.focus();
});

find('#custom-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (busy) return;
  let arrivals;
  try {
    arrivals = JSON.parse(arrivalsInput.value);
  } catch {
    arrivals = null;
  }
  const cutoff = cutoffInput.valueAsNumber;
  const validArrivals = Array.isArray(arrivals) && arrivals.length <= 2000 && arrivals.every(
    (minute, index) => Number.isSafeInteger(minute) && minute >= 0 && (index === 0 || arrivals[index - 1] <= minute),
  );
  if (!validArrivals || !Number.isSafeInteger(cutoff) || cutoff < 0) {
    clearFeedback();
    setStatus('Enter a sorted list of up to 2,000 non-negative integers and a non-negative integer cutoff.', 'fail');
    return;
  }
  run([{ label: 'Custom input', arrivals, cutoff }]);
});

const traceValues = [...document.querySelectorAll('.trace-values li')];
const traceCaption = find('#trace-caption');
const previous = find('#trace-prev');
const next = find('#trace-next');
const traceSteps = [
  { index: 0, caption: 'Minute 1 is before closing. Count this arrival.' },
  { index: 1, caption: 'Minute 3 is equal to the cutoff. The starter keeps counting because 3 > 3 is false.' },
  { index: 1, caption: 'With the corrected boundary, 3 >= 3 is true. The loop stops with one arrival counted.' },
];
let step = 0;

function moveTrace(direction) {
  step = Math.max(0, Math.min(traceSteps.length - 1, step + direction));
  const { index, caption } = traceSteps[step];
  traceValues.forEach((item, position) => item.classList.toggle('active', position === index));
  traceCaption.textContent = caption;
  previous.disabled = step === 0;
  next.disabled = step === traceSteps.length - 1;
  accent(traceValues[index]);
}

previous.addEventListener('click', () => moveTrace(-1));
next.addEventListener('click', () => moveTrace(1));
revealPage();
