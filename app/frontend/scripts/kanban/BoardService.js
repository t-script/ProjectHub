/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

var app = angular.module('phApp');

app.service('BoardService', ['$modal', 'BoardManipulator', function ($modal, BoardManipulator) {

  return {
      /**/
      removeCard: function (board, column, card) {
        if (confirm('Are You sure to Delete?')) {
          BoardManipulator.removeCardFromColumn(board, column, card);
        }
      },

    addNewCard: function (kanbanBoard) {
      var modalInstance = $modal.open({
        templateUrl: '/templates/project/kanban/newCard.html',
        controller: 'NewCardCtrl',
        backdrop: 'static',
        resolve: {
          kanbanBoard: function () {
            return kanbanBoard;
          }
        }
      });
      modalInstance.result.then(function (cardDetails) {
        if (cardDetails) {
          BoardManipulator.addCardToColumn(kanbanBoard, cardDetails.column, cardDetails.title, cardDetails.details);
        }
      });
    },


      kanbanBoard: function (board) {
        var kanbanBoard = new Board(board.name, board.numberOfColumns);
        angular.forEach(board.columns, function (column) {
          BoardManipulator.addColumn(kanbanBoard, column.name);
          angular.forEach(column.cards, function (card) {
            BoardManipulator.addCardToColumn(kanbanBoard, column, card.title, card.details);
          });
        });
        return kanbanBoard;
      }
    };
}]);
