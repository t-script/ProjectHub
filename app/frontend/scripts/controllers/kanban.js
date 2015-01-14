'use strict';

angular.module('phApp').controller('KanbanCtrl', function ($scope, $stateParams, $sails) {
  var dragNdrop,
    columnDrag,
    columnDrop,
    positionDrag,
    columnsArray=[],
    tmpTickets=[];


  $scope.columns = [];
  $scope.tickets = [];
  $scope.countCol= 0;

  $scope.init = function() {
    getColumns(function(){
      getTickets(function(){
        dragNdrop()
      });
    });
  }

  var getColumns = function(cb) {
    $sails.get('/kanbanColums', {id: $stateParams.id})
      .success(function(data){
        $.each(data, function(index, element){
          if (element.name != 'Backlog') {
            $scope.columns.push(element);
            columnsArray.push(element.id);
            $scope.countCol++;
          }
        });
        cb();
      });
  }

  var getTickets = function(cb) {
    $sails.get('/getTickets', {project: $stateParams.id}).success(function(data) {
      $scope.tickets = data;
      for (var i=0; i < columnsArray.length; i++) {
        $.each(data, function(index, element){
          if (element.columns.id == columnsArray[i]){
            tmpTickets.push(element);
          };
        });
        $('#wip'+columnsArray[i]).html(tmpTickets.length);
        tmpTickets=[];
      }
      cb();
    });
  }

  $sails.on('updateTickets', function(data){
    $scope.tickets.push(data);
  });

  //Drag n Drop Funktionalität
  $scope.dragStart = function(e,ui) {
    columnDrag=$(this).attr('id').substr(1);
    positionDrag = ui.item.index();
  };

  $scope.dragUpdate = function(e,ui) {
    columnDrop=$(this).attr('id').substr(1);
  };

  $scope.dragStop = function(e,ui) {
    console.log('Stop');
    console.log('Position: '+ ui.item.index());
    console.log('Ticket ID: '+ ui.item.attr('id'));
    var value = parseInt($('#wip'+columnDrop).text(),10);

    for (var i = 0; i < $scope.columns.length; i++){
      if ($scope.columns[i].id == columnDrop && ($scope.columns[i].limit > value || $scope.columns[i].limit == 0) ){
        $('#wip'+columnDrop).html(value + 1);
        $('#wip'+columnDrag).html(parseInt($('#wip'+columnDrag).text(),10)-1);
        var data = {oldColumn: columnDrag, newColumn: columnDrop, oldPos: positionDrag, newPos: ui.item.index(), project: $stateParams.id, ticketid: ui.item.attr('id') };
        $sails.post('/updateTicket', data);
        return true;
      }
    }

    return false;
  };

  dragNdrop = function(){
    $('.kanbanColumns').sortable({
      connectWith: ".kanbanColumns",
      start: $scope.dragStart,
      update: $scope.dragUpdate,
      stop: $scope.dragStop
    }).disableSelection();
  }

  $scope.setFocusSearch = function () {
    $('#search').focus();
  }
});

