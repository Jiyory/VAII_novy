settingsCTRL = function($scope, $http, User, $location, Toast) {
    if (User.acc == null) {
        $location.path("#!/");
    }

    $scope.user = User;
    $scope.newUser = angular.copy(User);

    $scope.changeFName = function() {
        if ($scope.newUser.acc.fname.length > 4) {
            $scope.user.acc.fname = $scope.newUser.acc.fname;
            $scope.save();
        } else {
            Toast.message("Meno je prilis kratke!", 3);
        }
    }

    $scope.changeLName = function() {
        if ($scope.newUser.acc.lname.length > 3) {
            $scope.user.acc.lname = $scope.newUser.acc.lname;
            $scope.save();
        } else {
            Toast.message("Priezviko je prilis kratke!", 3);
        }
    }

    $scope.changeMail = function() {
        var msg = "";
        if ($scope.newUser.acc.mail.length < 4) {
            msg += "Mail je prilis kratky!<br>";
        }
        if (!$scope.newUser.acc.mail.includes("@")) {
            msg += "Mail musi obsahovat @!<br>";
        }
        if (!$scope.newUser.acc.mail.includes(".")) {
            msg += "Mail musi obsahovat bodku!<br>";
        }
        if (msg.length > 0) {
            Toast.message(msg, 3);
        } else {
            $scope.user.acc.mail = $scope.newUser.acc.mail;
            $scope.save();
        }
    }

    $scope.changeCompany = function() {
        $scope.user.acc.comp = $scope.newUser.acc.comp;
        $scope.save();
    }

    $scope.changePhone = function() {
        $scope.user.acc.phone = $scope.newUser.acc.phone;
        $scope.save();
    }

    $scope.changePassword = function() {
        //$scope.user.fname = $scope.newUser.fname;
        //$scope.save();
        Toast.message("Tato funkcia momentalne nie je podporovana!", 3);
    }

    $scope.save = function() {
        $scope.pData = $.param({
            uid: $scope.user.acc.uid,
            fname: $scope.user.acc.fname,
            lname: $scope.user.acc.lname,
            mail: $scope.user.acc.mail,
            comp: $scope.user.acc.comp,
            phone: $scope.user.acc.phone
        });
        //console.log($scope.pData);
        $http({
            method: 'POST',
            url: 'server/edit/settings.php',
            data: $scope.pData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            //console.log(value);
            if (value.data != null && value.data > 0) {
                User.acc = $scope.user.acc;
                sessionStorage.user = angular.toJson(User.acc);
                Toast.message("Udaje zmenene!", 3);
            } else if (value.data == 0) {
                Toast.message("Udaje su rovnake!", 3);
            }
        });
    }

    $scope.accounts = [];

    $scope.loadAcc = function() {
        if (User.acc != null) {
            if (User.acc.admin == 1) {
                $http({
                    method: 'POST',
                    url: 'server/load/accounts.php',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(value) {
                    //console.log(value);
                    $scope.accounts = value.data;
                });
            }
        }
    }
    $scope.loadAcc();

    $scope.deleteAcc = function(acc) {
        $scope.pData = $.param({
            uid: acc.uid
        });
        $http({
            method: 'POST',
            url: 'server/delete/accounts.php',
            data: $scope.pData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            //console.log(value);
            if (value.data != null && value.data > 0) {
                angular.forEach($scope.accounts, function(item, idx) {
                    if (item.uid == acc.uid) {
                        $scope.accounts.splice(idx, 1);
                    }
                })
            }
        });
    }

    $scope.setAdmin = function(acc) {
        $scope.pData = $.param({
            uid: $scope.user.acc.uid,
            admin: 1
        });
        $http({
            method: 'POST',
            url: 'server/edit/accounts.php',
            data: $scope.pData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            //console.log(value);
            if (value.data != null && value.data > 0) {
                acc.admin = 1;
            }
        });
    }

    $scope.unsetAdmin = function(acc) {
        $scope.pData = $.param({
            uid: $scope.user.acc.uid,
            admin: 0
        });
        $http({
            method: 'POST',
            url: 'server/edit/accounts.php',
            data: $scope.pData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            //console.log(value);
            if (value.data != null && value.data > 0) {
                acc.admin = 0;
            }
        });
    }
}

app.controller("settingsCTRL", settingsCTRL);