var express = require('express');
var router = express.Router();
var User = require('../data/models/w3user');


/**
* GET route for login
*/
router.get('/', function (req, res, next) {
  console.log('GET /login');
  if (req.session.userId) {
    req.flash('info', 'You must log out of your current session before you can log in as another user.');
    res.redirect('/');
  }
  res.render('login');
}); // end get('/')



/**
* POST route called by submit action of login form
*/
router.post('/', function (req, res, next) {
  console.log('POST /login');
  // Did user provide both email and password?
  if (req.body.logemail && req.body.logpassword) {
    console.log('User provided both fields')
    // Yes,both email address and password provided
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        console.log('could not authenticate user');
        // could not authenticate user, wrong email or password
        res.render('loginAuthenticationFailure',
          { email: req.body.logemail });
      } else {
        console.log('User successfully authenticated')
        // user successfully authenticated
        req.session.userId = user._id;
        // redirect to user profile page 
        console.log('Redirect to profile page');
        return res.redirect('/profile');
      }
    });
  } else {
    console.log('User left email or password empty')
    // user left email or password empty
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
}); // end post('/')


module.exports = router;
