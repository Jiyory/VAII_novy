topCTRL = function($scope, $sce, $templateRequest, $compile, $window, $http, WebPage, UserData, User, $location) {

    $scope.user = User;

    $scope.menu = WebPage.menu;
    $scope.leftMenu = WebPage.menuSecond;
    $scope.menuAccount = WebPage.menuAccount;
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

    $scope.logout = function() {
        User.acc = null;
        sessionStorage.user = null;
        $location.path("#!/");
    }
}

//var app = angular.module("main", ["ngRoute"]);
app.controller("topCTRL", topCTRL);