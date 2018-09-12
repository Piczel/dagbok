<?php
    $input = json_decode(file_get_contents("php://input"), true);    //Receives json input from client
    $settings = parse_ini_file("settings.ini", true);      //Parses db settings from file
    
    //Creates a connection
    $mysql = $settings["mysql"];    
    $connection = new mysqli($mysql["host"], $mysql["username"], $mysql["password"], $mysql["dbname"]);
    
    $sql = "INSERT INTO account (forename, surname, email, `password`) VALUES ('".$input["forename"]."','".$input["surname"]."','".$input["email"]."','".$input["password"]."')";

    //echo $sql."<br>";

    if($connection->multi_query($sql) === true){
    //Query succeeded
        $response = [
            "status"=>true,
            "message"=>"Konto registrerat"
        ];
    }else{
    //Query failed    
        $response = [
            "status"=>false,
            "message"=>"Kunde inte registrera konto"
        ];

    }
    echo json_encode($response);    //Converts php-array to json and prints response 
?>