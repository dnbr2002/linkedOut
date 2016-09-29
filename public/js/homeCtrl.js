'use strict';

angular.module('tutorialWebApp').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
angular.module('tutorialWebApp').controller("homeCtrl", function ($scope, $rootScope, $location, $http, DataService, currentUser) {
    console.log("home controller called");
    $scope.currentUser = currentUser;

    $scope.commentInput = {};

    $scope.getAllData = function () {
        console.log("Collecting data for view from homeCtrl");
        getUserSummary();
        getPosts();
    }


    function getPosts() {
        var uriPosts = "/posts/" + currentUser.pk_user;
        console.log(uriPosts);

        DataService.getData(uriPosts, []).success(function (response) {
            $scope.postData = response;
            console.log("getPosts: " + JSON.stringify(response));
        }).error(function (err) {
            console.log(err);
        });
    }

    /**
     * Function for getting User Summary data data for the user
     */
    function getUserSummary() {
        var uriEmployment = "/home/" + currentUser.pk_user;
        DataService.getData(uriEmployment, []).success(function (response) {
            $scope.UserSummary = response;
            //console.log("User Summary:  " + JSON.stringify(response));
        }).error(function (err) {
            console.log(err);
        });
    }


    $scope.shareUpdate = function () {
        console.log("shareUpdate called");

    };

    $scope.uploadPhoto = function () {
        console.log("uploadPhoto called");

    };

    $scope.addPost = function () {
        $scope.showAddPost = false;
        var fd = new FormData();
        fd.append('file', $scope.filecontents);
        fd.append('post', $scope.postbody);
        fd.append('userid', currentUser.pk_user);
        $http.post('/addpost', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function (response) {
            console.log("Home ctrl add post success");
            $scope.post = "";
            getPosts();
        })
        .error(function (error) {
            console.log(error);
        });

    };


    $scope.addComment = function (postId) {


        var text = $scope.commentInput[postId];
        console.log("comment text:", text);
        console.log("postid: ", postId);

        $http({
            method: 'POST',
            url: '/addcomment',
            data: {
                userid: currentUser.pk_user,
                post: text,
                refpostid: postId
            }
        }).success(function (response) {
            console.log("success");
            $scope.commentInput[postId] = "";
            getPosts();
        }).error(function (error) {
            console.log("homectrl add comment error");
        });

    };
});
