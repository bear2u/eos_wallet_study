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

## getTableRows

[json] => bool => false (true 일 경우 해쉬로 들어감) => true로 추천

- Json을 true로 설정시 어떻게 나오는지 체크

```javascript
const Eos = require('eosjs');

const config = {
    httpEndpoint : "https://api-kylin.eosasia.one",
    chainId : "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
}

Eos(config).getTableRows({
    json: true,
    code: "eosio",
    scope: "eosio",
    table: "rammarket"
}).then(tableInfo => {
    console.log(tableInfo);
}).catch(error => {
    console.error(error);
})

.................
{ rows:
   [ { supply: '10000000000.0000 RAMCORE',
       base: [Object],
       quote: [Object] } ],
  more: false }
```  

- json 을 false로 설정시 어떻게 나오지??
    - 보다시피 해시된 값이 출력이 되고 있다.

```javascript
{ rows:
   [ '00407a10f35a00000452414d434f5245b5fbdb3b0e0000000052414d00000000000000000000e03ffbb43b640300000004454f5300000000000000000000e03f' ],
  more: false }
```

## getCurrentBalance

- 해당 계정에 대한 잔액을 조회한다. 

```javascript
const Eos = require('eosjs');

const config = {
    httpEndpoint : "https://api-kylin.eosasia.one",
    chainId : "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
}

Eos(config).getCurrencyBalance("eosio.token", "zxcvbasdfg11", (error, result) => {
    if(error) {
        console.error(error);
    }
    console.log(result);
});

...........

[ '57.8607 EOS' ]

```

## transfer
EOS 를 전송시 사용된다. 

- Symbol명 맞춰준다. 
- active private key를 넣어준다. 
- 방법은 5가지 
    - transfer 이용
    - transaction 이용
    - 콜백 후에 다시 전송실행
    - contract 정보를 불러와서 실행
- 보낼때 금액 자리수는 소수점 4자리 필수!!

```javascript

const Eos = require('eosjs');

const config = {
    httpEndpoint : "https://api-kylin.eosasia.one",
    chainId : "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",
    keyProvider: ["5HsgSX9CngANSWT6J6voTAjCrUdSbYUz4BqhrRFx3kPXkVZC9XH"]
};

// 1번째 방법
Eos(config).transfer('111111111abz', '111111111abk', '50.0000 EOS', 'test transfer')
    .then(console.log).catch(console.error);


// 2번째 방법
Eos(config).transaction({
    actions: [{
    account: 'eosio.token',
    name: 'transfer',
    authorization: [{
        actor: '111111111abz',
        permission: 'active',
    }],
    data: {
        from: '111111111abz',
        to: '111111111abk',
        quantity: '1.0000 EOS',
        memo: 'test',
    },
    }]
}).then(console.log).catch(console.error);

// 3번째 방법
//3
Eos(config).transaction('eosio.token', (coin) => {
    coin.transfer('111111111abz', '111111111abk', '1.0000 EOS', 'test transfer');
}).then(console.log).catch(console.error);

// 4번째 방법

//4
Eos(config).contract("eosio.token").then(coin => coin.transfer('111111111abz', '111111111abk', '1.0000 EOS', 'test transfer')).then(console.log).catch(console.error);

...........
{ broadcast: true,
  transaction:
   { compression: 'none',
     transaction:
      { expiration: '2018-10-24T21:51:14',
        ref_block_num: 58849,
        ref_block_prefix: 1194338712,
        max_net_usage_words: 0,
        max_cpu_usage_ms: 0,
        delay_sec: 0,
        context_free_actions: [],
        actions: [Array],
        transaction_extensions: [] },
     signatures:
      [ 'SIG_K1_KfEna6CXX5dMz4GoScE9Uazpam4Mchv5UF45kjyFvnX2TNk9YxFGwzeQie3zm3ZnHAqJnpzdNQHwKYx1AEobbHLpye8tyV' ] },
  transaction_id: 'eca58f57a4ee02e52490bdd3888304a4ce1d0adb1ca6e4c1fa5f54f0d32a8a12',
  processed:
   { id: 'eca58f57a4ee02e52490bdd3888304a4ce1d0adb1ca6e4c1fa5f54f0d32a8a12',
     receipt: { status: 'executed', cpu_usage_us: 1039, net_usage_words: 18 },
     elapsed: 1039,
     net_usage: 144,
     scheduled: false,
     action_traces: [ [Object] ],
     except: null } }

```

## delegate

- staking 실습
- transfer: 나한테 보낼때는 0이다
- transfer: 남한테 빌려줄때는 0, 아예 줄 때는 1
- 빌려줄때는 스테이킹할때는 올라가지만 보유 eos는 그대로이다. 

```javascript
const Eos = require('eosjs');

const config = {
    httpEndpoint : "https://api-kylin.eosasia.one",
    chainId : "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",
    keyProvider: ["5HsgSX9CngANSWT6J6voTAjCrUdSbYUz4BqhrRFx3kPXkVZC9XH"]
};

Eos(config).transaction(tr => {
    tr.delegatebw({
        from: '111111111abz',
        receiver: '111111111abz',
        stake_cpu_quantity: '0.1000 EOS',
        stake_net_quantity: '0.0000 EOS',
        transfer: 0, //0은 빌려주는 것, 1은 주는 것, 0은 자신에게 보냄
    })
}).then(console.log).catch(console.error);
```

## undelegate

- unstaking
- stake 의 반대
- unstake balance에 eos 비용이 올라감
- delegate 할때 transfer 할때 빌려준것에 undelegate 해준다. 
- 

```javascript
const Eos = require('eosjs');

const config = {
    httpEndpoint : "https://api-kylin.eosasia.one",
    chainId : "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",
    keyProvider: ["5HsgSX9CngANSWT6J6voTAjCrUdSbYUz4BqhrRFx3kPXkVZC9XH"]
};

Eos(config).transaction(tr => {
    tr.undelegatebw({
        from: '111111111abz',
        receiver: '111111111abz', //빌려준 상대방 계정을 적게 되면 반환 처리한다.
        unstake_cpu_quantity: '0.1000 EOS',
        unstake_net_quantity: '0.0000 EOS',
        transfer: 0,
    })
}).then(console.log).catch(console.error);
```

## Ram 구매 및 판매

- Ram은 시세에 따라 다르고 사고 파는게 가능하다. 
- byte 단위로 살수도 있고 eos 단위로 살수도 있다. 
- Ram 구매,판매시 수량은 양수만 가능하다. 

```javascript
const Eos = require('eosjs');

const config = {
    httpEndpoint : "https://api-kylin.eosasia.one",
    chainId : "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",
    keyProvider: ["5HsgSX9CngANSWT6J6voTAjCrUdSbYUz4BqhrRFx3kPXkVZC9XH"]
};

//byte 기준으로 구매
// Eos(config).transaction(tr => {
//     tr.buyrambytes({
//         payer: '111111111abz',
//         receiver: '111111111abz',
//         bytes: 8192
//     })
// }).then(console.log).catch(console.error);

//eos 기준으로 구매
// Eos(config).transaction(tr => {
//     tr.buyram({
//         payer: '111111111abz',
//         receiver: '111111111abz',
//         quant: '1.0000 EOS'
//     })
// }).then(console.log).catch(console.error);

// 램판매
// 소수점으로 안됨
Eos(config).transaction(tr => {
    tr.sellram({
        account: '111111111abz',
        bytes: 10000
    })
}).then(console.log).catch(console.error);
```






