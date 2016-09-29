'use strict';

angular.module('tutorialWebApp').controller('loginCtrl', function($scope, $location, $rootScope, DataService, currentUser)
{
    // Method that calls the RESTful API.
    $scope.register = function()
    {
        $scope.regError = "";
        var params =
        {
            username: $scope.username,
            fullname: $scope.fullname,
            password: $scope.password
        };
        DataService.postData('/adduser', params).success(
            function(response)
            {
                currentUser.email = response.username;
                currentUser.fullname = response.fullname;

                $location.path('/home');
            }
        ).error(
            function(err)
            {
                $scope.regError = "Invalid password.";
            }
        );

    }
}
