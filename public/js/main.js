/**
 * Main AngularJS Web Application
 */
var app = angular.module('tutorialWebApp', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/home", {templateUrl: "partials/home.html", controller: "homeCtrl"})
    // Login
    .when("/", {templateUrl: "partials/login.html", controller: "loginCtrl"})
    // Pages
    .when("/network", {templateUrl: "partials/network.html", controller: "PageCtrl"})
    .when("/messages", {templateUrl: "partials/messages.html", controller: "messageCtrl"})
    .when("/profile", {templateUrl: "partials/profile.html", controller: "profileCtrl"})
    .when("/connections", {templateUrl: "partials/connections.html", controller: "connectionCtrl"})
    .when("/learning", {templateUrl: "partials/learning.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});