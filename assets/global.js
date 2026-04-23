// Inkcora Theme — assets/global.js
// Basic global utilities

// Format money
window.formatMoney = function(cents, format) {
  const value = (cents / 100).toFixed(2);
  return '$' + value;
};

// Debounce
window.debounce = function(fn, wait) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), wait); };
};
