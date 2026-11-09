let worker;

function stopWorker() {
  worker?.terminate();
  worker = undefined;
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

export async function runPythonCase(code, { arrivals, cutoff }, onLoading) {
  if (!worker) {
    onLoading();
    worker = new Worker(new URL('./python.worker.js', import.meta.url), { type: 'module' });
    const runtime = new URL(import.meta.env.BASE_URL + 'python/', location.href).href;
    await request({ runtime }, 30_000, 'Python took too long to load. Try again.');
  }
  return request({ code, input: { arrivals, cutoff } }, 2500, 'Python stopped after 2.5 seconds. Check for an infinite loop.');
}
