<ul>
    <li>
        <a href="admin.php">HOME</a>
    </li>
    <li>
        <a href="admin.php?create">CREATE</a>
    </li>
    <li>
        <a href="admin.php?drop">DROP</a>
    </li>
</ul>

<?php
    require("database.php");

    if (isset($_GET["drop"])) {
        $db = new Database();
        $db->drop();
        echo "DB bola vymazana!";
        return;
    }

    if (isset($_GET["create"])) {
        /* TABLE AND DATA */
        /* BEZ FK */
        /* CHANGES */
        $changes = "CREATE TABLE IF NOT EXISTS changes (
            cid INT AUTO_INCREMENT NOT NULL,
            table_nm TEXT NOT NULL,
            message TEXT NOT NULL,
            change_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (cid)) 
            CHARACTER SET utf8 COLLATE utf8_general_ci";
        $changesData = [
            "INSERT INTO changes VALUES(1, 'changes', 'Tabulka changes vytvorena.', CURRENT_TIMESTAMP)"
        ];

        /* USERS */
        $users = "CREATE TABLE IF NOT EXISTS users (
            uid INT AUTO_INCREMENT NOT NULL,
            mail TEXT NOT NULL,
            pass TEXT NOT NULL,
            salt TEXT NOT NULL,
            admin BOOLEAN NOT NULL,
            fname TEXT NOT NULL,
            lname TEXT NOT NULL,
            comp TEXT NOT NULL,
            phone TEXT,
            reg_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT uniq_mail UNIQUE (mail),  
            PRIMARY KEY (uid)) 
            CHARACTER SET utf8 COLLATE utf8_general_ci";
        $usersData = [
            "INSERT INTO users VALUES(1, 'admin@admin.sk', '".hash('sha256', 'admin'.'salt')."', 'salt', true, 'Gery', 'Ardy', 'Nie je', '', CURRENT_TIMESTAMP)", // admin admin
            "INSERT INTO changes VALUES(2, 'users', 'Tabulka users vytvorena.', CURRENT_TIMESTAMP)"
        ];

        /* PRODUCTS */
        $products = "CREATE TABLE IF NOT EXISTS products (
            pid INT AUTO_INCREMENT NOT NULL,
            name TEXT NOT NULL,
            amount_p INT NOT NULL,
            category TEXT,
            zmes TEXT,
            d_out FLOAT, /* priemer vonkajsi */
            d_in FLOAT, /* priemer vnutorny */
            length FLOAT, /* dlzka */
            sha FLOAT, /* tvrdost */
            imprints INT, /* pocet odtlackov */
            time INT, /* cas v sekundach */
            temperature INT, /* teplota */
            weight INT, /* navážka */
            final_weight INT, /* vaha vyrobku */
            info_p TEXT,
            create_date_p DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (pid)) 
            CHARACTER SET utf8 COLLATE utf8_general_ci";
        $productsData = [
            "INSERT INTO products VALUES(1, 'Test product 1', 0, 'cat1', 'guma', 5.2, 6.8, 7.6, 1, 1, 360, 165, 25, 15, 'Info k produktu', CURRENT_TIMESTAMP)",
            "INSERT INTO products VALUES(2, 'Test product test 2', 5, 'cat2', 'guma', 5.2, 6.8, 7.6, 1, 1, 360, 165, 25, 15, 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', CURRENT_TIMESTAMP)",
            "INSERT INTO products VALUES(3, 'Test test 3', -3, 'cat1', 'guma', 5.2, 6.8, 7.6, 1, 1, 360, 165, 25, 15, NULL, CURRENT_TIMESTAMP)",
            "INSERT INTO products VALUES(4, 'Test product 4 test', 8, 'cat1', 'guma', 5.2, 6.8, 7.6, 1, 1, 360, 165, 25, 15, 'Nic k videniu', CURRENT_TIMESTAMP)",
            "INSERT INTO products VALUES(5, 'Tp5', 1050, '...', 'cat2', 'guma', 5.2, 6.8, 7.6, 1, 1, 360, 165, 25, 15, CURRENT_TIMESTAMP)",
            "INSERT INTO changes VALUES(3, 'products', 'Tabulka products vytvorena.', CURRENT_TIMESTAMP)"
        ];

        /* GALLERY */
        $gallery = "CREATE TABLE IF NOT EXISTS gallery (
            iid INT AUTO_INCREMENT NOT NULL,
            header TEXT,
            text TEXT,
            create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (iid)) 
            CHARACTER SET utf8 COLLATE utf8_general_ci";
        $galleryData = [
            "INSERT INTO gallery VALUES(1, 'Nadpis k obrazku 1', 'Popisok k obrazku 1', CURRENT_TIMESTAMP)",
            "INSERT INTO gallery VALUES(2, 'Nadpis k 2', 'Popisok k obrazku 2', CURRENT_TIMESTAMP)",
            "INSERT INTO gallery VALUES(3, 'Nadpis k obrazku 3', 'Popisok k obrazku 3', CURRENT_TIMESTAMP)",
            "INSERT INTO gallery VALUES(4, NULL, NULL, CURRENT_TIMESTAMP)",
            "INSERT INTO gallery VALUES(5, NULL, 'Popisok k obrazku 5', CURRENT_TIMESTAMP)",
            "INSERT INTO changes VALUES(4, 'gallery', 'Tabulka gallery vytvorena.', CURRENT_TIMESTAMP)"
        ];

        /* S FK */
        /* ORDERS */
        $orders = "CREATE TABLE IF NOT EXISTS orders (
            oid INT AUTO_INCREMENT NOT NULL,
            uid INT NOT NULL,
            emid INT,
            create_date_o DATETIME DEFAULT CURRENT_TIMESTAMP,
            done_date DATETIME,
            PRIMARY KEY (oid),
            FOREIGN KEY (uid) REFERENCES users(uid),
            FOREIGN KEY (emid) REFERENCES users(uid))
            CHARACTER SET utf8 COLLATE utf8_general_ci";
        $ordersData = [
            "INSERT INTO orders VALUES(1, 1, NULL, CURRENT_TIMESTAMP, NULL)",
            "INSERT INTO orders VALUES(2, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
            "INSERT INTO orders VALUES(3, 1, NULL, CURRENT_TIMESTAMP, NULL)",
            "INSERT INTO orders VALUES(4, 1, 1, CURRENT_TIMESTAMP, NULL)",
            "INSERT INTO orders VALUES(5, 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
            "INSERT INTO changes VALUES(5, 'orders', 'Tabulka orders vytvorena.', CURRENT_TIMESTAMP)"
        ];
        /* ORDER ITEMS */
        $orderItems = "CREATE TABLE IF NOT EXISTS order_items (
            oid INT NOT NULL,
            pid INT NOT NULL,
            amount_o INT,
            PRIMARY KEY (oid, pid),
            FOREIGN KEY (oid) REFERENCES orders(oid),
            FOREIGN KEY (pid) REFERENCES products(pid))
            CHARACTER SET utf8 COLLATE utf8_general_ci";
        $orderItemsData = [
            "INSERT INTO order_items VALUES(1, 1, 10)", /* NESMIE SA OPAKOVAT PRVE A DRUHE CISLO */
            "INSERT INTO order_items VALUES(1, 2, 10)",
            "INSERT INTO order_items VALUES(1, 3, 10)",
            "INSERT INTO order_items VALUES(2, 4, 10)",
            "INSERT INTO order_items VALUES(2, 5, 10)",
            "INSERT INTO order_items VALUES(3, 1, 10)",
            "INSERT INTO order_items VALUES(3, 2, 10)",
            "INSERT INTO order_items VALUES(3, 3, 10)",
            "INSERT INTO order_items VALUES(3, 4, 10)",
            "INSERT INTO order_items VALUES(5, 5, 10)",
            "INSERT INTO order_items VALUES(5, 1, 10)",
            "INSERT INTO order_items VALUES(5, 2, 10)",
            "INSERT INTO order_items VALUES(5, 3, 10)",
            "INSERT INTO order_items VALUES(5, 4, 10)",
            "INSERT INTO order_items VALUES(1, 5, 10)",
            "INSERT INTO changes VALUES(6, 'order_items', 'Tabulka order_items vytvorena.', CURRENT_TIMESTAMP)"
        ];
        /* TEXTS */
        $texts = "CREATE TABLE IF NOT EXISTS texts (
            tid INT AUTO_INCREMENT NOT NULL,
            page BOOLEAN NOT NULL,
            header TEXT NOT NULL,
            text TEXT NOT NULL,
            uid INT NOT NULL,
            image BOOLEAN NOT NULL,
            icon TEXT,
            create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (tid),
            FOREIGN KEY (uid) REFERENCES users(uid))
            CHARACTER SET utf8 COLLATE utf8_general_ci";
        $textsData = [
            "INSERT INTO texts VALUES(1, true, 'Nadpis1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, true, 'fas fa-bell', CURRENT_TIMESTAMP)", 
            "INSERT INTO texts VALUES(2, true, 'Nadpis2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, true, 'fas fa-bell', CURRENT_TIMESTAMP)",
            "INSERT INTO texts VALUES(3, true, 'Nadpis3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, true, 'fas fa-bell', CURRENT_TIMESTAMP)",
            "INSERT INTO texts VALUES(4, true, 'Nadpis4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, true, 'fas fa-bell', CURRENT_TIMESTAMP)",
            "INSERT INTO texts VALUES(5, false, 'Nadpis1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, true, 'fas fa-bell', CURRENT_TIMESTAMP)", 
            "INSERT INTO texts VALUES(6, false, 'Nadpis2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, true, 'fas fa-bell', CURRENT_TIMESTAMP)",
            "INSERT INTO texts VALUES(7, false, 'Nadpis3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, false, 'fas fa-bell', CURRENT_TIMESTAMP)",
            "INSERT INTO texts VALUES(8, false, 'Nadpis4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, true, 'fas fa-bell', CURRENT_TIMESTAMP)",
            "INSERT INTO changes VALUES(7, 'texts', 'Tabulka texts vytvorena.', CURRENT_TIMESTAMP)"
        ];
        /* TOPICS */
        $topics = "CREATE TABLE IF NOT EXISTS topics (
            tid INT AUTO_INCREMENT NOT NULL,
            uid INT NOT NULL,
            header TEXT NOT NULL,
            create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (tid),
            FOREIGN KEY (uid) REFERENCES users(uid))
            CHARACTER SET utf8 COLLATE utf8_general_ci";
        $topicsData = [
            "INSERT INTO topics VALUES(1, 1, 'Nadpis topicu cislo 1', CURRENT_TIMESTAMP)",
            "INSERT INTO topics VALUES(2, 1, 'Ako vyhladavat na internete - strucny popis zo zivota informatika', CURRENT_TIMESTAMP)",
            "INSERT INTO changes VALUES(8, 'topics', 'Tabulka topics vytvorena.', CURRENT_TIMESTAMP)"
        ];
        /* MESSAGES */
        $messages = "CREATE TABLE IF NOT EXISTS messages (
            mid INT AUTO_INCREMENT NOT NULL,
            tid INT NOT NULL,
            uid INT NOT NULL,
            message TEXT NOT NULL,
            create_date_m DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (mid),
            FOREIGN KEY (uid) REFERENCES users(uid),
            FOREIGN KEY (tid) REFERENCES topics(tid))
            CHARACTER SET utf8 COLLATE utf8_general_ci";
        $messagesData = [
            "INSERT INTO messages VALUES(1, 1, 1, 'Text k topicu cislo 1', CURRENT_TIMESTAMP)",
            "INSERT INTO messages VALUES(2, 1, 1, 'Druhy prispevok k topicu 1', CURRENT_TIMESTAMP)",
            "INSERT INTO messages VALUES(3, 2, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', CURRENT_TIMESTAMP)",
            "INSERT INTO messages VALUES(4, 2, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', CURRENT_TIMESTAMP)",
            "INSERT INTO messages VALUES(5, 2, 1, 'Uz mi nenapada co dat do tychto vytvorenych textov, proste nemam kreativitu.', CURRENT_TIMESTAMP)",
            "INSERT INTO messages VALUES(6, 2, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', CURRENT_TIMESTAMP)",
            "INSERT INTO changes VALUES(9, 'messages', 'Tabulka messages vytvorena.', CURRENT_TIMESTAMP)"
        ];
        /* MESSAGES ATTACH */
        $message_attach = "CREATE TABLE IF NOT EXISTS message_attach (
            aid INT AUTO_INCREMENT NOT NULL,
            mid INT NOT NULL,
            PRIMARY KEY (aid),
            FOREIGN KEY (mid) REFERENCES messages(mid))
            CHARACTER SET utf8 COLLATE utf8_general_ci";
        $message_attachData = [
            "INSERT INTO message_attach VALUES(1, 1)",
            "INSERT INTO message_attach VALUES(2, 3)",
            "INSERT INTO changes VALUES(10, 'message_attach', 'Tabulka message_attach vytvorena.', CURRENT_TIMESTAMP)"
        ];

        try {
            $db = new Database();

            /* BEZ FK */
            try {
                echo "Creating changes...<br>";
                $db->createTable($changes, $changesData);
                echo "Done<br>";
            } catch (Exception $e) { echo $e; }
            try {
                echo "Creating users...<br>";
                $db->createTable($users, $usersData);
                echo "Done<br>";
            } catch (Exception $e) { echo $e; }
            try {
                echo "Creating products...<br>";
                $db->createTable($products, $productsData);
                echo "Done<br>";
            } catch (Exception $e) { echo $e; }
            try {
                echo "Creating gallery...<br>";
                $db->createTable($gallery, $galleryData);
                echo "Done<br>";
            } catch (Exception $e) { echo $e; }

            /* S FK */
            try {
                echo "Creating orders...<br>";
                $db->createTable($orders, $ordersData);
                echo "Done<br>";
            } catch (Exception $e) { echo $e; }
            try {
                echo "Creating order_items...<br>";
                $db->createTable($orderItems, $orderItemsData);
                echo "Done<br>";
            } catch (Exception $e) { echo $e; }
            try {
                echo "Creating texts...<br>";
                $db->createTable($texts, $textsData);
                echo "Done<br>";
            } catch (Exception $e) { echo $e; }
            try {
                echo "Creating topics...<br>";
                $db->createTable($topics, $topicsData);
                echo "Done<br>";
            } catch (Exception $e) { echo $e; }
            try {
                echo "Creating messages...<br>";
                $db->createTable($messages, $messagesData);
                echo "Done<br>";
            } catch (Exception $e) { echo $e; }
            try {
                echo "Creating message_attach...<br>";
                $db->createTable($message_attach, $message_attachData);
                echo "Done<br>";
            } catch (Exception $e) { echo $e; }
        } catch (Exception $e) {
            echo $e;
        }

        /* 
        ====== BEZ FK ======
        changes X
        users X
        products X
        == Web ==
        gallery X

        ====== FK ======
        orders X
        order_items X
        == Web ==
        texts X
        topics
        messages
        messages_attach
        
        */
    }
?>