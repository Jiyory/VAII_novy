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

        function editSettings($uid, $fname, $lname, $mail, $comp, $phone) {
            $sql = $this->conn->prepare("UPDATE users SET fname=:fname, lname=:lname, mail=:mail, comp=:comp, phone=:phone WHERE uid=:uid");
            $sql->bindValue(':fname', $fname);
            $sql->bindValue(':lname', $lname);
            $sql->bindValue(':mail', $mail);
            $sql->bindValue(':comp', $comp);
            $sql->bindValue(':phone', $phone);
            $sql->bindValue(':uid', $uid);
            $sql->execute();
            return $sql->rowCount();
        }

        function loadAccounts() {
            $db = "SELECT uid, mail, admin, fname, lname, comp, phone, reg_date FROM users";
            $res = $this->conn->query($db);
            while ($data = $res->fetch(PDO::FETCH_ASSOC)) {
                $rows[] = $data;
            }
            return $rows;
        }

        function deleteAccount($id) {
            $sql = $this->conn->prepare("DELETE FROM users WHERE uid=:uid");
            $sql->bindValue(':uid', $id);
            $sql->execute();
            return $sql->rowCount();
        }

        function editAccount($id, $admin) {
            $sql = $this->conn->prepare("UPDATE users SET admin=:admin WHERE uid=:uid");
            $sql->bindValue(':uid', $id);
            $sql->bindValue(':admin', $admin);
            $sql->execute();
            return $sql->rowCount();
        }

        function loadOrders($id) {
            if ($id > 0) {
                $sql =  $this->conn->prepare("SELECT * FROM order_items JOIN orders USING (oid) JOIN products USING (pid) WHERE uid=:uid ORDER BY oid ASC");
                $sql->bindValue(':uid', $id);
            } else {
                $sql =  $this->conn->prepare("SELECT * FROM order_items JOIN orders USING (oid) JOIN products USING (pid) JOIN users USING(uid) ORDER BY oid ASC");
            }
            $sql->execute();
            while ($data = $sql->fetch(PDO::FETCH_ASSOC)) {
                $rows[] = $data;
            }
            return $rows;
        }

        function deleteOrder($id) {
            $sql = $this->conn->prepare("DELETE FROM order_items WHERE oid=:oid");
            $sql->bindValue(':oid', $id);
            $sql->execute();
            $sql = $this->conn->prepare("DELETE FROM orders WHERE oid=:oid");
            $sql->bindValue(':oid', $id);
            $sql->execute();
            return $sql->rowCount();
        }

        function editOrders($oid, $pid, $amount) {
            $sql = $this->conn->prepare("UPDATE order_items SET amount_done=:amount WHERE oid=:oid AND pid=:pid");
            $sql->bindValue(':oid', $oid);
            $sql->bindValue(':pid', $pid);
            $sql->bindValue(':amount', $amount);
            $sql->execute();
            return $sql->rowCount();
        }

        function editOrdersDone($oid) {
            $sql = $this->conn->prepare("UPDATE orders SET done_date=CURRENT_TIMESTAMP WHERE oid=:oid");
            $sql->bindValue(':oid', $oid);
            $sql->execute();
            return $sql->rowCount();
        }

        function insertOrders($products, $uid) {
            $sql = $this->conn->prepare("INSERT INTO orders VALUES(NULL, :uid, NULL, CURRENT_TIMESTAMP, NULL)");
            $sql->bindValue(':uid', $uid);
            $sql->execute();
            $oid =  $this->conn->lastInsertId();
            foreach ($products as $prod) {
                if ($prod["pid"] > 0) {
                    $sql = $this->conn->prepare("INSERT INTO order_items VALUES(:oid, :pid, :amount, 0)");
                    $sql->bindValue(':oid', $oid);
                    $sql->bindValue(':pid', $prod["pid"]);
                    $sql->bindValue(':amount', $prod["amount_o"]);
                    $sql->execute();
                }
            }
            return $sql->rowCount();
        }
    }
?>