<?php
    $input = json_decode(file_get_contents("php://input"), true);   //Receives json input from client
    try {
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

        $accountid = $input["accountid"];
        $projectid = $input["projectid"];

        // Checks if account is participating in project
        $sql = "SELECT foraccountid FROM participation WHERE foraccountid = $accountid AND forprojectid = $projectid";
        $result = $connection->query($sql);
        if($result->num_rows != 1){
            throw new Exception("Inte ditt projekt");
        }

        $sql = "SELECT forename, surname, email, accountid FROM account INNER JOIN participation ON forprojectid = $projectid WHERE foraccountid = $accountid";
        $result = $connection->query($sql);
        $participants = [];
        while($row = $result->fetch_assoc()){
            $participants[] = $row;
        }
        $response = [
            "status"=>true,
            "message"=>"Medlemmar hämtade",
            "participants"=>$participants
        ];
    }catch(Exception $exc){
        $response = [
            "status"=>false,
            "message"=>$exc->getMessage()
        ];
    }
    echo json_encode($response);   
?>