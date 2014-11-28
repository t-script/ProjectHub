angular.module('phApp', ['ui.router'])

  .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('dashboard', {
        url: '/',
        views: {
          "mainView": {templateUrl: '/templates/dashboard.html'}
        },
        controller: 'DashboardCtrl'
      })

      .state('projects', {
        url: '/projects',
        views: {
          "mainView": {templateUrl: '/templates/projects.html'}
        },
        controller: 'ProjectsCtrl'
      })

      .state('kanban', {
        url: '/projects/kanban',
        views: {
          "mainView": {templateUrl: '/templates/kanban.html'}
        },
        controller: 'KanbanCtrl'
      })

      .state('tickets', {
        url: '/tickets',
        views: {
          "mainView": {templateUrl: '/templates/tickets.html'}
        },
        controller: 'TicketsCtrl'
      })

      .state('calendar', {
        url: '/calendar',
        views: {
          "mainView": {templateUrl: '/templates/calendar.html'}
        },
        controller: 'CalendarCtrl'
      })

      .state('files', {
        url: '/files',
        views: {
          "mainView": {templateUrl: '/templates/files.html'}
        },
        controller: 'FilesCtrl'
      })

      .state('settings', {
        url: '/settings',
        views: {
          "mainView": {templateUrl: '/templates/settings.html'}
        },
        controller: 'SettingsCtrl'
      })

      $locationProvider.html5Mode(true);
  }]);


