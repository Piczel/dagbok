/*

    a_getProject()
    a_pushNote()
    a_deleteNote()
    a_inviteAccount()
    a_removeFromProject()
    a_createProject()
    a_deleteProject()
    a_renameProject()
    a_getAllProjects()

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


// Requests server to create a new project
async function a_createProject(
    resolved = function(){},
    rejected = function(){}
) {
    // If user is not set to signed in, return
    if(client.accountID == 0) {
        return;
    }
    
    let name = $(".form.new-project input[name=projectname]").val();

    // Validates input
    if(name.length < 1) {

        return;
    }

    // Sends and waits for response
    let response = await ajax("ajax/creat-pr.php", {
        "accountid" : client.accountID,
        "projectname" : name
    });

    // Request successful?
    if(response.status) {  
        resolved(response);
    } else {
        rejected(response);
    }

}


// Requests server to remove project
async function a_deleteProject(
    projectID,
    resolved = function(){},
    rejected = function(){}
) {
    // If user is not set to signed in, return
    if(client.accountID == 0) {
        return;
    }
   
    let response = await ajax("ajax/remove-pr.php", {
        "accountid" : client.accountID,
        "projectid" : projectID
    });

    // Request successful?
    if(response.status) {  
        resolved(response);
    } else {
        rejected(response);
    }
}

// Requests server to rename project
async function a_renameProject(
    projectID,
    resolved = function(){},
    rejected = function(){}
) {
    // If user is not set to signed in, return
    if(client.accountID == 0) {
        return;
    }

    let name = $(".form.rename-project input[name=projectname]").val();

    // Validates input
    if(name.length < 1) {

        return;
    }
    
    let response = await ajax("ajax/rename-project.php", {
        "accountid" : client.accountID,
        "projectid" : projectID,
        "projectname" : name
    });

    // Request successful?
    if(response.status) {  
        resolved(response);
    } else {
        rejected(response);
    }
}


// Requests all users projects from server
async function a_getAllProjects(
    resolved = function(){},
    rejected = function(){}
) {
    // If user is not set to signed in, return
    if(client.accountID == 0) {
        return;
    }

    let response = await ajax("ajax/get-all-projects.php", {
        "accountid" : client.accountID
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
$(".note .delete").on("click", function() {
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





// Bind action listeners

$(".form.new-project button.submit").on("click", function() {
    a_createProject(function(response) {

    }, function(response) {

    });
});

// Passes projectID stored in element attribute
$(".delete-project").on("click", function() {
    a_deleteProject($(this).attr("projectid"), function(response) {
        
    }, function(response) {
        
    });
});

// Passes projectID stored in element attribute
$(".form.rename-project button.submit").on("click", function() {
    a_createProject($(this).attr("projectid"), function(response) {

    }, function(response) {

    });
});


// Fetch all projects
$(".tab.show-my-projects").on("click", function() {
    a_getAllProjects(function(response) {

    }, function(response) {

    });
});


$(".note").on("mouseenter", function() {
    effect.fadeIn($(this).find(".top"));
});
$(".note").on("mouseleave", function() {
    effect.fadeOut($(this).find(".top"));
});

$(".note .title").on("click", function() {
    let $expand = $(this).parent().parent().find(".expand");
    if($expand.is(":hidden")) {
        $expand.slideDown({
            "easing" : $.bez([0.19, 0.83, 0.32, 0.96]),
            "duration" : 200
        });
    } else {
        $expand.slideUp({
            "easing" : $.bez([0.19, 0.83, 0.32, 0.96]),
            "duration" : 200
        });
    }
});