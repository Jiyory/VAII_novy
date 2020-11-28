var app = angular.module('VPGumAPP', []);

app.factory('Data', function () {   // sluzi ako zdielane dana - vytvori sa len 1x
    return {
        data: {
            name: 'Inak'
        }
        // Other methods or objects can go here
    };
});

app.controller('titleCTRL', function($scope, Data) {
    $scope.webPage = Data.data; // pozor! akonahle pristupim k premenne (Data.data.name) tak uz to nebude automaticky menit...
    // v html je treba pouzit "webPage.name" a to si bude samo sledovat ci sa zmeni
});

app.controller('bodyCTRL', function($scope, Data) {
    $scope.bodyPremenna = "Smith";
    $scope.nameChange = function() {
        Data.data.name = $scope.name;   // zmenim priamo premennu a zmena sa hned prejavi vsade
        console.log(Data.data);
    };
  }
);

/*// A new factory with an update method
app.factory('MyService', function(){
    return {
      data: {
        firstName: '',
        lastName: ''
      },
      update: function(first, last) {
        // Improve this method as needed
        this.data.firstName = first;
        this.data.lastName = last;
      }
    };
  });
  
  // Your controller can use the service's update method
  app.controller('SecondCtrl', function($scope, MyService){
     $scope.data = MyService.data;
  
     $scope.updateData = function(first, last) {
       MyService.update(first, last);
     }
  });*/


app.factory('MyService', function(){
  return {
    data: {
      firstName: '',
      lastName: ''
    }
    // Other methods or objects can go here
  };
});

app.controller('FirstCtrl', function($scope, MyService){
  $scope.data = MyService.data;
});

app.controller('SecondCtrl', function($scope, MyService){
   $scope.data = MyService.data;
});