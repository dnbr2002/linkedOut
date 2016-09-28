'use strict';
angular.module('tutorialWebApp').controller("connectionCtrl", function($scope, $rootScope, $http, DataService) {

	$scope.getAllData = function() {
		console.log("getAllData Getting called");
		getAllConnections();
		getUnConnectteds();

		function getAllConnections (){
			var uri = "/connect/" + $rootScope.$id;		
			DataService.getData(uri,[]).success(function(response){
				$scope.connecttedList = response;
				console.log("connectionList: "+JSON.stringify(response));				
			}).error(function(err){
				console.log(err.message);
			});
		};

		function getUnConnectteds (){
			var uri = "/unconnectted/" + $rootScope.$id;		
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
				userid:$rootScope.$id,
				followerid:followerid								
			}
		}).success(function(response){
			console.log("success");
		}).error(function(error){
			console.log("error");
		});
    }
});
