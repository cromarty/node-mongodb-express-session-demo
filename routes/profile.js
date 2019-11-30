var express = require('express');
var router = express.Router();
var User = require('../data/models/w3user');


/**
* GET route, after registration redirect to profile page
*
* User registration completion redirects here.
*/
router.get('/', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          res.render('profile', { username: user.username, email: user.email});
        }
      }
    });
}); // end get('/')


module.exports = router;
