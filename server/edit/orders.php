<?php
    header('Content-Type: application/json');
    try {
        require("../database.php");
        $db = new Database();
        echo json_encode($db->editOrders($_POST["oid"], $_POST["pid"], $_POST["amount"]));
        http_response_code(200);
    } catch (Exception $e) {
        http_response_code(200);
        echo json_encode($e);
    }
?>