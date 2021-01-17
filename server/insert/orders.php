<?php
    header('Content-Type: application/json');
    try {
        require("../database.php");
        $db = new Database();
        $id = $db->insertOrders($_POST["products"], $_POST["uid"]);
        echo json_encode($id);
        http_response_code(200);
    } catch (Exception $e) {
        http_response_code(204);
        echo json_encode($e);
    }
?>