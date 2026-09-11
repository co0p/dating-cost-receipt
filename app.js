// app.js — Date-A-Base
// DOM wiring. Imports pure calculation functions from calc.js.

import {
  vehicleCost, weatherTax, enjoymentDiscount, calculateTotal,
  outfitSurcharge, exPenalty, silenceTax, foodModifier, laughDiscount,
  BASE_COST
} from './calc.js';

// Satirical dynamic labels per selected value
const VEHICLE_LABELS = {
  walking:     'Foot power (dignity: intact)',
  transit:     'Public transit (smelled like it)',
  'own-car':   'Own car (petrol & regret)',
  uber:        'Uber (surge pricing, obviously)',
  helicopter:  'Helicopter (no regrets, only debt)',
};

const WEATHER_LABELS = {
  sunny: 'Weather tax (it was nice, fine)',
  rain:  'Rain tax (hair completely ruined)',
  snow:  'Blizzard hazard pay (maniac)',
};

const OUTFIT_LABELS = {
  1: 'Outfit: rolled out of bed',
  2: 'Outfit: tried a little',
  3: 'Outfit: respectable effort',
  4: 'Outfit: genuinely impressive',
  5: 'Outfit: Renaissance painting',
};

const ENJOYMENT_LABELS = [
  '', // 0 unused
  'Enjoyment (send help)',
  'Enjoyment (barely survived)',
  'Enjoyment (mildly tolerable)',
  'Enjoyment (had worse)',
  'Enjoyment (not bad actually)',
  'Enjoyment (pretty decent)',
  'Enjoyment (genuinely good)',
  'Enjoyment (legitimately great)',
  'Enjoyment (almost perfect)',
  'Enjoyment (where have you been)',
];

const FOOD_LABELS = {
  'sad-salad':    'Food: sad salad (criminal)',
  'fast-food':    'Food: fast food (bold choice)',
  'decent-pasta': 'Food: decent pasta (safe)',
  'fancy-dinner': 'Food: fancy dinner (respect)',
  'michelin':     'Food: Michelin star (propose now)',
};

const FOOD_SIGN = {
  'sad-salad':    '+',
  'fast-food':    '+',
  'decent-pasta': '',
  'fancy-dinner': '-',
  'michelin':     '-',
};

function formatAmount(value) {
  const abs = Math.abs(value).toFixed(2);
  return value < 0 ? `-$${abs}` : `$${abs}`;
}

function updateReceipt() {
  const date       = document.getElementById('date').value;
  const payerName  = document.getElementById('payer-name').value;
  const dateeName  = document.getElementById('datee-name').value;
  const distance   = parseFloat(document.getElementById('distance').value) || 0;
  const vehicle    = document.getElementById('vehicle').value;
  const weather    = document.getElementById('weather').value;
  const enjoyment  = parseInt(document.getElementById('enjoyment').value, 10);
  const outfitLevel = parseInt(document.getElementById('outfit').value, 10);
  const exMentioned = document.getElementById('ex-mentioned').value === 'yes';
  const silences   = parseInt(document.getElementById('silences').value, 10) || 0;
  const food       = document.getElementById('food').value;
  const laughs     = parseInt(document.getElementById('laughs').value, 10) || 0;

  // Update header
  document.getElementById('receipt-date').textContent   = date || '--';
  document.getElementById('receipt-payer').textContent  = payerName || '--';
  document.getElementById('receipt-datee').textContent  = dateeName || '--';

  // Calculate line items
  const vc  = vehicleCost(vehicle, distance);
  const wt  = weatherTax(weather);
  const os  = outfitSurcharge(outfitLevel);
  const ep  = exPenalty(exMentioned);
  const st  = silenceTax(silences);
  const fm  = foodModifier(food);
  const ld  = laughDiscount(laughs);
  const logistical = vc + wt + os + ep + st + fm;
  const discount   = enjoymentDiscount(BASE_COST, logistical, enjoyment);
  const total      = calculateTotal(distance, vehicle, weather, enjoyment, outfitLevel, exMentioned, silences, food, laughs);

  // Update labels + amounts
  document.getElementById('label-vehicle').textContent   = VEHICLE_LABELS[vehicle] || 'Transport surcharge';
  document.getElementById('receipt-vehicle').textContent = formatAmount(vc);

  document.getElementById('label-weather').textContent   = WEATHER_LABELS[weather] || 'Weather tax';
  document.getElementById('receipt-weather').textContent = formatAmount(wt);

  document.getElementById('label-outfit').textContent    = OUTFIT_LABELS[outfitLevel] || 'Outfit surcharge';
  document.getElementById('receipt-outfit').textContent  = formatAmount(os);

  const enjoymentLabel = ENJOYMENT_LABELS[enjoyment] || 'Enjoyment discount';
  document.getElementById('label-enjoyment').textContent    = enjoymentLabel;
  document.getElementById('receipt-enjoyment').textContent  = `-${formatAmount(discount)}`;

  // Laughs — only show if > 0
  const laughsAmt = document.getElementById('receipt-laughs');
  const laughsLabel = document.getElementById('label-laughs');
  if (laughs > 0) {
    laughsLabel.textContent = `Joke credit (${laughs} laugh${laughs === 1 ? '' : 's'})`;
    laughsAmt.textContent   = `-${formatAmount(ld)}`;
  } else {
    laughsLabel.textContent = 'Joke appreciation (none)';
    laughsAmt.textContent   = '-$0.00';
  }

  // Ex penalty — show/hide line
  const exLine = document.getElementById('line-ex');
  exLine.style.display = exMentioned ? 'flex' : 'none';
  document.getElementById('receipt-ex').textContent = formatAmount(ep);

  // Silences
  const silLabel = document.getElementById('label-silences');
  silLabel.textContent = silences > 0
    ? `Silence tax (${silences} painful)`
    : 'Silence tax (blessedly none)';
  document.getElementById('receipt-silences').textContent = formatAmount(st);

  // Food
  document.getElementById('label-food').textContent   = FOOD_LABELS[food] || 'Food';
  const fmAbs = Math.abs(fm);
  const fmSign = fm < 0 ? '-' : '';
  document.getElementById('receipt-food').textContent = fm === 0 ? '$0.00' : `${fmSign}$${fmAbs.toFixed(2)}`;
  // Style food as deduction if negative
  const foodLine = document.getElementById('line-food');
  if (fm < 0) {
    foodLine.classList.add('receipt-deduction');
  } else {
    foodLine.classList.remove('receipt-deduction');
  }

  // Update total
  const totalEl      = document.getElementById('receipt-total');
  const totalLabelEl = document.querySelector('.receipt-total-label');

  if (total <= 0) {
    totalEl.textContent = `REFUND $0.00`;
    totalEl.classList.add('refund');
    totalLabelEl.textContent = '*** YOU WIN ***';
  } else {
    totalEl.textContent = formatAmount(total);
    totalEl.classList.remove('refund');
    totalLabelEl.textContent = 'TOTAL DUE';
  }

  // Update slider labels
  document.getElementById('enjoyment-value').textContent = enjoyment;
  document.getElementById('outfit-value').textContent    = outfitLevel;
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
