<?php
require "db.php";

class Web {
	
	private $db; // = new Database();
	
	public function __construct()
	{
		$this->db = new Database();
	}
	
	public function showMenuLeft($page) {
		if ($page == "home") 
			echo "<li><a class=\"active\" href=\"home\">DOMOV</a></li>\n";
		else
			echo "<li><a href=\"home\">DOMOV</a></li>\n";
		
		if ($page == "techn") 
			echo "<li><a class=\"active\" href=\"techn\">TECHNOLÓGIE</a></li>\n";
		else
			echo "<li><a href=\"techn\">TECHNOLÓGIE</a></li>\n";
		
		if ($page == "products") 
			echo "<li><a class=\"active\" href=\"products\">PRODUKTY</a></li>\n";
		else
			echo "<li><a href=\"products\">PRODUKTY</a></li>\n";
		
		if ($page == "galery") 
			echo "<li><a class=\"active\" href=\"galery\">GALÉRIA</a></li>\n";
		else
			echo "<li><a href=\"galery\">GALÉRIA</a></li>\n";		
	}
	
	public function showMenuRight() {
		echo "
		<li> • <a href=\"register\">REGISTRÁCIA</a></li>\n
		<li> • <a href=\"login\">PRIHLÁSENIE</a></li>\n
		";
	}
	
	public function loadRotate() {
		$data = $this->db->loadRotateBar();
		if ($data != null) {
			for ($i = 0; $i < count($data); ++$i) {
				echo "
				<div class=\"rot_info\">\n
					<img src=\"../design/rotate".($i + 1).".jpg\" alt=\"".$data[$i][0]."\">\n
					<div>\n
						<h1>".$data[$i][0]."</h1>\n
						<div>\n
							".$data[$i][1]."\n
						</div>\n
					</div>\n
				</div>\n
				";
			}
		}
		else echo "Nepodarilo sa nacitat panel!";
	}
	
	public function loadTechnology() {
		$data = $this->db->loadTechnology();
		if ($data != null) {
			for ($i = 0; $i < count($data); ++$i) {
				echo "
				<div class=\"cont_info\">
					<h1>".$data[$i][0]."</h1>
					<div>
						".$data[$i][1]."
						<span>
							<span onclick=\"setTechnol(".$data[$i][4].")\">Upraviť</span> || 
							<span onclick=\"delTechnol(".$data[$i][4].")\">Zmazať</span>
						</span>
					</div>
					<span>
						Pridal ".$data[$i][3].", ".$data[$i][2].".
					</span>
				</div>
				";
			}
		}
		else echo "Nepodarilo sa nacitat panel!";
	}
	
	public function loadTechnologyById($id) {
		return $this->db->loadTechnologyById($id);
	}
}

?>