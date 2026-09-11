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

All cost variables are positive numbers (surcharges). Deductions are listed separately.

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

**Outfit Surcharge**
A vanity tax based on how much effort the payer put into their outfit (scale 1–5).

| Level | Label | Surcharge |
|---|---|---|
| 1 | Rolled out of bed | $0.00 |
| 2 | Tried a little | $5.00 |
| 3 | Respectable effort | $10.00 |
| 4 | Genuinely impressive | $15.00 |
| 5 | Renaissance painting | $20.00 |

**Ex Penalty**
A flat $50.00 charge applied when the datee mentioned their ex. Non-negotiable.

**Silence Tax**
$5.00 per awkward silence. Floored at 0.

**Food Modifier**
An adjustment (positive or negative) based on food quality. Good food is a credit; bad food is a surcharge.

| Option | Modifier |
|---|---|
| Sad desk salad | +$10.00 |
| Fast food | +$5.00 |
| Decent pasta | $0.00 |
| Fancy dinner | -$15.00 |
| Michelin star | -$25.00 |

**Logistical Costs**
The sum of all cost variables before deductions: Vehicle Cost + Weather Tax + Outfit Surcharge + Ex Penalty + Silence Tax + Food Modifier (when positive).

---

## Deductions

**Enjoyment Level**
A slider value from 1 to 10. Represents the emotional return on the date investment.
- 1 = "Complete Disaster"
- 10 = "Love of my life"

**Enjoyment Discount**
A deduction calculated as: `(Base Cost + Logistical Costs) × (enjoymentLevel / 10)`.
A higher enjoyment level produces a larger discount. At 10/10 the date is heavily subsidized (total approaches $0).

**Laugh Discount**
$3.00 off per time the datee laughed at the payer's jokes. Floored at 0. Represents validation.

---

## Output States

**Total Cost**
The final calculated amount: `max(0, Base Cost + Logistical Costs − Enjoyment Discount − Laugh Discount)`.
Always ≥ $0.00. The floor represents the dignity floor — you can never profit from a date.

**Refund**
When Total Cost reaches $0.00. The satirical interpretation: the date was so transcendently good it wiped out all costs. Displayed as "*** YOU WIN ***" on the receipt.

---

## UI Terms

**Form**
The top section (on mobile) or left panel (on wide viewports) where the user enters all inputs.

**Receipt Panel**
The bottom section (on mobile) or right panel (on wide viewports) displaying the live-updating receipt.

**Line Item**
A single row on the receipt with a satirical label and a dollar value (positive = surcharge, negative = deduction).
