angular.module('tutorialWebApp').service('DataService', function($http) {

	this.getData = function(dataURI, params) {
		console.log("In dataService Get: " +dataURI);
		return $http({
			method : 'GET',
			url : dataURI,
			data : params
		});
	}

	this.postData = function(dataURI, params) {
		return $http({
			method : 'POST',
			url : dataURI,
			data : params
		});
	}

	this.putData = function(dataURI, params) {
		return $http({
			method : 'PUT',
			url : dataURI,
			data : params
		});
	}
	
	this.deleteData = function(dataURI, params) {
		return $http({
			method : 'DELETE',
			url : dataURI,
			data : params,
			headers: {"Content-Type": "application/json;charset=utf-8"} /* TO SEND BODY IN DELETE*/
		});
	} 
	
});

angular.module('tutorialWebApp').value('currentUser',{
	email: "test@fakeemail.com",
	fullname: "Sample Fullname",
	userLastLogin:"-1",
	photoid:-1,
	pk_user:-1
});