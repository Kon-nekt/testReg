const express = require('express');
const { body, validationResult } = require('express-validator');
const { request } = require('../app');
const router = express.Router();
const User = require('../models/user');
const Mailer = require('../services/sendMail');

router.get('/', function (req, res) {
  res.render('forgot');
});

router.post(
  '/',
  [
    body('email')
      .isEmail()
      .withMessage('Incorrect email')
      .custom((value) => {
        return User.findEmail(value).then((user) => {
          if (!user) {
            return Promise.reject('That email had not been registered');
          }
        });
      }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(403)
        .render('forgot', { errors: errors.array(), email: req.body.email });
    } else {
      Mailer(req.body.email);
      res.status(200).render('forgot', {
        success: 'You will receive a email on your phone',
      });
    }
  }
);
module.exports = router;
