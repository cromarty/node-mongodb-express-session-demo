var express = require('express');
var router = express.Router();
var User = require('../data/models/w3user');
var notLoggedIn = require('./middleware/notLoggedIn');



/**
* GET route for user registration
*/
router.get('/', function (req, res, next) {
  if (req.session.userId) {
    req.flash('info', 'You must log out of your current session before you can register another user.');
    res.redirect('/');
  }
  res.render('register');
}); // end get('/')


/**
* POST route called by submit action of register form
*/
router.post('/', function (req, res, next) {
  console.log('POST /register');
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    // no, passwords don't match
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  // did user provide all fields in register form?
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {
    // yes, all fields OK
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }

    // create new user
    User.create(userData, function (error, user) {
      if (error) {
        console.log('User creation error');
        console.log(error.code);
        console.log('after description');
        return next(error);
      } else {
        // stuff the user _id into the session
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  }
}); // end post('/');


module.exports = router;
