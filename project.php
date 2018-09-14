<?php
    session_start();

    
    if(isset($_SESSION["signedInAccountID"])) {
        $accountid = $_SESSION["signedInAccountID"];
    } else {
        header("location:index.php");
        exit;
    }

    if(isset($_GET["pid"])) {
        $projectid = $_GET["pid"];
    } else {
        $projectid = 4;
    }

    include "php/database.php";
    $connection = new DBConnection();

    $account = $connection->prepareAndExecute("SELECT forename, surname FROM account WHERE accountid = ?", [$_SESSION["signedInAccountID"]])->fetchAll(PDO::FETCH_ASSOC)[0];

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Project</title>
    
    <link href="https://fonts.googleapis.com/css?family=Unlock" rel="stylesheet">
    <link rel="stylesheet" href="css/project.css">
    <link rel="stylesheet" href="css/common.css">

    <script src="js/jquery-3.3.1.min.js"></script>

    <script src="js/jquery-textrange.js"></script>
    <script src="js/jquery.bez.min.js"></script>

    <!-- SIMPLEBAR -->
    <link rel="stylesheet" href="https://unpkg.com/simplebar@latest/dist/simplebar.css" />
    <script src="https://unpkg.com/simplebar@latest/dist/simplebar.js"></script>


    <script src="js/ajax.js"></script>
    <script src="js/common.js"></script>

    <script>


        // Stores client data necessary for asynchronous request to the server
        let client = {
            "accountID" : <?php echo $accountid; ?>,
            "projectID" : <?php echo $projectid; ?>
        };
    </script>

