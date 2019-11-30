var express = require('express');
var router = express.Router();
//var User = require('../data/models/w3user');


/**
* GET action of user logging out.
*/
router.get('/', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        // redirect to index page
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
