<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Home</title>
    
    <link rel="stylesheet" href="css/index.css">

    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/ajax.js"></script>

    <script>
        // Lagrar klientdata som behövs när askynkrona anrop till server utförs 
        let client = {
            "accountID" : <?php 
                if(isset($_SESSION["signedInAccountID"])) {
                    echo $_SESSION["signedInAccountID"];
                } else {
                    echo 0;
                }
            ?>

        };
    </script>

</head>
<body>

    

    <div class="form register">
        <input type="text" name="email" autofill="email">
        <input type="password" name="password">
        <input type="password" name="repassword">
        <input type="text" name="forename">
        <input type="text" name="surname">
        <button class="submit">Registrera</button>
    </div>

    <br><br>

    <div class="form sign-in">
        <input type="text" name="email" autofill="email">
        <input type="password" name="password">
        <input type="password" name="repassword">
        <button class="submit">Logga in</button>
    </div>
    
    <script src="js/index.js"></script>
</body>
</html>