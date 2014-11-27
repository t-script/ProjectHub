'use strict';

var app = angular.module('phApp');

app.controller('KanbanCtrl', ['$scope', 'BoardService', 'BoardDataFactory', function ($scope, BoardService, BoardDataFactory) {

  function initScope() {
    $scope.kanbanBoard = BoardService.kanbanBoard(1); //get data
  }


  $scope.kanbanSortOptions = {

    itemMoved: function (event) {
      event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
    },
    orderChanged: function (event) {
    },
    containment: '#board'
  };

  /* services functions */
  $scope.removeCard = function (column, card) {
    BoardService.removeCard($scope.kanbanBoard, column, card);
  }

  $scope.addNewCard = function () {
    BoardService.addNewCard($scope.kanbanBoard);
  }

  $scope.customizeBoard = function () {
    BoardService.customizeBoard($scope.kanbanBoard);
  }

  /**
   * especially so 5 column grid will work
   * @returns {string}
   */
  $scope.getColumnClass = function() {
    var styleClass = "col-md-" + 12/$scope.kanbanBoard.columns.length.toString();
    styleClass = styleClass.replace(/\./g, '_');
    return styleClass;
  }

  initScope();

}]);
