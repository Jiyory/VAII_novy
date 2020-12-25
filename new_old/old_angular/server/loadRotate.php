<?php
    /*
    Bezpecne sql
    $query = $db->prepare(" SELECT * FROM `profile` WHERE `fullname` = :fullname ");
    $search = (isset($_GET['search']) === true) ? $_GET['search'] : '' ; // ? : shorthand for if else
    $query->bindValue(':fullname', $search);
    */
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "vpgum";
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT * FROM rotate";
    $res = $conn->query($sql);
    $rows = array();
    while ($data = $res->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $data;
    }

    header('Content-Type: application/json');
    echo json_encode($rows);
?>