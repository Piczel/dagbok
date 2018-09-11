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
    $noteid = $input["noteid"];

    // Is user included in the project
    $sql = 
    "SELECT 1
    FROM note AS n
        INNER JOIN participation AS p
            ON n.forprojectid = p.forprojectid
    WHERE n.noteid = $noteid AND p.foraccountid = $accountid";

    // YES
    $result = $connection->query($sql);
    if($result->num_rows == 1){     
        $sql = "DELETE FROM note WHERE noteid = $noteid";

        if($connection->multi_query($sql) === true){
            $response = [
                "status"=>true,
                "message"=>"anteckning borttagen"
            ];
        }else{
            $response = [
                "status"=>true,
                "message"=>"kunde inte ta bort anteckning"
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