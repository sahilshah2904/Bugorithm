import { accent } from './motion.js';

export function mountLessonTrace(container, lesson) {
  container.innerHTML = `
    <div class="lesson-trace-heading"><h2>Follow the execution</h2><span data-trace-step></span></div>
    <div class="lesson-trace-grid">
      <ol class="trace-code" aria-label="Example code"></ol>
      <div class="trace-inspector">
        <p class="trace-explanation" aria-live="polite"></p>
        <dl class="trace-state"></dl>
        <ol class="trace-sequence" aria-label="Sequence values" hidden></ol>
        <div class="trace-console"><span>Console</span><pre></pre></div>
      </div>
    </div>
    <div class="lesson-trace-controls">
      <button class="button button-light" type="button" data-trace-back aria-label="Previous step">←</button>
      <button class="button button-primary" type="button" data-trace-play>Play</button>
      <button class="button button-light" type="button" data-trace-next aria-label="Next step">→</button>
      <button class="text-button" type="button" data-trace-reset>Restart</button>
      <label class="trace-scrubber"><span class="sr-only">Trace position</span><input type="range" min="1" max="${lesson.frames.length}" value="1"></label>
      <label class="trace-speed"><span>Speed</span><select><option value="1">1×</option><option value="0.5">0.5×</option><option value="2">2×</option></select></label>
    </div>
  `;
  const find = (selector) => container.querySelector(selector);
  const codeLines = lesson.example.split('\n').map((line, index) => {
    const row = document.createElement('li');
    const number = document.createElement('span');
    const code = document.createElement('code');
    number.textContent = index + 1;
    number.setAttribute('aria-hidden', 'true');
    code.textContent = line;
    row.append(number, code);
    return row;
  });
  find('.trace-code').append(...codeLines);

  const play = find('[data-trace-play]');
  const back = find('[data-trace-back]');
  const next = find('[data-trace-next]');
  const scrubber = find('input[type="range"]');
  const speed = find('select');
  const sequence = find('.trace-sequence');
  let step = 0;
  let timer;
  let playing = false;

  function draw(highlight = true) {
    const frame = lesson.frames[step];
    const previousValues = new Map(lesson.frames[step - 1]?.values ?? []);
    codeLines.forEach((line, index) => {
      if (index + 1 === frame.line) line.setAttribute('aria-current', 'step');
      else line.removeAttribute('aria-current');
    });
    const state = frame.values.map(([name, value]) => {
      const item = document.createElement('div');
      const label = document.createElement('dt');
      const detail = document.createElement('dd');
      label.textContent = name;
      detail.textContent = value;
      item.append(label, detail);
      if (previousValues.get(name) !== value) item.classList.add('state-changed');
      return item;
    });
    find('.trace-state').replaceChildren(...state);
    sequence.hidden = !frame.sequence;
    if (frame.sequence) {
      sequence.replaceChildren(...frame.sequence.items.map((item, index) => {
        const cell = document.createElement('li');
        cell.textContent = item;
        if (index === frame.sequence.edge) cell.classList.add('trace-edge');
        if (index === frame.sequence.active) {
          cell.setAttribute('aria-current', 'step');
          if (highlight) accent(cell);
        }
        return cell;
      }));
    }
    find('.trace-explanation').textContent = frame.note;
    find('.trace-console pre').textContent = frame.output || '—';
    find('[data-trace-step]').textContent = `Step ${step + 1} of ${lesson.frames.length}`;
    scrubber.value = step + 1;
    back.disabled = step === 0;
    next.disabled = step === lesson.frames.length - 1;
    if (highlight) state.filter((item) => item.classList.contains('state-changed')).forEach(accent);
  }

  function pause() {
    clearTimeout(timer);
    playing = false;
    play.textContent = step === lesson.frames.length - 1 ? 'Replay' : 'Play';
  }

  function jump(index) {
    step = index;
    pause();
    draw();
  }

  function tick() {
    timer = setTimeout(() => {
      step += 1;
      draw();
      if (step === lesson.frames.length - 1) pause();
      else tick();
    }, 1150 / Number(speed.value));
  }

  play.addEventListener('click', () => {
    if (playing) {
      pause();
      return;
    }
    if (step === lesson.frames.length - 1) jump(0);
    playing = true;
    play.textContent = 'Pause';
    tick();
  });
  back.addEventListener('click', () => jump(step - 1));
  next.addEventListener('click', () => jump(step + 1));
  find('[data-trace-reset]').addEventListener('click', () => jump(0));
  scrubber.addEventListener('input', () => jump(Number(scrubber.value) - 1));
  speed.addEventListener('change', () => {
    if (playing) {
      clearTimeout(timer);
      tick();
    }
  });
  draw(false);
  return pause;
}
