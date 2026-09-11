# Domain Glossary

Shared vocabulary for Date-A-Base. Use these terms consistently in code, tests, and documentation.

---

## Core Concepts

**Date**
A social outing between two people. The unit of analysis for the entire app. A date has a date (calendar), a payer, a datee, logistics, and an enjoyment rating.

**Payer**
The person who incurred the costs being calculated. Entered by the user as a name. Appears on the receipt header.

**Datee**
The person the payer went on the date with. Entered by the user as a name. Appears on the receipt header.

**Receipt**
The satirical output document. Itemizes costs and deductions. Styled to look like a printed restaurant receipt. Updates in real time as form inputs change.

---

## Cost Variables

**Base Cost**
A flat $10.00 charge applied to every date. Represents the existential cost of leaving the house.

**Vehicle Cost**
A per-kilometre charge based on the vehicle used. Calculated as: `distance × vehicleMultiplier`.

| Vehicle | Multiplier |
|---|---|
| Walking | $0.00/km |
| Public Transit | $0.50/km |
| Own Car | $1.00/km |
| Uber / Taxi | $2.00/km |
| Rented Helicopter | $5.00/km |

**Distance**
The travel distance to the date, in kilometres. A positive number entered by the user.

**Weather Tax**
A flat surcharge based on conditions. Represents suffering caused by the weather.

| Condition | Tax |
|---|---|
| Sunny | $0.00 |
| Raining | $15.00 |
| Snow / Blizzard | $30.00 |

**Logistical Costs**
The sum of Vehicle Cost and Weather Tax. All additions to the total before deductions.

---

## Deductions

**Enjoyment Level**
A slider value from 1 to 10. Represents the emotional return on the date investment.
- 1 = "Complete Disaster"
- 10 = "Love of my life"

**Enjoyment Discount**
A deduction calculated as: `(Base Cost + Logistical Costs) × (enjoymentLevel / 10)`.
A higher enjoyment level produces a larger discount. At 10/10 the date is heavily subsidized.

---

## Output States

**Total Cost**
The final calculated amount: `Base Cost + Logistical Costs − Enjoyment Discount`. Can be positive (you paid) or negative (the date paid for itself — a "Refund").

**Refund**
When Total Cost is negative. The satirical interpretation is that the date was so good it retroactively reimbursed the payer.

---

## UI Terms

**Form**
The left panel or top section (on mobile) where the user enters all inputs.

**Receipt Panel**
The right panel or bottom section (on mobile) displaying the live-updating receipt.

**Line Item**
A single row on the receipt with a label and a dollar value (positive or negative).
