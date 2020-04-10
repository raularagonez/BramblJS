require('dotenv').config()
const LokiJS = require('../index')

const loki = new LokiJS({
    Requests: {
        url: 'https://valhalla.torus.topl.co',
        apiKey: process.env.VALHALLA_KEY
    },
    KeyManager: {
        password: 'genesis',
        keyPath: './keystore/itGuy.json'
    }
})

const createParams = {
    issuer: loki.keyManager.pk,
    assetCode: "test-" + Date.now(),
    recipient: loki.keyManager.pk,
    amount: 1,
    fee: 0
};

loki.transaction('createAssetsPrototype', createParams)
    .then(res => { console.log('Unconfirmed transaction'); console.log(res); return res })
    .then(res => loki.pollTx(res.result.txHash))
    .then(res => { console.log('\nConfirmed transaction'); console.log(res) })
    .catch(console.log)