import { copyFile, mkdir } from 'node:fs/promises';

const assets = new URL('../node_modules/pyodide/', import.meta.url);
const output = new URL('../public/python/', import.meta.url);
const files = ['pyodide.mjs', 'pyodide.asm.js', 'pyodide.asm.wasm', 'python_stdlib.zip', 'pyodide-lock.json'];

await mkdir(output, { recursive: true });
await Promise.all(files.map((name) => copyFile(new URL(name, assets), new URL(name, output))));
