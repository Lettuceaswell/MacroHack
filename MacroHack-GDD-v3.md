# MACROHACK — Game Design Document v3

*Numbers are disposable; design intent is the stable part.*

**Mechanics are directionally honest; magnitudes are theatrical.**

---

## 0. Design Thesis

**Two goals, in priority order.**

**One — macro management must be fun.** If managing macros isn't fun, we're designing the wrong game. Every system in this document exists to sharpen that core, or it gets deleted.

**Two — this is a quiet answer to the knowledge half of the obesity epidemic.** It never says so out loud. It is nowhere near the core loop. But nobody should finish a winning run and think *I wish I understood how my actual body worked.* Goal Two is achieved entirely as a byproduct of Goal One being achieved honestly. The moment it becomes the point, the game dies.

**Core fantasy:** the optimization and allocation of energy resources and Survival of the player character (a trainee on a retro workout tape) via escalating performance through physical output. MacroHack is not a life simulator — it uses the supportive systems of lifestyle (training, work, relationships) to sharpen the core fun of managing a body and its resources.

Workout Tape inside a workout tape. when the Tape is selected, we zoom into the screen to see the player character putting their tape in, with the instructor on screen. this allows us a glimpse into the surrounding lifestyle of the player character, but still allows them to be faceless vector character on tape.

### The ethos, stated

- **Macros are the game.**
- **Pressure comes from a ratchet, not a clock.**
- **Input randomness, output determinism.** Randomness at the draw, fixed math at resolution. Skill stays legible.
- **A single fail state.**
- **Turn-unlimited.** No clock, no reflex, pause anywhere, resume anywhere, think for four minutes if you want to. This is *not* the same as designing for divided attention — the target is an attention parasite that never rushes you.

---

## 1. Overview

MacroHack is a roguelite resource-management deckbuilder. A **run** is X **rounds**. A round is a training block.

**A round has two drafts, in this order.**

1. **Plan the Block.** Draft training cards 1-of-3, no replenishment, until the block is full. Block size is TBD.
2. **Check the Fridge.** Draft meals 1-of-3 against the energy bill the block just wrote.

**Order is the design.** You commit to the training before you know what you can feed it, then you feed it. The round reads as *chaos into order, then slightly less chaos into more order* — the first draft is a blind commitment, the second is a solvable problem with a known target.



The player selects a **Tape** before each run. A Tape is an instructor, a starting deck bias, and one rule twist.

---

## 2. Tone, Art & Sound

**Tone is intentionally absurd — but never comedic and never sarcastic.** The mechanics stay directionally correct and reverent toward biology. Absurdity lives in scale, presentation and character, not in mocking the subject. The game takes physiology completely seriously and takes *itself* not at all.

This is also the tonal lane the nearest competitor isn't in. GET YOKED is comedy. Reverent absurdity is the open ground, and it's the only tone compatible with Goal Two.

**Visual direction: 90s VHS fitness tape, roughly 80% analog / 20% digital.** Film grain, tracking artifacts, CRT curvature and scanline shaders, oversaturated tape color, chunky title cards. Against that, deliberate digital-era glitch: frame corruption, UI elements that stutter and resolve. The name is the art direction — *macro* is the analog body, *hack* is the intrusion into it.

**Figure style is Memphis-flat.** Two or three colors, no shading, no gradients. The player character is a retro multicolored silhouette of a trainee in leotard and legwarmers. Instructors are drawn in the same language.

**Audio follows the same ratio.** 80% period-accurate retro workout music, 20% modern glitch-forward electronic. The glitch layer sits higher on every successive Generation, so the soundtrack reports how many times this tape has been dubbed.

### The Static — tape wear as difficulty

Each Generation (§21) is a further-degraded dub, and the picture says so. Generation drives **a single shader intensity float.** Distortion creeps inward from the screen edges the deeper into the ladder the tape has been copied.

| Generation | The picture |
|---|---|
| 1st | Clean. Faint scanlines, mild curvature. Reads as *normal*, not as reward. |
| Early | Chroma bleed. Color fringing at high-contrast edges, occasional single-frame jitter. Noticeable before it's nameable. |
| Mid | Tracking bars rolling upward. Edge vignette creeping in. Audio crossfades toward the glitch mix. |
| Late | Heavy tracking, dropout, vertical roll. The picture fighting to hold. |

> **Hard rule: distortion attacks the frame, never the information.** Numbers stay crisp. The silhouette stays legible. The energy bar stays exact. The effect is masked to screen edges, background and borders — never the play area.

**Fatigue mitigations:**

- **Pulse, don't run flat.** Surge the effect at Recomp, then settle to a lower steady state. Reads as an event rather than a permanently dirty screen.
- **Keep the floor genuinely subtle.** Mild chroma bleed on Memphis pink-and-cyan risks reading as a rendering bug rather than intent.
- **Accessibility toggle, 0–100%.** One slider on a value already exposed. Not optional.

### Scope discipline on effects

- **CRT, grain, scanline, curvature:** cheap, always on, the identity. Keep.
- **Datamosh:** prerendered transitions only. Live datamosh is a solo-dev tarpit and buys nothing a prerendered tear doesn't.
- **Adaptive audio:** a two-layer crossfade — clean mix ↔ glitch mix — driven by the same Generation float as The Static. Not middleware. One float, two stems.

The 80/20 ratio survives at a fraction of the cost.

---

## 3. The Shelf — Tapes & Frame

**Main menu is a shelf of VHS tapes beside a deck.** Pressing Play is physically pushing a tape in. The machine accepts it, the tracking settles, the tape plays.

**Vol. 1 sits alone on the top shelf, on its side.** It is the tutorial, and it is not optional. Below it are the shelves that hold the real game.

### A Tape is exactly three things

1. **An instructor** — printed on the cover
2. **A starting deck bias** — the food and training cards you begin with
3. **One rule twist** — a single printed rule that changes how the run plays

