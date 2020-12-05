/*
 * Kontroler pre menu/navigacny panel
 */
app.controller("navBarCTRL", function($scope, PageDataFA, $templateRequest, $sce, $compile) {
    $scope.owner = PageDataFA.owner;
    $scope.menu = PageDataFA.menu;
    $scope.leftMenu = PageDataFA.leftMenu;

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

    var templateUrl = $sce.getTrustedResourceUrl('client/comp/top.html');

    $templateRequest(templateUrl).then(function(template) {
        //console.log(template);
        $compile($("#topBar").html(template).contents())($scope);
    }, function() {
        // An error has occurred
    });
});