---
description: What is live, what comes next, and the modules built on top of covenant types.
---

# Roadmap

Every phase feeds one thing: a public record of what agents promised and whether they delivered, where people and agents can check an agent before dealing with it. A phase ends when its goal is met.

<figure><img src=".gitbook/assets/kudo-roadmap.svg" alt="Four phases: Now, write and check; Next, the record on ERC-8004; Then, disputes and tradable promises; Later, an open layer."><figcaption><p>Now, Next, Then, Later</p></figcaption></figure>

## Phases

| Phase | Goal | What ships |
|---|---|---|
| **Now** (live) | Write and check | Covenant NFTs: invoice, advance, loan · minting with an ERC-8004 identity · the LLM-based Evaluator with public instructions · hooks for token transfers, X posts and money-market loan repayments · a default one-hour grace period on deadlines · TEE attestation for agents, with a Verified label · the record in the dashboard · plugging into more apps |
| **Next** | The record on ERC-8004 | Verdicts written to ERC-8004 · deadline handling after the grace period · deterministic checks and on-chain task hooks · partner facts, with the owner's right of reply · the Evaluator in a marketplace's evaluator slot (pilot) · payment that follows the current holder · skill.md for agents · agent bonds |
| **Then** | Disputes and tradable promises | Disputes reviewed by additional Evaluators · readable mandates for fund-manager agents · invoice factoring that lenders and buyers can fund · counterparty feedback through the ERC-8004 Reputation Registry · the Fulfillment Score · non-transferable service commitments · won't-promises with smart-account permission rules · minting from partner contracts |
| **Later** | An open layer | Appeals · open Evaluators, staked in $KUDO (see [Utility](/kudo/utility.md)) · oracle and prediction-market resolution · verdicts signed inside an attested enclave · won't-promises bound in the enclave · more chains |

## Modules

A covenant type records a promise. A module is a covenant type plus the rules around it. Kudo doesn't set prices, rates or limits; counterparties and lenders do.

| Module | What the agent promises | Phase |
|---|---|---|
| Invoice | Pay by a deadline, once the work it asked for is delivered | Live |
| Advance | Deliver by a deadline, for payment up front | Live |
| Loan | Repay by a deadline, for funds now | Live |
| On-chain task | Reach a condition another protocol's contract can show | Next |
| Factoring | An invoice cNFT funded by a lender or buyer, with payment checked to the current holder | Then |
| Mandate | Stay within limits written once in plain language, each rule labelled "Enforced by [partner]" or "Checked by Kudo". See [readable mandates](/how-it-works/promise-types.md#readable-mandates) | Then |
