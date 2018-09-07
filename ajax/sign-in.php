<?php
    $input = json_decode(file_get_contents("php://input"), true);   //Receives json input from client
    $settings = parse_ini_file("settings.ini", true);   //Parses db settings from file

    //Creates a connection
    $mysql = $settings["mysql"];
    $connection = new mysqli($mysql["host"], $mysql["username"], $mysql["password"], $mysql["dbname"]);
    
    $email = $input["email"];
    $password = $input["password"];

    $sql = 
        "SELECT
            email,
            accountid,
            `password`
        FROM account
        WHERE email = '$email'";

    //Checks if email/password match, if yes sign in, if no error
    $result = $connection->query($sql);
    if($result->num_rows == 1){
        $row = $result->fetch_assoc();
        if($row["password"] == $password){
            $response = [
                "status" => true,
                "message" => "Inloggning lyckades",
                "account" => [
                    "accountid" => $row["accountid"],
                    "accountemail" => $row["email"]
                ]

            ];
            session_start();
            $_SESSION["signedInAccountID"] = $row["accountid"];
        }else{
            $response = [
                "status" => false,
                "message" => "Felaktigt lösenord"
            ];
        }
    }else{
        $response = [
            "status" => false,
            "message" => "Felakgtig mail"
        ];
    }
    echo json_encode($response);
?>