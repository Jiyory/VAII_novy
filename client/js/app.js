/* INICIALIZACIA APP */
var app = angular.module("main", ["ngRoute"]);

/*
 * Pridava filter na vlozenie html kodu
 */
app.filter("trust", ['$sce', function($sce) {
    return function(htmlCode){
      return $sce.trustAsHtml(htmlCode);
    }
}]);

/*
 * Zdielane data o nazve webstranky - tiez staticke udaje
 */
app.factory("UserData", function () {   // sluzi ako zdielane data - vytvori sa len 1x
    return {
        name: "",
        admin: true,
        logged: false,
    }
});

/*
 * Zdielane data o nazve webstranky - tiez staticke udaje
 */
app.factory("WebPage", function () {
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
                text: "Prihlásenie",
                icon: "fas fa-user-tie"
            },
            {
                text: "Registrácia",
                icon: "fas fa-user-plus"
            },
            {
                text: "Účet",
                icon: "fas fa-user-cog"
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
});

/*
 * Cesty webstranky
 */ 
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "client/pages/home.html",
        resolve: {
            init: function(WebPage) { WebPage.setActive(0);}
        }
    })
    .when("/technology", {
        templateUrl : "client/pages/home.html",
        /*controller: function($scope, $stateParams) {
            $scope.portfolioId = $stateParams.portfolioId;
        },*/
        resolve: {
            init: function(WebPage) { WebPage.setActive(1);}
        }
    })
    .when("/products", {
        templateUrl : "client/pages/home.html",
        resolve: {
            init: function(WebPage) { WebPage.setActive(2);}
        }
    })
    .when("/gallery", {
        templateUrl : "client/pages/home.html",
        resolve: {
            init: function(WebPage) { WebPage.setActive(3);}
        }
    });
});

/*
 * Kontroler pre titul stranky
 */
app.controller("titleCTRL", function($scope, WebPage) {
    $scope.title = WebPage.title;
    $scope.route = WebPage.route;
});

/*
 * Kontroler pre celu stranku
 */
app.controller("mainCTRL", function($scope) {
});
