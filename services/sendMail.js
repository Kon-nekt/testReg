const User = require('../models/user');
const nodemailer = require('nodemailer');

module.exports = async function sendMail(email) {
  let client = await User.findEmail(email);
  console.log(client);
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: 'nomadeiler@gmail.com',
      pass: '235698Qq',
    },
  });
  let info = await transporter.sendMail({
    from: 'service',
    to: email,
    subject: 'Phone',
    text: client.phone,
  });
};
