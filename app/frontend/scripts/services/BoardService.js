/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

var app = angular.module('phApp');

app.service('BoardService', ['$modal', 'BoardManipulator', function ($modal, BoardManipulator) {

  var columnURL = "/testDB/column.json";
  var ticketURL = "/testDB/ticket.json";

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
      kanbanBoard: function (board_id) {
        var kanbanBoard = new Board(board_id);

        /* add columns to board */
        $.ajax({
          url: columnURL,
          dataType: 'json',
          async: false,
          success: function(data) {
            $.each(data,
              function(index, column){

                //allItems.push(item);
                if(column.kanbanid == board_id)
                {
                  BoardManipulator.addColumn(kanbanBoard, column._id, column.position, column.name, column.limit);
                }
              });
          }
        });

        /* add cards to columns */
      $.ajax({
        url: ticketURL,
        dataType: 'json',
        async: false,
        success: function(data) {
          $.each(data,
            function(index, ticket){


              for(var i=0; i<kanbanBoard.columns.length; i++) {
                if (ticket.columnid == kanbanBoard.columns[i]._id) {
                  BoardManipulator.addCardToColumn(kanbanBoard, kanbanBoard.columns[i], ticket.title, ticket.description);
                  break;
                }
              }
            });
        }
      });

        return kanbanBoard;
      },

      columns: function (board) {

      }
    };
}]);
