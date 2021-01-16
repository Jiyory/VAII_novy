<?php
    header('Content-Type: application/json');
    try {
        require("../database.php");
        $db = new Database();
        //echo $_POST["user"];
        $id = $db->insertGallery($_POST["header"], $_POST["text"]);
        /*echo $id;*/
        if ($_POST["imageData"] != null && $id != null && $id > 0) {
            file_put_contents('../../client/gallery/gal'.$id.'.jpg', base64_decode($_POST["imageData"]));
        }
        echo json_encode($id);
        http_response_code(200);
    } catch (Exception $e) {
        http_response_code(204);
        echo json_encode($e);
    }
?>