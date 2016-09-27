'use strict';
angular.module('tutorialWebApp').controller("homeCtrl", function ($scope, $rootScope, $location, $http, DataService) {
    console.log("home controller called");

    $scope.getAllData = function () {
        console.log("Collecting data for view from homeCtrl");
        getUserSummary();
        getPosts();

/*
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
        */

        /**
         * Function for getting Employment data for the user
         */
        function getPosts() {
            var uriPosts = "/posts/" + $rootScope.$id;
            console.log(uriPosts);

            DataService.getData(uriPosts, []).success(function(response) {
                $scope.postData = response;
                console.log("getPosts: "+ JSON.stringify(response));
            }).error(function(err) {
                console.log(err);
            });
        }

        /**
         * Function for getting Employment data for the user
         */
        function getUserSummary() {
            var uriEmployment = "/home/" + $rootScope.$id;
            DataService.getData(uriEmployment, []).success(function(response) {
                $scope.UserSummary = response;
                console.log("User Summary:  "+JSON.stringify(response));
            }).error(function(err) {
                console.log(err);
            });
        }

        
    }

    $scope.shareUpdate=function(){
        console.log("shareUpdate called");
			
	};

    // function shareUpdate() {
    //         console.log("shareUpdate called");
    //         // var uriPosts = "/posts/" + $rootScope.$id;
    //         // console.log(uriPosts);

    //         // DataService.getData(uriPosts, []).success(function(response) {
    //         //     $scope.postData = response;
    //         //     console.log("getPosts: "+ JSON.stringify(response));
    //         // }).error(function(err) {
    //         //     console.log(err);
    //         // });
    //     }

        $scope.uploadPhoto=function(){
            console.log("uploadPhoto called");
			
	    };

        $scope.addPost=function(){
            $scope.showAddPost = false;
            $http({
			method: 'POST',
			url: '/addpost',
			data: {
				userid:$rootScope.$id,
				posttime:(new Date).toUTCString(),
				postbody: $scope.postbody				
			}
            }).success(function(response){
                console.log("success");
                $scope.postbody = "";
            }).error(function(error){
                console.log("error");
            });
			
	    };
});
