var express = require('express');
const { request } = require('../app');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index')
});

module.exports = router;
