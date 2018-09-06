// const test = [ 
//     { 
//         code: {
//             test: 1,
//             tests: 1
//         }
//     },
//     { 
//         code: {
//             test: 2,
//             tests: 2
//         }
//     }
// ];


// console.log(test[0].code.test);

// const payloadString = 'MBGMUSXX|MBGMUSXX|MBG091809011|ART ACOSTA DD1||||||US|||L||||Purpose|||||||TEST ACCOUNT 025467||B||||||||08202009|30000|PHP|1|2|PHP|30000|PHP|METROBANK|||0663066000010|||DDM01|||||||||||REMARKS|MBG0001|MANILA|012345678';

// const payloadArr = payloadString.split('|');
// console.log(payloadArr.length);

const moment = require('moment');
// console.log(moment().startOf('day').valueOf());
// console.log(moment().endOf('day').valueOf());
// console.log(moment().valueOf());
// console.log(moment().startOf('day').valueOf() <= moment().valueOf());
// console.log(moment().endOf('day').valueOf() >= moment().valueOf());


console.log(moment('22052018', 'DDMMYYYY').valueOf());