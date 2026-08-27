// Sanity check against MacroHack-Prototype-Cards.md §5 worked checks.
// Run: node data.check.js
const { CONST, demandForRound, proteinThreshold, engineMultiplier, foodCardEnergy, FOOD_CARDS, TRAINING_CARDS } = require("./data.js");

function assertClose(actual, expected, label, tol = 0.5) {
  const ok = Math.abs(actual - expected) <= tol;
  console.log(`${ok ? "OK  " : "FAIL"} ${label}: got ${actual}, expected ~${expected}`);
}

console.log(`Food cards: ${FOOD_CARDS.length} (expect 20)`);
console.log(`Training cards: ${TRAINING_CARDS.length} (expect 18)`);

// Demand curve
[1, 2, 3].forEach((n, i) => {
  assertClose(demandForRound(n), [100, 125, 156][i], `Demand round ${n}`, 0);
});

// Protein thresholds at Engine 20/30/40
assertClose(proteinThreshold(20), 17, "Threshold @ Engine 20");
assertClose(proteinThreshold(30), 19.5, "Threshold @ Engine 30");
assertClose(proteinThreshold(40), 22, "Threshold @ Engine 40");

// Engine multipliers
assertClose(engineMultiplier(20), 0.90, "Mult @ Engine 20");
assertClose(engineMultiplier(30), 1.00, "Mult @ Engine 30");
assertClose(engineMultiplier(40), 1.10, "Mult @ Engine 40");

// Round-1 worked draft: Chicken & Potatoes, Salmon Fillet, Steak & Rice, Cottage Cheese, Bacon & Eggs
const ids = ["f01", "f04", "f03", "f02", "f06"];
let protein = 0, carbE = 0, fatE = 0;
ids.forEach(id => {
  const card = FOOD_CARDS.find(c => c.id === id);
  protein += card.p;
  const e = foodCardEnergy(card);
  carbE += e.carbEnergy;
  fatE += e.fatEnergy;
});
assertClose(protein, 27, "Round-1 draft protein");
assertClose(carbE, 44, "Round-1 draft carb energy");
assertClose(fatE, 99, "Round-1 draft fat energy");

const greater = Math.max(carbE, fatE);
const lesser = Math.min(carbE, fatE);
const r = lesser / greater;
const usableLesser = lesser * (0.5 + 0.5 * r);
const usableTotal = greater + usableLesser;
assertClose(usableTotal, 130.8, "Round-1 usable energy after Randle", 0.2);

console.log("\nDone.");
