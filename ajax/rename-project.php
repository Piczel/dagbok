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

        $accountid = $input["accountid"];
        $projectid = $input["projectid"];
        $projectname = $input["projectname"];

        // Checks if account is participating in project
        $sql = "SELECT foraccountid FROM participation WHERE foraccountid = $accountid AND forprojectid = $projectid";
        $result = $connection->query($sql);
        if($result->num_rows != 1){
            throw new Exception("Inte ditt projekt");
        }
        //Updates project name        
        $sql = "UPDATE project SET `name`= '$projectname' WHERE projectid = $projectid";       
        if($connection->multi_query($sql) === true){
            $response = [
                "status"=>true,
                "message"=>"Projektnamn ändrat",
                "project"=>["projectname"=>$projectname]
            ];    
        }else{
            throw new Exception("Kunde inte ändra projektnamn");
        }
    
    }catch(Exception $exc){
        $response = [
            "status"=>false,
            "message"=>$exc->getMessage()
        ];
    }    
    echo json_encode($response);
?>    