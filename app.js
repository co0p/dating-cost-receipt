// app.js — Date-A-Base
// DOM wiring. Imports pure calculation functions from calc.js.

import { vehicleCost, weatherTax, enjoymentDiscount, calculateTotal, BASE_COST } from './calc.js';

function formatAmount(value) {
  const abs = Math.abs(value).toFixed(2);
  return value < 0 ? `-$${abs}` : `$${abs}`;
}

function updateReceipt() {
  const date = document.getElementById('date').value;
  const payerName = document.getElementById('payer-name').value;
  const dateeName = document.getElementById('datee-name').value;
  const distance = parseFloat(document.getElementById('distance').value) || 0;
  const vehicle = document.getElementById('vehicle').value;
  const weather = document.getElementById('weather').value;
  const enjoyment = parseInt(document.getElementById('enjoyment').value, 10);

  // Update header
  document.getElementById('receipt-date').textContent = date || '--';
  document.getElementById('receipt-payer').textContent = payerName || '--';
  document.getElementById('receipt-datee').textContent = dateeName || '--';

  // Calculate line items
  const vc = vehicleCost(vehicle, distance);
  const wt = weatherTax(weather);
  const logistical = vc + wt;
  const discount = enjoymentDiscount(BASE_COST, logistical, enjoyment);
  const total = calculateTotal(distance, vehicle, weather, enjoyment);

  // Update line items
  document.getElementById('receipt-vehicle').textContent = formatAmount(vc);
  document.getElementById('receipt-weather').textContent = formatAmount(wt);
  document.getElementById('receipt-enjoyment').textContent = `-${formatAmount(discount)}`;

  // Update total
  const totalEl = document.getElementById('receipt-total');
  const totalLabelEl = document.querySelector('.receipt-total-label');

  if (total <= 0) {
    totalEl.textContent = `REFUND ${formatAmount(Math.abs(total))}`;
    totalEl.classList.add('refund');
    totalLabelEl.textContent = '*** REFUND ***';
  } else {
    totalEl.textContent = formatAmount(total);
    totalEl.classList.remove('refund');
    totalLabelEl.textContent = 'TOTAL';
  }

  // Update enjoyment slider label
  document.getElementById('enjoyment-value').textContent = enjoyment;
}

document.addEventListener('DOMContentLoaded', () => {
  // Set date default to today
  const dateInput = document.getElementById('date');
  if (!dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  // Wire all inputs to updateReceipt
  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', updateReceipt);
    el.addEventListener('change', updateReceipt);
  });

  // Initial render
  updateReceipt();
});
