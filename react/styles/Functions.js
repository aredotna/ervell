const NUMBER = /(\d+(\.\d+)?)/;

const parse = string => fn =>
  string.replace(NUMBER, subString => fn(parseFloat(subString)));

const value = string => parse(string)(n => n);
const round = string => parse(string)(n => Math.round(n));
const ceil = string => parse(string)(n => Math.ceil(n));
const add = (string, i) => parse(string)(n => n + i);
const subtract = (string, by) => parse(string)(n => n - by);
const multiply = (string, factor) => parse(string)(n => n * factor);
const divide = (string, divisor) => parse(string)(n => n / divisor);

export default {
  parse,
  value,
  round,
  ceil,
  add,
  subtract,
  multiply,
  divide,
};
