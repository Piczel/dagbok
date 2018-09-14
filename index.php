<?php
    session_start();


    if(isset($_SESSION["signedInAccountID"])) {
        header("location:account.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Home</title>
    
    <link href="https://fonts.googleapis.com/css?family=Chivo" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Unlock" rel="stylesheet">
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/index.css">

    <link rel="stylesheet" href="https://unpkg.com/simplebar@latest/dist/simplebar.css" />
    <script src="https://unpkg.com/simplebar@latest/dist/simplebar.js"></script>

    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/jquery.bez.min.js"></script>
    
    <script src="js/ajax.js"></script>
    <script src="js/common.js"></script>

</head>
<body >

    <div class="page-wrapper" data-simplebar>
        <div class="page-container">

            <div class="main">Dagboken</div>

            <div class="tabs">
                <div class="tab active" target="sign-in">Logga in</div>
                <div class="tab" target="register">Registrera</div>
            </div>

            <div class="form register tab-content">
                <div class="group">
                    <div class="input-label">E-post</div>
                    <input type="email" name="email" autofill="email">
                </div>
                <div class="group">
                    <div class="input-label">Lösenord</div>
                    <input type="password" name="password">
                    <div class="input-label">Bekräfta lösenord</div>
                    <input type="password" name="repassword">
                </div>
                <div class="group">
                    <div class="input-label">Förnamn</div>
                    <input type="text" name="forename">
                    <div class="input-label">Efternamn</div>
                    <input type="text" name="surname">
                </div>
                <div class="center">
                    <button class="submit">Registrera</button>
                </div>
            </div>
            
            <div class="form sign-in tab-content shown">
                <div class="group">
                    <div class="input-label">E-post</div>
                    <input type="email" name="email" autofill="email">
                    <div class="input-label">Lösenord</div>
                    <input type="password" name="password">
                </div>
                <div class="center">
                    <button class="submit">Logga in</button>
                </div>
            </div>
            
        </div>
    </div>
    <script src="js/index.js"></script>
</body>
</html>