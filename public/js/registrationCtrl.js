<<<<<<< HEAD
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
=======
angular.module('tutorialWebApp').controller('registrationCtrl', function($scope, $location, $rootScope, $http, DataService, currentUser)
{
    console.log("registrationCtrl called");
    $scope.registrationError = '';

    $scope.registerUser = function()
    {
        console.log('Doing user registration');
        var params = {
            username: $scope.email,
            fullname: $scope.fullname,
            password: $scope.password
        };

        DataService.postData('/adduser', params).success(
            function(response)
            {
                console.log(response);
                currentUser.email = response.username;
                currentUser.fullname = response.fullname;
                $location.path('/');
            }).error(
                function(err)
                {
                    console.log(err);
                    if (err === 'existing')
                    {
                        $scope.registrationError = "User exists, try another username";
                    }
                    else
                    {
                        $scope.registrationError = "User creation failed, try again.";
                    }
                    $location.path('/register');

                    $("#createme").shake(3, 7, 800);
                }
            );
    }


    $scope.clearErr = function()
    {
        $scope.registrationError = '';
    }
});
>>>>>>> 842f7acdda2b2c783c62e139cb14f02abe5fa10f
