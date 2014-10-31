angular.module('phStart', ['ui.router'])

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('signin', {
                url: '/signin',
                templateUrl: 'templates/signin/signIn.html',
                controller: 'SinginCtrl'
            })

            .state('signup', {
                url: '/signup',
                templateUrl: 'templates/signin/signUp.html'
            })

            .state('forgotPassword', {
                url: '/forgotPassword',
                templateUrl: 'templates/signin/forgotPassword.html'
            })

            .state('menu', {
                url: '/menu',
                templateUrl: 'templates/signin/menu.html'
            })
}]);
