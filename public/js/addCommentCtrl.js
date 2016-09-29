'use strict';

angular.module('tutorialWebApp').controller('addCommentCtrl',function($scope,$rootScope,$http, currentUser){
    console.log("add comment controller called");
    $scope.currentUser = currentUser;

    $scope.submitComment=function(){
        $http({
            method: 'POST',
            url: '/addcomment',
            data: {
                userid:$rootScope.$id,
                postid: $scope.referencepost,
                postbody: $scope.commentbody
            }
        }).success(function(response){
            console.log("success");
            $scope.postbody = "";
        }).error(function(error){
            console.log("addcommentCtrl error:");
        });
    };

    // $scope.getAllPosts=function(){
    // 	$scope.home();
    // };
});
