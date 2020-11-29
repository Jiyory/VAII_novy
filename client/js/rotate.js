/*
 * Kontroler pre rotacny panel
 */
app.controller("rotateBarCTRL", function($scope, UserData, $templateRequest, $sce, $compile, $http) {
    $scope.loading = true; // aby sa zobrazilo kolecko nacitania
    $scope.user = UserData;

    /* Nacitanie html stranky a nasledne nacitanie dat */
    var htmlAPI = $sce.getTrustedResourceUrl('client/comp/rotate.html');
    $templateRequest(htmlAPI).then(function(template) {
        $compile($("#rotateBar").html(template).contents())($scope);
        // nacitanie dat
        $http({
            method: 'GET',
            url: 'server/loadRotate.php',
        }).then(function(value) {
            $scope.data = value.data;
            angular.forEach($scope.data, function(item) {
                item.img = '<img src="client/design/rotate'+item.rot_id+'.jpg" alt="'+item.header+'">';
            });
            $scope.loading = false; // aby sa zobrazil html kod
        }, function() {});
    }, function() {});

    $scope.addClasses = function(id) {
        if (id == 0)
            return "active";
        else
            return "";
    };
});