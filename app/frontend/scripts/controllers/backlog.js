'use strict';

angular.module('phApp').controller('BacklogCtrl', function($scope, $sails){
  $scope.addTicket = function () {
    if ($scope.frmAddTicket.$valid) {
      var data = {ticketid: 1, title: $scope.ticketTitle, description: $scope.ticketDescription };
      $sails.post('/tickets', data)
        .success(function (data) {
          console.log('success');
        })
        .error(function (data) {
          console.log(data)
        })
    }
  }

});
