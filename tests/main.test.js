const assert = (name, cond) => console.log(`${cond ? '✓' : '✗'} ${name}`);

const evaluate = (a, b, op) => {
  if (op === 'add') return a + b;
  if (op === 'subtract') return a - b;
  if (op === 'multiply') return a * b;
  if (op === 'divide') return b === 0 ? NaN : a / b;
  return b;
};

assert('2 + 2 = 4', evaluate(2,2,'add') === 4);
assert('9 / 0 = NaN', Number.isNaN(evaluate(9,0,'divide')));
