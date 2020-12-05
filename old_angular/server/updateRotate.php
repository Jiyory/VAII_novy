<?php
    if (isset($_POST["id"]) && isset($_POST["text"]) && isset($_POST["header"])) {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $database = "vpgum";
        $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = $conn->prepare("UPDATE rotate SET header=:header, text=:text  WHERE rot_id=:id");
        //$search = (isset($_GET['search']) === true) ? $_GET['search'] : '' ; // ? : shorthand for if else
        $query->bindValue(':header', $_POST["header"], PDO::PARAM_STR);
        $query->bindValue(':text', $_POST["text"], PDO::PARAM_STR);
        $query->bindValue(':id', $_POST["id"], PDO::PARAM_INT);
        $query->execute();
        if ($query->rowCount() > 0)
            echo "true";
        else
            echo "false";
    } else echo "false - Nenastavene parametre!";
?>