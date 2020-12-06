<?php
    /*
    Bezpecne sql
    $query = $db->prepare(" SELECT * FROM `profile` WHERE `fullname` = :fullname ");
    $search = (isset($_GET['search']) === true) ? $_GET['search'] : '' ; // ? : shorthand for if else
    $query->bindValue(':fullname', $search);
    */
    if (isset($_POST["mail"]) && isset($_POST["pass"])) {
        try {
            $servername = "localhost";
            $username = "root";
            $password = "";
            $database = "vpgum";
            $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //$sql = $conn->prepare("SELECT * FROM users");
            $sql = $conn->prepare("SELECT * FROM users WHERE email=:mail");
            $sql->bindValue(':mail', $_POST["mail"]);
            $sql->execute();
            $rows = $sql->fetch(PDO::FETCH_ASSOC);
            //print_r($red);
            //echo json_encode($rows);
            if ($sql->rowCount() > 0) {
                $toHash = $_POST["pass"].$rows["salt"];
                $hash = hash('sha256', $toHash);
                if ($hash == $rows["pass"]) {
                    header('Content-Type: application/json');
                    echo json_encode($rows);
                }
            }
            $conn = null;
        } catch (PDOException $e) {
            
        } 
    }
?>