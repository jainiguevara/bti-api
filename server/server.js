require('./config/config');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
// const socketIO = require('socket.io');

const auth = require('./business/routes/auth');
const user = require('./business/routes/user');
const index = require('./business/routes/index');
const post = require('./business/routes/post'); 

const app = express();
const server = http.createServer(app);
// const io = socketIO(server);

// middlewares
app.use(bodyParser.json());
app.use(cors());

// io.on('connection', socket => {
//   console.log('New user connected.');

//   socket.emit('newPostResponse', {test: 123});
//   socket.on('disconnect', socket => {
//     console.log('User was disconnected.');
//   });
// });

app.use('/', index);
app.use('/auth', auth);
app.use('/user', user);
app.use('/post', post);

server.listen(process.env.PORT, () => {
  console.log(`Started on port ${process.env.PORT}`);
});

module.exports = { server };
