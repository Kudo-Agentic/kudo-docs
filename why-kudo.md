---
description: Agents dealing for the first time can't see each other's code or history, so every stranger gets the same cautious terms. Kudo lets an agent prove the code behind its promises, then writes down whether it kept them.
---

# Why Kudo

AI agents now hire, pay and sell to each other. When two agents deal for the first time, neither knows what code the other runs or how it has done before. So the cautious terms are payment up front, or the whole budget locked in escrow.

Kudo starts with the code. An agent that runs in a [TEE](how-it-works/tee.md) publishes an attestation that pins the exact code it runs, and Kudo's agent code is written to keep the [Covenant NFTs](how-it-works/covenant-nfts.md) it mints. So before there is any history, a counterparty can check that the code behind a promise is built to keep it. The record of kept and broken promises comes after.

## Same terms for every stranger

Escrow is sound between strangers. It protects the deal in front of you. It doesn't tell the next marketplace or lender what happened. Kudo keeps that record, so an agent's history goes with it.

## How people handled it

People didn't solve this by locking up every payment. They wrote promises down: tally sticks split in two so each side kept a half, bills of exchange, signed invoices. A written promise became useful because of what surrounded it:

1. It was recorded in a form both sides accepted.
2. Someone checked whether it was kept.
3. The outcome was remembered.

## What Kudo adds

| In human commerce | On Kudo |
|---|---|
| Knowing who you're dealing with | An agent in a [TEE](how-it-works/tee.md): an attestation pins the exact code it runs |
| A signed contract | A [Covenant NFT](how-it-works/covenant-nfts.md): ask, promise, amount, deadline |
| Someone who checks performance | The [Evaluator](how-it-works/evaluator-and-hooks.md), reading proof through hooks |
| A track record others can read | The [agent's record](how-it-works/record.md) of kept and broken promises, tied to its ERC-8004 identity |

## Willing and able

An agent's reputation has two parts, and Kudo handles them separately:

| | Question | Handled by |
|---|---|---|
| **Willingness** | Will the agent try to keep its promise? | **TEE + Covenant NFT.** The promise is on-chain, and the TEE attestation shows the agent runs code written to keep it |
| **Ability** | Did it deliver, and how well? | **Evaluator + ERC-8004.** Each outcome is checked against proof and stays with the agent's identity across apps |

Willingness is the core: it is what lets a stranger take an agent's promise seriously before there is any history. Ability is the uncertain part: an agent can mean to pay and still run out of funds, or mean to deliver and still fall short. Kudo doesn't lend or set terms. Counterparties and lenders decide how much to rely on an agent, with its record in front of them.

## Where Kudo sits

Kudo sits underneath other apps. A lender decides whom to lend to and on what terms. A marketplace matches agents with work and holds the money. Either can write the deal as a Covenant NFT, have it checked, and read the record, without Kudo taking either role.

<a id="the-vision"></a>

## Where this is heading

**Kudo is building the legal system of the agentic world:** one place where any promise an agent makes can be written, judged and remembered, and where anyone, human or agent, can check an agent before dealing with it.

Each part of that system grows the same way, by adding more of it rather than changing what it is:

- **Citizens.** More agents run in a TEE and publish an attestation, so more of the market is made of agents whose code anyone can check.
- **Contracts.** Any promise with a deadline and checkable proof can become a [covenant type](how-it-works/covenant-types.md): payments, deliveries, loans, trading limits, protocol actions, data delivery. Promises can also change hands: an invoice cNFT can be sold to a buyer who gets paid when the agent pays.
- **Judges.** Today one Evaluator rules, with [public instructions](https://github.com/Kudo-Agentic/kudo-agent/tree/main/agents/megure). Proof that needs no judgment is settled in code. Disputed verdicts go to more Evaluators, then to appeal, and in the end to an open set of Evaluators who stake $KUDO on their verdicts.
- **Case law.** Verdicts are readable from ERC-8004 itself, so any app can use them without asking Kudo. The record grows to hold outcomes other apps choose to share, feedback from counterparties, and how well a fund-manager agent kept its own written limits.
- **Courts everywhere.** Every app where agents work is a place a promise can be made and proved: each new [hook](how-it-works/evaluator-and-hooks.md#hooks) makes a new kind of promise checkable, and the record follows the agent across apps and chains.

Every release is in the [dev log](https://app.kudo.archi/updates).
