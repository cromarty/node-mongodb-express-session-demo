# node-mongodb-express-session-demo

Basic node.js express-session demo using a MongoDB session store

## What is it?

I was trying to learn about how to implement sessions in `node.js`.

After lots of searching online I found a couple of things and adapted them to
make this demo.

I was confused by reading some books which are a few years old, and by the
advances in the versions of `express` up to the version this demo uses.

The most significcant help I found online was an excellent `github` repository
from Daniel Deutsch, which can be found at:

	https://github.com/DDCSLearning/authenticationIntro/

## Changes from Daniel's Code

I have made some significant changes, in order to make the demo best fit my needs. These changes are:

1. I changed Daniel's original single `index.html` file into a modular set of
   `jade` templates.
2. I split the `login` form and the `registration` form from a single page into
   two separate pages.

## Important Note

Daniel's original repository used styling from `w3layouts`. I have retained the original stylesheet, and added my own adaptation of it.

You can find the original in `public/css/w3style.css`, and my version in
`style.css`.

In addition there is another stylesheet called `accessibility.css`. This
stylesheet contains some stuff needed to implement the common `skip to main
content` links that are only audible to screen readers, and not visible to the
naked eye.

And here is an important note. I am totally blind. So please don't give me a
hard time if the `login` and `registration` form pages, or any of the other
pages in this code look like a dog's breakfast.

The primary reason I have retained the original `w3layouts` stylesheet, is I
suspect it provides a greater degree of correct operation on screens of
different sizes, across desktops, phones and tablets than I have the experience
to achieve.

In my version, I have predominantly changed colours to just plain old black on
white.

## Additions to Daniel's Original Code

I have used `connect-flash` to provide error messages in red on the index page
when the user attempts to either login again when they are already logged in, or
to register another user while they are logged in.

The `profile` page is very lame. In reality after a user is logged in, there
should probably be other stuff available on the index page, or the user would be
taken to other pages protected with the middleware in
`routes/middleware/notLoggedIn`.

## Installing Everything and Running

The `node_modules` directory is of course empty. Fill it with:

	npm install
	
	And then run the demo with:
	
	node ./bin/www
	
	The server will be listening on port 3000.
	
	So:
	
	http://localhost/3000
	
	Will get you the index page.
		
## ToDo

I intend to add `I forgot my password` functionality using `nodemailer` at some
point.


## Note About the Modularity of the Code

The `jade` templates are highly modular.

There are two reasons for this:

1. Modularity is good.
2. As I said before, I am blind, so writing `jade` templates where indentation
   consistency is vital is a pain in the backside. I can avoid complex
   indentation with lots of `include` statements.
   
You will notice routes set up in `app.js` end with an underscore. There is no
semantic or syntactical reason for this other than my poor knowledge of reserved
words in JS, or whether it even has a concept of reserved words like other
languages I am more familiar with.
   
In this chunk of code from `app.js`:

```
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
```

There is a subtle thing which confused me for ages when starting with `node.js`
and `express`.

And that is the values in the first argument to route functions in the route
Javascript.

For example, in these two lines of code:

```
var register_ = require('./routes/register');

app.use('/register', register_);
```


It took me ages to understand that a path like this in the `routes` file:

```
router.get('/',...
```

Actually equates to:

```
http://<host>:<port>/register
```

In other words the route in the router file is relative to the path specified in
the line which defined the router variable in `app.js`.

That is probably not a very good explanation. I will see if I can fix it later.


