function ajax(
    to,
    json = undefined
) {
    // Send json and receive json

    // Return a new promise
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                let response = this.responseText;
                console.log(response);
                resolve(JSON.parse(response));
            } else if(this.readyState == 4 && this.status != 200) {
                resolve({
                    "status" : false,
                    "message" : "Error with request"
                });
            }
        };
        xhr.open("POST", to, true);

        if(json == undefined) {
            xhr.send();
        } else {

            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(json));
        }
    });
}