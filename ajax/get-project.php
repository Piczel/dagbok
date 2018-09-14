<?php
    $input = json_decode(file_get_contents("php://input"), true);   //Receives json input from client
    $response = null;
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
        
        // Checks if account is participating in project
        $sql = "SELECT foraccountid FROM participation WHERE foraccountid = $accountid AND forprojectid = $projectid";
        $result = $connection->query($sql);
        if($result->num_rows != 1){
            throw new Exception("Inte ditt projekt");
        }
        //Fetches project
        $sql = "SELECT `name` AS projectname FROM project WHERE projectid = $projectid";
        $result = $connection->query($sql);
        if($result->num_rows != 1){
            throw new Exception("Projektet finns inte");
        }
        
        $project = [
            "projectid"=>$projectid,
            "projectname" => $result->fetch_assoc()["projectname"],
            "notes" => []
        ];
        //Fetches notes
        $sql = "SELECT noteid, creationdate, title, worktime, notetext, irregtext, foraccountid, forename, surname
        FROM note INNER JOIN account ON foraccountid = accountid WHERE forprojectid = $projectid ORDER BY creationdate DESC"; 
        $result = $connection->query($sql);
        while($row = $result->fetch_assoc()){
            $project["notes"][] = $row;
        }
        $response = [
            "status"=>true,
            "message"=>"projekt hämtat",
            "project"=>$project
        ];
        
    }catch(Exception $exc){
        $response = [
            "status"=>false,
            "message"=>$exc->getMessage()
        ];
    }
    echo json_encode($response);
?>