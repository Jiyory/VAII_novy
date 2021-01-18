loginCTRL = function($scope, Toast, $http, User, $location) {
    $scope.login = true;
    /*if (sessionStorage.user != null) {
        User.acc = angular.fromJson(sessionStorage.user);
        console.log(User.acc);
    }*/
    //console.log(User);
    if (User.acc != null) {
        $location.path("#!/");
    }

    $scope.acc = {
        mail: "",
        pass: ""
    }

    $scope.tryLogin = function() {
        $scope.msg = "";
        if ($scope.acc.mail == null || $scope.acc.mail.length < 5) {
            $scope.msg += "Mailova adresa je prilis kratka!<br>";
        }
        if ($scope.acc.pass == null || $scope.acc.pass.length < 5) {
            $scope.msg += "Prihlasovacie heslo je prilis kratke! (Min. 8 znakov.)<br>";
        }
        if ($scope.msg.length > 0) {
            Toast.message($scope.msg,3);
        } else {
            $scope.pData = $.param({
                mail: $scope.acc.mail,
                pass: $scope.acc.pass
            });
            $http({
                method: 'POST',
                url: 'server/acc/login.php',
                data: $scope.pData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(value) {
                //console.log(value);
                if (value.data != null && value.data != "") {
                    value.data.pass = null; // keby nejaky spekulant chcel dekodovat heslo
                    value.data.salt = null;
                    User.acc = value.data;
                    //console.log(User.acc);
                    sessionStorage.user = angular.toJson(User.acc);
                    $location.path("#!/"); // redirect
                } else {
                    alert("Nepodarilo sa prihlasit. Pravdepodobne nespravne heslo!");
                }
            });
        }
    }
}

registerCTRL = function($scope, $http, User, Toast, $location) {
    $scope.login = false;

    if (User.acc != null) {
        $location.path("#!/");
    }

    $scope.acc = {
        mail: "",
        pass: "",
        passTwo: "",
        fname: "",
        lname: "",
        comp: "",
        phone: ""
    }

    $scope.tryRegist = function() {
        $scope.msg = "";
        if ($scope.acc.mail == null || $scope.acc.mail.length < 5) {
            $scope.msg += "Mailova adresa je prilis kratka!<br>";
        }
        if ($scope.acc.mail == null || !$scope.acc.mail.includes("@") || !$scope.acc.mail.includes(".")) {
            $scope.msg += "Mailova adresa musi obsahovat @ a bodku!<br>";
        }
        if ($scope.acc.pass == null || $scope.acc.pass.length < 5) {
            $scope.msg += "Prihlasovacie heslo je prilis kratke! (Min. 8 znakov.)<br>";
        }
        if ($scope.acc.pass != $scope.acc.passTwo) {
            $scope.msg += "Prihlasovacie hesla sa nezhoduju!<br>";
        }
        if ($scope.acc.fname == null || $scope.acc.fname.length < 4) {
            $scope.msg += "Meno je prilis kratke!<br>";
        }
        if ($scope.acc.lname == null || $scope.acc.lname.length < 4) {
            $scope.msg += "Priezvisko je prilis kratke!<br>";
        }
        if ($scope.acc.comp == null || $scope.acc.comp.length < 4) {
            $scope.msg += "Nazov spolocnosti je prilis kratky!<br>";
        }
        if ($scope.msg.length > 0) {
            Toast.message($scope.msg,3);
        } else {
            $scope.pData = $.param({
                mail: $scope.acc.mail,
                pass: $scope.acc.pass,
                fname: $scope.acc.fname,
                lname: $scope.acc.lname,
                comp: $scope.acc.comp,
                phone: $scope.acc.phone
            });
            $http({
                method: 'POST',
                url: 'server/acc/register.php',
                data: $scope.pData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(value) {
                console.log(value);
                if (value.status == 200 && value.data > 0) {
                    $scope.user = {
                        uid: value.data,
                        mail: $scope.acc.mail,
                        pass: null,
                        salt: null,
                        admin: 0,
                        fname: $scope.acc.fname,
                        lname: $scope.acc.lname,
                        comp: $scope.acc.comp,
                        phone: $scope.acc.phone
                    }
                    User.acc = $scope.user;
                    sessionStorage.user = angular.toJson(User.acc);
                    $location.path("#!/"); // redirect
                } else {
                    alert("Registracia sa nepodarila. Pravdepodobne uz tato emailova adresa existuje.");
                }
            });
        }
    }
}

User = function() {
    return {
        acc: sessionStorage.user == null ? null : angular.fromJson(sessionStorage.user)
    };
}

app.factory("User", User);
app.controller("loginCTRL", loginCTRL);
app.controller("registerCTRL", registerCTRL);