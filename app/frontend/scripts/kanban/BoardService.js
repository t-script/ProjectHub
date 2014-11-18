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

      /**/
      addNewCard: function (scope, ngDialog) {
          scope.value = true;

          ngDialog.open({
            template: '/templates/project/partials/newCard.html',
            controller: 'newCardCtrl',
            className: 'ngdialog-theme-plain',
            scope: scope
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
