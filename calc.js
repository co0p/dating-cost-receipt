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

/**
 * Final total. May be negative (a Refund).
 * @param {number} distance
 * @param {string} vehicle
 * @param {string} weather
 * @param {number} enjoyment
 * @returns {number}
 */
export function calculateTotal(distance, vehicle, weather, enjoyment) {
  const vc = vehicleCost(vehicle, distance);
  const wt = weatherTax(weather);
  const discount = enjoymentDiscount(BASE_COST, vc + wt, enjoyment);
  return BASE_COST + vc + wt - discount;
}
