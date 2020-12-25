<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "vpgum";

/* TABULKY */
/*$rotate = "CREATE TABLE IF NOT EXISTS rotate (
    rot_id INT AUTO_INCREMENT NOT NULL,
    header varchar(50) NOT NULL,
    text TEXT,
    PRIMARY KEY (rot_id)) 
    CHARACTER SET utf8 COLLATE utf8_general_ci";
$rotateData = [
    "INSERT INTO rotate VALUES(1, 'Nadpis1', 'Popis k obrazku\ncislo 1.')", 
    "INSERT INTO rotate VALUES(2, 'Nadpis2', 'Popis k obrazku\ncislo 2.')"
];*/

$users = "CREATE TABLE IF NOT EXISTS users (
    u_id INT AUTO_INCREMENT NOT NULL,
    email varchar(100) NOT NULL,
    pass varchar(64) NOT NULL,
    salt varchar(32) NOT NULL,
    admin int(1) NOT NULL,
    fname varchar(32) NOT NULL,
    lname varchar(32) NOT NULL,
    comp varchar(100) NOT NULL,
    phone varchar(15),
    CONSTRAINT uniq_mail UNIQUE (email),  
    PRIMARY KEY (u_id)) 
    CHARACTER SET utf8 COLLATE utf8_general_ci";
$usersData = [
    "INSERT INTO users VALUES(1, 'admin@admin.sk', '".hash('sha256', 'admin'.'salt')."', 'salt', 1, 'Gery', 'Ardy', 'Nie je', '')" 
];

$home = "CREATE TABLE IF NOT EXISTS home (
    h_id INT AUTO_INCREMENT NOT NULL,
    header varchar(50) NOT NULL,
    icon TEXT,
    text TEXT,
    u_id INT NOT NULL,
    time DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (h_id),
    FOREIGN KEY (u_id) REFERENCES users(u_id))
    CHARACTER SET utf8 COLLATE utf8_general_ci";
$homeData = [
    "INSERT INTO home VALUES(1, 'Nadpis1', 'fas fa-bell', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, CURRENT_TIMESTAMP)", 
    "INSERT INTO home VALUES(2, 'Nadpis2', 'fas fa-bell', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, CURRENT_TIMESTAMP)",
    "INSERT INTO home VALUES(3, 'Nadpis3', 'fas fa-bell', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, CURRENT_TIMESTAMP)",
    "INSERT INTO home VALUES(4, 'Nadpis4', 'fas fa-bell', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, CURRENT_TIMESTAMP)"
];

//hash('sha256', $_POST['ppasscode']);

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

    // users
    try {
        $pstatement = $conn->prepare($users);
        $pstatement->execute();
        if(!$pstatement->execute()) {
            echo "Nepodarilo sa vytvorit tabulku users.";
            print_r($conn->errorInfo());
        } else echo "Uspecne vytvorena tabulka users.<br>";
        foreach ($usersData as $insert) {
            $pstatement = $conn->prepare($insert);
            $pstatement->execute();
        }
    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
    
    // home
    try {
        $pstatement = $conn->prepare($home);
        $pstatement->execute();
        if(!$pstatement->execute()) {
            echo "Nepodarilo sa vytvorit tabulku home.";
            print_r($conn->errorInfo());
        } else echo "Uspecne vytvorena tabulka home.<br>";
        foreach ($homeData as $insert) {
            $pstatement = $conn->prepare($insert);
            $pstatement->execute();
        }
    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

$conn = null;
?>