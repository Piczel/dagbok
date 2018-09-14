let master = {
    signIn : [],
    signOut : [],

    on : function(event, fun) {
        switch(event) {
            case "signIn" :
                this.signIn.push(fun);
                break;
            case "signOut" :

                this.signOut.push(fun);
                break;
        }
    },

    triggerSignIn : function() {
        for(let i = 0; i < this.signIn.length; i++) {
            let fun = this.signIn[i];
            if (typeof fun === "function") {
                fun();
            }
        }
    },
    triggerSignOut : function() {
        for(let i = 0; i < this.signOut.length; i++) {
            let fun = this.signOut[i];
            if (typeof fun === "function") {
                fun();
            }
        }
    }
}

async function signIn() {
    let $form = $("#sign-in-form");

    let form = {
        "email" : $form.find("[name=email]").val(),
        "password" : $form.find("[name=password]").val()
    }

    if(form.email.length < 1 || form.password.length < 1) {

        return;
    }
    
    let signInResponse = await ajax("ajax/sign-in.php", form);
        
    if(signInResponse.status) {
        localAccount = signInResponse.account;
        master.triggerSignIn();
        history.replaceState({}, "Title", location.href);
        fetchAndSetAccountPanel();
        $(".hide-dialogue").removeClass("shown");
    }
}



async function fetchAndSetAccountPanel() {
    let accountPanelResponse = await ajaxComponent("ajax/include.php", {"file" : "header-account-panel.php"});
    $accountPanel = $(accountPanelResponse.body).find(".account-panel");
    $("#header .sign-in-panel").replaceWith($accountPanel);
    $("#header .account-panel").on("click", showAccountMenu);
    $("#header .account-panel").on("mouseleave", hideAccountMenu);
}

async function signOut() {
    let signOutResponse = await ajax("ajax/sign-out.php");
    if(signOutResponse.status) {
        localAccount = {accountkey : 0};
        master.triggerSignOut();
        history.replaceState({}, "Title", location.href);
        fetchAndSetSignInPanel();
    }
}
async function fetchAndSetSignInPanel() {
    let signInPanelResponse = await ajaxComponent("ajax/include.php", {"file" : "header-sign-in.php"}); 
    $signInPanel = $(signInPanelResponse.body).find(".sign-in-panel");
    $("#header .account-panel").replaceWith($signInPanel);
}



function showSignInForm() {
    $(".sign-in-align").addClass("shown");
    $(".hide-dialogue").addClass("shown");
    $(".hide-dialogue").on("click", hideSignInForm);
}
function hideSignInForm() {
    $(".sign-in-align").removeClass("shown");
    $(".hide-dialogue").removeClass("shown");
    $(".hide-dialogue").off("click", hideSignInForm);
}

function showAccountMenu() {
    $("#header .account-panel .account-menu").addClass("shown");
}
function hideAccountMenu() {
    $("#header .account-panel .account-menu").removeClass("shown");
}
function toggleAccountMeny() {
    $("#header .account-panel .account-menu").toggleClass("shown");
}


function setMenuResponsive(width) {
    
    $("#header").addClass("responsive");
}
function removeMenuResponsive(width) {

    $("#header").removeClass("responsive");
}



async function showBookmarks() {
    if(localAccount.accountkey == 0) return;


    $(".menu-item.show-bookmarks").off("mousedown");
    $(".menu-item.show-bookmarks").on("mousedown", hideBookmarks);

    $("#header .account-panel .bookmark-svg").css({
        "transform" : "scaleY(-1)"
    });

    let response = await ajax("ajax/get-bookmarks.php", {
        clientaccountkey : localAccount.accountkey
    });

    if(response.status) {

        
        
        for(let i = 0; i < response.bookmarks.length; i++) {

            let bookmark = response.bookmarks[i];
            let title = (bookmark.objectname.length > 25) ? 
                bookmark.objectname.substr(0, 23)+"..." : bookmark.objectname;
            let category = bookmark.categoryname;

            $("<a></a>", {
                "class" : "bookmark",
                "href" : "object.php?k="+bookmark.objectkey
            }).append(
                $("<div></div>", 
                    { 
                        "class" : "bookmark-image",
                        "style" : "background-image: url('"+bookmark.imagepath+"');"
                    }
                ).append(
                    $("<p></p>").append(document.createTextNode(category))
                ),

                $("<h4></h4>", {
                    "class" : "bookmark-text"
                }).append(
                    document.createTextNode(title)
                )

            ).appendTo(".bookmark-container");
        }

        
    }
}
function hideBookmarks() {
    $(".menu-item.show-bookmarks").off("mousedown", hideBookmarks);
    $(".menu-item.show-bookmarks").on("mousedown", showBookmarks);

    $(".bookmark-container").empty();
    $("#header .account-panel .bookmark-svg").css({
        "transform" : "scaleY(1)"
    });
}


let notificationInterval = 0;
let notifications = [];

async function fetchNotifications() {
    if(localAccount.accountkey == 0) return;

    let response = await ajax("ajax/get-notifications.php", {
        clientaccountkey : localAccount.accountkey
    });

    if(response.status) {

        let newNotifications = false;

        // Iterate through the incoming notifications
        incoming: for(let i = 0; i < response.notifications.length; i++) {

            // Has the notification already been received? Then skip adding it to the notification list
            for(let j = 0; j < notifications.length; j++) {
                if(notifications[j].notificationkey == response.notifications[i].notificationkey) {
                    continue incoming;
                }
            }

            notifications.push(response.notifications[i]);
            newNotifications = true;
        }

        if(newNotifications) {

            for(let i = 0; i < notifications.length; i++) {

                switch(notifications[i].notificationtype) {

                    case 1: 
                        // Message in conversation

                        $("#header .account-panel .notification-count-wrapper").addClass("shown");
                        $("#header .account-panel .notification-count").text(notifications.length);

                        break;
                }
            }
        }
    }
}
function startNotificationClock() {
    fetchNotifications();
    notificationInterval = setInterval(fetchNotifications, 20000);
}
function stopNotificationClock() {
    clearInterval(notificationInterval);
}

$(document).ready(function() {

    $textarea = $("textarea");
    $textarea.css({      
        "height" : (this.scrollHeight) + "px"
    });

    $textarea.on("input", function () {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });

    $.datepicker.setDefaults($.datepicker.regional["sv"]);
    
    $(".account-panel .normal-trigger").on("click", function() {
        toggleAccountMeny();
        $(".account-panel").on("mouseleave", function() {
            hideAccountMenu();
            $(".account-panel").off("mouseleave");
        });
    });

    $(".account-panel .responsive-trigger").on("click", toggleAccountMeny);

    $(".menu-item.show-bookmarks").on("mousedown", showBookmarks);
    
    responsive.on("xl", removeMenuResponsive);
    responsive.on("lg", removeMenuResponsive);
    responsive.on("md", setMenuResponsive);
    responsive.on("sm", setMenuResponsive);

    master.on("signIn", startNotificationClock);
    master.on("signOut", stopNotificationClock);
    if(localAccount.accountkey != 0) startNotificationClock();


});
