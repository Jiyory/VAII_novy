loginCTRL = function($scope, Toast, $http, User) {
    $scope.login = true;
    /*if (sessionStorage.user != null) {
        User.acc = angular.fromJson(sessionStorage.user);
        console.log(User.acc);
    }*/
    console.log(User);

    $scope.acc = {
        mail: "admin@admin.sk",
        pass: "admin"
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
                console.log(value);
                if (value.data != null || value.data != "") {
                    value.data.pass = null; // keby nejaky spekulant chcel dekodovat heslo
                    value.data.salt = null;
                    User.acc = value.data;
                    //console.log(User.acc);
                    sessionStorage.user = angular.toJson(User.acc);
                }
            });
        }
    }
}

registerCTRL = function($scope) {
    $scope.login = false;
}

User = function() {
    return {
        acc: sessionStorage.user == null ? null :   .fromJson(sessionStorage.user),
    };
}

app.factory("User", User);
app.controller("loginCTRL", loginCTRL);
app.controller("registerCTRL", registerCTRL);