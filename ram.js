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