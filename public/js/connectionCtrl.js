'use strict';
angular.module('tutorialWebApp').controller("connectionCtrl", function($scope, $rootScope, DataService) {

	$scope.getAllConnections = function(){
		
		var uri = "/connect/" + $rootScope.$id;
		
		DataService.getData(uri,[]).success(function(response){
			console.log("All conns: " + response.data);
			$scope.connectionList = response;
			console.log("connectionList: "+JSON.stringify(response));				
		}).error(function(err){
			console.log(err.message);
		});
	}
});
