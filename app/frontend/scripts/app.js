angular.module('phApp', [
  'ui.router',
  'ngSails'
])

  .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$sailsProvider', function($urlRouterProvider, $stateProvider, $locationProvider, $sailsProvider) {
    $urlRouterProvider.otherwise('/');

    $sailsProvider.url = 'http://localhost:1337';

    $stateProvider
      .state('dashboard', {
        url: '/',
        views: {
          "mainView": {
            templateUrl: '/templates/dashboard.html',
            controller: 'DashboardCtrl'
          },
          "pageTitle": {template: 'Dashboard'}
        }
      })

      .state('projects', {
        url: '/projects',
        views: {
          "mainView": {
            templateUrl: '/templates/projects.html',
            controller: 'ProjectsCtrl'
          },
          "pageTitle": {template: 'Projects'}
        }
      })

      .state('project', {
        url: '/project/:id',
        views: {
          "mainView": {
            templateUrl: '/templates/project.html',
            controller: 'ProjectCtrl'
          },
          "projectChatView": {
            templateUrl: '/templates/projectChat.html',
            controller: 'ProjectCtrl'
          },
          "pageTitle": {template: 'Project / ProjectName'}
        }
      })

      .state('project.start', {
        views: {
          "projectView": {
            templateUrl: '/templates/start.html',
            controller: 'ProjectCtrl'
          },
          "projectChatView": {
            templateUrl: '/templates/projectChat.html',
            controller: 'ProjectCtrl'
          }
        }
      })

      .state('project.backlog', {
        url: '/backlog',
        views: {
          "projectView": {
            templateUrl: '/templates/backlog.html',
            controller: 'BacklogCtrl'
          },
          "pageTitle": {template: 'Project/ ProjectName / Backlog'}
        }
      })

      .state('project.kanban', {
        url: '/kanban',
        views: {
          "projectView": {
            templateUrl: '/templates/kanban.html',
            controller: 'KanbanCtrl'
          },
          "pageTitle": {template: 'Project/ ProjectName / Kanban'}
        }
      })

      .state('project.planningpoker', {
        url: '/planningpoker',
        views: {
          "projectView": {
            templateUrl: '/templates/poker.html',
            controller: 'PokerCtrl'
          },
          "projectChatView": {
            templateUrl: '/templates/projectChat.html',
            controller: 'ProjectCtrl'
          },
          "pageTitle": {template: 'Project/ ProjectName / Planning Poker'}
        }
      })

      .state('project.files', {
        url: '/files',
        views: {
          "projectView": {
            templateUrl: '/templates/projectfiles.html',
            controller: 'FilesCtrl'
          },
          "pageTitle": {template: 'Project/ ProjectName / Files'}
        }
      })

      .state('tickets', {
        url: '/tickets',
        views: {
          "mainView": {
            templateUrl: '/templates/tickets.html',
            controller: 'TicketsCtrl'
          },
          "pageTitle": {template: 'Tickets'}
        }
      })

      .state('calendar', {
        url: '/calendar',
        views: {
          "mainView": {
            templateUrl: '/templates/calendar.html',
            controller: 'CalendarCtrl'
          },
          "pageTitle": {template: 'Calendar'}
        }
      })

      .state('files', {
        url: '/files',
        views: {
          "mainView": {
            templateUrl: '/templates/files.html',
            controller: 'FilesCtrl'
          },
          "pageTitle": {template: 'Files'}
        }
      })

      .state('settings', {
        url: '/settings',
        views: {
          "mainView": {
            templateUrl: '/templates/settings.html',
            controller: 'SettingsCtrl'
          },
          "pageTitle": {template: 'Settings'}
        }
      })

      //$locationProvider.html5Mode(true);
  }]);
