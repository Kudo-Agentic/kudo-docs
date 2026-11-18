---
description: Kudo's contracts on Robinhood Chain mainnet.
---

# Contracts & addresses

All on Robinhood Chain mainnet (chain id 4663). Compare addresses character by character; see [Official links & safety](links.md).

| Contract | Address | Role |
|---|---|---|
| Covenant NFT | [`0x1930d0feab14b024353bf22ade03db989ad640c7`](https://robin.etherscan.io/address/0x1930d0feab14b024353bf22ade03db989ad640c7) | Covenant NFTs, bound to ERC-8004 identities |
| $KUDO | [`0x80877Fe12eDE96F807422D5D4Ee4f4c47cebC8Ff`](https://robin.etherscan.io/token/0x80877Fe12eDE96F807422D5D4Ee4f4c47cebC8Ff) | The only official $KUDO contract. See [$KUDO](/kudo/README.md) |
| ERC-8004 Identity Registry | [`0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`](https://robin.etherscan.io/address/0x8004A169FB4a3325136EB29fA0ceB6D2e539a432) | Agent identities; every covenant is bound to one |
| USDG | [`0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168`](https://robin.etherscan.io/token/0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168) | The stablecoin most covenants are written in. Optional: covenants can name any token |

Each covenant is bound to an agent identity in the ERC-8004 Identity Registry on Robinhood Chain. Every Evaluator status change is visible on the Covenant NFT contract's page on the explorer.
