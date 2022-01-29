const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../database/dbFunctions');
const e = require('express');


// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));


//Handle registration
router.post('/register', async (req,res) => {
    const{ first_name, middle_name, last_name, email, password, password2} = req.body;
    let errors = [];

    //Check required fields
    if(!first_name){
        errors.push({msg: 'Please enter your first name.'})
    }
    if(!last_name){
        errors.push({msg: 'Please enter your last name.'})
    }
    if(!email){
        errors.push({msg: 'Please enter your email.'})
    }
    if(!password){
        errors.push({msg: 'Please enter a password.'})
    }
    if(!password2){
        errors.push({msg: 'Please confirm your password.'})
    }
    if(password != password2){
        errors.push({msg: 'Passwords do not match.'})
    }
    if(password.length < 8){
        errors.push({msg: 'Password should be at least 8 characters.'})
    }
    if(/\d/.test(password) == false)
    {
        errors.push({msg: 'Password should contain at least one number.'})
    }
    if(password == password.toLowerCase())
    {
        errors.push({msg: 'Password should contain at least one capital letter.'})
    }
    let someval = await db.verifyUser(email);
    if(someval != undefined)
    {
        errors.push({msg: 'Email is already registered.'});
    }
     
    //Check if registration form should be sent or reloaded
    if(errors.length > 0)
    {
        res.render('register',{
            errors, first_name, middle_name, last_name, email, password, password2
        });
    }
    else{

        //Get date joined
        var today = new Date();
        var date_joined = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        try
        {
            await db.createUser(first_name, last_name, middle_name, email, password, date_joined);
            res.render('registerLanding',{first_name : first_name});
        }
        catch(error)
        {
            console.log(error);
            errors.push({msg: 'Failed to complete registration.'});
            res.render('register',{
                errors, first_name, middle_name, last_name, email, password, password2
            });
        }

    }

});


//Handle login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

  


module.exports = router;