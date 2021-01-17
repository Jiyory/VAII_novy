<?php
    header('Content-Type: application/json');
    try {
        require("../database.php");
        $db = new Database();
        echo json_encode($db->editOrdersDone($_POST["oid"]));
        http_response_code(200);
    } catch (Exception $e) {
        http_response_code(200);
        echo json_encode($e);
    }
?>