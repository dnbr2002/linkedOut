'use strict';

angular.module('tutorialWebApp').controller('loginCtrl', function($scope, $location, $rootScope, DataService, currentUser) {
    console.log("loginCtrl called");
    // page.setPage("Login","login-layout");
    $scope.loginIn = function() {
        console.log("in login() method " + $scope.email + $scope.pwd);
		if ($scope.loginForm.email.$invalid || $scope.loginForm.pwd.$invalid) {
			$scope.signInFormError = "Invalid Credentials";
		} else {
			var params = {
				email : $scope.email,
				password : $scope.pwd
			};
			DataService.postData("/login", params).success(
				function(response) {
					// $window.sessionStorage.userid = response.userid;
					// $window.sessionStorage.email = response.email;
					// $window.sessionStorage.userName = response.name;
					// $window.sessionStorage.usertype = response.usertype;
					// $window.sessionStorage.userLastLogin = response.lastLogin;
					// $rootScope.userid = response.userid;
					$location.path('/home');
					// $rootScope.usertype = response.usertype;
					currentUser.fullname = response.fullname;
					currentUser.userLastLogin = (new Date).toISOString().replace(/z|t/gi,' ');
					currentUser.photoid = response.photoid;
					console.log("in loginCtrl fullname: " + currentUser.fullname);
					console.log("in loginCtrl userLastLogin: " + currentUser.userLastLogin);
					// if($rootScope.usertype == 'usr'){
					// 	$location.path('/home');
					// } else {
					// 	$location.path('/organisation');
					// }
				}).error(function(err) {
				    $scope.signInFormError = err.message;
			    });
		}
	}
});
