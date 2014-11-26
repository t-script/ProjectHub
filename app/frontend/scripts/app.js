var app = angular.module('phApp', [
        'ui.router',
        'ui.sortable',
        'ui.bootstrap',
        'ngDialog'
    ]);

    app.config(['ngDialogProvider', function (ngDialogProvider) {
      ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        plain: false,
        showClose: true,
        closeByDocument: false,
        closeByEscape: true,
        appendTo: false,
        preCloseCallback: function () {
          console.log('default pre-close callback');
        }
      });
    }]);

    app.config(
      ['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
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

            /* ---- JUST FOR TESTING ---- */
            .state('kanban', {
                url: '/project/kanban',
                views: {
                    "mainView": {templateUrl: '/templates/project/kanban/kanban.html'}
                },
                controller: 'KanbanCtrl'
            })
    }]);


