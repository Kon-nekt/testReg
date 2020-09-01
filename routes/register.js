const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/user');

router.get('/', function (req, res) {
  res.render('regform');
});

router.post(
  '/',
  [
    body('email')
      .isEmail()
      .withMessage('Incorrect email')
      .custom((value) => {
        return User.findEmail(value).then((user) => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
      }),
    body('phone')
      .isMobilePhone()
      .withMessage('Use real phone number in format +99999999999')
      .custom((value) => {
        return User.checkPhone(value).then((user) => {
          if (user) {
            return Promise.reject('Phone already in use');
          }
        });
      }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(403).render('regform', {
        errors: errors.array(),
        email: req.body.email,
        phone: req.body.phone,
      });
    } else {
      User.create(req.body);
      res.status(202).render('regform', { success: 'Congratz!' });
    }
  }
);

module.exports = router;
