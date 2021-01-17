homeCTRL = function($scope, $http, User, Toast, $timeout) {
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

    $scope.add = function() {
        if ($scope.editing.id != -1) {
            alert("Uz editujete iny prispevok!");
        } else {
            $scope.editing.id = 0;
            $scope.editing.nadpis = "";
            $scope.editing.text = "";
            $scope.editing.icon = "";
        }
    }

    $scope.saveAdd = function() {
        var file = document.querySelector('#img0').files[0];
        if (file != null) {
            getBase64(file).then(function(data) {
                data = data.replace(/^data:image\/\w+;base64,/, ""); // magia :D odstrani texty navise...
                $scope.saveDataAdd(data);
            });
        } else {
            $scope.saveDataAdd(null);
        }
    }

    $scope.saveDataAdd = function(data) {
        var resp = confirm("Naozaj chcete ulozit novy prispevok?");
        //console.log($scope.user);
            if (resp) {
                $scope.msg = "";
            if ($scope.editing.nadpis == null || $scope.editing.nadpis.length < 5) {
                $scope.msg += "Nadpis je prilis kratky!<br>";
            }
            if ($scope.editing.text == null || $scope.editing.text.length < 25) {
                $scope.msg += "Text je prilis kratky! (Min. 25 znakov.)<br>";
            }
            if ($scope.msg.length > 0) {
                Toast.message($scope.msg,3);
            } else {
                //console.log($scope.user);
                var img = false;
                if (data != null) {
                    img = true;
                }
                $scope.pData = $.param({
                    header: $scope.editing.nadpis,
                    text: $scope.editing.text,
                    icon: $scope.editing.icon,
                    image: data == null ? 0 : 1,
                    user: $scope.user.acc.uid,
                    page: 1,
                    imageData: data
                });
                $http({
                    method: 'POST',
                    url: 'server/insert/home.php',
                    data: $scope.pData,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(value) {
                    if (value.status == 200) {
                        console.log(value);
                        $scope.editing.id = -1;
                        var date = new Date();
                        $scope.cards.push({
                            tid: value.data,
                            header: $scope.editing.nadpis,
                            text: $scope.editing.text,
                            icon: $scope.editing.icon,
                            image: data == null ? 0 : 1,
                            fname: $scope.user.acc.fname,
                            lname: $scope.user.acc.lname,
                            create_date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
                        });
                    }
                });
            }
        }
    }

    $scope.edit = function(card) {
        if ($scope.editing.id != -1) {
            alert("Uz editujete iny prispevok!");
        } else {
            $scope.editing.id = card.tid;
            $scope.editing.nadpis = angular.copy(card.header);
            $scope.editing.text = angular.copy(card.text);
            $scope.editing.icon = angular.copy(card.icon);
        }
    }

    $scope.close = function(card) {
        var resp = confirm("Naozaj chcete pokracovat? Vsetky zmeny budu stratene.");
        if (resp) {
            if ($scope.editing.id != 0) {
                card.header = angular.copy($scope.editing.nadpis);
                card.text = angular.copy($scope.editing.text);
                card.icon = angular.copy($scope.editing.icon);
            }
            $scope.editing.id = -1;
        }
    }

    $scope.save = function(card) {
        var file = document.querySelector('#img' + card.tid).files[0];
        if (file != null) {
            getBase64(file).then(function(data) {
                data = data.replace(/^data:image\/\w+;base64,/, ""); // magia :D odstrani texty navise...
                $scope.saveData(card, data);
            });
        } else {
            $scope.saveData(card, null);
        }
    }

    $scope.deleteImage = function(card) {
        var resp = confirm("Naozaj chcete odstranit obrazok z tohto prispevku?");
        if (resp) {
            card.image = 0;
        }        
    }

    $scope.saveData = function(card, image) {
        var resp = confirm("Naozaj chcete ulozit tento prispevok?");
        //console.log($scope.user);
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
                    image: card.image,
                    user: $scope.user.acc.uid,
                    imageData: image
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

    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }
}

technologyCTRL = function($scope, $http, User, Toast) {
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

    $scope.add = function() {
        if ($scope.editing.id != -1) {
            alert("Uz editujete iny prispevok!");
        } else {
            $scope.editing.id = 0;
            $scope.editing.nadpis = "";
            $scope.editing.text = "";
            $scope.editing.icon = "";
        }
    }

    $scope.saveAdd = function() {
        var file = document.querySelector('#img0').files[0];
        if (file != null) {
            getBase64(file).then(function(data) {
                data = data.replace(/^data:image\/\w+;base64,/, ""); // magia :D odstrani texty navise...
                $scope.saveDataAdd(data);
            });
        } else {
            $scope.saveDataAdd(null);
        }
    }

    $scope.saveDataAdd = function(data) {
        var resp = confirm("Naozaj chcete ulozit novy prispevok?");
        //console.log($scope.user);
            if (resp) {
                $scope.msg = "";
            if ($scope.editing.nadpis == null || $scope.editing.nadpis.length < 5) {
                $scope.msg += "Nadpis je prilis kratky!<br>";
            }
            if ($scope.editing.text == null || $scope.editing.text.length < 25) {
                $scope.msg += "Text je prilis kratky! (Min. 25 znakov.)<br>";
            }
            if ($scope.msg.length > 0) {
                Toast.message($scope.msg,3);
            } else {
                //console.log($scope.user);
                var img = false;
                if (data != null) {
                    img = true;
                }
                $scope.pData = $.param({
                    header: $scope.editing.nadpis,
                    text: $scope.editing.text,
                    icon: $scope.editing.icon,
                    image: data == null ? 0 : 1,
                    user: $scope.user.acc.uid,
                    page: 0,
                    imageData: data
                });
                $http({
                    method: 'POST',
                    url: 'server/insert/home.php',
                    data: $scope.pData,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(value) {
                    if (value.status == 200) {
                        console.log(value);
                        $scope.editing.id = -1;
                        var date = new Date();
                        $scope.cards.push({
                            tid: value.data,
                            header: $scope.editing.nadpis,
                            text: $scope.editing.text,
                            icon: $scope.editing.icon,
                            image: data == null ? 0 : 1,
                            fname: $scope.user.acc.fname,
                            lname: $scope.user.acc.lname,
                            create_date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
                        });
                    }
                });
            }
        }
    }

    $scope.edit = function(card) {
        if ($scope.editing.id != -1) {
            alert("Uz editujete iny prispevok!");
        } else {
            $scope.editing.id = card.tid;
            $scope.editing.nadpis = angular.copy(card.header);
            $scope.editing.text = angular.copy(card.text);
            $scope.editing.icon = angular.copy(card.icon);
        }
    }

    $scope.close = function(card) {
        var resp = confirm("Naozaj chcete pokracovat? Vsetky zmeny budu stratene.");
        if (resp) {
            $scope.editing.id = -1;
            card.header = angular.copy($scope.editing.nadpis);
            card.text = angular.copy($scope.editing.text);
            card.icon = angular.copy($scope.editing.icon);
        }
    }

    $scope.save = function(card) {
        var file = document.querySelector('#img' + card.tid).files[0];
        if (file != null) {
            getBase64(file).then(function(data) {
                data = data.replace(/^data:image\/\w+;base64,/, ""); // magia :D odstrani texty navise...
                $scope.saveData(card, data);
            });
        } else {
            $scope.saveData(card, null);
        }
    }

    $scope.saveData = function(card, image) {
        var resp = confirm("Naozaj chcete ulozit tento prispevok?");
        //console.log($scope.user);
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
                    image: card.image,
                    user: $scope.user.acc.uid,
                    imageData: image
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

    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }
}

app.controller("homeCTRL", homeCTRL);
app.controller("technologyCTRL", technologyCTRL);