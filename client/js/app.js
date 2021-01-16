/*
 * Kontroler pre titul stranky
 */
titleCTRL = function($scope, WebPage) {
    $scope.title = WebPage.title;
    $scope.route = WebPage.route;
}

/*
 * Cesty web stranky
 */
Routes = function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "client/pages/home.html",
        controller: homeCTRL,
        resolve: {
            init: function(WebPage) { WebPage.setActive(0);}
        }
    })
    .when("/technology", {
        templateUrl : "client/pages/home.html",
        controller: technologyCTRL,
        resolve: {
            init: function(WebPage) { WebPage.setActive(1);}
        }
    })
    .when("/products", {
        templateUrl : "client/pages/products.html",
        controller: productsCTRL,
        resolve: {
            init: function(WebPage) { WebPage.setActive(2);}
        }
    })
    .when("/gallery", {
        templateUrl : "client/pages/gallery.html",
        controller: galleryCTRL,
        resolve: {
            init: function(WebPage) { WebPage.setActive(3);}
        }
    })
    .when("/login", {
        templateUrl : "client/pages/login.html",
        controller: loginCTRL,
        resolve: {
            init: function(WebPage) { WebPage.setActive(0);}
        }
    })
    .when("/register", {
        templateUrl : "client/pages/login.html",
        controller: registerCTRL,
        resolve: {
            init: function(WebPage) { WebPage.setActive(0);}
        }
    });
}

/*
 * Informacie o uzivatelovi
 */
UserData = function () {   // sluzi ako zdielane data - vytvori sa len 1x
    return {
        user: { logged: false }
    }
};

/*
 * Zdielane data o nazve webstranky - tiez staticke udaje
 */
WebPage = function () {
    return {
        title: "VPGum",
        route: "HOME",
        menu: [
            {
                text: "Domov",
                page: "#!",
                active: true,
                icon: "fas fa-home"
            },
            {
                text: "Technológie",
                page: "#!/technology",
                active: false,
                icon: "fas fa-hammer"
            },
            {
                text: "Produkty",
                page: "#!/products",
                active: false,
                icon: "far fa-list-alt"
            },
            {
                text: "Galéria",
                page: "#!/gallery",
                active: false,
                icon: "fas fa-images"
            }
        ],
        menuSecond: [
            {
                text: "Účet",
                icon: "fas fa-user-cog",
                menu: [
                    {
                        text: "Prihlásenie",
                        page: "#!/login",
                    },
                    {
                        text: "Registrácia",
                        page: "#!/register",
                    }
                ]
            }
        ],
        menuAccount: [
            {
                text: "Objednávky",
                icon: null,
                page: "#!/orders"
            },
            {
                text: "Sklad",
                icon: null,
                page: "#!/storage"
            },
            {
                text: "Nastavenia",
                icon: null,
                page: "#!/settings"
            },
            {
                text: "Odhlásiť",
                icon: null,
                out: true
            }
        ],

        setActive: function(id) {
            var cid = 0;
            angular.forEach(this.menu, function(item) {
                item.active = cid == id;
                ++cid;
            });
        }
    }
};

Toast = function($compile, $timeout) {
    return {
        timer: null,
        message: function(msg, time) {
            $compile($("#toast-top").html(msg).contents());
            $("#toast-top").addClass("toast-padding");
            this.timer = $timeout(function() {
                $("#toast-top").removeClass("toast-padding");
            }, time * 1000);
        }
    };
};

toastCTRL = function($scope, Toast) {
    $scope.toast = Toast;
}

var app = angular.module("main", ["ngRoute"]);
app.config(Routes);
app.factory("WebPage", WebPage);
app.factory("Toast", Toast);
app.factory("UserData", UserData);
app.controller("titleCTRL", titleCTRL);
app.controller("toastCTRL", toastCTRL);