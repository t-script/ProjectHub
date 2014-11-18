'use strict';

/**
 *
 */

var app = angular.module('phApp');

app.controller('KanbanCtrl', ['$scope', 'BoardService', 'BoardDataFactory', 'ngDialog', function ($scope, BoardService, BoardDataFactory, ngDialog) {

  $scope.kanbanBoard = BoardService.kanbanBoard(BoardDataFactory.kanban);

  $scope.kanbanSortOptions = {

      itemMoved: function (event) {
          event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
      },
      orderChanged: function (event) {
      },
      containment: '#board'
  };

  $scope.removeCard = function (column, card) {
      BoardService.removeCard($scope.kanbanBoard, column, card);
  }

  $scope.addNewTicket = function () {
      BoardService.addNewCard($scope, ngDialog);
  }

}]);
