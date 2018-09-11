<?php
    $input = json_decode(file_get_contents("php://input"), true);    //Receives json input from client
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
    $settings = parse_ini_file("settings.ini", true);      //Parses db settings from file
    
    //Creates a connection
    $mysql = $settings["mysql"];    
    $connection = new mysqli($mysql["host"], $mysql["username"], $mysql["password"], $mysql["dbname"]);

    $accountid = $input["accountid"];
    $projectid = $input["projectid"];

    $sql = "SELECT foraccountid FROM participation WHERE foraccountid = $accountid AND forprojectid = $projectid";

    $result = $connection->query($sql);
    if($result->num_rows == 1){
        $sql = "INSERT INTO note (creationdate, title, worktime, notetext, irregtext, foraccountid, forprojectid)
        VALUES (
        '".$input["creationdate"]."',
        '".$input["title"]."',
        '".$input["worktime"]."',
        '".$input["notetext"]."',
        '".$input["irregtext"]."',
        ".$input["accountid"].",
        ".$input["projectid"]."
        )";
        if($connection->multi_query($sql) === true){
            $response = [
                "status"=>true,
                "message"=>"anteckning tillagd"
            ];        
        }else{
            $response = [
                "status"=>false,
                "message"=>"du har inte behörighet att komma åt detta projekt"
            ];
        }
    }else{
        $response = [
            "status"=>false,
            "message"=>"inte ditt projekt"
        ];
    }
    echo json_encode($response);
?>