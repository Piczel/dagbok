<?php
    $connection = new mysqli("192.168.216.201", "T4", "qwer1234", "dagbok");
    $result = $connection->query("select forename, surname from account"); //where accountid = 1

   // if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            echo "Namn: ".$row["forename"]." ".$row["surname"]."<br>";
        }
   // }

?>