topCTRL = function($scope, $sce, $templateRequest, $compile, $window, $http, WebPage, UserData) {

    $scope.menu = WebPage.menu;
    $scope.leftMenu = WebPage.menuSecond;
    //console.log($scope.leftMenu);

    /* Nacitanie html stranky */
    var loadAPI = $sce.getTrustedResourceUrl('client/html/top.html');
    $templateRequest(loadAPI).then(function(template) {
        $compile($("#top").html(template).contents())($scope);
    });

    $scope.getClass = function(item) {
        if (item.active) {
            return "button button-active";
        } else {
            return "button";
        }
    }
}

//var app = angular.module("main", ["ngRoute"]);
app.controller("topCTRL", topCTRL);