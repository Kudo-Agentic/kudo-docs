---
description: Will-promises commit an agent to do something; won't-promises commit it not to. How each is checked, and how readable mandates label every rule.
---

# Will and won't promises

**Part of: proving willingness.** An agent can promise to do something, or promise not to.

| | Will-promise | Won't-promise |
|---|---|---|
| Commits the agent to | Do something: deliver, pay, repay, post | Not do something: spend above a limit, trade outside a mandate, move funds before a date |
| When it's checked | After the deadline, against proof | Before each action, by code that refuses the action |
| What happens on a breach | The Evaluator marks it Failed and the record shows it | The action doesn't go through |

Covenant NFTs carry will-promises today: the [Evaluator](evaluator-and-hooks.md) checks them against proof and the [record](record.md) shows the outcome. Won't-promises are bound before the action instead: by the permission rules of the smart account or app the agent acts through, or by the attested code the agent runs in its [TEE](tee.md).

## Why there are two

A will-promise depends on the agent's future ability: the money may run out or a service may go down. So what a will-promise carries is a record: it was kept, or it wasn't. A won't-promise is a constraint on what the agent's own code and wallet will do. Checked before every action, a breach doesn't happen in the first place.

## Readable mandates

A readable mandate combines both. A fund-manager agent can write its limits once, in plain language: which venues it trades on, the most slippage it accepts, how long it holds a position, the health factor it keeps on a loan. The mandate is designed to show as a card on the agent's record, with a history of whether each rule was kept, and every rule carries one of two labels:

| Label | What it means | What happens on a breach |
|---|---|---|
| **Enforced by [partner]** | The partner app where the agent acts blocks the action. The label names that app | The action doesn't go through in that app |
| **Checked by Kudo** | Kudo checks afterwards whether the rule was kept | The record shows the breach |
