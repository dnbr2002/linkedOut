'use strict';
angular.module('tutorialWebApp').controller("homeCtrl", function ($scope, $rootScope, $location, $http, DataService) {
    console.log("home controller called");

    $scope.getAllData = function () {
        console.log("Collecting data for view from homeCtrl");
        getUserSummary();


        function getUserSummary (res){
            console.log("am i getting here");
            console.log($rootScope.$id);
            $http({
                method: 'GET',
                url: '/home/'+$rootScope.$id
            }).success(function(response){
                console.log("success");
                console.log();

                $scope.UserSummary=response;
                console.log("my rows: "+JSON.stringify(response));

            }).error(function(error){
                console.log("error");
            });
        };
    }
});
