let python;

const evaluate = `
import json as _json
import traceback as _traceback
from contextlib import redirect_stdout as _redirect_stdout

class _Output:
    def __init__(self):
        self.text = ""

    def write(self, text):
        self.text += text[:max(0, 4000 - len(self.text))]
        return len(text)

    def flush(self):
        pass

def _run():
    filename = "lesson.py" if _snippet else "shuttle.py"
    try:
        program = {"__name__": "__main__" if _snippet else "shuttle"}
        compiled = compile(_code, filename, "exec")
        if _snippet:
            checks = {}
            if _check == "comment":
                from io import StringIO
                from tokenize import COMMENT, generate_tokens
                checks["comment"] = any(
                    token.type == COMMENT and token.string[1:].strip()
                    for token in generate_tokens(StringIO(_code).readline)
                )
            output = _Output()
            with _redirect_stdout(output):
                exec(compiled, program)
            return _json.dumps({"output": output.text, "checks": checks})
        case = _json.loads(_input)
        exec(compiled, program)
        result = program["arrivals_before"](case["arrivals"], case["cutoff"])
        if type(result) is int and -(2**53) < result < 2**53:
            return _json.dumps({"value": result})
        return _json.dumps({"error": "The function must return an integer count."})
    except BaseException as error:
        frames = [frame for frame in _traceback.extract_tb(error.__traceback__) if frame.filename == filename]
        line = getattr(error, "lineno", None) or (frames[-1].lineno if frames else None)
        message = f"{type(error).__name__}: {str(error)[:240]}"
        return _json.dumps({"error": f"Line {line} · {message}" if line else message})

_run()
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
    const scope = python.toPy({
      _code: data.code,
      _input: JSON.stringify(data.input ?? null),
      _snippet: Boolean(data.snippet),
      _check: data.check ?? '',
    });
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
