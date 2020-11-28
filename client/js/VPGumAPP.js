/*
 * Inicializacia aplikacie
 */
var app = angular.module("VPGumAPP", ["ngRoute"]);

/*
 * Nastavenie ciest
 */ 
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : "main.htm"
    })
    .when("/technology", {
      templateUrl : "red.htm"
    })
    .when("/products", {
      templateUrl : "green.htm"
    })
    .when("/gallery", {
      templateUrl : "blue.htm"
    });
});

/*
 * Zdielane data o nazve webstranky - tiez staticke udaje
 */
app.factory("PageDataFA", function () {   // sluzi ako zdielane data - vytvori sa len 1x
    return {
        page: {
            name: "Home"
        },

        owner: {
            name: "VPGum - Vladimír Piaček"
        },

        menu: [
            {
                text: "DOMOV",
                current: true,
                route: "#!"
            },
            {
                text: "TECHNOLOGIE",
                current: false,
                route: "#!technology"
            },
            {
                text: "PRODUKTY",
                current: false,
                route: "#!products"
            },
            {
                text: "GALERIA",
                current: false,
                route: "#!gallery"
            }
        ]
    };
});

/*
 * Kontroler pre titul stranky
 */
app.controller("titleCTRL", function($scope, PageDataFA) {
    $scope.page = PageDataFA.page; // page.name
});

/*
 * Kontroler pre menu/navigacny panel
 */
app.controller("navBarCTRL", function($scope, PageDataFA) {
    $scope.owner = PageDataFA.owner;
    $scope.menu = PageDataFA.menu;
    console.log($scope.menu[0]);

    $scope.activeClass = function(current) {
        if (current)
            return "active";
        else
            return "";
    }

    $scope.navigateTo = function(page) {
        angular.forEach($scope.menu, function(value, key) {
            value.current = value.text == page.text;
        });
    }
});