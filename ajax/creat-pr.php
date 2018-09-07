<?php
    $input = json_decode(file_get_contents("php://input"), true);   //Receives json input from client
    $settings = parse_ini_file("settings.ini", true);   //Parses db settings from file

    //Creates a connection
    $mysql = $settings["mysql"];
    $connection = new mysqli($mysql["host"], $mysql["username"], $mysql["password"], $mysql["dbname"]);
    
    //Inserts data into an array
    $projectid = $input["projectid"];
    $projectname = $input["projectname"];

    $sql = "INSERT INTO project (`name`) VALUES ('$projectname')";

    if($connection->multi_query($sql) === true){
       //Query succeded
        $response = [
            "status" => true,
            "message" => "projekt skapades",
            "project" => [
                "projectid" => $projectid,
                "projectname" => $projectname
            ]
        ];
    }else{
        //Query failed
        $response = [
            "status" => false,
            "message" => "Kunde inte skapa projekt"
        ];
    }
    echo json_encode($response);    //Converts php-array to json and prints response 
?>