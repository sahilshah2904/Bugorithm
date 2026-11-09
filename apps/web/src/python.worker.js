let python;

const evaluate = `
import json as _json
import traceback as _traceback

def _run_case():
    try:
        case = _json.loads(_input)
        program = {"__name__": "shuttle"}
        exec(compile(_code, "shuttle.py", "exec"), program)
        result = program["arrivals_before"](case["arrivals"], case["cutoff"])
        if type(result) is int and -(2**53) < result < 2**53:
            return _json.dumps({"value": result})
        return _json.dumps({"error": "The function must return an integer count."})
    except BaseException as error:
        frames = [frame for frame in _traceback.extract_tb(error.__traceback__) if frame.filename == "shuttle.py"]
        line = getattr(error, "lineno", None) or (frames[-1].lineno if frames else None)
        message = f"{type(error).__name__}: {str(error)[:240]}"
        return _json.dumps({"error": f"Line {line} · {message}" if line else message})

_run_case()
`;

self.onmessage = async ({ data }) => {
  try {
    if (data.runtime) {
      const { loadPyodide } = await import(/* @vite-ignore */ new URL('pyodide.mjs', data.runtime).href);
      python = await loadPyodide({
        indexURL: data.runtime,
        jsglobals: Object.create(null),
        stdout: () => {},
        stderr: () => {},
      });
      self.postMessage({ ready: true });
      return;
    }
    const scope = python.toPy({ _code: data.code, _input: JSON.stringify(data.input) });
    try {
      const result = python.runPython(evaluate, { globals: scope });
      self.postMessage(JSON.parse(result));
    } finally {
      scope.destroy();
    }
  } catch {
    self.postMessage({ runnerError: 'Python could not finish this run. Try again.' });
  }
};
