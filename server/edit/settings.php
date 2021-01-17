<?php
    header('Content-Type: application/json');
    try {
        require("../database.php");
        $db = new Database();
        echo json_encode($db->editSettings($_POST["uid"], $_POST["fname"], $_POST["lname"], $_POST["mail"], $_POST["comp"], $_POST["phone"]));
        http_response_code(200);
    } catch (Exception $e) {
        http_response_code(204);
        echo json_encode($e);
    }
?>