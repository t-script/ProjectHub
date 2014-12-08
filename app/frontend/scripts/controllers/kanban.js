'use strict';

angular.module('phApp').controller('KanbanCtrl', ['$scope', '$http', function ($scope, $http) {
  var dragNdrop;
  var columnDrop;
  var columnsArray = [];
  var tickets = [];

  $scope.Jcolumns = null;
  $scope.Jtickets = null;

  $scope.init = function() {
    getColumns();
    getTickets();
  }

  var getColumns = function() {
    $http.get('/columns.json').success(function(data) {
      $scope.Jcolumns = data;
      $.each(data, function(index, element){
        columnsArray.push(element.id);
      });
    });
  }

  var getTickets = function() {
    $http.get('/tickets.json').success(function(data) {
      $scope.Jtickets = data;;
      for (var i=0; i < columnsArray.length; i++) {
        $.each(data, function(index, element){
          if (element.columnsid == columnsArray[i]){
            tickets.push(element);
          };
        });
        $.each(tickets, function(index, element) {
          $('#c'+columnsArray[i]).append("<li id='"+element.id+"' class='ticket'>" + element.title + "</li>");
        });
        $('#wip'+columnsArray[i]).html(tickets.length);
        tickets=[];
      }
      dragNdrop();
    });
  }

  //Drag n Drop Funktionalität
  $scope.dragStart = function(e,ui) {
    var column=$(this).attr('id').substr(1);
    var value = parseInt($('#wip'+column).text(),10)-1;
    $('#wip'+column).html(value);
  }

  $scope.dragUpdate = function(e,ui) {
    columnDrop=$(this).attr('id').substr(1);
  }

  $scope.dragStop = function(e,ui) {
    console.log('Stop');
    console.log('Position: '+ ui.item.index());
    console.log('Ticket ID: '+ ui.item.attr('id'));
    var value = parseInt($('#wip'+columnDrop).text(),10)+1;
    $('#wip'+columnDrop).html(value);
  }

  dragNdrop = function(){
    $('.kanbanColumns').sortable({
      connectWith: ".kanbanColumns",
      start: $scope.dragStart,
      update: $scope.dragUpdate,
      stop: $scope.dragStop
    }).disableSelection();
  }
}])
