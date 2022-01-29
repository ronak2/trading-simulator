var registrationLogic = require("./registrationLogic");


describe("Testing registration functionality", ()=>{
    
    
    //Testing a valid case
    test("Teesting valid registration credentials", ()=>{

        //Call function with test data
        var validReturn = registrationLogic.signUp("John",null,"Doe","email@gmail.com","HelloWorld2","HelloWorld2");
    
        //Assert
        expect(validReturn).toBe(1);
    })
    
    //Testing Erraneous Input
    test("Testing invalid registration credentials", ()=>{
    
        //Call function with test data
        var validReturn = registrationLogic.signUp("John",null,"Doe","email@gmail.com","hello","HelloWorld2");
    
        //Assert
        expect(validReturn[0]).toBe('Passwords do not match.');
        expect(validReturn[1]).toBe('Password should be at least 8 characters.');
        expect(validReturn[2]).toBe('Password should contain at least one number.');
        expect(validReturn[3]).toBe('Password should contain at least one capital letter.');
    })

})