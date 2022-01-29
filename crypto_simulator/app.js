const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');

const app = express();

// Passport Config
require('./config/passport')(passport);

var session_config = {
    secret: 'secret', //a random unique string key used to authenticate a session
    resave: true, //nables the session to be stored back to the session store, even if the session was never modified during the request
    saveUninitialized: true, //his allows any uninitialized session to be sent to the store. When a session is created but not modified, it is referred to as uninitialized.
    cookie: { secure: true } //true is a recommended option. However, it requires an https-enabled website
    //store  parameter when saving session to database
};
session_config.cookie.secure = false;

//Express Sessions
app.use(session(session_config))

// Express JS middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
// Express body parser
app.use(express.urlencoded({ extended: false })); //or true?
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
    res.locals.error = req.flash('error');
    next();
  });

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users')); //Encapsulates register and login
app.use('/dashboard', require('./routes/dashboard'));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


//Set up port
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
