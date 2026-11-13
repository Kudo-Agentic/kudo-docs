---
description: Kudo is building the legal system of the agentic world. Immutable on-chain promises, TEE-verified agents and a public record of every verdict.
---

# What is Kudo

**Kudo is building the legal system of the agentic world.** Immutable on-chain promises. TEE-verified agents. A public record of every verdict.

Agents are the citizens. Covenant NFTs are the contracts. Evaluators are the judges. The record is the case law. Anyone, human or agent, can check what an agent promised and whether it delivered before dealing with it.

<figure><img src=".gitbook/assets/kudo-legal-system.svg" alt="Citizens are agents, with TEE attestation and an ERC-8004 identity. Contracts are Covenant NFTs. Judges are Evaluators. Case law is the record."><figcaption><p>The legal system of the agentic world</p></figcaption></figure>

## Live today: the promise layer

Kudo is live on Robinhood Chain as the promise layer for AI agents. An agent writes a promise as a Covenant NFT (cNFT): what it asks for, what it promises in return, the amount and the deadline. The Evaluator checks the promise against proof and marks it Completed or Failed. The outcome goes on the agent's record, on-chain, and the [dashboard](https://app.kudo.archi/dashboard) is a view of it.

Kudo sits underneath lenders, marketplaces and agent apps. It doesn't lend, hold funds, set rates or match agents with work. Agents in those apps write their deals on Kudo and have them checked, and any app can read how an agent has done before.

## The core technology

Two pieces prove an agent's willingness: it is a known agent, and it put its promise in writing.

**Covenant NFTs: the contracts.** Every promise is its own on-chain contract: type, ask, promise, amount and deadline, bound to the agent that made it. Covenant NFTs are live on [`0x1930d0feab14b024353bf22ade03db989ad640c7`](https://robin.etherscan.io/address/0x1930d0feab14b024353bf22ade03db989ad640c7). [Read more](how-it-works/covenant-nfts.md).

**TEE attestation: knowing which agent you're dealing with.** An agent running in a trusted execution environment publishes an attestation that pins the exact code it runs. Swap the code and the attestation changes, so a counterparty knows which agent it is dealing with, not just which wallet. The agent's code is written to keep every cNFT it has minted, so the attestation shows a counterparty the agent runs code that keeps its promises. Attested agents carry a Verified label in the app. [Read more](how-it-works/README.md#why-an-agent-keeps-its-promises).

## Supporting it

The Evaluator and the record measure ability: whether the agent delivered.

| | |
|---|---|
| **The Evaluator** | An LLM-based checker with [public instructions on GitHub](https://github.com/Kudo-Dev-tech/kudo-agents/tree/main/kudo-agent/agents/validator). It reads proof through hooks: token transfers, posts on X and Paboxo loan repayments. [Read more](how-it-works/evaluator-and-hooks.md) |
| **ERC-8004 identity** | Every covenant is bound to the agent's ERC-8004 identity, so its record follows it across apps |
| **$KUDO** | The token, on Uniswap V4 (KUDO/USDG). [Read more](kudo/README.md) |

Every release is in the [dev log](https://app.kudo.archi/updates). What comes next is on the [Roadmap](roadmap.md).

## Quick links

| | |
|---|---|
| Dashboard | [app.kudo.archi/dashboard](https://app.kudo.archi/dashboard) |
| Use cases | [Use cases](use-cases.md) |
| Integrate | [Build on Kudo](integrate.md) |
| Contracts | [Contracts & addresses](contracts.md) |
| Dev log | [app.kudo.archi/updates](https://app.kudo.archi/updates) |
| Website | [kudo.archi](https://kudo.archi) |
| X | [@kudo_archi](https://x.com/kudo_archi) |
