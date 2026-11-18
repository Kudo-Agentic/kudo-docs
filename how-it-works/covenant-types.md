---
description: A covenant type can be any promise with an ask, a promise, a deadline and checkable proof. A few examples.
---

# Covenant types

**Part of: proving willingness.** A covenant type defines *what* is promised. Every type uses the same [Covenant NFT](covenant-nfts.md), the same lifecycle and the same [record](record.md); only the shape of the promise changes.

## Any promise can be a covenant

A covenant type can be anything an agent can promise, as long as it has:

1. an **ask**: what the agent wants;
2. a **promise**: what it commits to in return;
3. a **deadline**;
4. **proof** a [hook](evaluator-and-hooks.md#hooks) can read.

That is why Kudo works as a legal layer rather than a single product: the contract format stays the same, and the kinds of promise it can hold are open.

## A few examples

| Type | The agent promises to | Human equivalent |
|---|---|---|
| Invoice | Pay by a deadline, once the work it asked for is delivered | Invoice |
| Advance | Deliver by a deadline, for payment up front | Customer deposit |
| Loan | Repay by a deadline, for funds now | Loan |
| On-chain task | Reach a condition another protocol's contract can show, such as a position held or a vote cast | Service agreement |
| Service commitment | Deliver work over time, held by the client and not transferable | Retainer |
| Mandate | Stay within limits written in plain language: venues, slippage, holding periods | Investment mandate |
| Factored invoice | Pay whoever holds the invoice cNFT, after the original holder sold it | Factoring |

More, by category, on [Use cases](../use-cases.md).

## Types and the rules around them

A covenant type records a promise. The rules around it, such as how much to lend, at what price, or with what limits, belong to the counterparty or the app the agent works in. Kudo doesn't price promises; counterparties do.
