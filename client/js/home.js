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
    $scope.load();

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
        //modalHome.show();
    };
});

app.controller("modHomeCTRL", function($scope, $http, UserData, modalHome, $sce, $templateRequest, $compile) {
    $scope.modal = modalHome;

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

    };
});

app.factory("modalHome", function () {
    return {
        showModal: false,
        edit: false,
        data: {
            id: 0,
            img: "",
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
            this.data.img = "";
            this.data.icon = "";
            this.data.header = "";
            this.data.text = "";
        },

        setParam: function(item) {
            this.edit = true;
            this.data.id = item.h_id;
            this.data.img = item.img;
            this.data.icon = item.icon;
            this.data.header = item.header;
            this.data.text = item.text;
        }
    }
});