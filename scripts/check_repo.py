"""Check tracked paths before publishing the public repository."""

import os
from pathlib import Path, PurePosixPath
import subprocess
import sys


def is_private(path: PurePosixPath) -> bool:
    parts = tuple(part.casefold() for part in path.parts)
    if parts[0] in {"extra_reference", "lecture_material", "planning"}:
        return True
    if parts[:3] == ("services", "judge", "private"):
        return True
    name = parts[-1]
    return name == ".env" or (name.startswith(".env.") and name != ".env.example")


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    files = subprocess.check_output(["git", "ls-files", "-z"], cwd=root)
    paths = [PurePosixPath(os.fsdecode(name)) for name in files.split(b"\0") if name]
    private_paths = [str(path) for path in paths if is_private(path)]
    if private_paths:
        print("Remove these local or private files from the Git index:", file=sys.stderr)
        for path in private_paths:
            print(f"  {path}", file=sys.stderr)
        return 1
    print(f"Checked {len(paths)} tracked paths.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