Each spine carries its title and a small worn number: the highest **Generation** cleared on that tape. A separate shelf holds the **Collection** — promoted Collector's Edition cards.

**You are not playing yourself.** You are operating a trainee who lives inside a cassette with their own training tapes. This is load-bearing, not decoration. The disembodiment makes every food and training choice a decision about *a character*, not a judgment about the player's own body — the single most effective wellbeing mechanism in the design, at zero cost. It also licenses the absurdity: a VHS character can plausibly do crazy training volume.

### Vol. 1 — the tutorial that isn't framed as one

Players skip anything that reads as *not the game yet*. Vol. 1 is a tape. It is a shorter, simpler tape, framed as the primitive first edition of the series — because that is what it is in fiction. It plays for real, it produces a Physique Card, and it sits on the shelf forever.

**Controlled opening hand.** Nobody's first-ever draft is garbage. The first three food cards and first three training cards are fixed.

**Gating order:**

| When | What's introduced |
|---|---|
| Minute one | Plan the block, then feed it. Score vs. Demand. Three systems, nothing else. |
| Round 2 | Protein threshold and Engine. |

Teach time has to fit inside Steam's two-hour refund window with room to spare. Nothing here is a modal, a pointer, or a voice telling you what to click.

Other menus: **Collection**, **Settings**. Pause menu: quit to shelf, start new run, Pull the Tape.

---

## 4. Run Structure

1. **Tape select** — instructor, deck bias, rule twist
2. **Collector Loadout** — selected once per run, before the gauntlet is visible
3. **Round Select** — choose your Demand where the round offers a choice
4. **The Round** — Phase 1: draft the training block · Phase 2: draft the meal plan against its bill
5. **Recomp** — the round resolves; body composition, money, Demand met or missed
6. **Shop** — Groceries and Packs
7. Loop to Round Select

### The two drafts

**Phase 1 — Plan the Block.** Draw 3 training cards, pick 1. Repeat until the block is full. Each card prints its energy cost in EU, by color. **You are writing a bill before you know what's in the fridge.**

When the block closes, the bill is totalled and displayed: *this plan costs 6 Carb EU and 4 Fat EU.* That number is now the round's target.

**Phase 2 — Check the Fridge.** Draw 3 food cards, pick 1. Repeat for each meal slot. Every pick is measured against a target you can see.

**Why this order.** Phase 1 is commitment under ignorance — the interesting kind of gamble. Phase 2 is a solvable problem where the constraint is the draw, not the arithmetic. The round moves from chaos to order twice, at different amplitudes, and the player always knows which mode they're in.

It also removes an entire class of confusion: energy can never be stranded in a color you had no plan for. If you're short, you were short of a number you were looking at.

**Draft-with-depletion runs across both phases.** The pool shrinks with every pick and never refills mid-round, so the last meal slot is chosen under genuine scarcity the first one wasn't. Tension escalates for free, with no timer.

**Coming up short is not an automatic loss.** Any card in the block you can't fuel simply doesn't score. You built the plan; the plan is only as good as the week you fed it.

**Cheat Meal.** Once per round, reject all three food cards and redraw three from the pool. The rejected cards are still depleted — the redraw costs you pool depth, and it costs more the later you spend it.

### Round Select

Rounds offer a **choice of two Demands**, each with its own modifier and its own reward skew (extra Dollars, a free pack, a Groceries discount). Every fourth round is a **Boss**: a single forced Demand, visible from the start of the cycle.

| Round | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| | choice | choice | choice | **BOSS** | choice | choice | choice | **BOSS** |

The Boss being foreseen is the whole point. You are not choosing the easiest three Demands — you are choosing three Demands that leave you in a shape that can beat the fourth. That is the run's only macro-strategic layer, and it costs almost no content.

### Pull the Tape

Concede from anywhere. Exists because the fail state is visible a full round out — without an exit, a player who correctly reads a dead run at Recomp 6 must play five more weeks to confirm it.

**The payout is a snapshot, not a settlement.** Everything banked at the moment of ejection pays: Ledger, Physique Card, Collection progress from cards actually played, unlocks whose conditions have already resolved. Nothing that was still cooking pays. Nothing vests on the run ending.

> **Core rule: quitting can never earn more than playing on.** It forfeits all remaining upside and buys back time.

**The confirmation names the cost.** The dialog shows unearned progress left on the table — cards at 4/5 plays, a pending round clear, a Physique Card that improves in two rounds. The honesty contract, applied to the exit door. This is also the friction that stops conceding becoming a habit: the player who ejects anyway has read the bill and paid it. Confirmation is required; a misclick eating a live run is worse than the problem being solved.

**Ceremony is unchanged.** A conceded run is a finished run. The Physique Card generates, the shelf remembers, the tape ejects with dignity — the player pulled it themselves rather than getting recorded over. The Ledger goes diagnostic: name the round it went wrong and why. Conceding becomes the fastest route to the lesson, which is the meta-progression thesis stated exactly.

---

## 5. Core Resources & Terminology

| Term | What it is |
|---|---|
| **Macros** | Protein, Carbs, Fat. Color-coded on every card. |
| **Energy Unit (EU)** | The base energy denomination. 1 EU = 288 kcal. All costs and yields are in EU. |
| **Carb Energy** | Fast fuel, in EU. One segment of the energy bar. |
| **Fat Energy** | Dense slow fuel, in EU. The other segment. |
| **Reserve** | Stored energy. *(Formerly "body fat." Glycogen is Reserve; they were never two things.)* |
| **Engine** | Lean mass. |
| **The Band** | The Reserve range where Training Score is unpenalised. Never numbered. Cards move it. |
| **Dollars** | Groceries, packs, upgrades. |
| **Training Score** | The round's accumulated output before multipliers. |
| **Round Output** | Training Score after all multipliers. What the Demand is measured against. |
| **The Demand** | The output the round requires. |

---

## 6. The Macro System

Each macro is correct for a reason and incorrect for a reason. That tension is the game.

### Protein — a cliff, not a slope

