<?php
	if (!isset($_GET["page"]))
		header("location: page/home");
	require "php/web.php";
	global $web;
	$web = new Web();
	
	/*$car = array(
		array("1Test", 1),
		array("2Test", 2),
		array("3Test", 3),
		array("4Test", 4)
	);
	$car[4] = array("5Test", 5);
	
	echo $car[4][0];
	echo $car[4][1];*/
	
	//echo hash('sha256', "heslo");
	
	function loadContent($page) {
		if ($page == "home") 
			include "pg/home.php";
		else if ($page == "techn") 
			require "pg/technology.php";
		else if ($page == "products") 
			include "pg/products.php";
		else if ($page == "galery") 
			include "pg/galery.php";
		else
			echo "<h1>Error 404, stranka neexistuje!</h1>";		
	}
?>
<!DOCTYPE html>
<html lang="zxx">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		
		<title>Titulok stránky</title>
		
		<link rel="stylesheet" href="../style/style_menu.css">
		<link rel="stylesheet" href="../style/style_rotate.css">
		<link rel="stylesheet" href="../style/style_content.css">
		<link rel="stylesheet" href="../style/style_bottom.css">
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<script src="../scripts/rotate.js"></script>
		<script src="../scripts/galery.js"></script>
		<script src="../scripts/technol.js"></script>
	</head>
	
	<body>
		<!-- ================= MENU ================== -->
		<div class="menu">
			<div class="comp">
				<img src="../design/logo.png" alt="Logo">
				Názov spoločnosti
			</div>
			<div class="menu_box">
				<a class="button" href="#">&#8801;</a>
				<ul class="menu_left">
					<?php $web->showMenuLeft($_GET["page"]); ?>
					<!--<li><a class="active" href="home">DOMOV</a></li>
					<li><a href="techn">TECHNOLÓGIE</a></li>
					<li><a href="products">PRODUKTY</a></li>
					<li><a href="galery">GALÉRIA</a></li>-->
				</ul>
				<ul class="menu_right">
					<li class="drop">
						<a href="#">
							<img src="../design/icon_person.png" alt="Menu používateľa">
							UCET
						</a>
						<ul>
							<?php $web->showMenuRight(); ?>
							<!--<li> • <a href="register">REGISTRÁCIA</a></li>
							<li> • <a href="login">PRIHLÁSENIE</a></li>-->
						</ul>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- ================= ROTACNY PANEL ================== -->
		<div class="rot_box">
			<?php $web->loadRotate(); ?>
			<!--<div class="rot_info">
				<img src="../design/rotate1.jpg" alt="rotacia 1">
				<div>
					<h1>Nadpis 1</h1>
					<div>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</div>
				</div>
			</div>
			<div class="rot_info">
				<img src="../design/rotate2.jpg" alt="rotacia 2">
				<div>
					<h1>Nadpis 2</h1>
					<div>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</div>
				</div>
			</div>
			<div class="rot_info">
				<img src="../design/rotate3.jpg" alt="rotacia 3">
				<div>
					<h1>Nadpis 3</h1>
					<div>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</div>
				</div>
			</div>
			<div class="rot_info">
				<img src="../design/rotate4.jpg" alt="rotacia 4">
				<div>
					<h1>Nadpis 4</h1>
					<div>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</div>
				</div>
			</div>-->
			
			<div class="rot_left" onclick="rotateLeft()">&lt;</div>
			<div class="rot_right" onclick="rotateRight()">&gt;</div>
			<div id="rot_buttons">
				<span>&otimes;</span>
				<span>&otimes;</span>
				<span>&otimes;</span>
				<span>&otimes;</span>
			</div>
		</div>
		<script> startRotate(); </script>
		<!-- ================= OBSAH ================== -->
		<div class="cont_panel">
			<?php loadContent($_GET["page"]); ?>
		</div>
		
		<!-- ============== SPODNE MENU =============== -->
		<div class="menu_bottom">
			<a href="#">DOMOV</a>
			<a href="#">TECHNOLOGIE</a>
			<a href="#">PRODUKTY</a>
			<a href="#">GALÉRIA</a>
		</div>
		
		<!-- ============== PATA STRANKY =============== -->
		<div class="bottom">
			&copy; Jozef Marek 2020
		</div>
	</body>
</html>

























