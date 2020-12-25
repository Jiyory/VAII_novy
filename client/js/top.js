topCTRL = function($scope, $sce, $templateRequest, $compile, $window, $http, WebPage, UserData) {

    /* Nacitanie html stranky */
    var loadAPI = $sce.getTrustedResourceUrl('client/components/topMenu.html');
    $templateRequest(loadAPI).then(function(template) {
        $compile($("#top").html(template).contents())($scope);
    });
}