/*
 * Kontroler pre rotacny panel
 */
app.controller("rotateBarCTRL", function($scope, UserData, $templateRequest, $sce, $compile, $http, $timeout) {
    $scope.loading = true; // aby sa zobrazilo kolecko nacitania
    $scope.user = UserData;

    /* Nacitanie html stranky a nasledne nacitanie dat */
    var htmlAPI = $sce.getTrustedResourceUrl('client/comp/rotate.html');
    $templateRequest(htmlAPI).then(function(template) {
        $compile($("#rotateBarHTML").html(template).contents())($scope);
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

    $scope.setModalText = function(item) {
        $scope.modID = item.rot_id;
        $scope.modHeader = item.header;
        $scope.modText = item.text;
    }

    $scope.updateRotate = function() {
        $scope.pData = $.param({
            id: $scope.modID,
            header: $scope.modHeader,
            text: $scope.modText,
        });
        $http({
            method: 'POST',
            url: 'server/updateRotate.php',
            data: $scope.pData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'} // musi byt, inak to neposiela data
        }).then(function(value) {
            if (value.data != "true") {
                alert("Nepodarilo sa upravit data!\n" + value.data);
            } else {
                console.log($scope.data[$scope.modID - 1])
                $scope.data[$scope.modID - 1] = {
                    rot_id: $scope.modID,
                    header: $scope.modHeader,
                    text: $scope.modText,
                    img: '<img src="client/design/rotate'+$scope.modID+'.jpg" alt="'+$scope.modHeader+'">',
                }
                $('#modalRotate').modal('hide');
            }
        }, function() {});
    }

    $scope.deleteRotate = function(item) {
        if (confirm("Naozaj chcete zmazať rotačný panel:\n" + item.header)) {
            $http({
                method: 'POST',
                url: 'server/deleteRotate.php',
                data: $.param({ id: item.rot_id }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'} // musi byt, inak to neposiela data
            }).then(function(value) {
                if (value.data == "true") {
                    if (item.rot_id != 1)
                        $('#rotateBar').carousel(0);
                    else
                        $('#rotateBar').carousel(1);
                    $timeout(function() {
                        $scope.i = 0;
                        angular.forEach($scope.data, function(itval) {
                            if (itval.rot_id == item.rot_id) {
                                $scope.data.splice($scope.i, 1);
                            }
                            ++$scope.i;
                        });
                    }, 1500);
                } else {
                    alert("Nepodarilo sa zmazať!\n" + value.data);
                }
            }, function() {});
        }
    }
});