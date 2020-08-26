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
  var user = this;
  var hash = crypto.createHash('sha256').update(user.email).digest('hex');
  user.email = hash;
  console.log(user);
  next();
});

UserSchema.static('findEmail', async function (newUser) {
  var hash = crypto.createHash('sha256').update(newUser).digest('hex');
  return mongoose.model('User').findOne({ email: hash }).exec();
});

UserSchema.static('checkPhone', async function (newUser) {
  return mongoose.model('User').findOne({ phone: newUser }).exec();
});

module.exports = mongoose.model('User', UserSchema);
