<?php
    $input = json_decode(file_get_contents("php://input"), true);    //Receives json input from client
    
    // 1 Is user signed in?
    session_start();
    if(!isset($_SESSION["signedInAccountID"])){
        echo json_encode([
            "status" => false,
            "message" => "Inte inloggad"
        ]);
        return;
    } else if($input["accountid"] != $_SESSION["signedInAccountID"]){
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

    
    // 2 Is user included in the project

    // YES

    // REMOVE
    $sql = 
    "DELETE pr, pa FROM project AS pr
        INNER JOIN participation AS pa
            ON forprojectid = projectid
    WHERE projectid = $projectid";


    // NO

    // RESPOND WITH FALSE



    //$sql = "DELETE FROM project WHERE projectid = $input"
?>