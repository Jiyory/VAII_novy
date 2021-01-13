homeCTRL = function($scope, $http, User) {
    $scope.loading = true;
    $scope.user = User;
    $scope.cards = [];
    $scope.editing = {
        id: -1,
        nadpis: null,
        text: null,
    };

    $scope.load = function() {
        $http({
            method: 'GET',
            url: 'server/load/home.php',
        }).then(function(value) {
            console.log(value);
            if (value.status == 200) { // ak je vsetko ok
                angular.forEach(value.data, function(item) {
                    $scope.cards.push(item);
                });
                $scope.loading = false;
            }
            //console.log($scope.cards);
        });
    }
    $scope.load();

    $scope.delete = function(card) {
        var resp = confirm("Naozaj chcete odstranit tento prispevok?");
        if (resp) {
            $scope.pData = $.param({
                tid: card.tid,
            });
            $http({
                method: 'POST',
                url: 'server/delete/home.php',
                data: $scope.pData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(value) {
                if (value.data > 0) {
                    angular.forEach($scope.cards, function(item, idx) {
                        if (item == card) {
                            $scope.cards.splice(idx, 1);
                        }
                    });
                }
            });
        }
    }

    $scope.edit = function(card) {
        if ($scope.editing.id != -1) {
            alert("Uz editujete iny prispevok!");
        } else {
            $scope.editing.id = card.tid;
            $scope.editing.nadpis = angular.copy(card.header);
            $scope.editing.text = angular.copy(card.text);
        }
    }

    $scope.close = function(card) {
        var resp = confirm("Naozaj chcete pokracovat? Vsetky zmeny budu stratene.");
        if (resp) {
            $scope.editing.id = -1;
            card.header = angular.copy($scope.editing.nadpis);
            card.text = angular.copy($scope.editing.text);
        }
    }

    $scope.save = function(card) {
        var resp = confirm("Naozaj chcete ulozit tento prispevok?");
        console.log($scope.user);
            if (resp) {
                $scope.msg = "";
            if (card.header == null || card.header.length < 5) {
                $scope.msg += "Nadpis je prilis kratky!<br>";
            }
            if (card.text == null || card.text.length < 25) {
                $scope.msg += "Text je prilis kratky! (Min. 25 znakov.)<br>";
            }
            if ($scope.msg.length > 0) {
                Toast.message($scope.msg,3);
            } else {
                $scope.pData = $.param({
                    tid: card.tid,
                    header: card.header,
                    text: card.text,
                    icon: card.icon,
                    image: card.image
                });
                $http({
                    method: 'POST',
                    url: 'server/edit/home.php',
                    data: $scope.pData,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(value) {
                    console.log(value);
                    if (value.data > 0) {
                        $scope.editing.id = -1;
                    } else {
                        $scope.editing.id = -1;
                        card.header = angular.copy($scope.editing.nadpis);
                        card.text = angular.copy($scope.editing.text);
                    }
                });
            }
        }
    }
}

technologyCTRL = function($scope, $http) {
    $scope.loading = true;
    $scope.user = User;
    $scope.cards = [];
    $scope.editing = {
        id: -1,
        nadpis: null,
        text: null,
    };

    $scope.load = function() {
        $http({
            method: 'GET',
            url: 'server/load/technology.php',
        }).then(function(value) {
            //console.log(value);
            if (value.status == 200) { // ak je vsetko ok
                angular.forEach(value.data, function(item) {
                    $scope.cards.push(item);
                });
                $scope.loading = false;
            }
            //console.log($scope.cards);
        });
    }
    $scope.load();

    $scope.delete = function(card) {
        var resp = confirm("Naozaj chcete odstranit tento prispevok?");
        if (resp) {
            $scope.pData = $.param({
                tid: card.tid,
            });
            $http({
                method: 'POST',
                url: 'server/delete/home.php',
                data: $scope.pData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(value) {
                if (value.data > 0) {
                    angular.forEach($scope.cards, function(item, idx) {
                        if (item == card) {
                            $scope.cards.splice(idx, 1);
                        }
                    });
                }
            });
        }
    }

    $scope.edit = function(card) {
        if ($scope.editing.id != -1) {
            alert("Uz editujete iny prispevok!");
        } else {
            $scope.editing.id = card.tid;
            $scope.editing.nadpis = angular.copy(card.header);
            $scope.editing.text = angular.copy(card.text);
        }
    }

    $scope.close = function(card) {
        var resp = confirm("Naozaj chcete pokracovat? Vsetky zmeny budu stratene.");
        if (resp) {
            $scope.editing.id = -1;
            card.header = angular.copy($scope.editing.nadpis);
            card.text = angular.copy($scope.editing.text);
        }
    }

    $scope.save = function(card) {
        var resp = confirm("Naozaj chcete ulozit tento prispevok?");
        console.log($scope.user);
            if (resp) {
                $scope.msg = "";
            if (card.header == null || card.header.length < 5) {
                $scope.msg += "Nadpis je prilis kratky!<br>";
            }
            if (card.text == null || card.text.length < 25) {
                $scope.msg += "Text je prilis kratky! (Min. 25 znakov.)<br>";
            }
            if ($scope.msg.length > 0) {
                Toast.message($scope.msg,3);
            } else {
                $scope.pData = $.param({
                    tid: card.tid,
                    header: card.header,
                    text: card.text,
                    icon: card.icon,
                    image: card.image
                });
                $http({
                    method: 'POST',
                    url: 'server/edit/home.php',
                    data: $scope.pData,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(value) {
                    console.log(value);
                    if (value.data > 0) {
                        $scope.editing.id = -1;
                    } else {
                        $scope.editing.id = -1;
                        card.header = angular.copy($scope.editing.nadpis);
                        card.text = angular.copy($scope.editing.text);
                    }
                });
            }
        }
    }
}

app.controller("homeCTRL", homeCTRL);
app.controller("technologyCTRL", technologyCTRL);