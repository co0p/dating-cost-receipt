import { describe, it, expect } from 'vitest';
import {
  vehicleCost, weatherTax, enjoymentDiscount, calculateTotal,
  outfitSurcharge, exPenalty, silenceTax, foodModifier, laughDiscount,
  BASE_COST
} from './calc.js';

describe('vehicleCost', () => {
  it('walking costs $0 regardless of distance', () => {
    expect(vehicleCost('walking', 20)).toBe(0);
  });

  it('uber charges $2 per km', () => {
    expect(vehicleCost('uber', 10)).toBe(20);
  });

  it('transit charges $0.50 per km', () => {
    expect(vehicleCost('transit', 10)).toBe(5);
  });

  it('own-car charges $1 per km', () => {
    expect(vehicleCost('own-car', 10)).toBe(10);
  });

  it('helicopter charges $5 per km', () => {
    expect(vehicleCost('helicopter', 10)).toBe(50);
  });

  it('negative distance is treated as zero', () => {
    expect(vehicleCost('uber', -5)).toBe(0);
  });
});

describe('weatherTax', () => {
  it('sunny charges $0', () => {
    expect(weatherTax('sunny')).toBe(0);
  });

  it('rain charges $15', () => {
    expect(weatherTax('rain')).toBe(15);
  });

  it('snow charges $30', () => {
    expect(weatherTax('snow')).toBe(30);
  });
});

describe('enjoymentDiscount', () => {
  it('deducts (baseCost + logisticalCosts) * (enjoyment / 10)', () => {
    expect(enjoymentDiscount(10, 20, 5)).toBe(15);
  });

  it('enjoyment 1 gives a 10% discount', () => {
    expect(enjoymentDiscount(10, 0, 1)).toBe(1);
  });

  it('enjoyment 10 gives a 100% discount', () => {
    expect(enjoymentDiscount(10, 0, 10)).toBe(10);
  });
});

describe('outfitSurcharge', () => {
  it('level 1 (rolled out of bed) costs $0', () => {
    expect(outfitSurcharge(1)).toBe(0);
  });

  it('level 5 (Renaissance painting) costs $20', () => {
    expect(outfitSurcharge(5)).toBe(20);
  });

  it('level 3 costs $10', () => {
    expect(outfitSurcharge(3)).toBe(10);
  });
});

describe('exPenalty', () => {
  it('ex mentioned = $50 flat penalty', () => {
    expect(exPenalty(true)).toBe(50);
  });

  it('ex not mentioned = $0', () => {
    expect(exPenalty(false)).toBe(0);
  });
});

describe('silenceTax', () => {
  it('$5 per awkward silence', () => {
    expect(silenceTax(3)).toBe(15);
  });

  it('0 silences = $0', () => {
    expect(silenceTax(0)).toBe(0);
  });

  it('negative silences treated as 0', () => {
    expect(silenceTax(-2)).toBe(0);
  });
});

describe('foodModifier', () => {
  it('sad salad adds $10', () => {
    expect(foodModifier('sad-salad')).toBe(10);
  });

  it('decent pasta is free ($0)', () => {
    expect(foodModifier('decent-pasta')).toBe(0);
  });

  it('michelin star deducts $25', () => {
    expect(foodModifier('michelin')).toBe(-25);
  });

  it('fancy dinner deducts $15', () => {
    expect(foodModifier('fancy-dinner')).toBe(-15);
  });
});

describe('laughDiscount', () => {
  it('$3 off per laugh', () => {
    expect(laughDiscount(4)).toBe(12);
  });

  it('0 laughs = $0 discount', () => {
    expect(laughDiscount(0)).toBe(0);
  });

  it('negative laugh count treated as 0', () => {
    expect(laughDiscount(-1)).toBe(0);
  });
});

describe('calculateTotal', () => {
  it('returns positive total for low enjoyment with no extras', () => {
    // base=10, vc=0, wt=0, logistical=0, discount=10*0.1=1, ld=0 → 9
    expect(calculateTotal(0, 'walking', 'sunny', 1)).toBeCloseTo(9);
  });

  it('floors at 0 when enjoyment is 10 and no travel', () => {
    expect(calculateTotal(0, 'walking', 'sunny', 10)).toBe(0);
  });

  it('includes all new variables in the sum', () => {
    // base=10, vc=0, wt=0, os=20(level5), ep=50(ex), st=15(3 silences), fm=10(sad-salad)
    // logistical=95, discount=enjoyment(1/10)*(10+95)=10.5, ld=laughDiscount(2)=6
    // total = 10 + 95 - 10.5 - 6 = 88.5
    expect(calculateTotal(0, 'walking', 'sunny', 1, 5, true, 3, 'sad-salad', 2)).toBeCloseTo(88.5);
  });

  it('ex penalty is brutal', () => {
    // base=10, no travel, no weather, outfit=1(0), ex=true(50), silences=0, food=decent(0)
    // logistical=50, discount=enjoyment(5/10)*(10+50)=30, ld=0
    // total = 10 + 50 - 30 = 30
    expect(calculateTotal(0, 'walking', 'sunny', 5, 1, true, 0, 'decent-pasta', 0)).toBeCloseTo(30);
  });
});
