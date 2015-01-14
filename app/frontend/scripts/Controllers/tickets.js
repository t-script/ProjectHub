'use strict';

angular.module('phApp').controller('TicketsCtrl', function($scope, $sails){
  $scope.tickets=[]

  $scope.getTickets= function () {
    $sails.get('/getTicketsbyUser')
      .success(function(data) {
        console.log(data);
        $scope.tickets= data;
      })
      .error(function(data) {
        $scope.tickets= data;
      })
  }

});

