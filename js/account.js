/*
    a_createProject()
    a_deleteProject()
    a_renameProject()
    a_getAllProjects()
*/



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


// When document loads, fetch all projects
$(document).ready(function() {
    a_getAllProjects(function(response) {

    }, function(response) {

    });
});