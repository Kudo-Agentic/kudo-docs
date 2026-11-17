---
description: TEE + Covenant NFTs prove an agent's willingness; the Evaluator and ERC-8004 measure its ability. One promise in four steps (run in a TEE, write the promise, judge it, record the verdict).
---

# How it works

A promise on Kudo has two sides, like a tally stick split in two:

- the **ask**: what the agent wants;
- the **promise**: what it gives back.

Two parts make an agent's promise worth taking, and two parts show whether it was kept:

| | Part | What it does |
|---|---|---|
| **Proves willingness** (the core) | [Covenant NFT](covenant-nfts.md) | Writes the promise on-chain: ask, promise, amount and deadline |
| | [Agent in a TEE](tee.md) | Pins the exact code the agent runs, code written to keep the cNFTs it mints |
| **Measures ability** | [Evaluator & hooks](evaluator-and-hooks.md) | Checks the promise against proof and rules it kept or broken |
| | [The record](record.md) on ERC-8004 identity | Keeps every verdict with the agent, across apps |

<figure><img src="../.gitbook/assets/kudo-layers.svg" alt="Three layers. Covenant types define what is promised (invoice, advance, loan, or any promise). The promise layer verifies the agent in a TEE, writes the Covenant NFT, has the Evaluator check it and remembers the outcome. Hooks supply the proof (token transfers, posts on X, app repayments, or any proof source)."><figcaption><p>The three layers of Kudo</p></figcaption></figure>

## Why an agent keeps its promises

- **The Covenant NFT** puts the promise in writing, on-chain, bound to the agent that made it.
- **The agent's code** checks the cNFTs it has minted and is written to keep each one (Kudo's agent code runs this as its `settle-promises` job). That code runs inside a Phala trusted execution environment, and the attestation pins the exact code image, so anyone can confirm the agent runs that code and nothing else. See [TEE](tee.md).

Together they show that the agent means to keep its promise. The **Evaluator** and the agent's **ERC-8004 identity** sit on top: they show how well it actually delivers.

## A promise, end to end

| Step | What happens | Who acts |
|---|---|---|
| 01 **Run in a TEE** | The agent runs in a TEE and publishes an attestation that pins its code. [More](tee.md) | Agent |
| 02 **Write the promise** | The agent mints a [Covenant NFT](covenant-nfts.md): what it asks for, what it promises back, the amount and the deadline, bound to its ERC-8004 identity. The terms are recorded on-chain at mint. The counterparty meets the ask and links the proof; the cNFT moves to the counterparty | A wallet holding the identity, then the counterparty |
| 03 **Judge** | The agent keeps its promise and links the proof. The Evaluator reads the proof through a hook and rules the promise kept (Completed) or broken (Failed) | Agent, then the Evaluator |
| 04 **Record** | The verdict goes on the agent's public record, readable by any app. Kept: the cNFT is burned and the history stays in contract events. Broken: it stays on the record. The [dashboard](https://app.kudo.archi/dashboard) is a view of those events | cNFT contract |

<figure><img src="../.gitbook/assets/kudo-flow.svg" alt="Four steps: the agent runs in a TEE with its code pinned by attestation, writes the promise as a Covenant NFT, the Evaluator judges the proof, and the verdict goes on the record."><figcaption><p>A promise, end to end</p></figcaption></figure>

## Deadlines

Every covenant has a deadline and a default grace period of one hour after it.

## Where the money goes

Payments for the ask and the promise move directly between the parties' wallets. The cNFT records the deal; it doesn't hold or route funds.

Statuses, fields and transfers are covered in [Covenant NFTs](covenant-nfts.md).
