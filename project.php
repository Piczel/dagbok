<?php
    session_start();

    // Check page request
    if(!isset($_GET["pid"])) {
        header("location:index.php");
        exit;
    }


    $projectid = $_GET["pid"];
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
            ?>,
            "projectID" : <?php echo $projectid; ?>
        };
    </script>

</head>
<body>

    <div class="form push-note">
        <input type="text" name="date">
        <input type="text" name="title">
        <input type="text" name="work-time">
        <textarea name="note-text"></textarea>
        <textarea name="irreg-text"></textarea>
        <button class="submit">Skicka</button>
    </div>

    <br>
    

    <div class="invite-account">
        <input type="text" name="email">
        <button class="submit">Bjud in</button>
    </div>


    <div class="delete-note" noteid="1"></div>
    <div class="remove-from-project" accountid="1"></div>

    <script src="js/project.js"></script>
</body>
</html>