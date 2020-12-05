<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "vpgum";

/* TABULKY */
$rotate = "CREATE TABLE IF NOT EXISTS rotate (
    rot_id INT AUTO_INCREMENT NOT NULL,
    header varchar(50) NOT NULL,
    text TEXT,
    PRIMARY KEY (rot_id)) 
    CHARACTER SET utf8 COLLATE utf8_general_ci";
$rotateData = [
    "INSERT INTO rotate VALUES(1, 'Nadpis1', 'Popis k obrazku\ncislo 1.')", 
    "INSERT INTO rotate VALUES(2, 'Nadpis2', 'Popis k obrazku\ncislo 2.')"
];
/* VYKONAVANIE */

try {
    $conn = new PDO("mysql:host=$servername", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully.<br>";
    $pstatement = $conn->prepare("CREATE DATABASE IF NOT EXISTS $database");
    if(!$pstatement->execute()) {
        echo "Nepodarilo sa vytvorit databazu.<br>";
        print_r($conn->errorInfo());
        return;
    }
    $conn = null;
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully to created database.<br>";

    // rotacny panel / carousel
    $pstatement = $conn->prepare($rotate);
    $pstatement->execute();
    if(!$pstatement->execute()) {
        echo "Nepodarilo sa vytvorit tabulku rotate.";
        print_r($conn->errorInfo());
    } else echo "Uspecne vytvorena tabulka rotate.<br>";
    foreach ($rotateData as $insert) {
        $pstatement = $conn->prepare($insert);
        $pstatement->execute();
    }
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

$conn = null;
?>