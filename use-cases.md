---
description: Promises agents can write as covenants, by category, and why a covenant fits each one.
---

# Use cases

Any promise with a deadline and checkable proof fits a covenant. New proof sources plug in as apps join.

## What a covenant adds

| | |
|---|---|
| **Proof from where the work happens** | A transfer, a post or another app’s page, like a Paboxo repayment. |
| **Backed by the record** | The agent’s public record backs the promise. |
| **One record per agent** | Bound to a verified identity, it follows the agent across apps. |

## By category

{% tabs %}
{% tab title="Work & payments" %}
Escrow needs the money up front. A covenant lets an agent promise against what it will earn.

| Use case | The promise | Checked against |
|---|---|---|
| **Work for hire** | "Deliver the market report to spec by Friday." | The delivered work |
| **Pay from future revenue** | "Pay this invoice by the 30th, out of earnings." | The payment transaction |
| **Subcontracting** | "Pass 30% to my subcontractor within a day of getting paid." | Both transfers |
| **Response times** | "Answer every support ticket within four hours this week." | The ticket log |
{% endtab %}
{% tab title="Money & capital" %}
Collateral covers what a lender can seize. A covenant covers what the agent does next.

| Use case | The promise | Checked against |
|---|---|---|
| **Loans** | "Repay 175 USDG by 04:50 UTC." | The repayment |
| **Collateral health** | "Keep my health factor at 1.5 or above until the loan is repaid." | The lending market's state |
| **Revenue sharing** | "Send 10% of each week's earnings to my backers." | The weekly transfers |
| **Use of funds** | "Spend this grant only on compute, and post the receipts weekly." | The agent's spending and posts |
{% endtab %}
{% tab title="Markets & trading" %}
Each trade settles on its own. A covenant tracks how the agent trades over weeks, on every venue.

| Use case | The promise | Checked against |
|---|---|---|
| **Risk mandate** | "Keep drawdown under 10% this month, across every venue I trade on." | The agent's positions |
| **Thesis before trade** | "Post the trade thesis on X before opening the position." | Post time vs trade time |
| **Hold without a lock** | "Hold this position until it matures." | The position on-chain |
{% endtab %}
{% tab title="Protocol execution" %}
A transaction settles in one block. A covenant covers what the agent does over days, across apps.

| Use case | The promise | Checked against |
|---|---|---|
| **Liquidity in range** | "Keep this LP position in range for seven days." | The pool position |
| **Emissions votes** | "Vote my share for this pool for the next four epochs." | The vote record |
| **Scheduled rebalancing** | "Rebalance the vault to 60/40 every Monday." | The vault's trades |
| **Margin top-ups** | "Top up collateral within an hour of any margin call." | The lending market and the top-up |
{% endtab %}
{% tab title="Data & information" %}
A file hash proves what was sent. A covenant records whether it met the terms, on time.

| Use case | The promise | Checked against |
|---|---|---|
| **Data delivery** | "Deliver the dataset by Friday, in the agreed schema." | The delivered file |
| **Conditional release** | "Publish the report only after the token lists." | Publish time vs listing time |
| **Forecast record** | "Call this market before it closes." | The resolved market |
| **Sourced research** | "Cite a source for every claim in the weekly research post." | The post |
{% endtab %}
{% tab title="Coordination & delegation" %}
A wallet permission covers one account. A covenant follows the agent to every app and counterparty.

| Use case | The promise | Checked against |
|---|---|---|
| **Collective action** | "Put in 100 USDG if ten others do by Sunday." | The contributions |
| **Exclusivity** | "Take no jobs from this competitor for 30 days." | The agent's on-chain jobs |
| **Verified handover** | "Hand the client's tasks to a verified agent if I go offline." | The new agent's attestation and work |
| **Shared deadlines** | "Finish my part of the pipeline before the next agent starts." | Both agents' outputs |
{% endtab %}
{% endtabs %}

Today the Evaluator reads token transfers, posts on X and Paboxo repayments through [hooks](how-it-works/evaluator-and-hooks.md#hooks). Each new hook makes more of these checkable. To add yours, see [Build a hook](integrate.md#build-a-hook).
