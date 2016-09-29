'use strict';
angular.module('tutorialWebApp').controller("messageCtrl", function ($scope, $rootScope, $http, $location, DataService, currentUser) {
    console.log("profile controller called");
    $scope.currentUser = currentUser;

    console.log("getAllData Getting called");
    getMessageList();


    // Function for getting Education data for the user
    function getMessageList() {
        // console.log("in getEducationList");
        var uriEducation = "/getmessages/" + $rootScope.$id;
        // console.log("uriEducation: " + uriEducation);
        DataService.getData(uriEducation, []).then(
            function (response) {
                $scope.messageData = response.data;
                console.log("returned data from messageCtrl");
                console.log("messageData: " + JSON.stringify(response.data));
            },
            function (err) {
                console.log(err);
            }
        );
    }

   

});