</head>
<body>
    
    <div class="top-bar">
        <div class="nav">
            <a class="button sign-out" href="sign-out.php">
                <svg class="icon" viewBox="0 0 100 100">
                    <path d="M 0 50 L 35 25 L 35 75 Z"/>
                    <path class="line" d="M 25 25 L 25 10 L 75 10 L 75 90 L 25 90 L 25 75"/>
                    <path class="line" d="M 35 49 L 65 49"/>
                </svg>
            </a>
            <div class="main">Dagboken</div>
        </div>
        <!--
        <div class="tools">
            <div class="tool button new-note">
                <svg class="icon" viewBox="0 0 100 100">
                    <path class="line" d="M 0 49 L 100 49"/>
                    <path class="line" d="M 49 0 L 49 100"/>
                </svg>
            </div>
            <div class="tool button participants">Deltagare</div>
        </div> -->
    </div>

    <div class="add-note">
        <svg class="icon" viewBox="0 0 100 100">
            <path class="line" d="M 0 20 L 40 20 M 20 0 L 20 40"/>
            <path class="line" d="M 10 14 L 10 10 L 14 10 M 26 10 L 80 10 L 80 90 L 10 90 L 10 26"/>
        </svg>
        <svg class="icon glow" viewBox="0 0 100 100">
            <path class="line" d="M 0 20 L 40 20 M 20 0 L 20 40"/>
            <path class="line" d="M 10 14 L 10 10 L 14 10 M 26 10 L 80 10 L 80 90 L 10 90 L 10 26"/>
        </svg>
        <svg class="icon glow" viewBox="0 0 100 100">
            <path class="line" d="M 0 20 L 40 20 M 20 0 L 20 40"/>
            <path class="line" d="M 10 14 L 10 10 L 14 10 M 26 10 L 80 10 L 80 90 L 10 90 L 10 26"/>
        </svg>
    </div>

    <div class="push-note-align">
        <div class="push-note-heading">Ny anteckning</div>
        <div class="form push-note">
            <div class="creator">
                <div class="initials">
                    <span>
                        <?php echo substr($account["forename"], 0, 1).substr($account["surname"], 0, 1); ?>
                    </span>
                </div>
            </div>
            <div class="group">
                <div class="input-label">Titel</div>
                <input type="text" name="title">
            </div>
            <div class="row">
                <div>
                    <div class="input-label">Datum och klockslag</div>
                    <input type="text" name="date">
                </div>
                <div>
                    <div class="input-label">Arbetstid (min)</div>
                    <input type="text" name="work-time">
                </div>
            </div>
            
            <div class="group">
                <div class="input-label">Vad har du gjort?</div>
                <textarea name="note-text"></textarea>
            </div>
            <div class="group">
                <div class="input-label">Övrig notering</div>
                <textarea name="irreg-text"></textarea>
            </div>
            <div class="center">
                <button class="submit">Skicka</button>
                <button class="close">Avbryt</button>
            </div>
        </div>
    </div>
        
    <div class="page-container">
        <div class="timeline" data-simplebar>
            <div class="axis-wrapper">
                <div class="axis">
                    <div class="indicator-align">
                        <div class="indicator"></div>
                    </div>
                </div>
            </div>

            <div class="note-wrapper">
                <div class="note">
                    <div class="top">
                        <div class="date">2018-09-07 14:35</div>
                        <div class="time">60</div>
                        <div class="delete" noteid="3"></div>
                    </div>
                    <div class="head">
                        <h2 class="title">Detta gjorde jag</h2>
                        <div class="creator-align"> 
                            <div class="creator">
                                <div class="initials"><span>SE</span></div>
                                <div class="name">Samuel Eckerrot</div>
                            </div>
                        </div>
                    </div>
                    <div class="expand">
                        <div class="content">
                            <p class="text">Detta är en mycket längre förklaring av vad jag gjorde</p>
                            <p class="text irreg">Inget särskilt att notera</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="note-wrapper">
                <div class="note">
                    <div class="top">
                        <div class="date">2018-09-07 14:35</div>
                        <div class="time">60</div>
                        <div class="delete" noteid="3"></div>
                    </div>
                    <div class="head">
                        <h2 class="title">Detta gjorde jag</h2>
                        <div class="creator-align"> 
                            <div class="creator">
                                <div class="initials"><span>SE</span></div>
                                <div class="name">Samuel Eckerrot</div>
                            </div>
                        </div>
                    </div>
                    <div class="expand">
                        <div class="content">
                            <p class="text">Detta är en mycket längre förklaring av vad jag gjorde</p>
                            <p class="text irreg">Inget särskilt att notera</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="note-wrapper">
                <div class="note">
                    <div class="top">
                        <div class="date">2018-09-07 14:35</div>
                        <div class="time">60</div>
                        <div class="delete" noteid="3"></div>
                    </div>
                    <div class="head">
                        <h2 class="title">Detta gjorde jag</h2>
                        <div class="creator-align"> 
                            <div class="creator">
                                <div class="initials"><span>SE</span></div>
                                <div class="name">Samuel Eckerrot</div>
                            </div>
                        </div>
                    </div>
                    <div class="expand">
                        <div class="content">
                            <p class="text">Detta är en mycket längre förklaring av vad jag gjorde</p>
                            <p class="text irreg">Inget särskilt att notera</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="note-wrapper">
                <div class="note">
                    <div class="top">
                        <div class="date">2018-09-07 14:35</div>
                        <div class="time">60</div>
                        <div class="delete" noteid="3"></div>
                    </div>
                    <div class="head">
                        <h2 class="title">Detta gjorde jag</h2>
                        <div class="creator-align"> 
                            <div class="creator">
                                <div class="initials"><span>SE</span></div>
                                <div class="name">Samuel Eckerrot</div>
                            </div>
                        </div>
                    </div>
                    <div class="expand">
                        <div class="content">
                            <p class="text">Detta är en mycket längre förklaring av vad jag gjorde</p>
                            <p class="text irreg">Inget särskilt att notera</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="note-wrapper">
                <div class="note">
                    <div class="top">
                        <div class="date">2018-09-07 14:35</div>
                        <div class="time">60</div>
                        <div class="delete" noteid="3"></div>
                    </div>
                    <div class="head">
                        <h2 class="title">Detta gjorde jag</h2>
                        <div class="creator-align"> 
                            <div class="creator">
                                <div class="initials"><span>SE</span></div>
                                <div class="name">Samuel Eckerrot</div>
                            </div>
                        </div>
                    </div>
                    <div class="expand">
                        <div class="content">
                            <p class="text">Detta är en mycket längre förklaring av vad jag gjorde</p>
                            <p class="text irreg">Inget särskilt att notera</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="note-wrapper">
                <div class="note">
                    <div class="top">
                        <div class="date">2018-09-07 14:35</div>
                        <div class="time">60</div>
                        <div class="delete" noteid="3"></div>
                    </div>
                    <div class="head">
                        <h2 class="title">Detta gjorde jag</h2>
                        <div class="creator-align"> 
                            <div class="creator">
                                <div class="initials"><span>SE</span></div>
                                <div class="name">Samuel Eckerrot</div>
                            </div>
                        </div>
                    </div>
                    <div class="expand">
                        <div class="content">
                            <p class="text">Detta är en mycket längre förklaring av vad jag gjorde</p>
                            <p class="text irreg">Inget särskilt att notera</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="note-wrapper">
                <div class="note">
                    <div class="top">
                        <div class="date">2018-09-07 14:35</div>
                        <div class="time">60</div>
                        <div class="delete" noteid="3"></div>
                    </div>
                    <div class="head">
                        <h2 class="title">Detta gjorde jag</h2>
                        <div class="creator-align"> 
                            <div class="creator">
                                <div class="initials"><span>SE</span></div>
                                <div class="name">Samuel Eckerrot</div>
                            </div>
                        </div>
                    </div>
                    <div class="expand">
                        <div class="content">
                            <p class="text">Detta är en mycket längre förklaring av vad jag gjorde</p>
                            <p class="text irreg">Inget särskilt att notera</p>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
        <div class="right-panel">
            <div class="participants" data-simplebar>
                <div class="member">
                    <div class="member-icon">ON</div>
                    <p>HELLO WORLD</p>
                </div>
                <div class="member">
                    <div class="member-icon">ON</div>
                    <p>HELLO WORLD</p>
                </div>
                <div class="member">
                    <div class="member-icon">ON</div>
                    <p>HELLO WORLD</p>
                </div>   

                               
            </div>
        </div>
    </div>

    <div class="participants-icon"><span>M<!--Members--></span></div>
    <div class="projects-icon"></span>P<!--Projects--></span></div>
    <div class="js-elements">
        
    </div>

<!--
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

    <div class="form new-project">
        <input type="text" name="projectname">
        <button class="submit">Skapa</button>
    </div>

    <div class="form rename-project">
        <input type="text" name="projectname">
        <button class="submit" projectid="1">Ok</button>
    </div>
    


    <div class="get-project" projectid="1"></div>
    <div class="delete-project" projectid="1"></div>
    -->
    
    <script src="js/project.js"></script>
</body>
</html>