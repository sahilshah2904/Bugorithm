let worker;
let startup;
let ready = false;
let queue = Promise.resolve();

function stopWorker() {
  worker?.terminate();
  worker = undefined;
  startup = undefined;
  ready = false;
}

function request(data, timeout, timeoutMessage) {
  return new Promise((resolve, reject) => {
    const activeWorker = worker;
    const timer = setTimeout(() => fail(timeoutMessage), timeout);

    function fail(message) {
      clearTimeout(timer);
      stopWorker();
      reject(new Error(message));
    }

    activeWorker.onmessage = ({ data: response }) => {
      clearTimeout(timer);
      if (response.runnerError) fail(response.runnerError);
      else resolve(response);
    };
    activeWorker.onerror = () => fail('The Python runner could not start. Try again.');
    activeWorker.postMessage(data);
  });
}

function startPython() {
  if (startup) return startup;
  worker = new Worker(new URL('./python.worker.js', import.meta.url), { type: 'module' });
  const runtime = new URL(import.meta.env.BASE_URL + 'python/', location.href).href;
  startup = request({ runtime }, 30_000, 'Python took too long to load. Try again.').then(() => { ready = true; });
  return startup;
}

export async function preparePython() {
  if (navigator.connection?.saveData) return;
  try {
    await startPython();
  } catch {
    // An explicit run can retry and report any error to the learner.
  }
}

async function runPython(data, onLoading) {
  if (!ready) onLoading();
  await startPython();
  return request(data, 2500, 'Python stopped after 2.5 seconds. Check for an infinite loop.');
}

function enqueue(data, onLoading) {
  const result = queue.then(() => runPython(data, onLoading));
  queue = result.catch(() => {});
  return result;
}

export function runPythonCase(code, { arrivals, cutoff }, onLoading) {
  return enqueue({ code, input: { arrivals, cutoff } }, onLoading);
}

export function runPythonSnippet(code, onLoading) {
  return enqueue({ code, snippet: true }, onLoading);
}
