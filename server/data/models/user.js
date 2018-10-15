const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  // firstName:{
  //   type: String,
  //   required: true,
  //   trim: true,
  //   minlength: 1
  // },
  // lastName: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   minlength: 1
  // },
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
  password: {
    type: String,
    required: true,
    minlength: 8
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

UserSchema.methods.toJSON = function () {
  const user = this;
  const userOject = user.toObject();
  try {
    const decoded = jwt.verify(userOject.tokens[0].token, process.env.JWT_SECRET);
    userOject.exp = decoded.exp; 
  } catch (error) {
    userOject.exp = 0; 
  }
  return _.pick(userOject, ['_id', 'email', 'tokens[0].token',  'exp' ]);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id : user._id.toHexString(), access }, 
    process.env.JWT_SECRET, { expiresIn: '3h' }).toString();
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeTokens = function (access = 'auth') {
  const user = this;
  return user.update({
    $pull : {
      tokens: { access }
    }
  });
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);    
  } catch (error) {
    const e = _.pick(error, [ 'name', 'message']);
    console.log(e);
    return Promise.reject(e);
  }
  return User.findOne({
    '_id': decoded._id
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  const User = this;
  return User.findOne({email}).then((user, error) => {
    if (error) {
      return Promise.reject(error);
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject(err);
        }
      });
    });
  });
};

UserSchema.pre('save', function(next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else next();
});

module.exports.User = mongoose.model('User', UserSchema);