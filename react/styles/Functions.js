const NUMBER = /(\d+(\.\d+)?)/;

const parse = fn => x =>
  x.replace(NUMBER, y => fn(parseFloat(y)));

const value = parse(n => n);
const round = parse(n => Math.round(n));
const ceil = parse(n => Math.ceil(n));
const add = parse((n, p) => n + p);
const subtract = parse((n, p) => n - p);

export default {
  value,
  round,
  ceil,
  add,
  subtract,
};
