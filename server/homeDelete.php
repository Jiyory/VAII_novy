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

    if (isset($_POST["h_id"])) {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $database = "vpgum";
        $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = $conn->prepare("DELETE FROM home WHERE h_id=:id");
        $sql->bindValue(':id', $_POST["h_id"]);
        $sql->execute();
        if ($sql->rowCount() > 0) {
            echo "true";
            $conn = null;
            return;
        }
    }
    $conn = null;
    echo "false";
?>