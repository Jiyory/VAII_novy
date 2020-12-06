<?php
    /*
    Bezpecne sql
    $query = $db->prepare(" SELECT * FROM `profile` WHERE `fullname` = :fullname ");
    $search = (isset($_GET['search']) === true) ? $_GET['search'] : '' ; // ? : shorthand for if else
    $query->bindValue(':fullname', $search);
    */
    function getRandomWord($len = 10) {
        $word = array_merge(range('a', 'z'), range('A', 'Z'));
        shuffle($word);
        return substr(implode($word), 0, $len);
    }

    if (isset($_POST["mail"]) && isset($_POST["pass"]) && isset($_POST["fname"]) && isset($_POST["lname"]) && isset($_POST["comp"]) && isset($_POST["phone"])) {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $database = "vpgum";
        $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = $conn->prepare("SELECT email FROM users WHERE email=:mail");
        $sql->bindValue(':mail', $_POST["mail"]);
        $sql->execute();
        echo $_POST["pass"];
        if ($sql->rowCount() == 0) {
            $sql = $conn->prepare("INSERT INTO users (email, pass, salt, admin, fname, lname, comp, phone) VALUES (:mail, :pass, :salt, :admin, :fname, :lname, :comp, :phone)");
            
            $sql->bindValue(':mail', $_POST["mail"]);
            $salt = getRandomWord(32);
            $toHash = $_POST["pass"].$salt;
            $hash = hash('sha256', $toHash);
            $sql->bindValue(':pass', $hash);
            $sql->bindValue(':salt',$salt);
            $sql->bindValue(':admin', 0);
            $sql->bindValue(':fname', $_POST["fname"]);
            $sql->bindValue(':lname', $_POST["lname"]);
            $sql->bindValue(':comp', $_POST["comp"]);
            $sql->bindValue(':phone', $_POST["phone"]);
            $sql->execute();
            if ($sql->rowCount() > 0) {
                echo "true";
                $conn = null;
                return;
            }
        }
    }
    $conn = null;
    echo "false";
?>