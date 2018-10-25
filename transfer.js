const Eos = require('eosjs');

const config = {
    httpEndpoint : "https://api-kylin.eosasia.one",
    chainId : "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",
    keyProvider: ["5HsgSX9CngANSWT6J6voTAjCrUdSbYUz4BqhrRFx3kPXkVZC9XH"]
};

//1
// Eos(config).transfer('111111111abz', '111111111abk', '50.0000 EOS', 'test transfer')
//     .then(console.log).catch(console.error);

//2
// Eos(config).transaction({
//     actions: [{
//     account: 'eosio.token',
//     name: 'transfer',
//     authorization: [{
//         actor: '111111111abz',
//         permission: 'active',
//     }],
//     data: {
//         from: '111111111abz',
//         to: '111111111abk',
//         quantity: '1.0000 EOS',
//         memo: 'test',
//     },
//     }]
// }).then(console.log).catch(console.error);

//3
// Eos(config).transaction('eosio.token', (coin) => {
//     coin.transfer('111111111abz', '111111111abk', '1.0000 EOS', 'test transfer');
// }).then(console.log).catch(console.error);

//4
Eos(config).contract("eosio.token").then(coin => coin.transfer('111111111abz', '111111111abk', '1.0000 EOS', 'test transfer')).then(console.log).catch(console.error);

