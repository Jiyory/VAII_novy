bottomCTRL = function($scope, $sce, $compile, $templateRequest) {
    var loadAPI = $sce.getTrustedResourceUrl('client/html/bottom.html');
    $templateRequest(loadAPI).then(function(template) {
        $compile($("#bottom").html(template).contents())($scope);
    });
}

app.controller("bottomCTRL", bottomCTRL);