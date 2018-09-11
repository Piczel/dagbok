/*

    a_getProject()
    a_pushNote()
    a_deleteNote()
    a_inviteAccount()
    a_removeFromProject()

*/


// Requests project data from server
async function a_getProject(
    resolved = function(){},
    rejected = function(){}
) {
    // If user is not set to signed in, return
    if(client.accountID == 0) {
        return;
    }

    let response = await ajax("ajax/rename-project.php", {
        "accountid" : client.accountID,
        "projectid" : client.projectID
    });

    // Request successful?
    if(response.status) {  
        resolved(response);
    } else {
        rejected(response);
    }
}

// Pushes note to server
async function a_pushNote(
    resolved = function(){},
    rejected = function(){}
) {
    // If user is not set to signed in, return
    if(client.accountID == 0) {
        return;
    }

    let date = $(".form.push-note input[name=date]").val();
    let title = $(".form.push-note input[name=title]").val();
    let worktime = $(".form.push-note input[name=work-time]").val();
    let notetext = $(".form.push-note textarea[name=note-text]").val();
    let irregtext = $(".form.push-note textarea[name=irreg-text]").val();


    // Validates input fields
    if(date.length < 1) {

        return;
    } else if(title.length < 1) {
        
        return;
    } else if(worktime.length < 1) {
        
        return;
    } else if(notetext.length < 1) {
        
        return;
    } else if(irregtext.length < 1) {
        
        return;
    }


    let response = await ajax("ajax/rename-project.php", {
        "accountid" : client.accountID,
        "projectid" : client.projectID,

        "creationdate" : date,
        "title" : title,
        "worktime" : worktime,

        "notetext" : notetext,
        "irregtext" : irregtext
    });

    // Request successful?
    if(response.status) {  
        resolved(response);
    } else {
        rejected(response);
    }
}


// Requests server to delete note
async function a_deleteNote(
    noteID,
    resolved = function(){},
    rejected = function(){}
) {
    // If user is not set to signed in, return
    if(client.accountID == 0) {
        return;
    }

    let response = await ajax("ajax/delete-note.php", {
        "accountid" : client.accountID,
        "noteid" : noteID
    });

    // Request successful?
    if(response.status) {  
        resolved(response);
    } else {
        rejected(response);
    }
}


// Requests server to invite account
async function a_inviteAccount(
    resolved = function(){},
    rejected = function(){}
) {
    // If user is not set to signed in, return
    if(client.accountID == 0) {
        return;
    }

    let email = $(".form.invite-account input[name=email]").val();

    // Validates input fields
    if(email.length < 1) {

        return;
    }


    let response = await ajax("ajax/invite-account.php", {
        "accountid" : client.accountID,
        "projectid" : client.projectID,

        "invitedaccountemail" : email
    });

    // Request successful?
    if(response.status) {  
        resolved(response);
    } else {
        rejected(response);
    }
}


// Requests server to remove account from project
async function a_removeFromProject(
    accountID,
    resolved = function(){},
    rejected = function(){}
) {
    // If user is not set to signed in, return
    if(client.accountID == 0) {
        return;
    }

    let response = await ajax("ajax/remove-from-project.php", {
        "accountid" : client.accountID,
        "projectid" : client.projectID,
        "removeaccountid" : accountID
    });

    // Request successful?
    if(response.status) {  
        resolved(response);
    } else {
        rejected(response);
    }
}







$(".form.push-note button.submit").on("click", function() {
    a_pushNote(function(response) {

    }, function(response) {

    });
});

// Passes noteID stored in attribute
$(".delete-note").on("click", function() {
    a_deleteNote($(this).attr("noteid"), function(response) {

    }, function(response) {

    });
});

$(".form.invite-account button.submit").on("click", function() {
    a_inviteAccount(function(response) {

    }, function(response) {
        
    });
});

// Passes accountID stored in attribute
$(".remove-from-project").on("click", function() {
    a_removeFromProject($(this).attr("accountid"), function(response) {

    }, function(response) {

    });
});

$(document).ready(function() {
    a_getProject(function(response) {

    }, function(response) {

    });
});