'use strict';

angular.module('phApp').controller('ChatCtrl', function($scope, $sails){
  $scope.users = [];

    $sails.on('connect', function(){
      $scope.subscribeUsers();
    });

    $sails.on('user', function(msg){
      if (msg.verb == 'updated') {
        if ($scope.users[msg.data.username]){
          $scope.users[msg.data.username] = msg.data;
        }else{
          $scope.users.push(msg.data);
        }
      }
    });

  $scope.subscribeUsers = function(){
    $sails.get('/chat/subscribeUsers')
      .success(function(data){
        $scope.users = data;
      })
      .error(function(data){
        console.log(data);
      });
  }
});
