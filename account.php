<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Account</title>
    
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

    <form class="new-project">
        <input type="text" name="projectname">
        <button class="submit">Skapa</button>
    </form>

    <form class="rename-project">
        <input type="text" name="projectname">
        <button class="submit" projectid="1">Ok</button>
    </form>


    <div class="delete-project" projectid="1"></div>

    <script src="js/index.js"></script>
</body>
</html>