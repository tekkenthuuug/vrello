const mongoose = require('mongoose');
const argon2 = require('argon2');
const uniqueValidator = require('mongoose-unique-validator');
const normalizeTransform = require('../utils/normalizeTransform');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Required'],
      match: [/^[a-zA-Z0-9]+$/, 'Is not valid'],
      index: true,
    },
    shortUsername: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Required'],
      match: [/\S+@\S+\.\S+/, 'Is not valid'],
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Required'],
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        normalizeTransform(doc, ret);

        delete ret.password;
      },
    },
  }
);

UserSchema.plugin(uniqueValidator, { message: 'Is already taken' });

UserSchema.methods.generateShortUsername = function () {
  const splitUsername = this.username.split(' ');

  let result = null;

  if (splitUsername.length > 1) {
    result = splitUsername[0][0] + splitUsername[1][0];
  } else {
    result = splitUsername[0][0];
  }

  this.shortUsername = result.toUpperCase();
};

UserSchema.methods.setPassword = async function (password) {
  this.password = await argon2.hash(password);
};

UserSchema.methods.isPasswordValid = async function (password) {
  return await argon2.verify(this.password, password);
};

module.exports = mongoose.model('User', UserSchema);
