'use strict';

angular.module('phApp').controller('ProjectCtrl', function($scope,$stateParams, $sails){
  $scope.msgs = [];

  $sails.get('/chat/joinProjectRoom', { 'projectId': $stateParams.id } )
  .success(function(msgs){
    $scope.msgs = msgs;
  });

  $sails.on('groupMsg', function(msg){
    $scope.msgs.push(msg);
  });

  $scope.sendMsg = function(){
    $sails.post('/chat/sendGroupMsg', {'projectId': $stateParams.id, 'msg': $scope.msg.message});
  }


});
