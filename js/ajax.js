function ajax(
    to,
    json = undefined
) {
    // Send data (usually json, but formdata also works) and receive json

    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() 
        {
            if(this.readyState == 4 && this.status == 200)
            {
                let response = this.responseText;
                console.log(response);
                resolve(JSON.parse(response));
            } else if(this.readyState == 4 && this.status != 200) {

                reject(new Error("Error occured with request"));
            }
        };    
        xhr.open("POST", to, true);
        //xhr.responseType = "json";

        if(json == undefined) {
            xhr.send();
        } else {

            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(json));
        }
    });
}