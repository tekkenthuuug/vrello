const mongoose = require('mongoose');
const argon2 = require('argon2');
const uniqueValidator = require('mongoose-unique-validator');
const normalizeTransform = require('../utils/normalizeTransform');
const slugify = require('../utils/slugify');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Required'],
      match: [/^[a-zA-Z0-9 ]+$/, 'Field is not valid'],
      index: true,
    },
    shortUsername: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Required'],
      match: [/\S+@\S+\.\S+/, 'Field is not valid'],
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
  const { username } = this;
  const usernameSplit = username.split(' ');

  this.shortUsername =
    usernameSplit.length >= 2
      ? usernameSplit[0][0] + usernameSplit[1][0]
      : username.slice(0, 2);

  this.shortUsername = this.shortUsername.toUpperCase();
};

UserSchema.methods.generateSlug = function () {
  this.slug = slugify(this.username);
};

UserSchema.methods.setPassword = async function (password) {
  this.password = await argon2.hash(password);
};

UserSchema.methods.isPasswordValid = async function (password) {
  return await argon2.verify(this.password, password);
};

UserSchema.pre('validate', { document: true }, function (next) {
  this.generateShortUsername();
  this.generateSlug();

  next();
});

module.exports = mongoose.model('User', UserSchema);
