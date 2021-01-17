<?php
    header('Content-Type: application/json');
    try {
        require("../database.php");
        $db = new Database();
        echo json_encode($db->deleteAccount($_POST["uid"]));
        http_response_code(200);
    } catch (Exception $e) {
        http_response_code(204);
        echo json_encode($e);
    }
?>