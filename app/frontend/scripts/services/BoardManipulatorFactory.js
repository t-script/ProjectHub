/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

angular.module('phApp').factory('BoardManipulator', function () {

  return {

    addColumn: function (board, columnId, position, columnName, columnLimit) {
      board.columns.splice(position, 0, new Column(columnId, columnName, columnLimit));
      return board;
    },

    addCardToColumn: function (board, column, cardTitle, details) {
      column.cards.push(new Card(cardTitle, column.title, details));
      angular.forEach(board.columns, function (col) {
        if (col.title === column.title) {
          //col.cards.push(new Card(cardTitle, column.title, details));
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
