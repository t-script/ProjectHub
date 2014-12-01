'use strict';

angular.module('phApp').controller('ProjectCtrl', function($scope, $stateParams, $sails){
  $scope.members = [];
  $scope.users = [];
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

  $scope.getUsers = function () {
    $sails.get('/user')
      .success(function (data) {
        angular.forEach(data, function (value, key) {
          $scope.users.push(value.username);
        });
        $('#memberName').autocomplete({
          source: $scope.users
        });
      })
      .error( function (data) {
        console.log(data);
      })
  }

  $scope.getMembers = function () {
    $sails.get('/getMembers', {'projectId': $stateParams.id})
      .success(function (data) {
        $scope.members = data;
      })
      .error(function (data) {
        console.log(data);
      })
  }

  $scope.addMember = function () {
    var project_id = $stateParams.id;
    console.log($scope.memberName);
    var data = {'projectId': $stateParams.id, 'member': $scope.memberName};
    $sails.post('/addMember', data)
      .success(function (data) {
        console.log('success');
        $scope.getMembers();
      })
      .error(function (data) {
        console.log(data);
      })
  }
});
