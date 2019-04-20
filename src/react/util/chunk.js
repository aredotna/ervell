export default (xs, size) =>
  xs.map((_, i) =>
    (i % size === 0 ? xs.slice(i, i + size) : null)).filter(Boolean);
