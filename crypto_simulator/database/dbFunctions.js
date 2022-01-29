var sqlite3 = require('sqlite3').verbose() 
var deasync = require('deasync');
const bcrypt = require('bcrypt');
const util = require('util');
const { param } = require('../routes');

//Instantiating the persistent sqlite3 database
let db = new sqlite3.Database('./Database/userDB.sqlite3', (err) => {
    if (err)
    {
      console.error(err.message)
      throw err
    }
    else
    {   
      console.log('Connected to sqlite3 database.') 
    }
});

//Promisifying citical database operations
db.run = util.promisify(db.run);
db.all = util.promisify(db.all);

//Checking if a user is already registered
async function verifyUser(email){
    return await new Promise((resolve, reject)=>{
      db.get("SELECT * FROM basicuser WHERE email =?", String(email), (err, row) => {
        if(err)
        {
          reject(err)
        }
        resolve(row)
      });
    });
}

//Add a new user to the database
let createUser = async (first_name, middle_name, last_name, email, password, date_joined) =>{
	var insertUser = 'INSERT INTO basicuser (id, fname, mname, lname, email, password, datejoined) VALUES (?,?,?,?,?,?,?)';
	var encrypted_password = bcrypt.hashSync(password, 10);
	var params = [null, first_name, last_name, middle_name, email, encrypted_password, date_joined];
	await creationHelper(insertUser, params);
	return;
}

//Helper function to run a query that inserts a new user into the database
async function creationHelper(insertStatement, params){
	db.run(insertStatement, params, function (err) {
		if (err) 
        {
			return console.log(err.message);
		}
	});
	return console.log("User added to database.");
}

//Function to delete user
async function deleteUser(id){
	var deleteStatement = 'DELETE FROM basicuser WHERE email = ?';
	var params = [id];
	return await new Promise((resolve, reject) => {
		db.run(deleteStatement, params, function (err) {
			if (err) 
			{
				reject(err);
			}
			resolve(console.log("User %s was deleted", params[0]));
		});
	});
}

//Function to update user's email
async function updateEmail(email, new_email){
	var updateEmailStatement = 'UPDATE basicuser SET email = ? WHERE email = ?';
	var params = [new_email, email];
	return await new Promise((resolve, reject) => {
		db.run(updateEmailStatement, params, function (err) {
			console.log("in update email");
			if (err) 
			{
				reject(err);
			}
			resolve(console.log("Email was changed to %s", params[0]));

		});
	});
}




module.exports = {createUser, verifyUser, deleteUser, updateEmail}


