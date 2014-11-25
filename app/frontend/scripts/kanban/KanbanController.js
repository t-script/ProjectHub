'use strict';

var app = angular.module('phApp');

app.controller('KanbanCtrl', ['$scope', 'BoardService', 'BoardDataFactory', function ($scope, BoardService, BoardDataFactory) {

  function initScope() {
    $scope.kanbanBoard = BoardService.kanbanBoard(BoardDataFactory.kanban); //get data
    $scope.kanbanBoard.numberOfColumns = $scope.kanbanBoard.columns.length; //column count

    /* so five columns work */
    var styleClass = "col-md-" + 12/$scope.kanbanBoard.numberOfColumns.toString();
    styleClass = styleClass.replace(/\./g, '_');
    $scope.columnStyleClass = styleClass;
  }


  $scope.kanbanSortOptions = {

    itemMoved: function (event) {
      event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
    },
    orderChanged: function (event) {
    },
    containment: '#board'
  };




  /* kanban functions */
  $scope.removeCard = function (column, card) {
    BoardService.removeCard($scope.kanbanBoard, column, card);
  }

  $scope.addNewCard = function () {
    BoardService.addNewCard($scope.kanbanBoard);
  }

  initScope();

}]);
