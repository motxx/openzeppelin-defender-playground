# OpenZeppelin Defender Test

## Commands

### Deploy contract

1. Deploy contracts
```
yarn deploy:<network name>
```
2. Update `deploy.json`.
3. Verify contracts
```
yarn hardhat verify <Forwarder Address> --network goerli
yarn hardhat verify <DemoERC20 Address> --network goerli --constructor-args constructor-args.js
```
constructor-args.js
```js
module.exports = [
  "0x...",
  "0x...",
];
```

### Upload autotask for relayer

```
yarn upload
```

### Invoke meta-transaction

```
yarn sign
yarn invoke
```
or
```
yarn invoke:with-sign
```

### Performance test ERC20

* TODO
* `./scripts/performance-test.ts`

## ContractAddress

* See: [deploy.json.sample](https://github.com/motxx/openzeppelin-defender-playground/blob/main/deploy.json.sample)

## Environment

`.env` を root に置いてください.

* `PRIVATE_KEY`: Private key used for deploying contracts and signing meta-txs locally.
* `RELAYER_API_KEY`: Defender Relayer API key, used for sending txs with yarn relay.
* `RELAYER_API_SECRET`: Defender Relayer API secret.
* `AUTOTASK_ID`: Defender Autotask ID to update when running yarn upload.
* `TEAM_API_KEY`: Defender Team API key, used for uploading autotask code.
* `TEAM_API_SECRET`: Defender Team API secret.
* `WEBHOOK_URL`: Defender webhook url. e.g. `https://api.defender.openzeppelin.com/autotasks/**`
* `ETHERSCAN_API_KEY`: Etherscan API key, which is used for verifying contracts.
* `RECIPIENT_ADDR`: ERC20 recipient address for sending transaction scripts.
* `RPC_URL`: RPC Endpoint URL.

## Note

* 2022/11 時点 各ネットワーク状況
  * Goerli は一瞬で Queue に入る.
  * Sokol は Queue に入るまでが遅い.
  * いずれも確定まては 10 秒程度はかかる.
