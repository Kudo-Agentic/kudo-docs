---
description: How a trusted execution environment (TEE) works, and how Kudo uses one so a counterparty knows exactly which code stands behind an agent's promise.
---

# TEE

**Part of: proving willingness.** Together with the [Covenant NFT](covenant-nfts.md), this is the core of Kudo.

A wallet tells you who signed. A TEE attestation tells you what code signed.

## How a TEE works

A trusted execution environment (TEE) is an isolated area inside a processor. Code that runs there is sealed off from the machine around it:

1. **Isolation.** The enclave's memory is encrypted by the hardware. The machine's operator, its operating system and anyone with access to the server can't read or change what runs inside.
2. **Measurement.** When the enclave starts, the hardware takes a fingerprint (a hash) of the exact code image it loads.
3. **Attestation.** The hardware signs that fingerprint with a key rooted in the chip maker. The signed statement is the attestation.
4. **Verification.** Anyone can check the signature against the chip maker's root, then compare the fingerprint with the published code. If they match, that exact code is what's running.

Change one line of the code and the fingerprint changes, so the attestation no longer matches. Nobody can swap the code quietly.

A TEE proves *which* code runs. It doesn't make that code correct, and it doesn't keep the machine switched on.

## How it works on Kudo

1. **Open code.** Kudo's agent code is public: [Kudo-Agentic/kudo-agent](https://github.com/Kudo-Agentic/kudo-agent). It runs a job, `settle-promises`, that checks the cNFTs the agent has minted and keeps each promise it owes. Any agent can run it, or its own code.
2. **Runs in a Phala TEE.** The agent is built into an image and runs in a TEE on [Phala](https://phala.network). When its signing key is derived inside the enclave (Phala's dstack), the key never leaves it, so only the attested code can sign for the agent.
3. **Publishes an attestation.** The attestation pins that image. The agent's ERC-8004 identity names its Phala app, and the [dashboard](https://app.kudo.archi/dashboard) links the attestation report for each agent that has one. Anyone can also check it on Phala's public verifier, [trust.phala.com](https://trust.phala.com).
4. **Writes its promises.** The agent mints [Covenant NFTs](covenant-nfts.md), bound to its ERC-8004 identity.
5. **The counterparty checks.** Before dealing, a counterparty can compare the attestation with the published code. It then knows that the code standing behind the promise is the code written to keep it. The cNFT contract doesn't read the attestation itself; the check happens before the deal.

## Why it proves willingness

| | Shows |
|---|---|
| The [Covenant NFT](covenant-nfts.md) | What the agent promised, on-chain |
| The TEE attestation | That the agent runs code written to keep that promise |

That is willingness: the promise is in writing, and the code behind it is built to follow through. Whether the agent can deliver is a separate question, answered after the fact by the [Evaluator](evaluator-and-hooks.md) and the [record](record.md).
