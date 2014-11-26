/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

var app = angular.module('phApp');

app.service('BoardService', ['$modal', 'BoardManipulator', function ($modal, BoardManipulator) {

  return {

    removeCard: function (board, column, card) {
      if (confirm('Are You sure to Delete?')) {
        BoardManipulator.removeCardFromColumn(board, column, card);
      }
    },

    addNewCard: function (kanbanBoard) {
      var modalInstance = $modal.open({
        templateUrl: '/templates/project/services/newCard.html',
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

    customizeBoard: function (kanbanBoard) {
      var modalInstance = $modal.open({
        templateUrl: '/templates/project/services/customize.html',
        controller: 'CustomizeBoardCtrl',
        backdrop: 'static',
        resolve: {
          kanbanBoard: function () {
            return kanbanBoard;
          }
        }
      });
      modalInstance.result.then(function (newBoard) {
        if (newBoard) {
          kanbanBoard = newBoard;
        }
      });
    },

    /**
     * create the kanbanBoard object here
     * */
      kanbanBoard: function (board) {
        var kanbanBoard = new Board(board.name);

        for (var i=0; i < board.columns.length; i++) {
          BoardManipulator.addColumn(kanbanBoard, i, board.columns[i].title, board.columns[i].description, board.columns[i].limit);
          angular.forEach(board.columns[i].cards, function (card) {
            BoardManipulator.addCardToColumn(kanbanBoard, board.columns[i], card.title, card.details);
          });
        }
        return kanbanBoard;
      }
    };
}]);
