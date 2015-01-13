'use strict';

angular.module('phApp').controller('SettingsCtrl', function($scope, $sails){
  $scope.user = [];
  $('.remove').hide();

  $scope.getUser = function() {
    $sails.get('/getUsername')
      .success(function (data) {
        $scope.user = data;
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
  }

  $scope.cancelInput = function (text, input, pencil, remove) {
    $('#'+text).show();
    $('#'+pencil).show();
    $('#'+input).hide();
    $('#'+remove).hide();
  }

});
