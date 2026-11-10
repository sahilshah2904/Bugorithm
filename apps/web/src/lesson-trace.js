export function mountLessonTrace(container, lesson) {
  container.innerHTML = `
    <div class="lesson-trace-heading"><h2>Follow the execution</h2><span data-trace-step></span></div>
    <div class="lesson-trace-grid">
      <ol class="trace-code" aria-label="Example code"></ol>
      <div class="trace-inspector">
        <div class="trace-stack trace-explanation"><p aria-live="polite"></p></div>
        <div class="trace-stack"></div>
        <div class="trace-stack"><ol class="trace-sequence" aria-label="Sequence values" hidden></ol></div>
        <div class="trace-console"><span>Console</span><div class="trace-stack"><pre></pre></div></div>
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
  const explanation = find('.trace-explanation > p');
  const output = find('.trace-console pre');
  const stepLabel = find('[data-trace-step]');
  const frames = lesson.frames;

  function reserveSpace(slot, tag, texts) {
    const sizes = new Set(texts);
    for (const text of sizes) {
      const spacer = document.createElement(tag);
      spacer.textContent = text;
      spacer.setAttribute('aria-hidden', 'true');
      slot.append(spacer);
    }
  }

  reserveSpace(explanation.parentElement, 'p', frames.map(({ note }) => note));
  reserveSpace(output.parentElement, 'pre', frames.map(({ output }) => output || '—'));
  const stateSlot = find('.trace-explanation + .trace-stack');
  const states = frames.map((frame, index) => {
    const state = document.createElement('dl');
    state.className = 'trace-state';
    const previousValues = new Map(frames[index - 1]?.values ?? []);
    for (const [name, value] of frame.values) {
      const item = document.createElement('div');
      const label = document.createElement('dt');
      const detail = document.createElement('dd');
      label.textContent = name;
      detail.textContent = value;
      item.append(label, detail);
      item.classList.toggle('state-changed', previousValues.get(name) !== value);
      state.append(item);
    }
    state.setAttribute('aria-hidden', 'true');
    return state;
  });
  stateSlot.append(...states);

  const sequences = frames.flatMap((frame) => frame.sequence ? [frame.sequence.items] : []);
  const layouts = new Map(sequences.map((items) => [JSON.stringify(items), items]));
  for (const items of layouts.values()) {
    const spacer = document.createElement('ol');
    spacer.className = 'trace-sequence';
    spacer.setAttribute('aria-hidden', 'true');
    for (const item of items) {
      const cell = document.createElement('li');
      cell.textContent = item;
      spacer.append(cell);
    }
    sequence.parentElement.append(spacer);
  }
  const cells = Array.from({ length: Math.max(0, ...sequences.map((items) => items.length)) },
    () => document.createElement('li'));
  sequence.append(...cells);
  let step = 0;
  let shown;
  let timer;
  let playing = false;

  function draw() {
    if (shown === step) return;
    const frame = frames[step];
    if (shown !== undefined) {
      codeLines[frames[shown].line - 1]?.removeAttribute('aria-current');
      states[shown].setAttribute('aria-hidden', 'true');
    }
    shown = step;
    codeLines[frame.line - 1]?.setAttribute('aria-current', 'step');
    states[step].removeAttribute('aria-hidden');

    sequence.hidden = !frame.sequence;
    if (frame.sequence) {
      cells.forEach((cell, index) => {
        const item = frame.sequence.items[index];
        if (cell.textContent !== item) cell.textContent = item ?? '';
        cell.hidden = item === undefined;
        cell.classList.toggle('trace-edge', index === frame.sequence.edge);
        const selected = Array.isArray(frame.sequence.active) && frame.sequence.active.includes(index);
        cell.classList.toggle('trace-selected', selected);
        if (selected) cell.setAttribute('aria-label', item + ', selected');
        else cell.removeAttribute('aria-label');
        if (index === frame.sequence.active) cell.setAttribute('aria-current', 'step');
        else cell.removeAttribute('aria-current');
      });
    }
    explanation.textContent = frame.note;
    if (output.textContent !== (frame.output || '—')) output.textContent = frame.output || '—';
    stepLabel.textContent = `Step ${step + 1} of ${frames.length}`;
    scrubber.value = step + 1;
    back.disabled = step === 0;
    next.disabled = step === frames.length - 1;
  }

  function pause() {
    clearTimeout(timer);
    playing = false;
    play.textContent = step === frames.length - 1 ? 'Replay' : 'Play';
  }

  function jump(index) {
    step = index;
    pause();
    draw();
  }

  function tick() {
    timer = setTimeout(advance, 760 / Number(speed.value));
  }

  function advance() {
    step += 1;
    draw();
    if (step === frames.length - 1) pause();
    else tick();
  }

  play.addEventListener('click', () => {
    if (playing) {
      pause();
      return;
    }
    const replay = step === frames.length - 1;
    if (replay) jump(0);
    playing = true;
    play.textContent = 'Pause';
    if (replay) tick();
    else advance();
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
  draw();
  return pause;
}
