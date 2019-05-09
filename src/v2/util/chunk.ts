export function chunk<T>(xs: T[], size: number): T[][] {
  return xs
    .map((_, i: number) => (i % size === 0 ? xs.slice(i, i + size) : null))
    .filter(Boolean)
}
