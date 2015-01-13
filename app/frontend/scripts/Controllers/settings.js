'use strict';

angular.module('phApp').controller('SettingsCtrl', function($scope, $sails){
  $scope.user = [];
  $('.remove').hide();
  $('#send').hide();
  $scope.send=0;

  $scope.getUser = function() {
    $sails.get('/getUsername')
      .success(function (data) {
        $scope.user = data;
      })
      .error(function (data) {
        console.log(data);
      })
  }

  $scope.updateUser = function() {
    var data = {id: $scope.user.id, firstname: $scope.user.firstname, lastname: $scope.user.lastname, email: $scope.user.email, password: $scope.user.password};
    $sails.post('/updateUser', data)
      .success(function (data) {
        $scope.user = data;
        $('.whiteBlue').hide();
        $('.remove').hide();
        $('.textSetting').show();
        $('.pencil').show();
      })
      .error(function (data) {
        console.log(data);
      })
  }

  $scope.showInput = function (text, input, pencil, remove) {
    $('#'+text).hide();
    $('#'+pencil).hide();
    $('#'+remove).show();
    $('#'+input).show();
    $('#'+input).focus();
    $('#send').show();
    $scope.send++;
  }

  $scope.cancelInput = function (text, input, pencil, remove) {
    $('#'+text).show();
    $('#'+pencil).show();
    $('#'+input).hide();
    $('#'+remove).hide();
    $scope.send--;
    if ($scope.send == 0) {
      $('#send').hide();
    }
  }

});
