ordersCTRL = function($scope, $http, User, $location) {
    $scope.order_items = [];
    $scope.user = User;
    $scope.orders = [];
    $scope.ordersAll = [];
    $scope.sort = "oid";
    $scope.editing = {
        id: 0,
        oldData: null
    }

    if (User.acc == null) {
        $location.path("#!/");
    }

    $scope.load = function() {
        $scope.pData = $.param({
            uid: $scope.user.acc.uid,
        });
        $http({
            method: 'POST',
            url: 'server/load/orders.php',
            data: $scope.pData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            if (value.status == 200) { // ak je vsetko ok
                /*angular.forEach(value.data, function(item) {
                    $scope.order_items.push(item);
                });*/
                $scope.transformOrders(value.data, $scope.orders);
            }
        });
    }
    $scope.load();

    $scope.transformOrders = function(data, orders) {
        var lastOid = 0;
        var items = [];
        angular.forEach(data, function(item) { // zoradene podla oid
            if (item.oid != lastOid) {
                if (lastOid != 0) {
                    orders.push({
                        data: items,
                        oid: lastOid,
                        create_date: items[0].create_date_o,
                        done_date: items[0].done_date,
                        username: items[0].fname + " " + items[0].lname
                    });
                }
                lastOid = item.oid;
                items = [];
            }
            items.push(item);
        });
        if (items.length != 0) {
            orders.push({
                data: items,
                oid: lastOid,
                create_date: items[0].create_date_o,
                done_date: items[0].done_date,
                username: items[0].fname + " " + items[0].lname
            });
        }
    }

    $scope.loadAll = function() {
        if ($scope.user.acc != null && $scope.user.acc.admin == 1) {
            $scope.pData = $.param({
                uid: 0,
            });
            $http({
                method: 'POST',
                url: 'server/load/orders.php',
                data: $scope.pData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(value) {
                if (value.status == 200) { // ak je vsetko ok
                    /*angular.forEach(value.data, function(item) {
                        $scope.order_items.push(item);
                    });*/
                    $scope.transformOrders(value.data, $scope.ordersAll);
                }
            });
        }
    }
    $scope.loadAll();

    $scope.edit = function(order) {
        if ($scope.editing.id == 0) {
            $scope.editing.id = order.oid;
            $scope.editing.oldData = angular.copy(order.data);
        } else {
            alert("Uz editujete inu objednavku!");
        }
    }

    $scope.delete = function(order) {
        var res = confirm("Naozaj chcete zmazat tuto objednavku?");
        if (res) {
            $scope.pData = $.param({
                oid: order.oid,
            });
            $http({
                method: 'POST',
                url: 'server/delete/orders.php',
                data: $scope.pData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(value) {
                if (value.status == 200) {
                    if (value.data > 0) {
                        angular.forEach($scope.ordersAll, function(item, idx) {
                            if (item.oid == order.oid) {
                                $scope.ordersAll.splice(idx, 1);
                            }
                        });
                    }
                }
            });
        }
    }

    $scope.close = function(order) {
        var res = confirm("Naozaj chcete skoncit editaciu?");
        if (res) {
            if ($scope.editing.id > 0) {
                order.data = angular.copy($scope.editing.oldData);
            }
            $scope.editing.id = 0;
        }
    }

    $scope.save = function(order) {
        var res = confirm("Naozaj chcete ulozit upravene udaje?");
        if (res) {
            angular.forEach(order.data, function(item) {
                //console.log(item);
                $scope.pData = $.param({
                    oid: order.oid,
                    pid: item.pid,
                    amount: item.amount_done
                });
                $http({
                    method: 'POST',
                    url: 'server/edit/orders.php',
                    data: $scope.pData,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(value) {
                    console.log(value);
                    if (value.status == 200) {
                        if (value.data > 0) {
                            $scope.editing.id = 0;
                        }/* else {
                            alert("Neboli upravene ziadne udaje!");
                        }*/
                    }
                });
            });
        }
    }

    $scope.done = function(order) {
        var res = confirm("Naozaj chcete oznacit objednavku za dokoncenu?");
        if (res) {
            $scope.pData = $.param({
                oid: order.oid,
            });
            $http({
                method: 'POST',
                url: 'server/edit/orders_done.php',
                data: $scope.pData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(value) {
                console.log(value);
                if (value.status == 200) {
                    if (value.data > 0) {
                        var date = new Date();
                        order.done_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
                    }
                }
            });
        }
    }

    $scope.create = {
        show: false,
        items: []
    }

    $scope.add = function() {
        $scope.create.show = true;
        $scope.create.items = [];
        $scope.create.items.push({
            name: "Zvolte produkt",
            amount_o: 0,
            pid: "0"
        })
    }

    $scope.closeAdd = function() {
        var res = confirm("Naozaj chcete zatvorit novu objednavku?");
        if (res) {
            $scope.create.show = false;
        }
    }

    $scope.addItem = function() {
        $scope.create.items.push({
            name: "Zvolte produkt",
            amount_o: 0,
            pid: "0"
        })
    }

    $scope.deleteItem = function(id) {
        $scope.create.items.splice(id, 1);
    }

    $scope.saveAdd = function() {
        var res = confirm("Naozaj chcete ulozit novu objednavku? Nezvolene produkty budu vymazane.");
        if (res) {
            $scope.pData = $.param({
                products: $scope.create.items,
                uid: $scope.user.acc.uid
            });
            $http({
                method: 'POST',
                url: 'server/insert/orders.php',
                data: $scope.pData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(value) {
                console.log(value);
                if (value.status == 200) {
                    if (value.data > 0) {
                        $scope.create.show = false;
                        alert("Novo pridana objednavka sa zobrazi po nacitani stranky.");
                    }
                } else {
                    alert("Problem pri ukladani objednavky!");
                }
            });
        }
    }

    $scope.products = [];
    $scope.loadProducts = function() {
        $http({
            method: 'GET',
            url: 'server/load/products.php',
        }).then(function(value) {
            //console.log(value);
            if (value.status == 200) {
                angular.forEach(value.data, function(item) {
                    $scope.products.push(item);
                });
                $scope.loading = false;
            }
        });
    }
    $scope.loadProducts();
}

app.controller("ordersCTRL", ordersCTRL);