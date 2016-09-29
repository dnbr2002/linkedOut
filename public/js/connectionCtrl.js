'use strict';
angular.module('tutorialWebApp').controller("connectionCtrl", function($scope, $rootScope, $http, DataService, currentUser) {

	$scope.getAllData = function() {
		console.log("getAllData Getting called");
		getAllConnections();
		getUnConnectted();

		function getAllConnections (){
			var uri = "/connect/" + currentUser.pk_user;		
			DataService.getData(uri,[]).success(function(response){
				$scope.connecttedList = response;
				console.log("connectionList: "+JSON.stringify(response));				
			}).error(function(err){
				console.log(err.message);
			});
		};

		function getUnConnectted (){
			var uri = "/getnonfollowers/" + currentUser.pk_user;		
			DataService.getData(uri,[]).success(function(response){
				$scope.unconnecttedList = response;
				console.log("unconnecttedList: "+JSON.stringify(response));				
			}).error(function(err){
				console.log(err.message);
			});
		};
	}		

	$scope.disconnect = function(followerid){	
		console.log("In disconnect " + followerid);
        $http({
			method: 'POST',
			url: '/disconnect',
			data: {
				userid:currentUser.pk_user,
				followerid:followerid								
			}
		}).success(function(response){
			console.log("disconnect success");
			$scope.getAllData();
		}).error(function(error){
			console.log("error");
		});
    }

	$scope.connect = function(followerid){	
		console.log("In connect " + followerid);
        $http({
			method: 'POST',
			url: '/connect',
			data: {
				userid:currentUser.pk_user,
				followerid:followerid								
			}
		}).success(function(response){
			console.log("connect success");
			$scope.getAllData();
		}).error(function(error){
			console.log("error");
		});
    }
});
