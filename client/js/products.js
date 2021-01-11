productsCTRL = function($scope, $http) {
    $scope.loading = true;
    $scope.products = [];
    $scope.order = "name";

    $http({
        method: 'GET',
        url: 'server/load/products.php',
    }).then(function(value) {
        //console.log(value);
        if (value.status == 200) { // ak je vsetko ok
            angular.forEach(value.data, function(item) {
                $scope.products.push(item);
            });
            $scope.loading = false;
        }
        console.log($scope.products);
    });
}

app.controller("productsCTRL", productsCTRL);