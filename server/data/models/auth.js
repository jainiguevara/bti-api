const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

const AuthSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

AuthSchema.methods.toJSON = function () {
  const auth = this;
  const authOject = auth.toObject();
  return _.pick(authOject, ['_id', 'email', 'tokens[0].token']);
};

AuthSchema.methods.generateAuthToken = function () {
  const auth = this;
  const access = 'auth';
  const token = jwt.sign({ _id : auth._id.toHexString(), access }, 
    process.env.JWT_SECRET).toString();
  auth.tokens = auth.tokens.concat([{access, token}]);
  return auth.save().then(() => {
    return token;
  });
};

AuthSchema.methods.removeToken = function (token) {
  const auth = this;
  return auth.update({
    $pull : {
      tokens: { token }
    }
  });
};

AuthSchema.statics.findByToken = function (token) {
  const Auth = this;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    const e = _.pick(error, [ 'name', 'message']);
    console.log(e);
    return Promise.reject(e);
  }
  return Auth.findOne({
    '_id': decoded._id
  });
};

AuthSchema.statics.findByCredentials = function (email) {
  const Auth = this;
  return Auth.findOne({email}).then(auth => {
    if (!auth) {
      return Promise.reject();
    }
    // return new Promise((resolve, reject) => {
    //   // bcrypt.compare(password, auth.password, (err, res) => {
    //   // if (res) {
    //   //   resolve(auth);
    //   // } else {
    //   //   reject();
    //   // }
    //   // });
    // });
    return Promise.resolve(auth);
  });
};

module.exports.Auth = mongoose.model('Auth', AuthSchema);