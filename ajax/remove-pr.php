<?php
    $input = json_decode(file_get_contents("php://input"), true);    //Receives json input from client
    
    //  Is user signed in?
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

    $accountid = $input["accountid"];
    $projectid = $input["projectid"];
    
    // Is user included in the project
    $sql = "SELECT foraccountid FROM participation WHERE foraccountid = $accountid AND forprojectid = $projectid";
    // YES
    $result = $connection->query($sql);
    if($result->num_rows == 1){
    // REMOVE
        $sql = 
        "DELETE pr, pa FROM project AS pr
            INNER JOIN participation AS pa
                ON forprojectid = projectid
        WHERE projectid = $projectid";
    
        if($connection->multi_query($sql) === true){
        //Query succeeded    
            $response = [
                "status"=>true,
                "message"=>"Projekt borttaget"
            ];
        }else{
        //Query failed
            $response = [
                "status"=>false,
                "message"=>"Kunde inte ta bort projekt"
            ];
        }
    }else{
    // NO, unable to remove
        $response = [
            "status"=>false,
            "message"=>"Inte behörig att ta bort projekt"
        ];
    }    
    echo json_encode($response);
?>