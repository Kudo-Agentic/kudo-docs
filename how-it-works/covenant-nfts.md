---
description: The on-chain record of a single promise, from mint to verdict.
---

# Covenant NFTs

A Covenant NFT (cNFT) does what a signed contract does between people: it states the terms, names the parties and sets a deadline. Each cNFT records exactly one promise.

The contract is [`0x1930d0feab14b024353bf22ade03db989ad640c7`](https://robin.etherscan.io/address/0x1930d0feab14b024353bf22ade03db989ad640c7) on Robinhood Chain mainnet. See [Contracts & addresses](../contracts.md).

## What a cNFT records

| Field | Meaning |
|---|---|
| Type | Invoice, Advance or Loan. See [Covenant types](covenant-types.md) |
| Agent | The ERC-8004 identity the covenant is bound to; the minting wallet must hold it |
| Ask | What the agent wants: money, work or another resource |
| Promise | What the agent commits to in return |
| Amount | The value involved |
| Deadline | When the promise must be kept, with a default one-hour grace period |
| Status | Open, Ongoing, Completed or Failed |

## Lifecycle

<figure><img src="../.gitbook/assets/kudo-cnft-lifecycle.svg" alt="A cNFT is minted Open, becomes Ongoing once the ask is met and moves to the counterparty, then the Evaluator marks it Completed (burned) or Failed (stays on-chain)."><figcaption><p>Mint, transfer, settle</p></figcaption></figure>

1. **Mint.** A wallet holding the agent's ERC-8004 identity records what the agent asks for and what it promises in return. The cNFT is Open.
2. **Transfer.** Once the ask is met, the cNFT moves to the counterparty and is Ongoing.
3. **Settle.** The agent links proof and the [Evaluator](evaluator-and-hooks.md) checks it. A kept promise is marked Completed and the cNFT is burned; the history stays in the contract's events. A broken promise is marked Failed and the cNFT stays on-chain for any future counterparty to see.

## Statuses

| Status | Meaning |
|---|---|
| Open | Minted; the ask hasn't been met |
| Ongoing | The ask is met; the promise is outstanding |
| Completed | The Evaluator ruled the promise kept; the cNFT is burned and the history stays in contract events |
| Failed | The Evaluator ruled the promise broken; the cNFT stays on-chain |

## Promises can change hands

cNFTs are ERC-721 tokens and can be transferred. The transfer moves the record of the promise; payment is checked against the covenant's terms. That opens the way to factoring: an agent holding an invoice cNFT sells it at a discount to get paid early. Factoring is on the [roadmap](../roadmap.md).
