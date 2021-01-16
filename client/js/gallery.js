galleryCTRL = function($scope, $http, User) {
    $scope.images = [];
    $scope.user = User;
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

    $scope.addImg = {
        edit: false,
        header: null,
        text: null
    }

    $scope.add = function() {
        $scope.addImg.edit = true;
        $scope.addImg.header = null;
        $scope.addImg.text = null;
    }

    $scope.close = function() {
        var conf = confirm("Naozaj chcete pokracovat? Vykonane upravy budu zrusene!");
        if (conf) {
            $scope.addImg.edit = false;
        }
    }

    $scope.save = function() {

    }
}

app.controller("galleryCTRL", galleryCTRL);