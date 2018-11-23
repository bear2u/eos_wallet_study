const Eos = require('eosjs');

const config = {
    httpEndpoint : "https://api-kylin.eosasia.one",
    chainId : "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",
    keyProvider: ["5HsgSX9CngANSWT6J6voTAjCrUdSbYUz4BqhrRFx3kPXkVZC9XH"]
};

/*
privateKey 5KEKk4x1zLuGcdq6oTa5XMJ4qyo5RUv6y9UoAmKDrARS7Uwvx9B
publicKey EOS6MZ4o9fioaZKp5x6TE9jjqEpq2q4J97SCQao7ehMw5VLttBUV1
*/
// 12자리이고 a~z, 1~5까지 여야 함
// 계정만 만들경우 에러남
Eos(config).transaction(tr => {
    tr.newaccount({
      creator: '111111111abz',
      name: '111111111abb',
      owner: 'EOS6MZ4o9fioaZKp5x6TE9jjqEpq2q4J97SCQao7ehMw5VLttBUV1',
      active: 'EOS6MZ4o9fioaZKp5x6TE9jjqEpq2q4J97SCQao7ehMw5VLttBUV1'
    })
  
    tr.buyrambytes({
      payer: '111111111abz',
      receiver: '111111111abb',
      bytes: 8192
    })
  
    tr.delegatebw({
      from: '111111111abz',
      receiver: '111111111abb',
      stake_net_quantity: '1.0000 EOS',
      stake_cpu_quantity: '1.0000 EOS',
      transfer: 1 //0이면 빌려줌, 1이면 준다. 
    })
  }).then(console.log).catch(console.error);