Protein is **not spendable on training.** It exists to clear a threshold.

```
Threshold T = 12 + (Engine × 0.25)
```

Round protein total **≥ T** → Engine grows.
**< T** → no Engine growth, and Engine decays if you're also in deficit.

Below the line, protein does nothing. Above it, surplus is largely wasted. This makes the value spread on protein cards genuinely agonizing: seeing a +1 when you need +3 to clear forces a real choice between banking safe value now and gambling that a bigger card surfaces before the pool depletes.

Note the built-in cruelty: **the threshold scales with Engine.** The bigger you get, the more it costs to stand still. Engine charges rent.

### The Energy Unit

**All energy in MacroHack is denominated in Energy Units. 1 EU = 288 kcal.**

288 is chosen because it divides evenly by both **9** (kcal per gram of fat) and **4** (kcal per gram of protein and carbohydrate), so every macro converts to a whole number of grams:

| Macro | kcal/g | Grams per 1 EU |
|---|---|---|
| Fat | 9 | 32 g |
| Protein | 4 | 72 g |
| Carbs | 4 | 72 g |

Because 288 = 2⁵ × 3², it also divides cleanly by 2, 3, 4, 6, 8, 9, 12, 16, 24, 32, 36, 48, 72 and 144 — so fractional card values (½, ⅓, ¼ EU) still land on integer gram counts.

**Why it matters.** Food yields, training costs and every other energy-bearing card can be authored and balanced in small integers rather than raw calories. A designer writes *"this card yields 2"*, not *"576 kcal."* Players reason in units and never do arithmetic at the table. The kcal figure exists so the model stays honest; it is never the number on the card.

**The card face is quarter-EU.** One printed macro point = **¼ EU = 72 kcal**, which is 18 g of carbohydrate or 8 g of fat. So the §7 value spread maps directly:

| Printed | EU | Carbs | Fat |
|---|---|---|---|
| +1 | ¼ | 18 g | 8 g |
| +2 | ½ | 36 g | 16 g |
| +3 | ¾ | 54 g | 24 g |

This is where fat's density lives in the fiction: **+2 Fat and +2 Carb are worth the same energy, but the fat card is a third of the mass.** A day's intake sits around 8 EU.

Author every food card in printed points. Grams and calories are display layers — the Ledger and the Food Scale (§19) can show them; the card never does.

### Two-Color Energy

There is no abstract energy pool. Energy exists in two colors, shown as one bar with two segments.

```
Carb Energy (EU) = Carbs × 0.25
Fat Energy  (EU) = Fat   × 0.25
```

Same conversion, two separate pools — the split is what matters, not the rate.

**Every training card prints a cost in both colors.** A heavy squat might cost 2 Carb / 0 Fat; a long ride 0 Carb / 3 Fat; a conditioning piece 1 Carb / 1 Fat. Explosive work is carb-hungry, steady work is fat-hungry, and plenty of cards want some of each.

There is no "either" — a card costs what it costs. You can only be **short of a color**, and because the block is drafted first, you know exactly how short before you buy a single meal.

### Unspent Energy

Every gram printed on a card converts and lands. Nothing is taken cold, and nothing is destroyed.

**Energy remains energy for the entire round.** Carb Energy and Fat Energy sit in their own segments of the bar and never convert into one another. Overbuying a color is a real cost — it spills to Reserve instead of scoring.

```
Available = Earned − Spent
```

**At Recomp, all unspent energy routes to Reserve.** Both segments slide down into the body. Energy is never destroyed, only routed — wordless, honest, and it teaches the rule in one animation.

**The inversion:** builds that read Reserve (§15) *want* this. For Strongman or Open Water, deliberately overbuying a fuel color is a Reserve pump rather than a mistake. The same spill is a leak or a tool depending on what reads your fat.

### Macro identity

| Macro | Verb | Fuels | Fails by |
|---|---|---|---|
| **Protein** | Clear a threshold | Nothing — gates Engine only | Missing the cliff |
| **Carbs** | Fast fuel | Explosive / high-intensity work | Missing the color the block asked for |
| **Fat** | Dense slow fuel | Steady / low-intensity work | Missing the color the block asked for |

---

## 7. Food Cards & Meals

Food cards are **free to play**. The food deck is a fridge/pantry — non-consumable across the run. To improve it, pay Dollars at Groceries to replace a card of your choosing. Within a round, all drawn cards are **depleted**, not replaced.

Cards are color-coded by primary macro.

### Meals

A food card is a macro payload with a name. There are no lock or unlock keywords — the energy colors already do that work, and now they do it against a bill the player can see.

> **Steak & Rice** — 3P 2C 0F
> Clears threshold. 0.5 Carb EU.

> **Olive Oil & Greens** — 0P 0C 2F
> 0.5 Fat EU.

The draft is not arithmetic, because the target is known and the draw is not. You are looking for 4 Fat EU across three slots and being offered protein. That's the decision: take the wrong color now, or gamble that the right one surfaces before the pool depletes.

### Value spread

Macro cards exist across a range (+1 / +2 / +3). Drawing the weak version of what you need is a real decision, not a rounding error.

---

## 8. Training Cards & Training Score

Deck shape: fewer total cards than the food deck, **3 drawn per pick.** Each training card prints an **energy cost in EU** and a **Training Score Output**.

### One card, one score

**Every training card scores exactly once.** There is no set stepper, no cap to manage, no diminishing curve to compute. You draft a card, it costs its energy, it contributes its Output. The decision is *which card*, not *how much card*.

This is the single biggest simplification in the design. It removes the per-card optimisation loop, the arithmetic it forced into every pick, and the interface furniture built to manage it.

### Retrigger — the power fantasy, promoted to a card

Scoring more than once is not a default verb. It is **a prize.** Rule-changers and card modifiers grant **Retrigger**: the card resolves an additional time, for free.

