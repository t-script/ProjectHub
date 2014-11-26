/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

var app = angular.module('phApp');

app.controller('CustomizeBoardCtrl', ['$scope', '$modalInstance', 'kanbanBoard', function ($scope, $modalInstance, kanbanBoard) {

  /* copy board */
  $scope.tmpBoard = jQuery.extend(true, {}, kanbanBoard);

  $scope.saveBoard = function () {
    if (!this.newCardForm.$valid) {
      return false;
    }
    $modalInstance.close({newBoard: this.tmpBoard});
  };

  $scope.close = function () {
    $modalInstance.close();
  };

  $scope.customizeSortOptions = {

    itemMoved: function (event) {
      event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
    },
    orderChanged: function (event) {
    },
    containment: '#tmpBoard'
  };


}]);

