settingsCTRL = function($scope, $http, User, $location) {
    if (User.acc == null) {
        $location.path("#!/");
    }
}

app.controller("settingsCTRL", settingsCTRL);