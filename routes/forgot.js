var express = require("express");
var { body, validationResult } = require("express-validator");
const { request } = require("../app");
var router = express.Router();
var User = require("../models/user")
const Mailer = require('../controllers/sendMail')

router.get("/", function (req, res) {
  res.render("forgot");
});

router.post(
  "/",
  [
    body("email").isEmail().withMessage("Incorrect email").custom(value => {
      return User.findEmail(value).then(user => {
        if (!user) {
          return Promise.reject('That email had not been registered');
        }
      });
    })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("forgot", { errors: errors.array(), email: req.body.email });
    } else {
      Mailer(req.body.email);
      res.render("forgot", {success: 'You will receive a email on your phone'});
    }
  }
);
module.exports = router;
