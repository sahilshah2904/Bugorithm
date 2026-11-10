export function step(line, note, values = {}, output = '', sequence) {
  return { line, note, values: Object.entries(values).map(([name, value]) => [name, String(value)]), output, sequence };
}

export function cells(items, active, edge) {
  return { items: items.map(String), active, edge };
}
