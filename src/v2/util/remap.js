export const RGB_TO_ALPHA_SCALE = {
  in: { min: 0, max: 255 },
  out: { min: 0, max: 1 },
};

export default (n, options = {}) =>
  ((n - options.in.min) * (options.out.max - options.out.min)) /
  (options.in.max - options.in.min + options.out.min);
