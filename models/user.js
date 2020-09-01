const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.pre('save', function (next) {
  let user = this;
  let hash = crypto
    .createHash('sha256')
    .update(user.email.toLowerCase())
    .digest('hex');
  user.email = hash;
  next();
});

UserSchema.static('findEmail', async function (newUser) {
  let hash = crypto
    .createHash('sha256')
    .update(newUser.toLowerCase())
    .digest('hex');
  return mongoose.model('User').findOne({ email: hash }).exec();
});

UserSchema.static('checkPhone', async function (newUser) {
  return mongoose.model('User').findOne({ phone: newUser }).exec();
});

module.exports = mongoose.model('User', UserSchema);
