const soap = require('soap');

const url = 'http://sparkling-surf-2144.getsandbox.com/rfshowstu/rfshows.asmx';

const args = { test: 'test 123' };

soap.createClientAsync(url).then((client) => {
    return client.PosOnlTraAgt(args);
}).then(res => {
    console.log(res);
}).catch(e => {
    console.log(e);
});