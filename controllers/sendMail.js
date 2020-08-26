const User = require("../models/user");
const mongoose = require('mongoose');
const nodemailer = require ('nodemailer');

module.exports = async function sendMail(email) {
    var client = await User.findEmail(email);
    console.log(client);
    let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: 'nomadeiler@gmail.com',
      pass: '235698Qq',
    },
  });
  let info = await transporter.sendMail({
    from: 'service',
    to: email,
    subject: "Phone",
    text: client.phone,
  });

  console.log("Message sent: %s", info.messageId);
}
