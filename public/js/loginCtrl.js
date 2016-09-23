'use strict';

angular.module('tutorialWebApp').controller('loginCtrl', function($scope, $location, $window/*,page*/) {
    console.log("loginCtrl called");
    // page.setPage("Login","login-layout");
    $scope.user = {};
    $scope.loginUser=function()
    {
        var username=$scope.user.name;
        var password=$scope.user.password;
        console.log("try to login");
        if(username=="admin" && password=="admin123")
        {
            // page.setUser($scope.user);
            $location.path( "/home" );
        }
        else
        {
            $scope.message="Error";
            $scope.messagecolor="alert alert-danger";
        }
    }
});