| Effect | Reads as |
|---|---|
| Retrigger a named card | This one card scores twice |
| Retrigger a modality | Every Strength card scores twice |
| Retrigger on a condition | Scores again if Reserve is inside the band |

Because retriggers are rare and multiply a single Output number, they are legible at a glance and enormous when they land. **The engine is built from retriggers, not from clicking.**

### Modality identity

With Sets gone, modalities differentiate on **cost shape and Output shape** — numbers on the card, not separate rules.

| Modality | Fuel profile | Identity |
|---|---|---|
| **Strength** | Carb-heavy, expensive | Very high Output, very high cost |
| **Hypertrophy** | Carb-heavy, moderate | The reliable midrange — good Output per EU |
| **Conditioning / CrossFit** | Both colors, balanced | Rewards a full, even tank |
| **Endurance** | Fat-heavy, cheap | Low Output each, but many fit in a block |
| **Yoga** | Fat, very cheap | Low Output; discounts other cards' costs |
| **Sport** | Both colors | Conditional Output, scaling off other conditions |
| **Climbing** | Fat, cheap | Low cost, rewards low Reserve |

**AMRAP** survives as a single Conditioning card that scores once, for an Output equal to a multiple of **all energy still unspent at Recomp.** Same fantasy — worthless in round 2, the centre of the universe in round 8 — as one number instead of 120 clicks.

### Deload cards

Cheap, low-Output training cards that carry deck-manipulation riders instead of score: thin a card from the deck, duplicate a card, retag a training card's fuel cost. A deliberate trade of this round's output for a better deck in the next three.

### Work Overtime

A training-slot card that earns roughly double normal income in place of training. Costs energy, produces no Training Score.

### Sweat It Out

Every starting deck contains one crude universal converter: **burn Reserve into Fat Energy at a bad exchange rate.** The floor on what Reserve can always do; the good conversions (§15) remain the draft prize.

---

## 9. Body Composition — Reserve & Engine

Both are visible at all times. Both persist across rounds. **Body composition is the residue of past transactions, not a spendable resource.**

### Engine

Lean mass. Provides the output multiplier:

```
Engine Multiplier = 0.7 + (Engine / 100)
```

Engine 40 → ×1.10. Engine 68 → ×1.38.

Its cost is the protein threshold, which scales with it. Building Engine is a commitment with a recurring bill.

### Reserve

Stored energy. It moves every round: unspent energy routes into it at Recomp, and cards spend it back out.

**Reserve management is the game.** The Band is how the game says so.

### The Band

There is a range of Reserve where the body performs. Roughly the 10–20% bodyfat window, though **the game never prints those numbers, or any numbers, for it.**

```
Inside the Band  → ×1.0 Training Score
Outside the Band → Training Score declines with distance
```

**Inside the Band is not a bonus. It is baseline.** Being inside is what *normal* costs. The Band is not a reward to chase; it is a condition to hold while the Demand climbs underneath you.

The decline outside is **gradual and symmetric** — a few percent per step, in either direction, floored well above zero. Drifting out is drag, never death. A player who overshoots on one side has a problem to solve over the next two rounds, not a lost run.

**The Band is unnumbered, permanently.** No percentage, no target value, no "optimal Reserve" readout anywhere in the game. It is drawn on the body (§10) and you are drawn inside or outside it. This is deliberate: a printed number would make the Band a score to hit, and the whole point is that it's a place to live.

**"Under normal circumstances."** That phrase is load-bearing. The Band is the default rule, and **upgrade cards rewrite it** — widen it, move it, invert it, or pay you for standing outside it. Sumo wants you heavy. Sprinter wants you light. Those cards aren't beating the Band; they're changing where your body's Band is. See §15.

---

## 10. Body-as-HUD

**The resource bar forest is deleted.** Reserve and Engine are not bars. They are the player silhouette, center screen.

### Two resources, two body regions

| Resource | Region | Reads as |
|---|---|---|
| **Engine** | Upper body | Shoulder breadth, limb thickness, taper |
| **Reserve** | Midsection | Belly, hips, softness of outline — angular at low, round at high |

Both channels are **silhouette shape, not interior detail.** This keeps the figure flat, keeps the two readings independent, and avoids needing separate art layers.

Together they produce four instantly distinct corner silhouettes, using real bodybuilding visual language:

- **V-taper** — low Reserve, high Engine
- **Powerlifter** — high Reserve, high Engine
- **Stick** — low Reserve, low Engine
- **Soft** — high Reserve, low Engine

**The Band is a dotted envelope behind the figure** — two ghost outlines, your current Engine drawn at the Band's lower and upper Reserve. The figure sits inside that envelope or outside it, and that is the entire readout. Inside, the ghosts sit flush against the silhouette and effectively vanish. Outside, the gap between figure and envelope is visible and grows. **No number, no tutorial, no target.**

### Godot implementation

A **5×5 sprite grid** — 25 unified figures, one per Engine/Reserve combination. **Not two stacked layers.** Muscle detail and outline must be drawn together or the muscle won't register as the outline shifts.

- A single `Sprite2D` selecting a frame by index.
- **No tweening — snap to the nearest frame.** Reserve and Engine only update at Recomp, eight times per run, so the snap *is* the ceremony beat. VHS-era animation didn't interpolate either.
- **Idle motion is transform-only:** vertical bob, slight scale squash, small rotation, driven by an `AnimationPlayer` on the parent `Node2D`. Zero additional drawings, and it prevents dead air between Recomps.

### Validation gate — before the other 21 drawings

Draw **only the four corners.** Show them to someone cold and ask them to sort by muscle and by fat. If they can't, the channel split is wrong and the grid needs rethinking.

One day of work to de-risk the centerpiece visual of the game.

### HUD census

Silhouette (Engine, Reserve, the Band envelope) · two-color energy bar · protein tracker vs. threshold · Demand dial. **Four readouts.**

---

## 11. The Honesty Contract

> **Hide nothing. Precompute nothing.**

