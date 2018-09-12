let notifications = {
    display : displayNotification
};

function displayNotification(text, onHide = function(){}) {

    // Creates element
    let $notification = $("<div></div>", {
        "class" : "notification",
        on : {
            click : function(event) {
                hideNotification($notification);
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

    // Appends fades in
    $notification.animate({
        "opacity" : 1
    }, 300);
    
    // After 4 seconds
    setTimeout(function() {
        hideNotification($notification);
    }, 4000);


    // Call to hide notifications
    function hideNotification($jElement) {
        $jElement.animate({
            "opacity" : 0
        }, 300, function() {
            $jElement.remove();
            onHide();
        });
    }
}
