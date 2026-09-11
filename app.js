// app.js — Date-A-Base
// Stub: wired up, calculation logic added in next increment.

document.addEventListener('DOMContentLoaded', () => {
  const enjoymentInput = document.getElementById('enjoyment');
  const enjoymentValue = document.getElementById('enjoyment-value');

  if (enjoymentInput && enjoymentValue) {
    enjoymentInput.addEventListener('input', () => {
      enjoymentValue.textContent = enjoymentInput.value;
    });
  }
});
