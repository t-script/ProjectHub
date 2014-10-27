var loginApp = angular.module('loginApp', ['ngRoute']);

loginApp.config(function ($routeProvider) {
    $routeProvider.when('/signin', {
        templateUrl: 'templatesLogin/signin.html'
        //controller: 'Ctrl'
    })
        .when ('/signup', {
        templateUrl: 'templatesLogin/signup.html'
        //controller: 'Ctrl'
    })
        .when ('/forgot', {
        templateUrl: 'templatesLogin/forgot.html'
        //controller: 'Ctrl'
    });
});
