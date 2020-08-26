var express = require('express');
const { request } = require('../app');
var router = express.Router();

router.get('/:filename', function(req, res) {
  res.cookie('referrer', req.get('Referrer'), {expires: new Date(Date.now() + 900000)});
  res.download('./public/file.doc', req.params['filename']);
});

module.exports = router;
