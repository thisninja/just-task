const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const EMAIL_REG_EXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const ACCESS = 'auth';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: function (email) {
        return EMAIL_REG_EXP.test(email);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
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
  const userObject = this.toObject();
  const { _id, email } = userObject;

  return { _id, email };
};

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id.toHexString(),
      access: ACCESS
    }, process.env.SECRET).toString();

  this.tokens = this.tokens.concat([{ access: ACCESS, token }]);

  return this.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  return this.update({
    $pull: {
      tokens: { token }
    }
  });
};

UserSchema.statics.findByToken = function (token) {
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET);
  } catch (e) {
    return Promise.reject('incorrect user info');
  }

  return this.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject('incorrect user info');
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject('incorrect user info');
        }
      });
    });
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = { User }
