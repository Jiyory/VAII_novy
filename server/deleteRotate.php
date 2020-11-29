<?php
    if (isset($_POST["id"])) {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $database = "vpgum";
        $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = $conn->prepare("DELETE FROM rotate WHERE rot_id=:id");
        //$search = (isset($_GET['search']) === true) ? $_GET['search'] : '' ; // ? : shorthand for if else
        $query->bindValue(':id', $_POST["id"], PDO::PARAM_INT);
        $query->execute();
        if ($query->rowCount() > 0)
            echo "true";
        else
            echo "false";
    } else echo "false - Nenastavene parametre!";
?>