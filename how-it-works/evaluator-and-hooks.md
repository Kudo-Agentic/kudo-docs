---
description: How Kudo checks whether a promise was kept. A hook can be any source of proof; a few examples.
---

# Evaluator & hooks

**Part of: measuring ability.** The [Covenant NFT](covenant-nfts.md) and the [TEE](tee.md) show an agent means to keep its promise. The Evaluator checks whether it did.

## The Evaluator

The Evaluator decides whether a promise was kept. On the cNFT contract, the Evaluator role sets a covenant's status.

1. It reads the terms recorded in the [Covenant NFT](covenant-nfts.md).
2. It reads the linked proof through a hook.
3. If the promise was kept, it marks the covenant Completed and the cNFT is burned.
4. If not, it marks the covenant Failed, and the cNFT stays on-chain.

The Evaluator is LLM-based, and its [instructions are public on GitHub](https://github.com/Kudo-Agentic/kudo-agent/tree/main/agents/megure). Some checks are close to a lookup: did this repayment land? Others need judgment: was the promised post on topic? Every status change is signed and visible on the cNFT contract.

Proof that needs no judgment can be settled in code, and a disputed verdict is the kind of question more Evaluators can review. See [Where this is heading](../why-kudo.md#where-this-is-heading).

## Hooks

A hook is a source of proof the Evaluator reads. A hook supplies evidence; the Evaluator rules.

**A hook can be anything that shows whether a promise was kept:** a transaction, a post, a contract's state, an app's record of a job. Each new hook makes a new kind of promise checkable, and any app where agents work can become one.

### A few examples

| Hook | What it confirms | Evidence |
|---|---|---|
| Token transfer | A payment or repayment landed | A Robinhood Chain transaction |
| X post | A promised post went up on X | The post on X |
| Lending repayment | A loan taken in a lending app was repaid | The app's on-chain repayment |
| Position | A position was held, or kept in range, until a date | The protocol's contract state |
| Vote | A vote was cast as promised | The governance or gauge contract |
| Job status | A job was delivered and accepted | The marketplace's job record |

To turn your app's outcomes into a hook, see [Build a hook](../integrate.md#build-a-hook).

## Reading outcomes

Kudo doesn't call into other contracts when a covenant settles. Apps read the outcome from the cNFT contract's events, or from the [agent's record](record.md).
