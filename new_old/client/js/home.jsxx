/*
 * Kontroler pre domovsku stranku
 */
app.controller("homeCTRL", function($scope, $http, UserData, modalHome) {
    //$scope.loading = true;
    //$scope.cards = [];
    $scope.user = UserData.user;

    $scope.load = function() {
        $scope.cards = [];
        $scope.loading = true;
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
    };

    $scope.edit = function(item) {
        modalHome.show();
        modalHome.setParam(item);
    };

    $scope.add = function() {
        modalHome.show();
        modalHome.clearParam();
    };

    $scope.delete = function(item) {
        if (confirm("Naozaj chcete zmazat novinku '" + item.header + "'?")) {
            $scope.pData = $.param({
                h_id: item.h_id,
            });
            $http({
                method: 'POST',
                url: 'server/homeDelete.php',
                data: $scope.pData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'} // musi byt, inak to neposiela data
            }).then(function(value) {
                console.log(value.data);
                if (value.data == "true") {
                    $scope.load(); // kvoli usporiadaniu mi nestaci len "zmazat" ten item
                } else {
                    alert("Nepodarilo sa zmazat novinku '" + item.header + "'");
                }
            }, function() {});
        }
    };

    $scope.$watch(function() { return modalHome.showModal; }, function(newValue, oldValue) {
        if ( newValue == false ) {
            $scope.load(); // vola sa aj po nacitani stranky
        }
    });
});

app.controller("modHomeCTRL", function($scope, $http, UserData, modalHome, $sce, $templateRequest, $compile) {
    $scope.modal = modalHome;
    $scope.errorMessage = "";

    /* Nacitanie html stranky */
    var loadAPI = $sce.getTrustedResourceUrl('client/components/modals/home.html');
    $templateRequest(loadAPI).then(function(template) {
        $compile($("#mod-home").html(template).contents())($scope);
    });

    $scope.hideModal = function() {
        $scope.modal.hide();
    };

    $scope.add = function() {

    };

    $scope.edit = function() {
        var file = document.querySelector('#imgUpload').files[0];
        if (file != null) {
            getBase64(file).then(function(data) {
                //console.log(data);
                data = data.replace(/^data:image\/\w+;base64,/, ""); // magia :D odstrani texty navise...
                $scope.editSend(data);
            });
        } else {
            $scope.editSend(null);
        }
    };

    $scope.editSend = function(data) {
        if (data == null) {
            $scope.pData = $.param({
                h_id: $scope.modal.data.id,
                icon: $scope.modal.data.icon,
                header: $scope.modal.data.header,
                text: $scope.modal.data.text,
                u_id: UserData.user.u_id
            });
        } else {
            $scope.pData = $.param({
                h_id: $scope.modal.data.id,
                img: data,
                icon: $scope.modal.data.icon,
                header: $scope.modal.data.header,
                text: $scope.modal.data.text,
                u_id: UserData.user.u_id
            });
        }
        $http({
            method: 'POST',
            url: 'server/homeEdit.php',
            data: $scope.pData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'} // musi byt, inak to neposiela data
        }).then(function(value) {
            //console.log(value.data);
            if (value.data == "true") {
                $scope.hideModal();
                // TODO reload
            } else {
                $scope.errorMessage = "Vyskytol sa problem. Skuste to neskor znova.";
            }
        }, function() { });
    } 

    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }
});

app.factory("modalHome", function () {
    return {
        showModal: false,
        edit: false,
        data: {
            id: 0,
            img: null,
            icon: "",
            header: "",
            text: ""
        },

        show: function() {
            this.showModal = true;
        },
    
        hide: function() {
            this.showModal = false;
        },

        clearParam: function() {
            this.edit = false;
            this.data.id = 0;
            this.data.img = null;
            this.data.icon = "";
            this.data.header = "";
            this.data.text = "";
        },

        setParam: function(item) {
            this.edit = true;
            this.data.id = item.h_id;
            this.data.img = null;
            this.data.icon = item.icon;
            this.data.header = item.header;
            this.data.text = item.text;
        }
    }
});