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

    $scope.registerData = {
        mail: "jozef161@gmail.com",
        pass: "a1s2d3f4",
        pass2: "a1s2d3f4",
        fname: "Gery",
        lname: "Ardy",
        comp: "Bez spolocnosti",
        phone: ""
    };

    $scope.logErr = [true, false];
    $scope.regErr = [true, false, true, false, true, false, true];

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
        $scope.errorMessageLogin = "Prihlasujem...";
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
            //console.log(value.data);
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
        }, function() {});
    };

    $scope.tryRegister = function() {
        if ($scope.errorMessageRegister.length != 0) {
            $scope.errorMessageRegister = "Nemozno sa zaregistrovat! Skontrolujte udaje.";
            return;
        }
        $scope.errorMessageLogin = "Registrujem...";
        $scope.pData = $.param({
            mail: $scope.registerData.mail,
            pass: $scope.registerData.pass,
            fname: $scope.registerData.fname,
            lname: $scope.registerData.lname,
            comp: $scope.registerData.comp,
            phone: $scope.registerData.phone,
        });
        $http({
            method: 'POST',
            url: 'server/register.php',
            data: $scope.pData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'} // musi byt, inak to neposiela data
        }).then(function(value) {
            console.log(value.data);
            if (value.data == "true") {
                
            }
        }, function() {});
    }

    $scope.checkInputLogin = function() { // input type email nie je podporovany
        var pass = $scope.loginData.pass;
        var mail = $scope.loginData.mail;
        $scope.errorMessageLogin = "";
        $scope.logErr = [false, false];
        if (pass.length < 5) {
            $scope.errorMessageLogin += "Heslo je príliš krátke! Minimálne 5 znakov.\n";
            $scope.logErr[1] = true;
        }
        if (mail.length < 5 || (mail.match(/@/g) || []).length != 1) {
            $scope.errorMessageLogin += "Formát emailu nie je správny.\n";
            $scope.logErr[0] = true;
        }
    };

    $scope.checkInputRegister = function() {
        console.log("sdgsdg");
        var mail = $scope.registerData.mail;
        var pass = $scope.registerData.pass;
        var pass2 = $scope.registerData.pass2;
        var fname = $scope.registerData.fname;
        var lname = $scope.registerData.lname;
        var comp = $scope.registerData.comp;

        $scope.regErr = [false, false, false, false, false, false, false];
        $scope.errorMessageRegister = "";

        if (mail.length < 5 || (mail.match(/@/g) || []).length != 1) {
            $scope.errorMessageRegister += "Formát emailu nie je správny.\n";
            $scope.regErr[0] = true;
        }
        if (pass.length < 5) {
            $scope.errorMessageRegister += "Heslo je príliš krátke [5].\n";
            $scope.regErr[1] = true;
        }
        if (pass != pass2) {
            $scope.errorMessageRegister += "Heslá sa nezhodujú.\n";
            $scope.regErr[2] = true;
        }
        if (fname.length < 4) {
            $scope.errorMessageRegister += "Meno je príliš krátke [4].\n";
            $scope.regErr[3] = true;
        }
        if (fname[0] < 'A' || fname[0] > 'Z') {
            $scope.errorMessageRegister += "Meno nezačína veľkým písmenom.\n";
            $scope.regErr[3] = true;
        }
        if (lname.length < 3) {
            $scope.errorMessageRegister += "Priezvisko je príliš krátke [3].\n";
            $scope.regErr[4] = true;
        }
        if (lname[0] < 'A' || lname[0] > 'Z') {
            $scope.errorMessageRegister += "Prezvisko nezačína veľkým písmenom.\n";
            $scope.regErr[4] = true;
        }
        if (comp.length < 3) {
            $scope.errorMessageRegister += "Spoločnosť je príliš krátka [3].\n";
            $scope.regErr[5] = true;
        }
    };

    $scope.checkInputLogin();
    $scope.checkInputRegister();
});

app.factory("modalLogin", function () {
    return {
        showModal: true,

        showLogin: function() {
            this.showModal = true;
        },
    
        hideLogin: function() {
            this.showModal = false;
        }
    }
});