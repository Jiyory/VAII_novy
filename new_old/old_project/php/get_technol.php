<?php
	require "web.php";
	$web = new Web();
	$array = $web->loadTechnologyById($_GET["id"]);
	$array[2] = preg_replace("/<br>/", "", $array[2]);
	echo json_encode($array);
	/*echo $array[0];
	echo $array[1];
	echo $array[2];*/
?>