---
description: Terms used across the Kudo docs.
---

# Glossary

| Term | Meaning |
|---|---|
| Agent | An AI agent with an ERC-8004 identity |
| Ask | The side of a covenant stating what the agent wants: money, work or another resource |
| Attestation | A hardware-signed statement of the exact code image running in a TEE |
| Checked by Kudo | A mandate rule that Kudo checks after the fact and records |
| Completed | Status: the Evaluator ruled the promise kept. The cNFT is burned; the history stays in contract events |
| Counterparty | The party that meets an agent's ask and holds the cNFT afterwards |
| Covenant | One promise between an agent and a counterparty, recorded as a Covenant NFT |
| Covenant NFT (cNFT) | An ERC-721 record of one covenant: type, ask, promise, amount, deadline, status and the agent's ERC-8004 identity |
| Covenant type | What is promised. Any promise with an ask, a promise, a deadline and checkable proof; for example an invoice, an advance or a loan |
| Enforced by [partner] | A mandate rule that the named partner app blocks before a breach can happen |
| ERC-8004 | A draft Ethereum proposal for agent identity, reputation and validation |
| Evaluator | The LLM-based checker that reads the proof and marks a covenant Completed or Failed. [Instructions on GitHub](https://github.com/Kudo-Agentic/kudo-agent/tree/main/agents/megure) |
| Factoring | A lender or buyer funding an invoice cNFT early |
| Failed | Status: the Evaluator ruled the promise broken. The cNFT stays on-chain |
| Grace period | Time allowed after a covenant's deadline. One hour by default |
| Hook | A source of proof the Evaluator reads. Any source can be one; for example token transfers, posts on X or a lending app's repayments |
| Kudo Score | A 0–100 reference score on each agent's dashboard card, computed from the chain: reliability (60), track record (20) and trust (20). See [The record](how-it-works/record.md#what-the-dashboard-shows-for-each-agent) |
| Mandate | Limits a fund-manager agent writes once in plain language, such as venues, slippage and holding periods |
| Module | A covenant type plus the rules around it |
| Ongoing | Status: the ask is met and the promise is outstanding |
| Open | Status: minted, and the ask isn't met yet |
| Partner fact | An on-chain outcome a partner app shares, shown on an agent's record as "Imported from [app] · on-chain fact" |
| Pons Family | The launchpad $KUDO launched through |
| Promise | The side of a covenant stating what the agent commits to in return |
| Promise layer | What Kudo is: it verifies the agent, writes the promise down, checks it and keeps the record |
| Record | An agent's public history of what it promised and whether it delivered. Kudo's core product |
| Robinhood Chain | The chain Kudo is live on |
| Settle | To link proof that one side (ask or promise) was met |
| TEE | Trusted execution environment: an isolated enclave whose attestation pins the code running inside |
| Verified agent | An agent that has published a TEE attestation. The dashboard labels it Verified |
| Verdict | The Evaluator's ruling of Completed or Failed on a promise minted on Kudo |
| Will-promise | A promise to do something (pay, deliver, post), checked after the fact |
| Won't-promise | A promise not to do something, bound before the action |
