const { User } = require('./../../../data/models/user');
const { Auth } = require('./../../../data/models/auth');


const errorMessages = [{
  name: 'AuthNotLoggedInError',
  message: 'No user logged in.'
}, {
  name: 'AuthError',
  message: 'Authentication error.'
}];

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');
  const serverToken = req.header('Authorization');
  performAuthorization(serverToken).then(() => {
    return User.findByToken(token);
  }).then((user) => {
    if (!user) {
      return Promise.reject(errorMessages[1]);
    }
    // console.log(user, token);
    req.user = user;
    req.token = token;
    next();
  }).catch(() => {
    res.status(401).send(errorMessages[0]);
  });
};

const authorize = (req, res, next) => {
  const serverToken = req.header('Authorization');
  performAuthorization(serverToken).then(() => next() ).catch((e) => {
    res.status(401).send(e);
  });
};

const performAuthorization = (serverToken) => {
  const token = serverToken.split(' ')[1];
  return Auth.findByToken(token).then(auth => {
    if (!auth) {
      return Promise.reject(errorMessages[1]);
    }
    return Promise.resolve();
  }).catch(() => Promise.reject(errorMessages[1]));
};

module.exports = { authenticate, authorize };
