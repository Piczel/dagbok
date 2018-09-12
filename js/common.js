let notifications = {
    display : displayNotification
};
let effect = {
    fadeIn : fadeIn,
    fadeOut : fadeOut
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
