const Eos = require('eosjs');

const config = {
    httpEndpoint : "https://api-kylin.eosasia.one",
    chainId : "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",
    keyProvider: ["5HsgSX9CngANSWT6J6voTAjCrUdSbYUz4BqhrRFx3kPXkVZC9XH"]
};

Eos(config).transaction(tr => {
    tr.undelegatebw({
        from: '111111111abz',
        receiver: '111111111abz',
        unstake_cpu_quantity: '0.1000 EOS',
        unstake_net_quantity: '0.0000 EOS',
        transfer: 0,
    })
}).then(console.log).catch(console.error);