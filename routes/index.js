var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index', { userid: req.session.userId, messages: req.flash('info') } );
});
 

module.exports = router;
