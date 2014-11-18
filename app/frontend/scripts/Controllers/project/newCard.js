/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

var app = angular.module('phApp');

app.controller('newCardCtrl', ['$scope', 'BoardManipulator', function ($scope, BoardManipulator) {

  function initScope(scope) {
    scope.ticket = '';
    scope.name = '';
    scope.columnName = '';
    scope.description = '';
  }

  $scope.addNewCard = function () {
    if (!this.newTicketForm.$valid) {
      return false;
    }

    //add new ticket here
    BoardManipulator.addCardToColumn($scope.kanbanBoard, $scope.ticket.column, $scope.ticket.title, $scope.ticket.description)
    //$modalInstance.close({title: this.title, column: column, details: this.details});
    $scope.closeThisDialog('');
  };

  initScope($scope);

}]);

