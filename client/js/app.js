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
                    },
                    {
                        text: "Registrácia",
                    }
                ]
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

var app = angular.module("main", ["ngRoute"]);
app.config(Routes);
app.factory("WebPage", WebPage);
app.factory("UserData", UserData);
app.controller("titleCTRL", titleCTRL);