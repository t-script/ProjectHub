'use strict';

angular.module('phApp').controller('BacklogCtrl', function($scope, $stateParams, $sails){
  $scope.tickets = [];

  $scope.showTicket = function() {
    $('#addNewTicket').hide();
    $('#addTicket').show();
  }

  $scope.getTickets = function () {
    $sails.get('/tickets/?project='+$stateParams.id)
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
      var data = {ticketid: 1, title: $scope.ticketTitle, description: $scope.ticketDescription, projectid: $stateParams.id };
      $sails.post('/tickets', data)
        .success(function (data) {
          console.log('success');
          $scope.getTickets();
        })
        .error(function (data) {
          console.log(data)
        })
    }
  }

});
