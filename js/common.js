let notifications = {
    display : displayNotification
};
let dialogue = {
    confirm : displayDialogue
};
let effect = {
    fadeIn : fadeIn,
    fadeOut : fadeOut,
    collapseHeight : collapseHeight
};



function displayNotification(text, done = function(){}) {

    // Creates element
    let $notification = $("<div></div>", {
        "class" : "notification",
        on : {
            click : function(event) {
                effect.fadeOut($notification, function(){
                    $notification.remove();
                    done();
                });
            }
        }
    });

    // Appends text
    $notification.append(
        $("<div></div>", {"class" : "text"}).text(text),
        $("<div></div>", {"class" : "close"}).text("Klicka för att stänga")
    );

    // Appends element to body
    $notification.appendTo("body");

    // Fades in
    effect.fadeIn($notification);
    
    // After 4 seconds
    setTimeout(function() {
        effect.fadeOut($notification, function() {
            $notification.remove();
            done();
        });
    }, 4000);
}


// Displays a confirmation dialogue
function displayDialogue(
    text,
    confirm = function(){},
    reject = function(){}
) {
    let $prev = $(".dialogue-align");
    effect.fadeOut($prev, function() {
        $prev.remove();
    });
    
    let $align = $("<div></div>", {"class" : "dialogue-align"});
    let $dialogue = $("<div></div>", {
        "class" : "dialogue confirm"
    });

    $dialogue.append(
        $("<div></div>", {"class" : "group text"}).text(text),
        $("<div></div>", {"class" : "group center"}).append(
            $("<button></button>", {
                "class" : "confirm",
                on : {
                    click : function() {
                        effect.fadeOut($align, function() {
                            $align.remove();
                        });
                        confirm();
                    }
                }
            }).text("Ja"),
            $("<button></button>", {
                "class" : "reject",
                on : {
                    click : function() {
                        effect.fadeOut($align, function() {
                            $align.remove();
                        });
                        reject();
                    }
                }
            }).text("Avbryt")
        )
    );

    
    $align.append($dialogue).appendTo("body");
    effect.fadeIn($align);
}

// Fade out effect
function fadeOut($jElement, done = function(){}) {
    $jElement.animate({
        "opacity" : 0
    }, {
        "duration" : 300,
        "queue" : false,
        "complete" : function() {
            done();
        },
        "easing" : $.bez([0.19, 0.83, 0.32, 0.96])
    });
}

// Fade in effect
function fadeIn($jElement, done = function(){}) {
    $jElement.animate({
        "opacity" : 1
    }, {
        "duration" : 300,
        "queue" : false,
        "complete" : function() {
            done();
        },
        "easing" : $.bez([0.19, 0.83, 0.32, 0.96])
    });
}

// Collapse effect
function collapseHeight($jElement, done = function(){}) {
    $jElement.slideUp({
        "duration" : 300,
        "queue" : false,
        "complete" : function() {
            done();
        },
        "easing" : $.bez([0.19, 0.83, 0.32, 0.96])
    });
}
