<?php
    $input = json_decode(file_get_contents("php://input"), true);   //Receives json input from client
    try {
        session_start();
        if(!isset($_SESSION["signedInAccountID"])){
            throw new Exception("Inte inloggad");
        }
        if($input["accountid"] != $_SESSION["signedInAccountID"]){
            throw new Exception("Inte inloggad");
        }
        
        //Parses db settings from file
        $settings = parse_ini_file("settings.ini", true);   
        //Creates a connection
        $mysql = $settings["mysql"];
        $connection = new mysqli($mysql["host"], $mysql["username"], $mysql["password"], $mysql["dbname"]);
        $connection->set_charset("utf8");

        $accountid = $input["accountid"];
        $projectid = $input["projectid"];
        $email = $input["invitedaccountemail"];
        
        // Retrieves accountid from email
        $sql = "SELECT accountid FROM account WHERE email = '$email'";
        $result = $connection->query($sql);
        if($result->num_rows != 1){
            throw new Exception("Kunde inte hitta konto");
        }
        $invitedid = $result->fetch_assoc()["accountid"];


        // Checks if account is participating in project
        $sql = "SELECT foraccountid FROM participation WHERE foraccountid = $accountid AND forprojectid = $projectid";
        $result = $connection->query($sql);
        if($result->num_rows != 1){
            throw new Exception("Inte ditt projekt");
        }
        
        // Is account already included? (solves inviting yourself)
        $sql = "SELECT 1 FROM participation WHERE foraccountid = $invitedid AND forprojectid = $projectid";
        $result = $connection->query($sql);
        if($result->num_rows != 0){
            throw new Exception("Konto redan tillagt");
        }
       
        $sql = "INSERT INTO participation (forprojectid, foraccountid)
            VALUES (
            ".$input["projectid"].",
            ".$invitedid."
            )";
        if($connection->multi_query($sql) === true){
            $response = [
                "status"=>true,
                "message"=>"Inbjudan skickad"
            ];
        }else{
            throw new Exception("Kunde inte bjuda in konto");
        }


    } catch(Exception $exc) {
        $response = [
            "status"=>false,
            "message"=>$exc->getMessage()
        ];
    }
    echo json_encode($response);
?>