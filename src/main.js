const display = document.getElementById('display');
let current = '0';
let prev = null;
let op = null;
let justEvaluated = false;

const setDisplay = (val) => display.textContent = val;

const inputDigit = (d) => {
  if (justEvaluated) { current = '0'; justEvaluated = false; }
  current = (current === '0') ? String(d) : current + String(d);
  setDisplay(current);
};

const inputDot = () => {
  if (justEvaluated) { current = '0'; justEvaluated = false; }
  if (!current.includes('.')) current += '.';
  setDisplay(current);
};

const clearAll = () => { current = '0'; prev = null; op = null; setDisplay(current); };

const setOp = (nextOp) => {
  if (prev === null) { prev = parseFloat(current); }
  else if (!justEvaluated) { prev = evaluate(prev, parseFloat(current), op); setDisplay(String(prev)); }
  op = nextOp; current = '0'; justEvaluated = false;
};

const evaluate = (a, b, operation) => {
  if (operation === 'add') return a + b;
  if (operation === 'subtract') return a - b;
  if (operation === 'multiply') return a * b;
  if (operation === 'divide') return b === 0 ? NaN : a / b;
  return b;
};

const equals = () => {
  if (op === null) return;
  const result = evaluate(prev, parseFloat(current), op);
  setDisplay(Number.isNaN(result) ? 'Error' : String(result));
  current = String(result);
  prev = null; op = null; justEvaluated = true;
};

const sign = () => { current = current.startsWith('-') ? current.slice(1) : '-' + current; setDisplay(current); };
const percent = () => { current = String(parseFloat(current) / 100); setDisplay(current); };

document.querySelector('.keys').addEventListener('click', (e) => {
  const btn = e.target.closest('button'); if (!btn) return;
  if (btn.dataset.action === 'clear') return clearAll();
  if (btn.dataset.action === 'equals') return equals();
  if (btn.dataset.action === 'sign') return sign();
  if (btn.dataset.action === 'percent') return percent();
  if (btn.dataset.op) return setOp(btn.dataset.op);
  if (btn.textContent === '.') return inputDot();
  if (/^\d$/.test(btn.textContent)) return inputDigit(btn.textContent);
});

// Ввод с клавиатуры
window.addEventListener('keydown', (e) => {
  if (/\d/.test(e.key)) return inputDigit(e.key);
  if (e.key === '.') return inputDot();
  if (e.key === 'Enter' || e.key === '=') return equals();
  if (e.key.toLowerCase() === 'c') return clearAll();
  if (['+', '-', '*', '/'].includes(e.key)) {
    const map = { '+':'add', '-':'subtract', '*':'multiply', '/':'divide' };
    return setOp(map[e.key]);
  }
});
