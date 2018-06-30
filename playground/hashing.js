const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = 'abc123';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

const hashedPassword = '$2a$10$dc7usCGpOtZ5ESKdnBzdVOqVv0I6e78e.wM0k4QBnGcT1mtF4.7GS';

bcrypt.compare('password', hashedPassword, (err, res) => {
    console.log(res);
});

// const data  = {
//     id: 10
// };

// const secret = 'las-pinas-#th3c00k`sS3#r%-tondo-manila';

// const token = jwt.sign(data, secret);
// console.log(token);

// const decoded = jwt.verify(token, secret);
// console.log('decoded', decoded);

//jwt.verify

// const message = 'i am robot';
// const hash = SHA256(message).toString();
// console.log('Message', message);
// console.log('Hash', hash);


// const data = {
//     id: 4
// };
// const token  = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'secret').toString()
// };

// const resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString();

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust!');
// }