export const prefix = 'def arrivals_before(arrivals, cutoff):\n    count = 0\n    ### START\n';
export const starter = '    for minute in arrivals:\n        if minute > cutoff:\n            break\n        count += 1';
export const suffix = '\n    ### END\n    return count';

export const examples = [
  { label: 'Example 1', arrivals: [1, 2, 5], cutoff: 4 },
  { label: 'Example 2', arrivals: [], cutoff: 4 },
];

export const sampleCases = [
  ...examples,
  { label: 'Sample check 3', arrivals: [1, 3, 3, 5], cutoff: 3 },
  { label: 'Sample check 4', arrivals: [0, 1, 2], cutoff: 0 },
  { label: 'Sample check 5', arrivals: [0, 0, 1, 2], cutoff: 3 },
];

export function expectedCount({ arrivals, cutoff }) {
  return arrivals.filter((minute) => minute < cutoff).length;
}
