/*
 * Kontroler pre spodne menu stranky
 */
app.controller("footerCTRL", function($scope, $sce, $templateRequest, $compile, WebPage) {
   
    $scope.title = WebPage.title;
    $scope.menu = WebPage.menu;

     /* Nacitanie html stranky */
     var loadAPI = $sce.getTrustedResourceUrl('client/components/footer.html');
     $templateRequest(loadAPI).then(function(template) {
         $compile($("#footer").html(template).contents())($scope);
     });
});