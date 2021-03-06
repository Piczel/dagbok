<?php
    $input = json_decode(file_get_contents("php://input"), true);   //Receives json input from client
    session_start();
    if(!isset($_SESSION["signedInAccountID"])){
        echo json_encode([
            "status" => false,
            "message" => "Inte inloggad"
        ]);
        return;
    }
    if($input["accountid"] != $_SESSION["signedInAccountID"]){
        echo json_encode([
            "status" => false,
            "message" => "Inte inloggad"
        ]);
        return;
    }
    $settings = parse_ini_file("settings.ini", true);   //Parses db settings from file

    //Creates a connection
    $mysql = $settings["mysql"];
    $connection = new mysqli($mysql["host"], $mysql["username"], $mysql["password"], $mysql["dbname"]);
    $connection->set_charset("utf8");

    //Inserts data into an array
    $projectname = $input["projectname"];
    $accountid = $input["accountid"];

    $sql = "INSERT INTO project (`name`) VALUES ('$projectname')";

    if($connection->multi_query($sql) === true){

        $projectid = $connection->insert_id;

        $sql = "INSERT INTO participation (foraccountid, forprojectid) VALUES ($accountid, $projectid)";
        if($connection->multi_query($sql) === true){
            //Query succeded
            $response = [
                "status" => true,
                "message" => "Projekt skapat",
                "project" => [
                    "projectid" => $projectid,
                    "projectname" => $projectname
                ]
            ];

        } else {
            //Query failed
            $response = [
                "status" => false,
                "message" => "Kunde inte skapa projekt"
            ];
        }

    }else{
        //Query failed
        $response = [
            "status" => false,
            "message" => "Kunde inte skapa projekt"
        ];
    }
    echo json_encode($response);    //Converts php-array to json and prints response 
?>