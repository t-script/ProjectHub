'use strict';

angular.module('phApp').controller('DashboardCtrl', function($scope, $sails) {
  $scope.countProject=0;
  $scope.countTickets=0;
  $scope.countMembers=0;
  $scope.countEvents=0;
  $scope.msgs=[];

  $scope.count = function() {
    $scope.countproject();
    $scope.counttickets();
    $scope.countmembers();
  }

  $scope.countproject = function() {}
  {
    $sails.get('/countProject')
      .success(function(data) {
        $scope.countProject= data.statusCode;
      })
      .error(function(data) {
        console.log(data);
      })
  }

  $scope.counttickets = function() {}
  {
    $sails.get('/countTickets')
      .success(function(data) {
        $scope.countTickets= data.statusCode;
      })
      .error(function(data) {
        console.log(data);
      })
  }

  $scope.countmembers = function() {}
  {
    $sails.get('/countMembers')
      .success(function(data) {
        $scope.countMembers= data.statusCode;
      })
      .error(function(data) {
        console.log(data);
      })
  }

  $scope.sendMsg = function() {
    if ($scope.frmSendMsg.$valid) {
      var data= {text: $scope.message};
      $sails.post('/createMessage',data)
        .success(function(data) {
          $('#message').val(null);
          $scope.getMessage();
        })
    }
  }

  $scope.getMessage = function() {
    $sails.get('/message')
      .success(function(data) {
        $scope.msgs= data;
      })
  }

  $scope.setFocus = function () {
    $('#message').focus();
  }
});
