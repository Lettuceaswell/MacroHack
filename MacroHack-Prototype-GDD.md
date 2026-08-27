# MACROHACK — Grey Box Prototype GDD

*Derived from MacroHack-GDD-v3.md. This is a scope cut, not a new design — every mechanic here is pulled verbatim from v3 with its section cited. Nothing is invented in this document.*

**Purpose:** answer one question — *is drafting one food card and one training card per week, five weeks a round, fun?* (v3 §22, Step One). Everything that doesn't serve that question is cut.

**Stack:** plain HTML/JS/CSS. No engine. Reasoning in prior conversation turn: fastest iteration, trivial to share a link for playtesting, no visual/shader work is in scope tonight anyway.

**Success bar (v3 §22):** a playtester asks for a second run, unprompted.

---

## 1. In Scope

The systems needed to make the food/training draft a real decision, and nothing added for flavor.

| System | v3 § | Why it's in |
|---|---|---|
| Two food cards drafted per week (3 shown, pick 1) | §4, §8 | The core loop being tested |
| Training card draft (3 shown, pick 1) | §4, §8 | The core loop being tested |
| Draft-with-depletion across the round | §4 | This is what makes week 5 feel different from week 1 — without it there's no escalating tension to test |
| Macros: Protein / Carbs / Fat | §6 | Cards need to mean something |
| Protein threshold (cliff, not slope) | §6 | The agonizing-value-spread decision is a named goal — cutting it removes the reason protein cards are hard to evaluate |
| Two-color energy (Carb/Fat) | §6 | Training cards must cost something specific, or the food draft doesn't feed the training draft |
| Randle Cycle (flat, simplified — see §3 below) | §6 | The mono-fuel-vs-lopsided decision is the single most-cited "this is what makes food choice smart" mechanic in v3. Cutting it makes the prototype untestable for its actual thesis. |
| Suppressed energy (greyed, recoverable) | §6 | Follows directly from Randle being in |
| Training Score / Sets with diminishing output | §8 | Same reasoning — without diminishing Sets, training draft collapses to "pick biggest number," which is the failure mode v3 explicitly designs against |
| Engine (lean mass) + Engine Multiplier | §9 | Protein threshold needs something to gate |
| Reserve (dormant, no v3 "employer" cards) | §9 | Needed as the sink for unspent energy at Recomp — but no Reserve Employer cards tonight (see Cut list) |
| The Demand (fixed formula, no modifiers) | §12 | Need *something* to fail against — this is the single fail state |
| Round Output pipeline (additive → multiplicative) | §13 | The scoring math the whole test hangs on |
| Recomp (numbers only, no ceremony pass) | §18 | Round must resolve and show what happened — the numeric skeleton only, no animation beats |
| 5 weeks/round, 3 rounds for the prototype | §4, §22 | Enough rounds to feel the depletion/escalation tension without building the full 8-round Demand curve |

## 2. Explicitly Cut

Cut because it's visual/ceremonial polish, meta-progression, or economy depth — none of it changes whether the *draft* is fun, which is the only question tonight.

| System | v3 § | Why it's cut |
|---|---|---|
| Body-as-HUD silhouette grid | §10 | Pure art/juice. Needs its own validation gate (four-corners test) before it's even worth building, per v3's own plan. |
| The Static (shader/glitch effects) | §11 | Presentation layer on top of Efficiency, not the mechanic itself |
| Efficiency ratchet & diet-break decision | §11 | **Biggest cut, flagged deliberately.** This is v3's "signature decision" and is core to Goal One long-term. But it only matters across many rounds (it's a multi-round drift), and tonight's test is a 3-round slice. Fake it as a flat 1.0 multiplier for the prototype; build it once the base loop is proven fun. |
| Meals (food-unlocks-training) | §7 | Real depth, but it's an additive layer on top of macros, not a precondition for testing the macro decision itself |
| Reserve Employers (Strongman, Gymnast, etc.) | §15 | These are Upgrade Slot cards — see below |
| Upgrade Slots (Diet/Style/Partner/Job/Gym) | §14 | The "game-breaking layer." Explicitly a *later* system in v3's own production plan — the bootleg test predates it. |
| Shop (Groceries/Packs), Dollars | §16 | No economy needed to test a 3-round slice |
| Instruments | §19 | Legibility-as-economy is meaningless without a shop/economy to spend in |
| Collection, Collector Loadout, Physique Card | §20 | Meta-progression; irrelevant to a single playtest session |
| Generations, win fiction, tape-recording-over | §21 | Same — meta-progression across runs |
| Tapes (instructor/bias/rule-twist select) | §3 | One fixed starting deck tonight; no Tape selection screen |
| Cheat Meal, Work Overtime, Deload cards | §8 | Real but secondary decisions layered on top of the core draft — cut to isolate the base loop |
| Round Select (choice of two Demands) | §4 | One fixed Demand per round tonight, no branching |
| Demand modifiers, Ratings Bonus | §12 | Economy/overkill layer, moot without a shop |
| Hover-Preview, Fill | §17 | Real UX needs eventually, but a prototype tester can be told the math or read it off a plain readout — doesn't need to be a polished hover panel tonight |
| Pull the Tape (concede) | §4 | No mid-run economy/stakes yet to make conceding meaningful |
| VHS tone, art direction, sound | §2 | Zero effect on whether the mechanic is fun |

## 3. Simplifications to In-Scope Systems

Where an in-scope mechanic gets a cheaper version for tonight rather than the full v3 spec:

