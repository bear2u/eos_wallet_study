# EOSJS 지갑 만들기

https://www.inflearn.com/

## 참고 사이트
- https://eos.io/
- https://github.com/EOSIO/eosjs (eosjs)
- http://kylin.apache.org/ (기린넷)
- https://www.cryptokylin.io/
- https://github.com/apache/kylin (기린넷 - github)
- https://github.com/cryptokylin/CryptoKylin-Testnet (기린넷 계정 만들거나 기본)
- http://jungle.cryptolions.io/ (정글넷)
- https://developers.eos.io/eosio-nodeos/reference
- https://www.alohaeos.com/vote (EOS BP들 순위)
- https://github.com/EOSIO/demux-js (EOSIO 액션 flow)
- https://nadejde.github.io/eos-token-sale/ (eos Key Generation)
- https://github.com/EOSIO/eosjs-ecc

## 현재 만든 계정
  
## 준비 사항
- NodeJs
- EOSJS
    - npm install eosjs --save

- 기린넷을 이용할 예정

## 환경설정
1. `mkdir eosjs`
2. `npm init`
3. `npm install eosjs --save`

## API 공부내용

### getInfo.js

- getInfo 함수는 Promise를 제공해주지 않고 콜백만 지원한다. 
- 

```javascript
const Eos = require('eosjs');

const config = {
    httpEndpoint : "https://api-kylin.eosasia.one"
}

Eos(config).getInfo((error, info) => {
    if(error) {
        console.error(error);
    }
    console.log(info);
});

-------------

{ server_version: 'a228b1dc',
  chain_id: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
  head_block_num: 17007658,
  last_irreversible_block_num: 17007346,
  last_irreversible_block_id: '010382f23dd95ede57594d6e13d07de9a46a47d9b318486a05ed23b3337374f1',
  head_block_id: '0103842a8584889ea420ad0d76e00fac809900541cf078618ec425394e3da69b',
  head_block_time: '2018-10-23T21:51:15.500',
  head_block_producer: 'eospaceioeos',
  virtual_block_cpu_limit: 5435127,
  virtual_block_net_limit: 1048576000,
  block_cpu_limit: 156147,
  block_net_limit: 1045944 }

```

출력후에 `config`에 `chain_id`를 넣어준다. 

```javascript
const config = {
    httpEndpoint : "https://api-kylin.eosasia.one",
    chainId: "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
}
```

EOS는 0.5초마다 블록을 만들기 때문에 `head_block_num` 번호가 올라간다. 

### getBlock.js
- 블록에 대한 정보를 조회할 수 있다.
- getBlock 시 앞에 인자는 블록 번호를 뜻한다. 

```javascript
const Eos = require('eosjs');

const config = {
    httpEndpoint : "https://api-kylin.eosasia.one",
    chainId : "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
}

Eos(config).getBlock(1, (error, blockInfo) => {
    if(error) {
        console.error(error);
    }

    console.log(blockInfo);
});
```

Promise 형태로도 사용이 가능하다. 

```javascript
const Eos = require('eosjs');

const config = {
    httpEndpoint : "https://api-kylin.eosasia.one",
    chainId : "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
}

Eos(config).getInfo((error, info) => {
    if(error) {
        console.error(error);
    }
    console.log(info);
});
```

## getAccount

- core_liquid_balance : unstaking 한 eos를 뜻한다. 
- net_weight,cpu_weight 는 stake 한 내용을 뜻한다.
- 계정을 만들때 램값이 들어가기 때문에 비용이 든다.

```javascript
const Eos = require('eosjs');

const config = {
    httpEndpoint : "https://api-kylin.eosasia.one",
    chainId : "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
}

Eos(config).getAccount("zxcvbasdfg11", (error, account) => {
    if(error) {
        console.error(error);
    }

    console.log(account);
});

```

```
{ account_name: 'zxcvbasdfg11',
  head_block_num: 17015723,
  head_block_time: '2018-10-23T23:04:53.500',
  privileged: false,
  last_code_update: '1970-01-01T00:00:00.000',
  created: '2018-08-18T03:18:30.500',
  core_liquid_balance: '59.0559 EOS',
  ram_quota: 5256,
  net_weight: 20000,
  cpu_weight: 20000,
  net_limit: { used: 1172, available: 1464327, max: 1465499 },
  cpu_limit: { used: 10102, available: 18091, max: 28193 },
  ram_usage: 4118,
  permissions:
   [ { perm_name: 'active', parent: 'owner', required_auth: [Object] },
     { perm_name: 'owner', parent: '', required_auth: [Object] } ],
  total_resources:
   { owner: 'zxcvbasdfg11',
     net_weight: '2.0000 EOS',
     cpu_weight: '2.0000 EOS',
     ram_bytes: 3856 },
  self_delegated_bandwidth:
   { from: 'zxcvbasdfg11',
     to: 'zxcvbasdfg11',
     net_weight: '1.0000 EOS',
     cpu_weight: '1.0000 EOS' },
  refund_request: null,
  voter_info:
   { owner: 'zxcvbasdfg11',
     proxy: '',
     producers: [],
     staked: 60000,
     last_vote_weight: '0.00000000000000000',
     proxied_vote_weight: '0.00000000000000000',
     is_proxy: 0 } }
```

## Public Key, Private Key

https://github.com/EOSIO/eosjs-ecc

ECC 를 이용해서 소스내에서 만들수 있다. 

```javascript
const Eos = require('eosjs');

const ecc = Eos.modules.ecc;

ecc.randomKey().then(privateKey => {
    console.log('privateKey', privateKey);
    const publicKey = ecc.privateToPublic(privateKey);
    console.log("publicKey", publicKey);
});
```

  