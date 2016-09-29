'use strict';

angular.module('tutorialWebApp').controller('registrationCtrl', function($scope, $location, $rootScope, $http, DataService, currentUser)
{
    console.log("registrationCtrl called");
    $scope.$parent.signInFormError = '';

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
                        $scope.$parent.signInFormError = "User exists, try another username";
                    }
                    else
                    {
                        $scope.$parent.signInFormError = "User creation failed, try again.";
                    }
                    $location.path('#/register');
                }
            );
    }
});
