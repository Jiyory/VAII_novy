galleryCTRL = function($scope, $http, User, Toast) {
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
            //console.log(value);
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
        var file = document.querySelector('#img').files[0];
        if (file != null) {
            getBase64(file).then(function(data) {
                data = data.replace(/^data:image\/\w+;base64,/, ""); // magia :D odstrani texty navise...
                $scope.saveData(data);
            });
        } else {
            Toast.message("Nie je zvoleny ziaden subor!", 3);
        }
    }

    $scope.saveData = function(data) {
        $scope.pData = $.param({
            header: $scope.addImg.header,
            text: $scope.addImg.text,
            imageData: data
        });

        $http({
            method: 'POST',
            url: 'server/insert/gallery.php',
            data: $scope.pData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            //console.log(value);
            if (value.data > 0) {
                $scope.images.push({
                    iid: value.data,
                    header: $scope.addImg.header,
                    text: $scope.addImg.text
                });
            }
            $scope.addImg.edit = false;
        });
    }

    $scope.deleteImage = function(id) {
        $scope.pData = $.param({
            iid: id
        });

        $http({
            method: 'POST',
            url: 'server/delete/gallery.php',
            data: $scope.pData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(value) {
            console.log(value);
            if (value.data > 0) {
                angular.forEach($scope.images, function(item, idx) {
                    if (item.iid == id) {
                        $scope.images.splice(idx, 1);
                    }
                });
                $scope.imgMax = null;
            }
        });
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }
}

app.controller("galleryCTRL", galleryCTRL);