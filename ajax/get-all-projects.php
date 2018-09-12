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
            
        //Fetches project
        $sql = "SELECT projectid, `name` FROM participation INNER JOIN project ON forprojectid = projectid WHERE foraccountid = $accountid";    
        $result = $connection->query($sql);
        $projects = [];
        while($row = $result->fetch_assoc()){
            $projects[] = $row;
        }

        $response = [
            "status"=>true,
            "message"=>"Projekt hämtat",
            "projects"=>$projects
        ];
    }catch(Exception $exc){
        $response = [
            "status"=>false,
            "message"=>$exc->getMessage()
        ];
    }
    echo json_encode($response);
?>