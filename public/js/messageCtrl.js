'use strict';
angular.module('tutorialWebApp').controller("messageCtrl", function ($scope, $rootScope, $http, $location, DataService, currentUser) {
    console.log("profile controller called");
    $scope.currentUser = currentUser;
    $scope.messagebk = {};
    $scope.showRespond = {};

    console.log("getAllData Getting called");
    getMessageList();


    // Function for getting Education data for the user
    function getMessageList() {
        // console.log("in getEducationList");
        var uriEducation = "/getmessages/" + currentUser.pk_user;
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

    $scope.respondMessage = function (fromid) {
        $scope.showRespond[fromid] = false;
        var text = $scope.messagebk[fromid];
        console.log("respondMessge: $scope.messagebk " + text);
        $http({
            method: 'POST',
            url: '/messageback',
            data: {
                messengerid:currentUser.pk_user,
                messageeid:fromid,
                message:text				
            }
        }).success(function(response){
            console.log("success");
            $scope.messagebk[fromid] = "";
            getMessageList();
        }).error(function(error){
            console.log("error");
        });
        
    };
});
