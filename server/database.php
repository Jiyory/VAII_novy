<?php
    class Database {
        private $conn;
        private $database = "vpgum";

        public function __construct()
        {
            $servername = "localhost";
            $username = "root";
            $password = "";

            /* Vytvori DB ak neexistuje */
            $this->conn = new PDO("mysql:host=$servername", $username, $password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pstatement = $this->conn->prepare("CREATE DATABASE IF NOT EXISTS $this->database");
            if(!$pstatement->execute()) {
                echo "Nepodarilo sa vytvorit databazu.<br>";
                print_r($this->conn->errorInfo());
                return;
            }

            $this->conn = new PDO("mysql:host=$servername;dbname=$this->database", $username, $password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        function __destruct() {
            $this->conn = null;
        }

        function drop() {
            $cmd = "DROP DATABASE IF EXISTS ".$this->database;
            $pstatement = $this->conn->prepare($cmd);
            $pstatement->execute();
        }

        function createTable($db, $data) {
            $pstatement = $this->conn->prepare($db);
            $pstatement->execute();
            if(!$pstatement->execute()) {
                echo "Nepodarilo sa vytvorit tabulku.<br>";
                print_r($this->conn->errorInfo());
            }
            foreach ($data as $insert) {
                $pstatement = $this->conn->prepare($insert);
                $pstatement->execute();
            }
        }

        function loadHome() {
            $db = "SELECT lname, fname, tid, header, text, image, icon, create_date FROM texts JOIN users USING (uid) WHERE page=true";
            $res = $this->conn->query($db);
            while ($data = $res->fetch(PDO::FETCH_ASSOC)) {
                $rows[] = $data;
            }
            return $rows;
        }

        function loadTechnol() {
            $db = "SELECT lname, fname, tid, header, text, image, icon, create_date FROM texts JOIN users USING (uid) WHERE page=false";
            $res = $this->conn->query($db);
            while ($data = $res->fetch(PDO::FETCH_ASSOC)) {
                $rows[] = $data;
            }
            return $rows;
        }

        function loadGallery() {
            $db = "SELECT * FROM gallery";
            $res = $this->conn->query($db);
            while ($data = $res->fetch(PDO::FETCH_ASSOC)) {
                $rows[] = $data;
            }
            return $rows;
        }

        function loadProducts() {
            $db = "SELECT * FROM products";
            $res = $this->conn->query($db);
            while ($data = $res->fetch(PDO::FETCH_ASSOC)) {
                $rows[] = $data;
            }
            return $rows;
        }

        function login($mail, $pass) {
            $sql = $this->conn->prepare("SELECT * FROM users WHERE mail=:mail");
            $sql->bindValue(':mail', $mail);
            $sql->execute();
            if ($sql->rowCount() > 0) {
                $data = $sql->fetch(PDO::FETCH_ASSOC);
                $toHash = $pass.$data["salt"];
                $hash = hash('sha256', $toHash);
                if ($hash == $data["pass"]) {
                    return $data;
                }
            }
            return null;
        }

        function deleteHome($tid) {
            $sql = $this->conn->prepare("DELETE FROM texts WHERE tid=:tid");
            $sql->bindValue(':tid', $tid);
            $sql->execute();
            return $sql->rowCount();
        }

        function editHome($tid, $header, $text, $icon, $image, $id) {
            $sql = $this->conn->prepare("UPDATE texts SET header=:header, text=:text, icon=:icon, image=:image, uid=:uid, create_date=CURRENT_TIMESTAMP WHERE tid=:tid");
            $sql->bindValue(':tid', $tid);
            $sql->bindValue(':header', $header);
            $sql->bindValue(':text', $text);
            $sql->bindValue(':icon', $icon);
            $sql->bindValue(':image', $image);
            $sql->bindValue(':uid', $id);
            $sql->execute();
            return $sql->rowCount();
        }

        function insertHome($header, $text, $icon, $image, $user, $page) {
            $sql = $this->conn->prepare("INSERT INTO texts VALUES(NULL, :page, :header, :text, :uid, :image, :icon, CURRENT_TIMESTAMP)");
            $sql->bindValue(':page', $page);
            $sql->bindValue(':header', $header);
            $sql->bindValue(':text', $text);
            $sql->bindValue(':icon', $icon);
            $sql->bindValue(':image', $image);
            $sql->bindValue(':uid', $user);
            $sql->execute();
            return $this->conn->lastInsertId();
        }

        function insertGallery($header, $text) {
            $sql = $this->conn->prepare("INSERT INTO gallery VALUES(NULL, :header, :text, CURRENT_TIMESTAMP)");
            $sql->bindValue(':header', $header);
            $sql->bindValue(':text', $text);
            $sql->execute();
            return $this->conn->lastInsertId();
        }

        function deleteGallery($id) {
            $sql = $this->conn->prepare("DELETE FROM gallery WHERE iid=:iid");
            $sql->bindValue(':iid', $id);
            $sql->execute();
            return $sql->rowCount();
        }
    }
?>