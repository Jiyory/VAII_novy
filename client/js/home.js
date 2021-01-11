homeCTRL = function($scope, $http) {
    $scope.loading = true;
    $scope.cards = [];

    $scope.load = function() {
        $http({
            method: 'GET',
            url: 'server/load/home.php',
        }).then(function(value) {
            //console.log(value);
            if (value.status == 200) { // ak je vsetko ok
                angular.forEach(value.data, function(item) {
                    $scope.cards.push(item);
                });
                $scope.loading = false;
            }
            //console.log($scope.cards);
        });
    }
    $scope.load();
}

technologyCTRL = function($scope, $http) {
    $scope.loading = true;
    $scope.cards = [];

    $scope.load = function() {
        $http({
            method: 'GET',
            url: 'server/load/technology.php',
        }).then(function(value) {
            //console.log(value);
            if (value.status == 200) { // ak je vsetko ok
                angular.forEach(value.data, function(item) {
                    $scope.cards.push(item);
                });
                $scope.loading = false;
            }
            //console.log($scope.cards);
        });
    }
    $scope.load();
}

app.controller("homeCTRL", homeCTRL);
app.controller("technologyCTRL", technologyCTRL);