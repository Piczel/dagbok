/*
    
    a_register()
    a_signIn()

*/

// Requests server to register an account
async function a_register() {
    
    let email = $("form.register input[name=email]").val();
    let password = $("form.register input[name=password]").val();
    let repassword = $("form.register input[name=repassword]").val();
    let forename = $("form.register input[name=forename]").val();
    let surname = $("form.register input[name=surname]").val();


    // Validates input fields
    if(password != repassword) {
        return;
    } else if(email.length < 0) {

        return;
    } else if(password.length < 0) {
        
        return;
    } else if(forename.length < 0) {
        
        return;
    } else if(surname.length < 0) {
        
        return;
    }

    // Sends and waits for response
    let response = await ajax("ajax/register.php", {
        "email" : email,
        "password" : password,
        "forename" : forename,
        "surname" : surname
    });

    // Register successful?
    if(response.status) {

    } else {

    }
}



// Attempts to sign in account
async function a_signIn() {
    
    let email = $("form.sign-in input[name=email]").val();
    let password = $("form.sign-in input[name=password]").val();

    // Validates input fields
    if(email.length < 0) {

        return;
    } else if(password.length < 0) {
        
        return;
    }

    // Sends and waits for response
    let response = await ajax("ajax/sign-in.php", {
        "email" : email,
        "password" : password
    });

    // Sign in successful?
    if(response.status) {
        client.accountID = response.account.accountid

        
    } else {

    }
}