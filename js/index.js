/*
    
    a_register()
    a_signIn()

*/

// Requests server to register an account
async function a_register(
    resolved = function(){},
    rejected = function(){}
) {
    
    let email = $(".form.register input[name=email]").val();
    let password = $(".form.register input[name=password]").val();
    let repassword = $(".form.register input[name=repassword]").val();
    let forename = $(".form.register input[name=forename]").val();
    let surname = $(".form.register input[name=surname]").val();


    // Validates input fields
    if(password != repassword) {
        rejected({
            "status" : false,
            "message" : "Lösenorden matchar inte"
        });
        return;
    } else if(email.length < 1) {
        rejected({
            "status" : false,
            "message" : "Ange en e-postadress"
        });
        return;
    } else if(password.length < 1) {
        rejected({
            "status" : false,
            "message" : "Ange ett lösenord"
        });
        return;
    } else if(forename.length < 1) {
        rejected({
            "status" : false,
            "message" : "Ange förnamn"
        });
        return;
    } else if(surname.length < 1) {
        rejected({
            "status" : false,
            "message" : "Ange efternamn"
        });
        return;
    }

    // Sends and waits for response
    let response = await ajax("ajax/register.php", {
        "email" : email,
        "password" : password,
        "forename" : forename,
        "surname" : surname
    });

    // Request successful?
    if(response.status) {  
        resolved(response);
    } else {
        rejected(response);
    }
}



// Attempts to sign in account
async function a_signIn(
    resolved = function(){},
    rejected = function(){}
) {
    
    let email = $(".form.sign-in input[name=email]").val();
    let password = $(".form.sign-in input[name=password]").val();

    // Validates input fields
    if(email.length < 1) {
        rejected({
            "status" : false,
            "message" : "Ange din e-postadress"
        });
        return;
    } else if(password.length < 1) {
        rejected({
            "status" : false,
            "message" : "Ange ditt lösenord"
        });
        return;
    }

    // Sends and waits for response
    let response = await ajax("ajax/sign-in.php", {
        "email" : email,
        "password" : password
    });

    // Request successful?
    if(response.status) {  
        resolved(response);
    } else {
        rejected(response);
    }
}







// Bind action listeners

$(".form.register button.submit").on("click", function() {
    a_register(function(response) {
        notifications.display(response.message);
        $(".tab[target=sign-in]").trigger("click");
    }, function(response) {
        notifications.display(response.message);
    });
});

$(".form.sign-in button.submit").on("click", function() {
    a_signIn(function(response) {        
        location.href = "project.php";
    }, function(response) {
        notifications.display(response.message);
    });
});



// Adds functionality of tabs
$(".tabs .tab").on("click", function() {
    $(".tab.active").removeClass("active");
    $(this).addClass("active");

    $(".tab-content").removeClass("shown");
    $("."+$(this).attr("target")).addClass("shown");
});
