// MacroHack Grey Box Prototype — Step 3: food draft -> training draft -> Set stepper.
// Week-chaining beyond a single food+training pair, Recomp, and round-chaining
// are still not wired — this step proves one full week's shape works end to end.

let round;
let currentFoodChoices;
let currentTrainingChoices;
let selectedTrainingCard;
let selectedSets = 0;
let foodPool, trainingPool;
const logLines = [];

function log(line) {
  logLines.unshift(line);
  document.getElementById("log").textContent = logLines.slice(0, 14).join("\n");
}

function init() {
  foodPool = [...FOOD_CARDS];
  trainingPool = [...TRAINING_CARDS];
  round = new RoundState(1, CONST.START_ENGINE, CONST.START_RESERVE, foodPool, trainingPool);
  log(`── NEW RUN ── Round 1 start. Engine ${round.engine}, Demand ${round.demand}, Protein threshold ${round.threshold}.`);
  nextFoodDraw();
}

function renderHud() {
  const es = round.energyState();
  const mult = engineMultiplier(round.engine);
  const projectedOutput = round.trainingScore * mult * CONST.EFFICIENCY;
  const onPaceClass = projectedOutput >= round.demand ? "pace-ok" : "pace-behind";

  document.getElementById("hud").innerHTML = `
    <div><b>Round</b> ${round.roundNumber} / ${CONST.ROUNDS}</div>
    <div><b>Week</b> ${round.week} / ${CONST.WEEKS_PER_ROUND}</div>
    <div><b>Demand</b> ${round.demand}</div>
    <div><b>Engine</b> ${round.engine} (×${mult.toFixed(2)})</div>
    <div><b>Reserve</b> ${round.reserve.toFixed(1)}</div>
    <div><b>Protein</b> ${round.protein} / ${round.threshold}${round.proteinMet() ? " ✓" : ""}</div>
    <div><b>Carb E</b> ${es.usableCarb.toFixed(1)}${es.suppressedCarb > 0 ? ` (−${es.suppressedCarb.toFixed(1)} suppr.)` : ""}</div>
    <div><b>Fat E</b> ${es.usableFat.toFixed(1)}${es.suppressedFat > 0 ? ` (−${es.suppressedFat.toFixed(1)} suppr.)` : ""}</div>
    <div><b>Training Score</b> ${round.trainingScore.toFixed(1)}</div>
    <div class="${onPaceClass}"><b>Projected Output</b> ${projectedOutput.toFixed(1)} / ${round.demand}</div>
    <div><b>Food left</b> ${foodPool.length} · <b>Training left</b> ${trainingPool.length}</div>
  `;
}

// --- Food phase -----------------------------------------------------------

function nextFoodDraw() {
  renderHud();
  currentFoodChoices = round.drawFoodChoices();

  if (currentFoodChoices.length === 0) {
    document.getElementById("draft").innerHTML = "<p>Food pool exhausted.</p>";
    return;
  }

  const html = currentFoodChoices.map(card => {
    const e = foodCardEnergy(card);
    return `
      <div class="card" onclick="pickFood('${card.id}')">
        <h3>${card.name}</h3>
        <div class="stat">P ${card.p} / C ${card.c} / F ${card.f}</div>
        <div class="stat">Carb E +${e.carbEnergy} · Fat E +${e.fatEnergy}</div>
      </div>`;
  }).join("");

  document.getElementById("draft").innerHTML = `
    <p>Week ${round.week} — food, pick one:</p>
    <div class="cards">${html}</div>
  `;
}

function pickFood(id) {
  const card = currentFoodChoices.find(c => c.id === id);
  round.playFoodCard(card, currentFoodChoices);
  log(`Week ${round.week}: ate ${card.name} (P${card.p}/C${card.c}/F${card.f}).`);
  renderHud();
  nextTrainingDraw();
}

// --- Training phase ---------------------------------------------------

function nextTrainingDraw() {
  currentTrainingChoices = round.drawTrainingChoices();
  selectedTrainingCard = null;
  selectedSets = 0;

  if (currentTrainingChoices.length === 0) {
    document.getElementById("draft").innerHTML = "<p>Training pool exhausted.</p>";
    return;
  }

  renderTrainingDraft();
}

function renderTrainingDraft() {
  const html = currentTrainingChoices.map(card => {
    const affordable = round.maxAffordableSets(card);
    const color = round.resolveFuelColor(card);
    const capLabel = card.maxSets === null ? "∞" : card.maxSets;
    const disabled = affordable === 0 ? "style=\"opacity:0.4;cursor:default\"" : "";
    return `
      <div class="card" ${disabled} onclick="${affordable > 0 ? `selectTraining('${card.id}')` : ""}">
        <h3>${card.name}</h3>
        <div class="stat">${card.modality} · fuel: ${card.fuel}${card.fuel === "either" ? ` (→${color})` : ""}</div>
        <div class="stat">Cost ${card.cost} ${color} · Output ${card.output}/set</div>
        <div class="stat">Max Sets ${capLabel} · affordable now: ${affordable}</div>
      </div>`;
  }).join("");

  const anyAffordable = currentTrainingChoices.some(c => round.maxAffordableSets(c) > 0);

  document.getElementById("draft").innerHTML = `
    <p>Week ${round.week} — training, pick one${anyAffordable ? "" : " (none affordable — Rest to bank your energy)"}:</p>
    <div class="cards">${html}</div>
    <div id="stepper"></div>
    <button onclick="restWeek()" style="margin-top:12px">Rest (skip training, bank energy)</button>
  `;
}

