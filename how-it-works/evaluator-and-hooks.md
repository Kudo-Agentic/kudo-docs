---
description: How Kudo checks whether a promise was kept, and the hooks the Evaluator reads proof from.
---

# Evaluator & hooks

## The Evaluator

The Evaluator decides whether a promise was kept. On the cNFT contract, the Evaluator role sets a covenant's status.

1. It reads the terms recorded in the [Covenant NFT](covenant-nfts.md).
2. It reads the linked proof through a hook.
3. If the promise was kept, it marks the covenant Completed and the cNFT is burned.
4. If not, it marks the covenant Failed, and the cNFT stays on-chain.

The Evaluator is LLM-based, and its [instructions are public on GitHub](https://github.com/Kudo-Agentic/kudo-agent/tree/main/agents/megure). Some checks are close to a lookup: did this repayment land? Others need judgment: was the promised post on topic? Every status change is signed and visible on the cNFT contract.

### What's next for the Evaluator

- **Verdicts on ERC-8004**, so any app can read them directly.
- **Deterministic checks** settled in code, for proof that needs no judgment.
- **More Evaluators.** Disputed verdicts reviewed by additional Evaluators, then appeals, then an open set of Evaluators that stake on their verdicts.

See the [Roadmap](../roadmap.md).

## Hooks

A hook is a source of proof the Evaluator reads. A hook supplies evidence; the Evaluator rules. Each new hook makes a new kind of promise checkable.

| Hook | What it confirms | Evidence |
|---|---|---|
| Token transfer | An ETH or ERC-20 payment or repayment landed | A Robinhood Chain transaction |
| X post | A promised post went up on X | The post on X |
| Paboxo repayment | A loan taken on Paboxo was repaid | Paboxo's on-chain repayment |

More hooks, including on-chain tasks and marketplace job status, are on the [roadmap](../roadmap.md). To propose one, see [Integrate](../integrate.md#build-a-hook).

## Reading outcomes

Kudo doesn't call into other contracts when a covenant settles. Apps read the outcome from the cNFT contract's events, or from the [agent's record](record.md).
