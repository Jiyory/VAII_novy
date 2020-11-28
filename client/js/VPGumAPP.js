/*
 * Inicializacia aplikacie
 */
var app = angular.module("VPGumAPP", ["ngRoute"]);

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
                route: "#!",
                icon: "M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z",
                icon2: "M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z",
                iconColor: "#FFF",
            },
            {
                text: "TECHNOLOGIE",
                current: false,
                route: "#!technology",
                icon: "M9.812 1.952a.5.5 0 0 1-.312.89c-1.671 0-2.852.596-3.616 1.185L4.857 5.073V6.21a.5.5 0 0 1-.146.354L3.425 7.853a.5.5 0 0 1-.708 0L.146 5.274a.5.5 0 0 1 0-.706l1.286-1.29a.5.5 0 0 1 .354-.146H2.84C4.505 1.228 6.216.862 7.557 1.04a5.009 5.009 0 0 1 2.077.782l.178.129z",
                icon2: "M6.012 3.5a.5.5 0 0 1 .359.165l9.146 8.646A.5.5 0 0 1 15.5 13L14 14.5a.5.5 0 0 1-.756-.056L4.598 5.297a.5.5 0 0 1 .048-.65l1-1a.5.5 0 0 1 .366-.147z",
                iconColor: "#FFF",
                submenu: [
                    {
                        text: "Technol1",
                        route: "#!technology/techn1",
                    },
                    {
                        text: "Technol2",
                        route: "#!technology/techn2",
                    }
                ]
            },
            {
                text: "PRODUKTY",
                current: false,
                route: "#!products",
                icon: "M4.98 1a.5.5 0 0 0-.39.188L1.54 5H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0A.5.5 0 0 1 10 5h4.46l-3.05-3.812A.5.5 0 0 0 11.02 1H4.98zM3.81.563A1.5 1.5 0 0 1 4.98 0h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 10H1.883A1.5 1.5 0 0 1 .394 8.686l-.39-3.124a.5.5 0 0 1 .106-.374L3.81.563zM.125 11.17A.5.5 0 0 1 .5 11H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0 .5.5 0 0 1 .5-.5h5.5a.5.5 0 0 1 .496.562l-.39 3.124A1.5 1.5 0 0 1 14.117 16H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .121-.393z",
                iconColor: "#FFF",
            },
            {
                text: "GALERIA",
                current: false,
                route: "#!gallery",
                icon: "M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15.002 9.5V13a1 1 0 0 1-1 1h-12a1 1 0 0 1-1-1v-1zm5-6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z",
                iconColor: "#FFF",
            }
        ],

        leftMenu: [
            {
                text: "Ucet",
                current: false,
                route: "#!",
                icon: "M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
                iconColor: "#FFF",
                submenu: [
                    {
                        text: "Prihlasit",
                        route: "#!login"
                    },
                    {
                        text: "Registrovat",
                        route: "#!login",
                    }
                ]
            }
        ],

        setActiveMenu: function(id) {
            var cid = 0;
            angular.forEach(this.menu, function(item) {
                item.current = cid == id;
                ++cid;
            });
        }
    };
});

/*
 * Nastavenie ciest
 */ 
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "client/pages/home.html",
        resolve: {
            init: function(PageDataFA) { PageDataFA.setActiveMenu(0);}
        }
    })
    .when("/technology/techn1", {
        templateUrl : "client/pages/technology.html",
        resolve: {
            init: function(PageDataFA) { PageDataFA.setActiveMenu(1);}
        }
    })
    .when("/products", {
        templateUrl : "client/pages/products.html",
        resolve: {
            init: function(PageDataFA) { PageDataFA.setActiveMenu(2);}
        }
    })
    .when("/gallery", {
        templateUrl : "client/pages/gallery.html",
        resolve: {
            init: function(PageDataFA) { PageDataFA.setActiveMenu(3);}
        }
    });
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
    $scope.leftMenu = PageDataFA.leftMenu;
    console.log($scope.leftMenu);

    $scope.activeClass = function(current, submenu) {
        if (current && submenu)
            return "active dropdown";
        else if (current)
            return "active";
        else if (submenu)
            return "dropdown";
        else
            return "";
    }

    $scope.navigateTo = function(page) {
        angular.forEach($scope.menu, function(value, key) {
            value.current = value.text == page.text;
        });
    }
});