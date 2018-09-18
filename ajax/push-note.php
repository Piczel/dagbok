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
    $connection->set_charset("utf8");

    $accountid = $input["accountid"];
    $projectid = $input["projectid"];

    $sql = "SELECT foraccountid FROM participation WHERE foraccountid = $accountid AND forprojectid = $projectid";
    $title = (strlen($input["title"])<32)?$input["title"]:substr($input["title"], 0, 29)."...";
    $result = $connection->query($sql);
    if($result->num_rows == 1){
        $sql = "INSERT INTO note (creationdate, title, worktime, notetext, irregtext, foraccountid, forprojectid)
        VALUES (
        '".$input["creationdate"]."',
        '".$title."',
        ".$input["worktime"].",
        '".$input["notetext"]."',
        '".$input["irregtext"]."',
        ".$input["accountid"].",
        ".$input["projectid"]."
        )";
        if($connection->multi_query($sql) === true){
            $response = [
                "status"=>true,
                "message"=>"Anteckning tillagd"
            ];        
        }else{
            $response = [
                "status"=>false,
                "message"=>"Du är inte behörig"
            ];
        }
    }else{
        $response = [
            "status"=>false,
            "message"=>"Inte ditt projekt"
        ];
    }
    echo json_encode($response);
?>