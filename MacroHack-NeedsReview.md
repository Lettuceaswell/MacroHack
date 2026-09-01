# MACROHACK — Needs Review

*Complexity audit of `MacroHack-GDD-v3.md`. One chunk per candidate.*

**What "unnecessary complexity" means here:** a system that adds a rule the player must hold in their head, or a variable the game must track, and does not pay for itself in decisions. Cost is measured in **teach time** (§3's refund-window constraint) and **decision load** (§17's paralysis risk), not in implementation hours.

**How to use this:** each chunk states the case for cutting as strongly as it deserves, then what breaks. Write your call in the `**VERDICT:**` line. Nothing here is a recommendation to cut on its own — several of these are load-bearing and are listed because they *look* expensive and should be consciously kept.

**Tiers:** A = strong cut candidates · B = worth questioning · C = probably keep, noted for the record

---

## A1 — The Reserve Set Point

**Where:** §9, §10 (ghost outline), §15 (four cards read it), §17 (drift never previewed)

**What it costs.** A third tracked body variable that has no effect on anything by itself. It carries no penalty and no reward — the doc says so twice. It needs its own HUD element (the dotted ghost silhouette), its own hidden drift rule, and its own explicit exemption from Hover-Preview. That is three separate mechanisms supporting a number that does nothing.

**The case for cutting.** Every card that currently reads Set Point could read raw Reserve instead. *"Above Set Point, protein threshold halved"* becomes *"Above 60% Reserve, protein threshold halved."* The card does the same job, the player reads one number instead of two, and the ghost outline and the drift rule both disappear. Set Point's real function is to make thresholds *relative* rather than absolute — but with only 8 rounds in a run and slow drift, it may never move far enough for anyone to notice it was relative.

**What breaks.** The body stops feeling like a body. Set Point drift is the one system that models homeostasis, and it's the reason §9 can claim "the same body is a jackpot in one run and dead weight in the next." Cutting it makes Reserve a pure number rather than a place the body is trying to return to. The ghost silhouette is also genuinely elegant HUD work.

**Middle option.** Keep Set Point, cut the *drift*. A fixed reference line at 25% costs one constant and keeps the ghost outline; the hidden drift rule and its §17 exemption both go.

**VERDICT:**

There will be a set point. But now I think it should be a band. representing 10-20% bodyfat, but unnumbered in the menus, just shown without a value tied to it, and showing "you are here" on reserve. 1x score multiplier within the band, but performance declines outside of the band under normal circumstances. Upgrade cards can modify the way that "reserve" interacts with mechanics like training score.

---

## A2 — Meals that enable and forbid

**Where:** §7

**What it costs.** A second, orthogonal system printed on every food card, on top of macros. It introduces a persistent between-phase state ("next training: high-intensity locked") that the UI must show, the Hover-Preview must project, and the player must remember across the food→training boundary. It also creates a taxonomy problem: "high-intensity" is now a keyword that every training card must be tagged with and every player must learn.

**The case for cutting.** §6 already does this job. Training cards cost a specific energy color, and you cannot mismatch fuel. Drafting a fat card *already* locks you out of the Carb-cost training deck — that's the "flush in a color your deck can't spend" tension the doc now leans on as the core of the food draft. Lock/unlock keywords are a second implementation of a constraint the energy system produces for free, and the two can contradict each other: a card that gives you 40 Carb Energy but forbids high-intensity training is a rules collision the player has to untangle.

**What breaks.** §7's stated purpose — "what makes the food draft matter beyond arithmetic." Without meals, a food card is purely numbers, and the draft is closer to pure arithmetic than the doc wants. Meals are also where food gets *character*; "Steak & Rice" reads as food, "3P 2C 0F" doesn't.

**Middle option.** Keep the flavor of meals, cut the lock/unlock verbs. Let the interesting food cards do something to *energy* instead — grant a color, convert a color, double the next card's yield. Same "food is a verb" feel, no second keyword taxonomy.

**VERDICT:**
I want to just have every training card have a certain energy requirement - carb and fat energy units. However, I want to flip the script in terms of card drafting. I want the round to be drafting all Training cards first. that way there's a known collective energy demand going into the meal planning, and you will select the meals in response to the training plan. this creates a round flow of *Chaos to Order, then Slightly less chaos into more order*

---

## A3 — Set diminishing returns *and* printed Set caps

**Where:** §8, §14 (Chalk Bucket), §17 (Fill, marginal-output preview)

**What it costs.** Two independent throttles on the same action. Caps say *how many Sets you may take*; the diminish curve says *how much each is worth*. Both exist to stop the player spamming Sets. The diminish curve then requires: a percentage table the player must internalize, a marginal-output readout in Hover-Preview, the Fill verb to save clicks it created, and a whole rare-card category devoted to flattening it.

**The case for cutting the diminish curve specifically.** With flat cost and a printed cap, the optimum is already interesting — it's "how much of this color can I afford, and is a different card worth more per unit of energy?" That's a real decision. The diminish curve adds arithmetic (what's 80% of 26?) to a decision that was already live, and the doc admits it produces "a moving optimum" that depends on four things at once. That is exactly the analysis-paralysis profile §17 is worried about, and Fill exists specifically to paper over it.

**What breaks.** "The power fantasy is flattening that curve" — one of the strongest card categories in the game goes away, and *"Sets no longer diminish"* is doing real work in the Landfill build. Without diminish, Set-cap increases become the only Set upgrade, which narrows the rule-changer design space noticeably.

**Middle option.** Keep diminish only on the modalities where it's thematically loud (Strength, Hypertrophy) and let high-cap modalities (Endurance, Conditioning) run flat. Halves the arithmetic and keeps the flattening fantasy.

**VERDICT:**
I want to remove "Sets" from the game. except as a possible card upgrade, like the "retrigger" mechanic in Balatro. so every card is presumed to score only once.
