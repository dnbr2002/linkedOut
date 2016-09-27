'use strict';

angular.module('tutorialWebApp').controller('addPostCtrl',function($scope,$rootScope,$http, currentUser){
	console.log("add post controller called");
	$scope.currentUser = currentUser;
	
	$scope.submitpost=function(){
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
	
	// $scope.getAllPosts=function(){
	// 	$scope.home();
	// };	
});
