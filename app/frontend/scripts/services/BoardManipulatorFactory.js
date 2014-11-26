/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

angular.module('phApp').factory('BoardManipulator', function () {
  return {

    createBacklog: function (board, backlogName) {
      board.backlogs.push(new Backlog(backlogName));
    },

    addColumn: function (board, index, columnName, columnDescription, columnLimit) {
      board.columns.splice(index, 0, new Column(columnName, columnDescription, columnLimit));
    },

    addCardToColumn: function (board, column, cardTitle, details) {
      angular.forEach(board.columns, function (col) {
        if (col.title === column.title) {
          col.cards.push(new Card(cardTitle, column.title, details));
        }
      });
    },
    removeCardFromColumn: function (board, column, card) {
      angular.forEach(board.columns, function (col) {
        if (col.name === column.name) {
          col.cards.splice(col.cards.indexOf(card), 1);
        }
      });
    }
  };
});
