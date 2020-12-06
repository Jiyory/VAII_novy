/*
 * Kontroler pre prihlasenie
 */
app.controller("loginCTRL", function($scope, $sce, $templateRequest, $compile, modalLogin, $http, UserData) {

    if (sessionStorage.user != null) {
        var data = angular.fromJson(sessionStorage.user);
        console.log(sessionStorage.user);
        UserData.user.u_id = data.u_id;
        UserData.user.email = data.email;
        UserData.user.admin = data.admin;
        UserData.user.fname = data.fname;
        UserData.user.lname = data.lname;
        UserData.user.comp = data.comp;
        UserData.user.phone = data.phone;
        UserData.user.logged = true;
    }

    $scope.modal = modalLogin; // musi odkazovat na strukturu/objekt, inak sa uchovava len hodnota
    $scope.login = true;

    $scope.errorMessageLogin = "";
    $scope.errorMessageRegister = "";

    $scope.pwd = "fdsfdsf";

    $scope.loginData = {
        mail: "admin@admin.sk",
        pass: "admin"
    };

    /* Nacitanie html stranky */
    var loadAPI = $sce.getTrustedResourceUrl('client/components/modals/login.html');
    $templateRequest(loadAPI).then(function(template) {
        $compile($("#mod-login").html(template).contents())($scope);
    });

    $scope.hideLogin = function() {
        modalLogin.hideLogin();
    };

    $scope.switch = function() {
        $scope.login = !$scope.login;
    };

    $scope.tryLogin = function() {
        if ($scope.errorMessageLogin.length != 0) {
            $scope.errorMessageLogin = "Nemozno sa prihlasit! Skontrolujte udaje.";
            return;
        }
        $scope.pData = $.param({
            mail: $scope.loginData.mail,
            pass: $scope.loginData.pass
        });

        $http({
            method: 'POST',
            url: 'server/login.php',
            data: $scope.pData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'} // musi byt, inak to neposiela data
        }).then(function(value) {
            if (value.data.u_id != null) {
                UserData.user.u_id = value.data.u_id;
                UserData.user.email = value.data.email;
                UserData.user.admin = value.data.admin > 0;
                UserData.user.fname = value.data.fname;
                UserData.user.lname = value.data.lname;
                UserData.user.comp = value.data.comp;
                UserData.user.phone = value.data.phone;
                UserData.user.logged = true;
                sessionStorage.user = angular.toJson(UserData.user);
                modalLogin.hideLogin();
            } else {
                $scope.errorMessageLogin = "Nepodarilo sa prihlasit! Skontrolujte udaje!";
            }
                /*console.log($scope.data[$scope.modID - 1])
                $scope.data[$scope.modID - 1] = {
                    rot_id: $scope.modID,
                    header: $scope.modHeader,
                    text: $scope.modText,
                    img: '<img src="client/design/rotate'+$scope.modID+'.jpg" alt="'+$scope.modHeader+'">',
                }
                $('#modalRotate').modal('hide');*/
        }, function() {});
    };

    $scope.checkInputLogin = function() { // input type email nie je podporovany
        var pass = $scope.loginData.pass;
        var mail = $scope.loginData.mail;
        $scope.errorMessageLogin = "";
        if (pass.length < 5) {
            $scope.errorMessageLogin += "Heslo je príliš krátke! Minimálne 5 znakov.\n";
        }
        if (mail.length < 5 || (mail.match(/@/g) || []).length != 1) {
            $scope.errorMessageLogin += "Formát emailu nie je správny.\n";
        }
    };

    $scope.checkInputLogin();
});

app.factory("modalLogin", function () {
    return {
        showModal: false,

        showLogin: function() {
            this.showModal = true;
        },
    
        hideLogin: function() {
            this.showModal = false;
        }
    }
});