//Favorite Number between 1 and 100
function signUp(first_name, middle_name, last_name, email, password, password2){
    let errors = [];

    //Check required fields
    if(!first_name){
        errors.push('Please enter your first name.')
    }
    if(!last_name){
        errors.push('Please enter your last name.')
    }
    if(!email){
        errors.push('Please enter your email.')
    }
    if(!password){
        errors.push('Please enter a password.')
    }
    if(!password2){
        errors.push('Please confirm your password.')
    }
    if(password != password2){
        errors.push('Passwords do not match.')
    }
    if(password.length < 8){
        errors.push('Password should be at least 8 characters.')
    }
    if(/\d/.test(password) == false)
    {
        errors.push('Password should contain at least one number.')
    }
    if(password == password.toLowerCase())
    {
        errors.push('Password should contain at least one capital letter.')
    }
     
    //Check if registration form should be sent or reloaded
    if(errors.length > 0)
    {
        return errors;
    }
    else
        return 1;
    
}

module.exports = {signUp};