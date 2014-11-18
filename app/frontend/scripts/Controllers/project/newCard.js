/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

var app = angular.module('phApp');

app.controller('newCardCtrl', ['$scope', 'ngDialog', function ($scope, ngDialog) {

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

    //$modalInstance.close({title: this.title, column: column, details: this.details});
    $scope.closeThisDialog('');
  };

  initScope($scope);

}]);

