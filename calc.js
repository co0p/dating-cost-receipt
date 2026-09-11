// calc.js — Pure calculation functions for Date-A-Base
// No DOM dependencies. Safe to import in Node/Vitest.

export const BASE_COST = 10;

export const VEHICLE_MULTIPLIERS = {
  walking: 0,
  transit: 0.5,
  'own-car': 1,
  uber: 2,
  helicopter: 5,
};

export const WEATHER_TAX = {
  sunny: 0,
  rain: 15,
  snow: 30,
};

/**
 * Cost of travel based on vehicle type and distance.
 * @param {string} vehicle - one of the VEHICLE_MULTIPLIERS keys
 * @param {number} distance - km traveled
 * @returns {number}
 */
export function vehicleCost(vehicle, distance) {
  const multiplier = VEHICLE_MULTIPLIERS[vehicle] ?? 0;
  return multiplier * Math.max(0, distance);
}

/**
 * Flat surcharge based on weather conditions.
 * @param {string} weather - one of the WEATHER_TAX keys
 * @returns {number}
 */
export function weatherTax(weather) {
  return WEATHER_TAX[weather] ?? 0;
}

/**
 * Discount applied based on enjoyment level.
 * Higher enjoyment = larger deduction.
 * @param {number} baseCost
 * @param {number} logisticalCosts - sum of vehicle + weather
 * @param {number} enjoyment - integer 1–10
 * @returns {number}
 */
export function enjoymentDiscount(baseCost, logisticalCosts, enjoyment) {
  return (baseCost + logisticalCosts) * (enjoyment / 10);
}

export const OUTFIT_SURCHARGES = {
  1: 0,
  2: 5,
  3: 10,
  4: 15,
  5: 20,
};

export const FOOD_MODIFIERS = {
  'sad-salad': 10,
  'fast-food': 5,
  'decent-pasta': 0,
  'fancy-dinner': -15,
  'michelin': -25,
};

/**
 * Vanity surcharge based on outfit effort (1–5).
 * @param {number} level - integer 1–5
 * @returns {number}
 */
export function outfitSurcharge(level) {
  return OUTFIT_SURCHARGES[level] ?? 0;
}

/**
 * Flat penalty if the ex was mentioned.
 * @param {boolean} mentioned
 * @returns {number}
 */
export function exPenalty(mentioned) {
  return mentioned ? 50 : 0;
}

/**
 * Tax per awkward silence.
 * @param {number} count - number of silences
 * @returns {number}
 */
export function silenceTax(count) {
  return Math.max(0, count) * 5;
}

/**
 * Cost modifier based on food quality. Positive = surcharge, negative = discount.
 * @param {string} food - one of the FOOD_MODIFIERS keys
 * @returns {number}
 */
export function foodModifier(food) {
  return FOOD_MODIFIERS[food] ?? 0;
}

/**
 * Discount per laugh. Floored at 0.
 * @param {number} laughs - number of times they laughed at your jokes
 * @returns {number}
 */
export function laughDiscount(laughs) {
  return Math.max(0, laughs) * 3;
}

/**
 * Produces a safe PNG filename from date and two names.
 * Pattern: <yyyy-mm-dd>-<name1>-<name2>.png
 * Falls back to receipt.png if date or either name is empty.
 * @param {string} date - ISO date string e.g. "2026-09-11"
 * @param {string} name1 - payer name
 * @param {string} name2 - datee name
 * @returns {string}
 */
export function sanitizeFilename(date, name1, name2) {
  const sanitize = str => str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const d = (date || '').trim();
  const n1 = sanitize(name1 || '');
  const n2 = sanitize(name2 || '');

  if (!d || !n1 || !n2) return 'receipt.png';
  return `${d}-${n1}-${n2}.png`;
}

/**
 * Final total. Floored at 0.
 * @returns {number}
 */
export function calculateTotal(
  distance, vehicle, weather, enjoyment,
  outfitLevel = 1, exMentioned = false, silences = 0, food = 'decent-pasta', laughs = 0
) {
  const vc = vehicleCost(vehicle, distance);
  const wt = weatherTax(weather);
  const os = outfitSurcharge(outfitLevel);
  const ep = exPenalty(exMentioned);
  const st = silenceTax(silences);
  const fm = foodModifier(food);
  const ld = laughDiscount(laughs);

  const logistical = vc + wt + os + ep + st + fm;
  const discount = enjoymentDiscount(BASE_COST, logistical, enjoyment);

  return Math.max(0, BASE_COST + logistical - discount - ld);
}
