'use strict';

angular.module('phApp').controller('BacklogCtrl', function($scope, $stateParams, $sails){
  $scope.tickets = [];

  $scope.showTicket = function() {
    $('#addNewTicket').hide();
    $('#addTicket').show();
  }

  $scope.getTickets = function () {
    $sails.get('/getTickets', { project: $stateParams.id})
      .success(function (data) {
        $scope.tickets = data;
      })
      .error(function (data) {
        console.log(data);
      })
  }

  $scope.addTicket = function () {
    if ($scope.frmAddTicket.$valid) {
      $('#ticketTitle').val(null);
      $('#ticketDescription').val(null);
      $('#addNewTicket').show();
      $('#addTicket').hide();
      var data = {ticketid: 1, title: $scope.ticketTitle, description: $scope.ticketDescription, project: $stateParams.id };
      $sails.post('/createTickets', data)
        .success(function (data) {
          console.log('success');
          $scope.getTickets();
        })
        .error(function (data) {
          console.log(data)
        })
    }
  }

  $scope.setTicketReady = function (obj) {
    $sails.post('/addTicketToBoard', {project: $stateParams.id, ticketid: obj.id})
      .success(function(data){
        $scope.tickets= data;
      })
      .error(function (data) {
        console.log(data);
      })
  }

  $scope.setFocusSearch = function () {
    $('#search').focus();
  }

  $scope.setFocusClass = function () {
    $('#service').focus()
  }

});
