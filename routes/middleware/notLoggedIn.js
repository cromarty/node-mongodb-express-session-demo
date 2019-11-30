
function notLoggedIn(req, res, next) {
  console.log('Entered notLoggedIn');
  console.log('User: ' + req.session.user);
  if (req.session.userId) {
    console.log('unauthorized');
    res.send('Unauthorized', 401);
  } else {
    console.log('Not unautherized');
    next();
  }
}

module.exports = notLoggedIn;
