'use strict';

angular.module('phApp').controller('ProjectCtrl', function($scope,$stateParams, $sails){
  $scope.members = [];
  $scope.leader = [];
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
  };

  $scope.getUsers = function () {
    $sails.get('/user')
      .success(function (data) {
        angular.forEach(data, function (value, key) {
          $scope.users.push(value.firstname + ' ' + value.lastname + ' (' +value.username + ')');
        });
        $('#memberName').autocomplete({
          source: $scope.users,
          select: function(event, ui){
            $scope.memberName = ui.item.value;
          }
        });
      })
      .error( function (data) {
        console.log(data);
      })
  };

  $scope.getMembers = function () {
    $sails.get('/getMembers', {'projectId': $stateParams.id})
      .success(function (data) {
        $scope.members = data.members;
        $scope.leader = data.leader;
      })
      .error(function (data) {
        console.log(data);
      })
  }

  $scope.addMember = function () {
    $('#memberName').val(null);
    var start = $scope.memberName.search("\\(");
    var end = $scope.memberName.search("\\)");
    var memberUser = $scope.memberName.substring(start+1,end);
    var data = {'projectId': $stateParams.id, 'member': memberUser};
    $sails.post('/addMember', data)
      .success(function (data) {
        console.log('success');
        //$scope.getMembers();
      })
      .error(function (data) {
        console.log(data);
      })
  }

  $scope.removeMember = function(id){
    var data = {'projectId': $stateParams.id, 'memberid': id};
    $sails.post('/removeMember', data)
      .success(function (data) {
        console.log('success');
      })
      .error(function (data) {
        console.log(data);
      })
  }

  $sails.on('addUser', function(data){
    $scope.members = data.member;
    $scope.leader = data.leader;
  })

  $scope.setFocusMember = function () {
    $('#memberName').focus();
  }

  $scope.setFocusSearch = function () {
    $('#search').focus();
  }

});
