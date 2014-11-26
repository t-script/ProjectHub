/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

var app = angular.module('phApp');

app.controller('NewCardCtrl', ['$scope', '$modalInstance', 'kanbanBoard', function ($scope, $modalInstance, kanbanBoard) {

  function initScope(scope) {
    scope.kanbanBoard = kanbanBoard;
    scope.title = '';
    scope.column = scope.kanbanBoard.columns[0];
    scope.type = '';
    scope.category = '';
    scope.description = '';
  }

  $scope.addNewCard = function () {
    if (!this.newCardForm.$valid) {
      return false;
    }
    $modalInstance.close({title: this.title, column: this.column, details: this.description});
  };

  $scope.close = function () {
    $modalInstance.close();
  };

  initScope($scope);

}]);

