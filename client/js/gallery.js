galleryCTRL = function($scope, $http) {
    $scope.images = [];
    $scope.imgMax = null;
    $http({
        method: 'GET',
        url: 'server/load/gallery.php',
    }).then(function(value) {
        //console.log(value);
        if (value.status == 200) { // ak je vsetko ok
            angular.forEach(value.data, function(item) {
                $scope.images.push(item);
            });
            $scope.loading = false;
            console.log(value);
        }
    });

    $scope.showImg = function(img) {
        $scope.imgMax = img;
    }

    $scope.hideImg = function() {
        $scope.imgMax = null;
    }
}

app.controller("galleryCTRL", galleryCTRL);