function selectTraining(id) {
  selectedTrainingCard = currentTrainingChoices.find(c => c.id === id);
  selectedSets = Math.min(1, round.maxAffordableSets(selectedTrainingCard));
  renderStepper();
}

function renderStepper() {
  const card = selectedTrainingCard;
  const max = round.maxAffordableSets(card);
  const preview = round.previewSets(card, selectedSets);
  const marginal = selectedSets < max
    ? (round.previewSets(card, selectedSets + 1).output - preview.output).toFixed(1)
    : null;

  document.getElementById("stepper").innerHTML = `
    <div class="card" style="width:auto">
      <h3>${card.name} — Set stepper</h3>
      <div class="stat">Sets: ${selectedSets} / ${max} affordable (cap ${card.maxSets === null ? "∞" : card.maxSets})</div>
      <div class="stat">Total Output: ${preview.output.toFixed(1)} · Energy cost: ${preview.energyCost}</div>
      ${marginal !== null ? `<div class="stat">Next Set adds: +${marginal}</div>` : `<div class="stat">At max.</div>`}
      <button onclick="stepSets(-1)" ${selectedSets <= 1 ? "disabled" : ""}>− Set</button>
      <button onclick="stepSets(1)" ${selectedSets >= max ? "disabled" : ""}>+ Set</button>
      <button onclick="fillSets()" ${selectedSets >= max ? "disabled" : ""}>Fill</button>
      <button onclick="commitTraining()">Confirm</button>
    </div>
  `;
}

function stepSets(delta) {
  const max = round.maxAffordableSets(selectedTrainingCard);
  selectedSets = Math.max(1, Math.min(max, selectedSets + delta));
  renderStepper();
}

function fillSets() {
  selectedSets = round.maxAffordableSets(selectedTrainingCard);
  renderStepper();
}

function commitTraining() {
  const card = selectedTrainingCard;
  const { output, energyCost } = round.previewSets(card, selectedSets);
  round.playTrainingCard(card, selectedSets, currentTrainingChoices);
  log(`Week ${round.week}: trained ${card.name} x${selectedSets} sets (+${output.toFixed(1)} score, −${energyCost} energy).`);
  renderHud();
  advanceWeek();
}

// Rest: no training card played. Energy stays banked (spendable later,
// but exposed to Randle's live recompute and to Recomp's Reserve routing
// if never spent) — this is what keeps "hoard or spend" a real decision
// per v3 §6, and it's also the fix for the training hard-lock: if all 3
// drawn cards are unaffordable, Rest is always available.
function restWeek() {
  depleteChoices(trainingPool, currentTrainingChoices);
  log(`Week ${round.week}: rested — no training, energy banked.`);
  renderHud();
  advanceWeek();
}

function advanceWeek() {
  round.week++;
  if (round.week > CONST.WEEKS_PER_ROUND) {
    showRecomp();
    return;
  }
  nextFoodDraw();
}

// --- Recomp -------------------------------------------------------------

function showRecomp() {
  const r = round.resolveRecomp();

  document.getElementById("draft").innerHTML = `
    <div class="card" style="width:auto">
      <h3>RECOMP — Round ${round.roundNumber}</h3>
      <div class="stat">Training Score ${r.trainingScore.toFixed(1)} × Engine Mult ${r.engineMultiplier.toFixed(2)} × Efficiency ${r.efficiency.toFixed(2)}</div>
      <div class="stat"><b>Round Output ${r.roundOutput.toFixed(1)} vs Demand ${r.demand}</b> — ${r.passed ? `PASSED (+${r.margin.toFixed(1)})` : `FAILED (${r.margin.toFixed(1)})`}</div>
      <div class="stat">Protein ${round.protein}/${round.threshold} — ${r.proteinMet ? "cleared" : "missed"}</div>
      <div class="stat">Engine ${round.engine} ${r.engineDelta >= 0 ? "+" : ""}${r.engineDelta} → ${r.newEngine}</div>
      <div class="stat">Unspent energy: ${r.unspentCarb.toFixed(1)} carb + ${r.unspentFat.toFixed(1)} fat = ${r.unspentTotal.toFixed(1)} → Reserve +${r.reserveGain.toFixed(1)}</div>
      <div class="stat">Reserve ${round.reserve.toFixed(1)} → ${r.newReserve.toFixed(1)}</div>
      <br>
      ${r.passed
        ? (round.roundNumber < CONST.ROUNDS
            ? `<button onclick="nextRound(${r.newEngine}, ${r.newReserve})">Continue to Round ${round.roundNumber + 1}</button>`
            : `<p class="end-win"><b>RUN COMPLETE</b> — all ${CONST.ROUNDS} rounds cleared. Final Engine ${r.newEngine}, Reserve ${r.newReserve.toFixed(1)}.</p>`)
        : `<p class="end-fail"><b>RUN OVER</b> — Demand not met. Single fail state, per v3 §12.</p>`
      }
      <button onclick="init()">Play Again</button>
    </div>
  `;
  log(`RECOMP R${round.roundNumber}: Output ${r.roundOutput.toFixed(1)} vs Demand ${r.demand} — ${r.passed ? "PASS" : "FAIL"}.`);
}

function nextRound(newEngine, newReserve) {
  // Pools carry over (already depleted for the round, refill here per
  // Prototype-GDD §3: "refilling and re-depleting the card pools each round").
  foodPool = [...FOOD_CARDS];
  trainingPool = [...TRAINING_CARDS];
  round = new RoundState(round.roundNumber + 1, newEngine, newReserve, foodPool, trainingPool);
  log(`Round ${round.roundNumber} start. Engine ${round.engine}, Demand ${round.demand}, Protein threshold ${round.threshold}.`);
  nextFoodDraw();
}

init();
