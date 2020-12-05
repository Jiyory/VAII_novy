
/*
 * Kontroler pre titul stranky
 */
app.controller("topMenuCTRL", function($scope, $sce, $templateRequest, $compile, $window, $http, WebPage, UserData) {
    
    $scope.title = WebPage.title;
    $scope.menu = WebPage.menu;
    $scope.menuSecond = WebPage.menuSecond;
    $scope.userData = UserData;

    $scope.isMenuShown = true;

    /* Nacitanie html stranky */
    var loadAPI = $sce.getTrustedResourceUrl('client/components/topMenu.html');
    $templateRequest(loadAPI).then(function(template) {
        $compile($("#top-menubox").html(template).contents())($scope);
    });

    $scope.openMenu = function() {
        $scope.isMenuShown = !$scope.isMenuShown;
    }

    /* Pretoze funkcii dole chvilu trva kym sa vzpamata :D */
    $scope.$watch('windowWidth', function(newVal, oldVal) {
        console.log("test" + newVal);
        if (newVal >= 992) {
            $scope.isMenuShown = true;
        } else {
            $scope.isMenuShown = false;
        }
    });

    /* https://stackoverflow.com/questions/41175143/how-can-i-get-the-window-width-in-angularjs-on-resize-from-a-controller */
    $scope.windowWidth = $window.innerWidth;
    angular.element($window).bind('resize', function(){
        $scope.windowWidth = $window.innerWidth;
        $scope.$apply();
    });
});