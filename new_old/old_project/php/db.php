<?php
class Database {
	
	private $con;
	
	public function __construct()
	{
		$this->con = mysqli_connect("localhost", "root", "", "webpage");
		if (mysqli_connect_errno()) {
			echo "Nemozno pripojit k databaze!";
		}
	}
	
	public function __destruct() {
		if ($this->con)
			mysqli_close($this->con);
    }
	
	public function loadRotateBar() {
		if ($result = mysqli_query($this->con ,"SELECT nadpis, text FROM rotate_bar")) {
			$data = array();
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$data[$i] = array($row["nadpis"], $row["text"]);
				++$i;
			}
			mysqli_free_result($result);
			return $data;
			//return $result;
		} else {
			echo "Nemozno nacitat data: RotateBar!";
		}
		return null;
	}
	
	public function loadTechnology() {
		if ($result = mysqli_query($this->con ,"SELECT id, nadpis, text, datum, meno, priezvisko FROM technology JOIN users USING (uid)")) {
			$data = array();
			$i = 0;
			while ($row = mysqli_fetch_assoc($result)) {
				$data[$i] = array($row["nadpis"], $row["text"], date('d.m.Y \o H:i:s', strtotime($row["datum"]))/*$row["datum"]*/, $row["meno"]." ".$row["priezvisko"], $row["id"]);
				++$i;
			}
			mysqli_free_result($result);
			return $data;
			//return $result;
		} else {
			echo "Nemozno nacitat data: RotateBar!";
		}
		return null;
	}
	
	public function loadTechnologyById($id) {
		if ($result = mysqli_query($this->con ,"SELECT id, nadpis, text FROM technology WHERE id=".$id)) {
			$data = mysqli_fetch_array($result);
			mysqli_free_result($result);
			return $data;
		} else {
			echo "Nemozno nacitat data: RotateBar!";
		}
		return null;
	}
	
	public function updateTechnology($id, $nadpis, $text, $uid) {
		$upd = mysqli_query($this->con, "UPDATE technology SET nadpis=\"".$nadpis."\", text=\"".$text."\", uid=".$uid.", datum=\"".date("Y-m-d H:i:s")."\" WHERE id=".$id);
		if (mysqli_affected_rows($this->con) > 0)
			return true;
		
		return false;
	}
	
	public function insertTechnology($nadpis, $text, $uid) {
		$ins = mysqli_query($this->con, "INSERT INTO technology (nadpis, text, uid, datum) VALUES (\"".$nadpis."\", \"".$text."\", ".$uid.", \"".date("Y-m-d H:i:s")."\")");
		if (mysqli_affected_rows($this->con) > 0)
			return true;
		
		return false;
	}
	
	public function deleteTechnology($id) {
		$ins = mysqli_query($this->con, "DELETE FROM technology WHERE id=".$id);
		if (mysqli_affected_rows($this->con) > 0)
			return true;
		
		return false;
	}
}

?> 