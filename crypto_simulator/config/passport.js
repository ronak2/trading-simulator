const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../database/dbFunctions');

let users = require('../users.json');


module.exports = function(passport) {
console.log("Passport Function triggered");

//Passport pulls the the name variables from the name attribute in login form
passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, async function(username, password, done) {
	console.log(username);
  
  let user = await db.verifyUser(username);

  if (user == undefined)
  {
    done(null,false, { message: 'Email or Password is incorrect.'});
  }
  else{
    try
    {
      if(await bcrypt.compare(password, user.password))
      {
        return done(null, user);
      }
      else
      {
        return done(null,false, { message: 'Email or Password is incorrect.'});
      }

    }
    catch(err)
    {
      done(err);
    }
  }
    
}));

passport.serializeUser(function(user, done) {
	done(null, user); 
});

passport.deserializeUser(function(user, done) {
	done(null, user); //you can access with req.user
});

}