The game's only secret is ever a *number*, never a *rule*. Every mechanism is published on the card. What the player doesn't get handed is the current reading and the arithmetic. Five visible rules interacting is a computation, not a lookup.

**Rules leak; state doesn't.** The wiki will publish every formula in this document within a week of launch. It can never tell you what your fridge holds, what the pool has left, or what your body looks like *in this run*.

**Name the symptom, never the remedy.** The figure's outline goes angular — not "eat more protein." A card dims — not "needs carbs."

**Never surprise-kill.** Failure must be visible at least a full round out. Losing to information you couldn't have had is the design sin. Losing to information you had and misread is the game.

**The Ledger** backs all of this: a full numeric audit at every Recomp, one round in arrears. Hidden in the moment, transparent in retrospect.

---

## 12. The Demand & the Single Fail State

**The Demand** is the output a round requires. It represents the world's indifference: it doesn't know you're tired, doesn't care what you did last round, and was going to be what it is whether you showed up or not.

Because it's indifferent, it is **completely honest**. Published in advance. Fully visible. Gentle slope.

```
Demand(n) = 100 × 1.25^(n-1)
```

| Round | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| **Demand** | 100 | 125 | 156 | 195 | 244 | 305 | 381 | 477 |

**The single fail state: failing to meet the Demand.** Nothing else ends a run.

### Demand modifiers

A Demand may carry a modifier — the Boss Blind equivalent. **Modifiers attack your engine, not your body.** One that caps any single card's Output kills a Strength build. One that taxes each card's energy cost kills a wide, cheap block. One locks Reserve so nothing moves it. One shrinks the food draw from three cards to two.

Modifiers must target things the player *chose*, never things that take three rounds to change.

### The Ratings Bonus

Round Output above Demand converts to Dollars on an **increasing-returns curve.**

- **Dead zone up to ~2× Demand, paying nothing.**
- Above the threshold, payout accelerates superlinearly.

**The dead zone is load-bearing.** It prevents incidental overkill from paying anything, which is what keeps this from becoming the trickle income the design forbids elsewhere. Below threshold: hit the Demand and keep the energy. Above it: build the round around blowing the doors off. **No profitable middle.** Overkill becomes a rare spike strategy, not passive income.

**Guardrail:** cap payout as a multiple of the round's Demand, so it scales late without ever out-earning the Job slot. If the Ratings Bonus becomes the dominant income source, the Job slot is dead content.

**Accessibility floor:** the threshold must be clearable by a round-3 player willing to build the entire round around it. If only a top-decile engine can reach the payline, the mechanic only exists for players who have already won.

**Fiction:** overkill rounds are ratings spikes — the episode where something insane happened. Working names: *Went Viral*, *Prime Time*. Same story the Physique Card tells.

---

## 13. The Scoring Pipeline

Additive first. Multiplicative second. Exponential last. Flat bonuses matter in round 1 and are rounding error by round 8; multipliers do the opposite.

```
Training Score = Σ cards ( Output × retriggers )
                 + flat adders

Round Output   = Training Score
                 × Engine Multiplier
                 × Band Multiplier
                 × Π (rule-changer multipliers)
                 × Π (rule-changer ×Mults)
```

Round Output ≥ Demand(n) → advance. Below → run ends.

### The trajectory is escalation, not attrition

**State this plainly, because it is easy to misread.** The Demand is geometric: a player who merely clears every round has escalated absolute output **~5×** across a run. Nothing in the run pulls the player downward — the pressure is entirely that the bar climbs 25% per round and base output does not. The feel is a climb into absurdity, not a slow decay into nothing.

### The absurdity ceiling

**Target: a top-decile round-8 build produces 10–30× Demand.** Against Demand 477, that is five-digit Round Output, legally.

The Ratings Bonus is what makes the overkill *mean* something, and its dead zone at 2× is what stops the ceiling becoming the floor. The VHS unreality is the license: a cassette instructor has no ligaments.

### Worked baseline — Round 3

Demand 156. Engine 40 (×1.10). Reserve inside the Band (×1.0). One starter rule-changer (+8 flat).

A block of eight training cards, outputs totalling 174 — one of them retriggered by a starter modifier. Flat +8 → **182.**

```
182 × 1.10 = 200
```

**200 vs 156.** Cleared by 28%. Competent, unremarkable play wins round 3 comfortably.

**But project that same plain line forward.** The Demand compounds at 25% per round; a plain deck compounds at nothing. Engine creeps, Training Score creeps, the pool depletes. By round 5 that same line produces roughly 230 against a Demand of 244. **Plain play dies at round 5.**

That's deliberate. It's Balatro's Ante 4 lesson: you cannot win on base output. You must find the engine. That's what converts the game from a puzzle into a build search.

---

## 14. Upgrade Slots & the Game-Breaking Layer

Upgrade slots are the primary game-breakers.

### Structure

**Seven slots.** Four singletons and a repeated row:

| Slot | Count | Fiction |
|---|---|---|
| **Diet** | 1 | The way you eat |
| **Training Style** | 1 | The way you train |
| **Partner** | 1 | Who's in your life |
| **Job** | 1 | What you do for money |
| **Gym** | **3** | Equipment you own |

Gym is the repeated row — the equipment you've accumulated. It is **generic equipment, not draft-width**; draft-width is now one Gym effect among many. The 3-wide row is where builds actually assemble, and it makes every single shop visit a real decision rather than an occasional one.

**Sleep is cut as a slot.** Its cards live in Gym. A mattress is equipment.

### No slot owns a variable

**Any card may read or write anything.** Diet may touch score. Gym may touch income. Job may touch Reserve.

Discipline comes from **thematic gravity, not law:** roughly 80% of a slot's cards read as that slot's fiction. Off-theme cards are legal, rare, and memorable — they live at the top of the rarity curve precisely because breaking a category the player has internalized is the most exciting thing a card can do.

**Every card logs its written variable in the balance sheet.** This is for filtering when something breaks, not for enforcement. When Reserve comes out 3× too hot in testing, you sort by written-variable and fix it in one pass.

