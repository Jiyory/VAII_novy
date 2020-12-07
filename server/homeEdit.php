<?php
    /*
    Bezpecne sql
    $query = $db->prepare(" SELECT * FROM `profile` WHERE `fullname` = :fullname ");
    $search = (isset($_GET['search']) === true) ? $_GET['search'] : '' ; // ? : shorthand for if else
    $query->bindValue(':fullname', $search);
    */

    if (isset($_POST["header"]) && isset($_POST["text"]) && isset($_POST["u_id"])) {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $database = "vpgum";
        $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if (isset($_POST["icon"])) {
            $sql = $conn->prepare("UPDATE home SET header=:header, text=:text, icon=:icon, u_id=:uid, time=CURRENT_TIMESTAMP WHERE h_id=:id");
            $sql->bindValue(':icon', $_POST["icon"]);
        } else {
            $sql = $conn->prepare("UPDATE home SET header=:header, text=:text, u_id=:uid, time=CURRENT_TIMESTAMP WHERE h_id=:id");
        }
        $sql->bindValue(':header', $_POST["header"]);
        $sql->bindValue(':text', $_POST["text"]);
        $sql->bindValue(':id', $_POST["h_id"]);
        $sql->bindValue(':uid', $_POST["u_id"]);
        $sql->execute();
        if ($sql->rowCount() > 0) {
            if (isset($_POST["img"])) {
                file_put_contents('../client/design/card'.$_POST["h_id"].'.jpg', base64_decode($_POST["img"]));
            }
            echo "true";
            return;
        }
    }
    $conn = null;
    echo "false";
?>