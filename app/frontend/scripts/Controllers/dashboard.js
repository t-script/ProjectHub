'use strict';

angular.module('phApp').controller('DashboardCtrl', ['$scope', function ($scope) {
  $scope.countProject=0;
  $scope.countTickets=0;
  $scope.countMembers=0;
  $scope.countEvents=0;
}]);