### The Training Partner exception

**You may only hold one Partner — except a Training Partner, which may be played in addition to any other Partner, creating a second Partner slot.**

This is one of the strongest structural upgrades in the game precisely because it breaks a rule the player has already internalized. Training Partners bias toward training effects (*"retrigger the first card in your block"*); conventional Partners bias toward economy and deck manipulation.

### Rarity

| Tier | Role |
|---|---|
| **Common** | On-theme, single-effect, readable at a glance |
| **Uncommon** | On-theme with a condition, or a modest multiplier |
| **Rare** | Rule-breakers, off-theme writes, and anything that grants Retrigger |
| **Collector's Edition** | Not a power tier — a meta promotion (§20). Any rarity can be promoted. |

Packs draw against this curve. Premium packs guarantee a slot type.

### Card modifiers

Consumable modifiers attach to individual cards. The training vocabulary already has words for *doing a movement more than once*, so the retrigger family names itself: **Drop Set**, **Rest-Pause**, **Myo-Reps**. Plus cost modifiers (**Superset** — two cards share one card's energy cost) and edition-style modifiers on food cards.

Keep the set to four or five. They multiply effective content for near-zero art cost, but every one is a vocabulary item at teach time — the cheap part is the art, not the learning.

### The worked broken build — "The Landfill"

Numbers disposable; this exists so the ceiling is provable in a spreadsheet rather than asserted in a document.

| Slot | Card | Effect |
|---|---|---|
| **Diet** | Ketosis | Fat Energy pays for high-intensity cards |
| **Training Style** | Strongman | Reserve adds to Output on Strength cards |
| **Gym 1** | Chalk Bucket | Retrigger every Strength card |
| **Gym 2** | Sauna Suit | Unspent energy routes to Reserve at double rate at Recomp |
| **Gym 3** | Power Rack | Strength cards cost 1 EU less |
| **Job** | Strongman Comp | Money = Engine × 2 per round; protein threshold +50% |
| **Partner** | Cook | A copy of each drafted food card stays in the deck |

**The loop:** Cook duplicates fat cards, keeping the fridge mono-fat, so Fat Energy arrives in volumes no training block could ever spend. Ketosis means mono-fat doesn't lock you out of the Strength deck. Power Rack makes Strength cards cheap enough to fill the whole block with them. Sauna Suit dumps the enormous unspent surplus into Reserve at double rate every Recomp. Strongman converts that Reserve into Output on Strength cards. Chalk Bucket retriggers every one of them. **The build wins by deliberately overbuying one fuel color and cashing the waste twice.**

By round 8, one retriggered squat card should exceed the entire Demand. That's the §18 screenshot target, and it's seven cards across seven slots.

---

## 15. Reserve Employers

Cards that read Reserve, spend it, or **move the Band**. A representative spread:

| Card | Slot | Effect |
|---|---|---|
| **Strongman** | Style | Reserve adds to Output on Strength cards |
| **Gymnast** | Style | Training cards cost less energy the lower your Reserve |
| **Open Water** | Style | Reserve insulates — Fat-cost cards get cheaper the higher it is |
| **Sumo** | Style | The Band moves up; Output scales with total mass; block capped at 4 cards |
| **Sprinter** | Style | The Band moves down and narrows; Output scales inversely with Reserve |
| **Bodybuilder** | Style | Final ×Mult based on (Engine − Reserve) |
| **Off-Season** | Diet | Above the Band, protein threshold halved |
| **Partitioning** | Diet | Below the Band, unspent energy at Recomp feeds Engine instead of Reserve |
| **Weight Vest** | Gym | Training cards cost less energy the higher your Reserve |
| **Sauna Suit** | Gym | Unspent energy routes to Reserve at double rate at Recomp |
| **Featherweight** | Job | Money scales with how far below the Band you are at Recomp |
| **Strongman Comp** | Job | Money = Engine × 2 per round; protein threshold +50% |
| **Photoshoot** | Consumable | Cash out the Engine−Reserve gap for a large payout; Reserve rebounds hard next round |
| **Sweat It Out** | Starting deck | Burn Reserve into Fat Energy at a bad rate. The floor employer. |

**Gymnast and Strongman are the poles.** Two real athletes, opposite bodies, both obviously elite, neither one healthier than the other. That framing does the wellbeing work without a word of copy — and it is what keeps the Band from reading as *one correct body*. The Band is where an untrained body performs. Every discipline in §15 moves it somewhere else, and each of those bodies is right for the sport that asked for it.

**Open Water is the one to protect.** Channel swimmers carry fat deliberately. It gives high Reserve to the Endurance archetype and means "fat" and "cardio" aren't opposites — which quietly does more than any disclaimer.

---

## 16. Economy & Shop

Base income from the starter Job, improvable through the Job slot. Some Jobs scale pay with body composition. Some pay almost nothing but give an enormous benefit when playing Work Overtime. The Ratings Bonus (§12) is the other earner, and is capped so it can never displace the Job slot.

**The shop has two doors:**

- **Groceries** — buy base-edition food cards at base price. Every card bought replaces one of the player's choosing. Multi-select. Deterministic: pay for exactly what you want.
- **Packs** — blind. Base packs contain 3–5 random cards against the rarity curve; the player keeps the useful ones and discards the rest. Premium packs guarantee a slot type.

Two doors is the complete fork: certainty versus upside. A third tab would add no decision.

**Deck thinning matters.** Removing a weak food card without replacing it raises the average quality of every future draw.

---

## 17. Interface & Guardrails

Turn-unlimited means analysis paralysis is a real risk and a timer is not an available answer. Two guardrails, both of which compute openly and neither of which advises.

### Hover-Preview

The primary guardrail. Immediate effects are already legible on the HUD; the preview is not for restating them.

**Trigger and placement.** Hover on desktop, press-and-hold on touch. A small panel anchored beside or below the hovered element. **Never modal.** Never occludes the silhouette or the energy bar — half its value is letting the player compare projection against live state.

**On food cards (draft phase):**
- Macros, and resulting running round totals if taken
- Resulting energy by color, **against the block's outstanding bill**
- Protein progress against threshold

**On training cards (Phase 1):**
- Cost in both colors, and what it does to the running bill
- Output **with every active multiplier applied**, never base
- Employer or slot triggers that would fire

**On the training block (as a whole):**
- Total energy cost of the drafted block, by color
- What the meal plan so far covers, and the shortfall in each color
- Reserve movement at Recomp

> **Outcomes, never advice.** Numbers and state changes only. No recommendations, no ranking the three cards, no green checkmarks. The game hides nothing; it does not think for the player.

**No hidden arithmetic.** Any calculation the player would otherwise do by hand is shown. The preview is a calculator, not an advisor.

**The Band previews as a position, never as a number.** Hover shows Reserve moving toward or away from the envelope, drawn on the body. It never resolves into a percentage or a distance, because the Band has no printed value to resolve into.

## 18. Recomp — the Recap Screen

The round's ceremony, and the game's most screenshottable surface.

**Recomp is the only ceremony in the game. There are eight of them per run.** In-draft feedback is *instant* — the bill ticks, the bar moves, done — and is forbidden from growing pageantry. Protect this distinction into implementation.

**Every card played this round is laid out in sequence** — the training block, then the meal plan. Hovering any card shows the **stat delta it created** — energy by color, macros, Reserve, Engine, Training Score contribution.

This is the artifact. The target moment: **a single card whose contribution alone exceeded the entire round's Demand.** The player will screenshot that card, hovered, with its delta showing. Design toward that moment existing regularly by round 6.

**Resolution sequence:**

1. The training block tallies, card by card
2. Each training card resolves as a discrete audio-visual beat — plates loading, a rep tick, one clank per card. Retriggers stack extra clanks onto the same card. **Past a threshold the barbell visibly bends.** That's the flame.
3. Rule-changers reveal in sequence: flat adders, then multipliers, then ×Mults
4. Unspent energy — both colors — slides down into the body
5. The silhouette snaps to its new frame
6. Money tallies dollar by dollar; Ratings Bonus, if earned, lands last and loud
7. Demand met or missed, with the margin stated either way

**Resolution must accelerate.** A heavily retriggered block still resolves in seconds — beats speed up, blur, go continuous. Get this wrong and the best moment in the game becomes the most tedious one.

**The Ledger** is available from Recomp: the full numeric audit, one round in arrears. Hidden in the moment, transparent in retrospect. A determined player can reverse-engineer the entire model across twenty runs — and should be able to. That's the solvability horizon being long, not infinite.

---

## 19. Instruments — Legibility as an Economy

In life you can buy clarity. The information exists; the instrument costs money. So instruments compete for the same Dollars and slots as everything else.

| Instrument | Reveals |
|---|---|
| **Bathroom Scale** | Mass trend arrow |
| **Food Scale** | Exact macro values on drafted cards instead of ranges |
| **Training Log** | The derivative — last three rounds' Reserve and Engine deltas |
| **Tape & Calipers** | Approximate Reserve/Engine split |
| **DEXA** *(one-shot)* | Exact Reserve and Engine, this round only |
| **Coach** | Both Demand options and their modifiers, two rounds early |

**"How much do I want to know?"** becomes a build decision. A player can run blind and spend everything on capability, or buy the full instrument panel and run a weaker body with perfect information. Both must be viable — if instruments are mandatory, legibility stopped being an economy and became a tax.

### Uncertainty is epistemic, not stochastic

When a food card shows a range before you own a Food Scale, **that card's value is already decided and fixed** — you simply can't read it precisely. The uncertainty is in the player's knowledge, not in the dice.

Never let a number change *at* resolution — only let it become legible there.

---

## 20. Meta-Progression

### The Collection

Stumbling into a **Collector's Edition** card makes it permanently available for future runs. The Collection shelf shows every slot, filled and empty.

**Collector Loadout** is chosen once per run: **1 upgrade-slot card + 1 food card + 1 training card.** A hard cap, permanently.

**The loadout is committed before the gauntlet is visible.** This ordering is load-bearing, not incidental — it is what prevents one dominant loadout, because you are betting on Demands you haven't seen. Combined with the Generations rule that at least one tier must kill each dominant engine, a loadout that wins across *every* gauntlet and *every* Generation is a card-tuning bug, not a structural one.

Winning a run grants one conversion: promote a card from that run to Collector's Edition.

**This is information-retention meta-progression, not power-accrual.** What carries between runs is knowing how to read a body — recognizing "Cold" in week two and knowing you have one hard round left in you. Nothing carries but the knowledge.

### The Physique Card

At the end of every run, win, lose, or Pull the Tape, the game generates a **Physique Card**: silhouette, stat block, build name, the three rule-changers that defined the run, final score. One shareable image, styled as a VHS box.

Because bodies are build-dependent, extremes are legal and varied — the enormous strongman who can't run, the featherweight gymnast with no bench press, the run that went sideways in week four.

---

## 21. Generations & the Win Fiction

### Getting taped over

**The Demand is the ratings floor.** Miss it and your tape gets recorded over — the run's footage visibly erased at the fail screen, tracking chewing through the last thing you did.

**Clear the run and your tape is dubbed to the next Generation.** Victory produces a further-degraded copy of you. That is the difficulty ladder, and it is now a consequence of winning rather than a menu option.

### The ladder

Roughly 8–10 tiers that **change rules, not numbers.** Numbers-only ladders get solved; rule-changing ones don't. Each tier is glitchier than the last — The Static's floor rises with the Generation, so the picture is dirtier before you've done anything wrong.

Examples: *The protein threshold scales faster with Engine.* *Unspent energy is destroyed at Recomp rather than routed to Reserve.* *The training block is one card shorter.* *Demands are revealed only one round ahead.* *Food is drafted 2-of-2, not 1-of-3.* *No Cheat Meal.*

**At least one Generation must specifically kill each dominant engine.** If one build beats every configuration, the ladder isn't doing its job.

Meta-progression attaches here: the shelf remembers the highest Generation cleared on each Tape, worn onto the spine.

---

## 22. Production Plan

### Step one — the bootleg

**Before anything else on this list.** Index cards, one week.

- ~30 food cards, three colors, +1/+2/+3 spread
- ~20 training cards
- Paper protein tracker
- Two-color energy in poker chips

**Test only this:** *is drafting a training block blind, then hunting the fridge for the energy to pay for it, fun?* No Reserve, no rule-changers, no body composition — just macros in, two colors of energy out, Training Score against a Demand.

If the naked draft isn't fun, nothing upstream of it matters.

**Success bar:** a playtester asks for a second run, unprompted.

### Step two — the four corners

The Body-as-HUD validation gate (§10). One day. Do not draw the other 21 frames until it passes.

### Run length target

**45–75 minutes per full run.** Budget: 80 picks — 8 rounds × 2 drafts × 5 picks — at 20–30 seconds each, plus 8 Recomps at ≤60 seconds and accelerating. At the pessimistic 30-second pick this lands at roughly 65 minutes, inside the target with no trimming. This is a tuning constraint, not an aspiration — every ceremony and animation decision answers to it.

### The first sixty seconds

Written as a shot list before the vertical slice:

| ~Second | Beat |
|---|---|
| 0 | Tape goes in. Tracking settles. |
| 5 | Instructor one-liner. |
| 10 | "WEEK 1" title card. |
| 15 | Three training cards up. |
| 25 | **First decision made.** |
| 30 | The block's bill totals. Fridge opens. |
| 40 | First clank. |
| 55 | Score dial ticks against a Demand of 100. |

> **Hard rule: first decision inside 30 seconds.**

### Content ladder

| Stage | Contents |
|---|---|
| **Vertical Slice** | 1 Tape, rounds 1–3, 15 food / 15 training / 12 rule-changers. No Generations, no Collection. Proves loop and tone. |
| **Early Access** | 25 food / 30 training / 45 rule-changers. 12 Demands + modifiers, 4 card modifiers, 3 Tapes, 5 instruments. Full 8-round run. |
| **1.0** | 40 food / 45 training / 80–100 rule-changers, full cast, Generations ladder, all instruments. |

Rule-changer distribution at 1.0: Gym gets the deepest pool (~35, since it fills three slots); Diet, Style, Partner and Job roughly 15 each.

### Deferred to after the slice

**The cast.** Each instructor is a build archetype with a stated want and a starting loadout that expresses it — the Strongman wants the record, the Aerobics Queen wants to stay on air, the Climber wants to disappear upward. One line of want, one loadout, one voice pass each.

Write the cast one-pager *after* the vertical slice proves the loop. Character is expensive to redo.

---

## 23. Design Glossary

**Pressure Ratchet vs. Clock** — a clock forces speed; a ratchet forces escalating sufficiency at your own pace. Here the ratchet is the Demand curve and the depleting draft pool, never a timer.

**Sequential Commitment vs. Batch Selection** — a draft forces each choice with less information than the last and closes the door behind you. Batch-select is one decision wearing six hats.

**Draft-with-Depletion** — the pool shrinks with every pick and never refills mid-round.

**Deck Thinning** — removing a weak card without replacing it raises average future draw quality.

**Input Randomness, Output Determinism** *(Richard Garfield)* — randomness at the draw, fixed math at resolution, so skill stays legible.

**Information-Retention vs. Power-Accrual Meta-Progression** — Spelunky versus Hades. MacroHack sits deliberately at the retention end.

**Degenerate-Strategy Test** — does one boilerplate repeatable line clear every round indefinitely? The game must fail this test on purpose. The geometric Demand curve is what makes it fail: base output cannot compound at 25% per round.

**Epistemic vs. Stochastic Uncertainty** — the number is already decided; you just can't read it yet.

**Thematic Gravity** — discipline by convention rather than by rule. Most of a category's cards read as that category; the exceptions are rare, legal, and memorable.

**Teach Time** *(tabletop)* — how long before a new player makes a real decision. Must fit inside the refund window with room to spare.

---

## 24. Open Questions

1. **Output-per-EU across modalities.** With Sets gone, a modality's whole identity is its cost-to-Output ratio and its fuel color. If Strength's ratio beats Endurance's at equal EU, the lifting deck quietly dominates and we built the resistance-training game we were trying to avoid.
2. **Training deck total pool size.** Draw-per-pick is 3; total pool is unresolved.
3. **How steep is the decline outside the Band, and how wide is the Band?** These two numbers decide whether Reserve is a live axis or a solved one. Too steep or too narrow and every run converges on the same body, which is the failure mode a per-value Reserve multiplier was rejected for. Too shallow or too wide and the Band is decoration. Start shallow: drag the player should notice by the second round out, not punish them for in the first.
4. **What carries the in-run pressure?** With metabolic adaptation cut, the only escalating force is the geometric Demand curve. That is probably enough — ×1.25 per round outruns base output on its own — but it needs to be proven in a spreadsheet before anything else. If plain play survives to round 7, the run has no ratchet and one needs designing.
5. **Ratings Bonus containment.** Payout accelerates past the threshold and nothing in the run now accelerates against it. Does the hard cap as a multiple of Demand hold, or does overkill become the dominant income line? Same spreadsheet as the Landfill build.
6. **Fuel-color split across the training deck.** The ratio of carb-heavy to fat-heavy to mixed cards decides whether mono-fuel diets are viable or trap builds — and with the block drafted first, it also decides how often a player can even assemble a single-color plan.
7. **Where absurdity actually lives.** Tone is decided; its expression isn't. The mechanics stay reverent — so absurdity has to live in the cast, the tape conceit, and the scale of the numbers. Needs a pass of its own, alongside the cast one-pager.
