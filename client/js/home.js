/*
 * Kontroler pre domovsku stranku
 */
app.controller("homeCTRL", function($scope, $http) {
    $scope.loading = true;
    $scope.cards = [];

    /* Nacitanie obsahu z DB */
    $http({
        method: 'GET',
        url: 'server/loadHome.php',
    }).then(function(value) {
        var idx = 0;
        var cardsidx = -1;
        angular.forEach(value.data, function(item) {
            if (idx % 3 == 0) {
                var arr = [];
                $scope.cards.push(arr);
                ++cardsidx;
            }
            $scope.cards[cardsidx].push(item);
            ++idx;
        });
        $scope.loading = false;
    }, function() { });
});