- **Randle Cycle:** use the real formula from §6 (`r = lesser/greater`, `usable lesser = lesser × (0.5 + 0.5r)`). It's cheap to implement exactly as specified — no simplification actually needed, just don't gold-plate the suppression UI.
- **Efficiency:** hardcoded at 1.0 for the whole prototype. No drift, no bands, no Static. This is the one deliberate mechanical fake — noted above, not hidden.
- **Recomp:** plain numeric readout (energy → Reserve, Engine change, Efficiency line even though it's frozen, Demand met/missed). No animated sequence, no audio beats — just show the §13 pipeline's numbers in order so a tester can read what happened.
- **Demand:** use the real formula (`100 × 1.25^(n-1)`) for 3 rounds only (100 / 125 / 156). No modifiers.
- **Card pool:** **20 food / 18 training** — see MacroHack-Prototype-Cards.md for the full set and the tuning. (An earlier draft of this doc said 15/15, matching v3's Vertical Slice target in §22. That number is wrong: 5 picks × 3 shown = 15 cards seen per round, so a 15-card pool is exhausted *exactly* at week 5 and the player knows the whole remaining deck by week 3. The larger pools keep 5 food and 3 training cards buried each round, which is what preserves the "will a bigger card surface?" gamble in v3 §6.)

## 4. Build Order

Each step is a chunk — buildable and testable on its own before moving to the next.

1. **Data layer** — card definitions (food + training) as plain JS objects/arrays. Macro values, energy costs, Set caps, Output values. No UI yet.
2. **Food draft screen** — draw 3, show macros, pick 1, apply to running round totals (Protein, Carb Energy, Fat Energy via Randle). Depletion working.
3. **Training draft screen** — draw 3, show cost/color/Output/Set cap, pick 1, spend energy, add to Training Score. Set stepper (add Sets up to cap or energy limit, diminishing Output).
4. **Week loop** — chain food → training → resolve, five times, feeding one round's running totals.
5. **Recomp** — apply §13 pipeline (Engine Multiplier × Efficiency-frozen-at-1.0), compare to Demand, show pass/fail, route unspent energy to Reserve, update Engine from protein threshold check.
6. **Round loop** — chain 3 Recomps, carrying Reserve/Engine forward, refilling and re-depleting the card pools each round.
7. **Fail/win state** — single fail state (miss Demand), simple end screen either way.

### Added after the step-7 review — blockers found by testing the built prototype

Steps 1–7 produced a complete, mechanically correct loop. A review pass then found three defects that would corrupt playtest data rather than merely look rough. **These are not polish.** Each one makes a tester fail or stall for reasons that have nothing to do with the question the playtest is asking.

8. **Fix the training-draft hard-lock.** ⚠ *Blocker.* If all three drawn training cards are unaffordable in their fuel color, every card is greyed out, nothing is clickable, and the week can never end — the tester must refresh and lose the run. Measured rate: **1.96% of training draws, which compounds to ~26% of full runs.** One tester in four hits a dead end. Cause: fat energy is abundant (9/g) while carb is scarce (4/g), and 8 of 18 training cards are carb-only, so a fat-heavy player routinely draws three unaffordable carb cards. Fix options, cheapest first: allow a **Rest week** (play 0 sets, bank the energy, deplete the draw and advance) — which also restores the "hoard or spend" decision v3 §6 calls live every week; or guarantee at least one affordable card in each draw; or let unaffordable cards be played at reduced Sets.
9. **Surface Demand, Engine and Reserve in the HUD.** ⚠ *Blocker.* The HUD currently shows Round, Week, Protein, both energy colors, Training Score and pool counts — but **not the Demand the round is scored against**, nor the Engine multiplier that scales the score, nor Reserve. The player is drafting against an invisible target and cannot answer "am I on pace?", which is the question every Set-allocation decision depends on. Contradicts v3 §12 ("published in advance, fully visible") and §10 ("visible at all times").
10. **Decide what to do about the suppression leak.** ⚠ *Design decision, not a code bug.* Because Randle recomputes on *held* energy, spending the lesser fuel shrinks the absolute suppression and releases energy back. Measured: against 44 carb / 99 fat, the HUD says **31.8 usable** but a player spending 5-cost sets actually drains **35 — 110% of the stated figure**, and 133% in the 30/120 case. Two consequences: the displayed "usable" number is simply wrong, and Randle barely bites, since incremental spending drains ~80% of held energy regardless of ratio. Since the carb/fat ratio decision is *the* thing the food draft is testing, shipping this untouched risks a playtest that concludes "the food choice didn't seem to matter." Options: display held-and-suppressed rather than a misleading "usable"; lock suppression at the moment food lands rather than recomputing on spend; or accept it and note it. **This one needs your call — it's a v3 §6 interpretation question, not a defect.**
11. **Reconsider the Hover-Preview cut for food cards only.** *Judgment call, not a blocker.* §2 above cut Hover-Preview as UX polish. That cut looks wrong for the food draft specifically: v3 §17 lists "Randle consequence — whether this pick releases suppressed energy, creates new suppression, or neither" as a food-card hover item, and without it a tester picking food is guessing at the exact mechanic under test. A single line under each food card ("would suppress ~8 fat") may be the difference between testing the food decision and testing whether people can do mental arithmetic.

12. **Playtest pass** — hand it to someone cold, no instructions beyond "draft food, then training, five weeks, three rounds." Watch for the §22 success bar.

---

*Checklist — tick off as each build-order step lands:*

- [x] 1. Data layer
- [x] 2. Food draft screen
- [x] 3. Training draft screen
- [x] 4. Week loop
- [x] 5. Recomp
- [x] 6. Round loop
- [x] 7. Fail/win state
- [x] 8. Fix training-draft hard-lock ⚠ blocker
- [x] 9. Surface Demand / Engine / Reserve in HUD ⚠ blocker
- [ ] 10. Decide on the suppression leak ⚠ needs your call
- [ ] 11. Reconsider food-card Hover-Preview (judgment call)
- [ ] 12. Playtest pass
