<?php
    header('Content-Type: application/json');
    try {
        require("../database.php");
        $db = new Database();
        echo json_encode($db->editHome($_POST["tid"], $_POST["header"], $_POST["text"], $_POST["icon"], $_POST["image"], $_POST["user"]));
        if ($_POST["imageData"] != null) {
            file_put_contents('../../client/design/texts'.$_POST["tid"].'.jpg', base64_decode($_POST["imageData"]));
        }
        http_response_code(200);
    } catch (Exception $e) {
        http_response_code(204);
        echo json_encode($e);
    }
?>