/*
 * Kontroler pre rotacny panel
 */
app.controller("rotateBarCTRL", function($scope, PageDataFA, $templateRequest, $sce, $compile) {
    $scope.loading = true;
    $scope.data = [ // TODO nacitat z databazy
        {
            head: "Nadpis1",
            text: "Popis k obrazku 1",
            img: '<img src="client/design/rotate1.jpg" alt="{{item.head}}">',
        },
        {
            head: "Nadpis2",
            text: "Popis k obrazku 2",
            img: '<img src="client/design/rotate2.jpg" alt="{{item.head}}">',
        },
        {
            head: "Nadpis3",
            text: "Popis k obrazku 3",
            img: '<img src="client/design/rotate3.jpg" alt="{{item.head}}">',
        },
        {
            head: "Nadpis4",
            text: "Popis k obrazku 4",
            img: '<img src="client/design/rotate0.jpg" alt="{{item.head}}">',
        }
    ]

    var templateUrl = $sce.getTrustedResourceUrl('client/comp/rotate.html');

    $templateRequest(templateUrl).then(function(template) {
        $compile($("#rotateBar").html(template).contents())($scope);
        $scope.loading = false;
    }, function() {
        // An error has occurred
    });

    $scope.addClasses = function(id) {
        if (id == 0)
            return "active";
        else
            return "";
    };
});