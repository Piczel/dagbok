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
    a_getParticipants()

*/


// Async functions

// Requests project data from server
async function a_getProject(
    projectID,
    resolved = function(){},
    rejected = function(){}
) {
    // If user is not set to signed in, return
    if(client.accountID == 0) {
        rejected({
            "status" : false,
            "message" : "Inte inloggad"
        });
        return;
    }
    // If a project isn't selected, return
    if(client.projectID == 0) {
        rejected({
            "status" : false,
            "message" : "Välj ett projekt, eller skapa ett nytt"
        });
        return;
    }

    let response = await ajax("ajax/get-project.php", {
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
        rejected({
            "status" : false,
            "message" : "Inte inloggad"
        });
        return;
    }
    // If a project isn't selected, return
    if(client.projectID == 0) {
        rejected({
            "status" : false,
            "message" : "Välj ett projekt, eller skapa ett nytt"
        });
        return;
    }

    let date = $(".form.push-note input[name=date]").val();
    let title = $(".form.push-note input[name=title]").val();
    let worktime = $(".form.push-note input[name=work-time]").val();
    let notetext = $(".form.push-note textarea[name=note-text]").val();
    let irregtext = $(".form.push-note textarea[name=irreg-text]").val();


    // Validates input fields
    if(date.length < 1) {
        rejected({
            "status" : false,
            "message" : "Fyll i datum och klockslag"
        });
        return;
    } else if(title.length < 1) {
        rejected({
            "status" : false,
            "message" : "Fyll i titel"
        });
        return;
    } else if(worktime.length < 1) {
        rejected({
            "status" : false,
            "message" : "Fyll i arbetstid"
        });
        return;
    } else if(notetext.length < 1) {
        rejected({
            "status" : false,
            "message" : "Skriv vad du gjort"
        });
        return;
    } else if(irregtext.length < 1) {
        
        //return;
    }


    let response = await ajax("ajax/push-note.php", {
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
        rejected({
            "status" : false,
            "message" : "Inte inloggad"
        });
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
        rejected({
            "status" : false,
            "message" : "Inte inloggad"
        });
        return;
    }
    // If a project isn't selected, return
    if(client.projectID == 0) {
        rejected({
            "status" : false,
            "message" : "Välj ett projekt, eller skapa ett nytt"
        });
        return;
    }

    let email = $(".form.invite-account input[name=email]").val();

    // Validates input fields
    if(email.length < 1) {
        rejected({
            "status" : false,
            "message" : "Fyll i en e-postadress"
        });
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
        rejected({
            "status" : false,
            "message" : "Inte inloggad"
        });
        return;
    }
    // If a project isn't selected, return
    if(client.projectID == 0) {
        rejected({
            "status" : false,
            "message" : "Välj ett projekt, eller skapa ett nytt"
        });
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
        rejected({
            "status" : false,
            "message" : "Inte inloggad"
        });
        return;
    }
    
    let name = $(".form.new-project input[name=projectname]").val();

    // Validates input
    if(name.length < 1) {
        rejected({
            "status" : false,
            "message" : "Ge projektet ett namn"
        });
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
        rejected({
            "status" : false,
            "message" : "Inte inloggad"
        });
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
    resolved = function(){},
    rejected = function(){}
) {
    // If user is not set to signed in, return
    if(client.accountID == 0) {
        rejected({
            "status" : false,
            "message" : "Inte inloggad"
        });
        return;
    }
    // If a project isn't selected, return
    if(client.projectID == 0) {
        rejected({
            "status" : false,
            "message" : "Välj ett projekt, eller skapa ett nytt"
        });
        return;
    }

    let name = $(".form.rename-project input[name=projectname]").val();

    // Validates input
    if(name.length < 1) {
        rejected({
            "status" : false,
            "message" : "Ange ett namn till projektet"
        });
        return;
    }
    
    let response = await ajax("ajax/rename-project.php", {
        "accountid" : client.accountID,
        "projectid" : client.projectID,
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
        rejected({
            "status" : false,
            "message" : "Inte inloggad"
        });
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

// Requests all participants in project
async function a_getParticipants(
    resolved = function(){},
    rejected = function(){}
) {
    // If user is not set to signed in, return
    if(client.accountID == 0) {
        rejected({
            "status" : false,
            "message" : "Inte inloggad"
        });
        return;
    }
    // If a project isn't selected, return
    if(client.projectID == 0) {
        rejected({
            "status" : false,
            "message" : "Välj ett projekt, eller skapa ett nytt"
        });
        return;
    }

    let response = await ajax("ajax/get-participants.php", {
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






// Functions

function setProject(project) {
    
    setTimeline(project.notes);
    $(".project-name input").val(project.projectname);
    $(".select-project .head .title").text(project.projectname.length > 0 ? project.projectname : "- Välj projekt -");

    function setTimeline(notes) {

        let $old = $(".timeline .note-wrapper");
        for(let i = 0; i < $old.length; i++) {
            setTimeout(function() {
                effect.fadeOut($old.eq(i), function() {
                    effect.collapseHeight($old.eq(i), function() {
                        $old.eq(i).remove();
                    });
                });
            }, i*50);
        }
    
        for(let i = 0; i < notes.length; i++) {
            let $note = $(".js-elements .note-wrapper").clone(true);
            let note = notes[i];
    
    
            // Set its data
            $note.find(".top .date").text(note.creationdate);
            $note.find(".top .time").text(note.worktime);
            
            $note.find(".head .title").text(note.title);
            $note.find(".head .delete").attr("noteid", note.noteid);
            $note.find(".creator .initials span").text(note.forename.substring(0, 1)+note.surname.substring(0, 1));
            $note.find(".creator .name").text(note.forename+" "+note.surname);
            
            $note.find(".expand .text:not(.irreg)").text(note.notetext);
            $note.find(".expand .text.irreg").text(note.irregtext.length == 0 ? "Inget att notera": note.irregtext);
    
            // Bind action listeners
            $note.on("mouseenter", function() {
                effect.fadeIn($(this).find(".top"));
            });
            $note.on("mouseleave", function() {
                effect.fadeOut($(this).find(".top"));
            });
    
            let $delete = $note.find(".delete");
    
            // Delete note
            // Passes noteID stored in attribute
            $delete.on("click", function() {
    
                // Display confirmation dialogue
                dialogue.confirm("Vill du verkligen ta bort anteckningen?", function() {
    
                    a_deleteNote($delete.attr("noteid"), function(response) {
                        // On success, remove the element
                        effect.collapseHeight($note, function() {
                            $note.remove();
                        });
                    }, function(response) {
                        notifications.display(response.message);
                    });
                });
    
            });
    
            $note.find(".head .title").on("click", function() {
                let $expand = $note.find(".expand");
                let $title = $note.find(".title");
                if($expand.is(":hidden")) {
                    // Stores the initial width in the element
                    $title.attr("initial-width", $title.outerWidth(true));
                    $title.animate({
                        "width" : "42rem"
                    }, {
                        "easing" : $.bez([0.19, 0.83, 0.32, 0.96]),
                        "duration" : 200,
                    });
                    // Delays the slide down animation with 100ms
                    setTimeout(function() {
                        $expand.slideDown({
                            "easing" : $.bez([0.19, 0.83, 0.32, 0.96]),
                            "duration" : 200,
                            "done" : function() {
                                // Display the trash can
                                $delete.addClass("shown");
                            }
                        });
                    }, 100);
                } else {
                    // Hide the trash can
                    $delete.removeClass("shown");
    
                    $expand.slideUp({
                        "easing" : $.bez([0.19, 0.83, 0.32, 0.96]),
                        "duration" : 200,
                        "done" : function() {
                            // When done with sliding up, restore the with of the element
                            let width = $title.attr("initial-width");
                            $title.animate({
                                "width" : width+"px"
                            }, {
                                "easing" : $.bez([0.19, 0.83, 0.32, 0.96]),
                                "duration" : 200
                            });
                        }
                    });
                    
                }
            });
    
            $note.appendTo(".timeline .viewport");
    
            setTimeout(function() {
                effect.fadeIn($note);
            }, i*50);
        }
    }
}

function expandAllProjects() {
    $(".dropdown.select-project").addClass("expanded");
    $(".dropdown.select-project .expand").slideDown({
        "easing" : $.bez([0.19, 0.83, 0.32, 0.96]),
        "duration" : 200
    });
}
function contractAllProjects() {
    $(".dropdown.select-project").removeClass("expanded");
    $(".dropdown.select-project .expand").slideUp({
        "easing" : $.bez([0.19, 0.83, 0.32, 0.96]),
        "duration" : 200
    });
}
function updateProjectList(projects) {
    if(projects.length < 1) return;

    
    $(".select-project .projects").empty();
    for(let i = 0; i < projects.length; i++) {
        $(".select-project .projects").append(
            createProjectPanel(projects[i].projectid, projects[i].name)
        );
    }
}
function createProjectPanel(projectID, projectName) {
    let $project = $(".js-elements .project").clone(true);
    $project.find(".title").text(projectName);
    $project.find(".delete").on("click", function() {
        // Trigger dialogue
        dialogue.confirm("Vill du verkligen ta bort \""+projectName+"\"?", function() {
            // Delete project
            // Passes projectID stored in element attribute
            a_deleteProject(projectID, function(response) {
                // Unsets current project
                changeProject(0);
                effect.collapseHeight($project, function() {
                    $project.remove();
                });
            }, function(response) {
                notifications.display(response.message);
            });
        });
    });
    $project.on("click", function() {
        changeProject(projectID);
        contractAllProjects();
    });

    return $project;
}


// Initiates the asyncrounous request and sets the client.projectID
function changeProject(projectID) {
    client.projectID = projectID;

    if(client.projectID == 0) {
        setProject({
            "projectname" : "",
            "notes" : []
        });
    } else {
        a_getProject(client.projectID, function(response) {
            setProject(response.project);
        }, function(response) {
            notifications.display(response.message);
        });
    }

}




// Bind action listeners

$(document).ready(function() {
    changeProject(client.projectID);

});

// Push note
$(".form.push-note button.submit").on("click", function() {
    a_pushNote(function(response) {
        $(".form.push-note [name]").val("");
        let $form = $(".push-note-align");
        effect.fadeOut($form, function() {
            $form.removeClass("shown");
        });
    }, function(response) {
        notifications.display(response.message);
    });
});
$(".form.push-note button.close").on("click", function() {
    let $form = $(".push-note-align");
    effect.fadeOut($form, function() {
        $form.removeClass("shown");
    });
});
$(".add-note").on("click", function() {
    let $form = $(".push-note-align");
    $form.addClass("shown");
    effect.fadeIn($form);
});




// Invite account
$(".form.invite-account button.submit").on("click", function() {
    a_inviteAccount(function(response) {

    }, function(response) {
        notifications.display(response.message);
    });
});

// Remove account from project
// Passes accountID stored in attribute
$(".remove-from-project").on("click", function() {
    a_removeFromProject($(this).attr("accountid"), function(response) {

    }, function(response) {
        notifications.display(response.message);
    });
});


// Add new project
$(".form.new-project button.submit").on("click", function() {
    a_createProject(function(response) {
        changeProject(response.project.projectid);
        $(".form.new-project input").val("");
        
        let $panel = createProjectPanel(response.project.projectid, response.project.projectname);
        $panel.css("display", "none");
        $(".select-project .projects").append($panel);
        $panel.slideDown({
            "easing" : $.bez([0.19, 0.83, 0.32, 0.96]),
            "duration" : 200
        });
    }, function(response) {
        notifications.display(response.message);
    });
});





// Rename project
// Passes projectID stored in element attribute
$(".form.rename-project button.submit").on("click", function() {
    a_renameProject(function(response) {
        previousName = $(".form.rename-project input[name=projectname]").val();
        $(".form.rename-project").removeClass("edit");
        $(".form.rename-project input[name=projectname]").prop("disabled", true);
        $(".select-project .title").text($(".form.rename-project input[name=projectname]").val());
    }, function(response) {
        notifications.display(response.message);
        $(".form.rename-project button.reject").trigger("click");
    });
});
let previousName = "";
$(".form.rename-project button.edit").on("click", function() {
    $(".form.rename-project").addClass("edit");
    let $input = $(".form.rename-project input[name=projectname]");
    previousName = $input.val();
    $input.prop("disabled", false);
    $input.textrange("set");
});
$(".form.rename-project button.reject").on("click", function() {
    $(".form.rename-project").removeClass("edit");
    let $input = $(".form.rename-project input[name=projectname]");
    $input.val(previousName);
    $input.prop("disabled", true);
});



// Get all projects
// Fetch all projects
$(".dropdown.select-project .head").on("click", function() {

    let $expand = $(".dropdown.select-project .expand");
    if($expand.is(":hidden")) {
        a_getAllProjects(function(response) {
            updateProjectList(response.projects);
            expandAllProjects();
        }, function(response) {
            notifications.display(response.message);
            expandAllProjects();
        });
    } else {
        contractAllProjects();
    }
});



// Make all textareas autosize
$textarea = $("textarea");
$textarea.css({      
    "height" : (this.scrollHeight) + "px"
});
$textarea.on("input", function () {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight+4) + "px";
});

// Setup datepicker
$.datepicker.setDefaults($.datepicker.regional["sv"]);
$(".form.push-note input[name=date]").datetimepicker();



let participantsShown = false;
$(".participants-icon").on("click", function(){
    if(participantsShown){
        $(".right-panel .participants").removeClass("shown");
        participantsShown = false;        
    } else {
        updateParticipantsList();
        $(".right-panel .participants").addClass("shown");
        participantsShown = true;
    }
});


// Get all participants and create list
function updateParticipantsList(){
    console.log("update");
}


