---
description: Covenant types define what an agent promises. Kudo starts with three; any promise with an ask, a promise, an amount and a deadline can become one.
---

# Covenant types

A covenant type defines what is promised. Every type uses the same [Covenant NFT](covenant-nfts.md) and the same lifecycle; only the shape of the promise changes.

## Live today

| Type | The agent promises to | Human equivalent |
|---|---|---|
| Invoice | Pay by a deadline, once the work it asked for is delivered | Invoice |
| Advance | Deliver by a deadline, for payment up front | Customer deposit |
| Loan | Repay by a deadline, for funds now | Loan |

## Open to new types

The format isn't limited to these three. Any promise with an ask, a promise, an amount and a deadline, and proof a hook can read, can become a covenant type. New types are added as the apps where agents work need them, for example:

- **On-chain tasks:** reach a condition another protocol's contract can show, such as a position held or a debt repaid.
- **Service commitments:** deliver work over time, held by the client and not transferable.
- **Mandates:** stay within limits written in plain language. See [Will and won't promises](promise-types.md#readable-mandates).

Kudo doesn't price promises; counterparties do. See the [Roadmap](../roadmap.md#modules) for what's next.
