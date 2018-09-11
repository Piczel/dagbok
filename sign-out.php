<?php

    session_start();
    unset($_SESSION["signedInAccountID"]);

    header("location:index.php");
?>