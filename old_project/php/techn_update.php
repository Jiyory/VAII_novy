<?php
	require "db.php";
	$db = new Database();
	if (isSet($_GET["id"])) {
		$db->deleteTechnology($_GET["id"]);
	} else {
		if ($_POST["id"] > 0) {
			$db->updateTechnology($_POST["id"], $_POST["nadpis"], preg_replace("/\n/", "<br>", $_POST["obsah"]), 1);
		} else {
			$db->insertTechnology($_POST["nadpis"], preg_replace("/\n/", "<br>", $_POST["obsah"]), 1);
		}
		header("location: ../page/techn");
	}
	//if (!$db->updateTechnology($_POST["id"], $_POST["nadpis"], $_POST["obsah"], 1)) {
		//alert("Záznam sa nepodarilo uložiť!");
	//}
	//echo json_encode($array);
	/*echo $array[0];
	echo $array[1];
	echo $array[2];*/
?>