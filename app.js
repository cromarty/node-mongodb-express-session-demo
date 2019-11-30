var express = require('express');
var mongoose = require('mongoose');
// session needs to come before it is named in the MongoStore line
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('static-favicon');
var logger = require('morgan');
var flash = require('connect-flash');

var app =	express();
var router = express.Router();


app.use(favicon());
app.use(logger('dev'));
app.use(flash());

/**
* Set the path to static resources such as stylesheets etc.
*/
app.use(express.static(path.join(__dirname, 'public')));


/**
* Connect to MongoDB
*/
mongoose.connect('mongodb://localhost/webAuthentication', {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;

/**
* Handle mongo error
*/
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});


/**
* Use sessions for tracking logged in users
*/
const ONE_HOUR = 3600000;
app.use(session({
  secret: 'A Saturday afternoon in November was approaching the time of twilight, and the vast tract of unenclosed wild known as Egden Heath embrowned itself moment-by-moment.',
  resave: true,
  saveUninitialized: false,
  maxAge: ONE_HOUR,
  store: new MongoStore({
    mongooseConnection: db
  })
}));


/**
* Set up bodyParser
*/
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

/**
* Path to views and jade stuff
*/
app.use(express.static(__dirname + '/views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
* Set up routes
*/
var index_ = require('./routes/index');
var login_ = require('./routes/login');
var register_ = require('./routes/register');
var logout_ = require('./routes/logout');
var profile_ = require('./routes/profile');

app.use('/', index_);
app.use('/login', login_);
app.use('/register', register_);
app.use('/logout', logout_);
app.use('/profile', profile_);


/**
* Catch 404 and forward to error handler
*/
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
* Error handlers
*/

/**
* Development error handler
* Will print stacktrace
*/
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/**
* Production error handler
* No stacktraces leaked to user
*/
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


/**
* Pretty-print HTML output in development mode
*/
if (app.get('env') === 'development') {
    app.locals.pretty = true;
}


module.exports = app;
