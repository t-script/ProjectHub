'use strict';

angular.module('phApp').controller('PokerCtrl', function($scope, $sails){
  $scope.value = 0;
  
  $scope.sendEstimate = function (value) {
    var data = {value : value};
    $sails.post('/', data)
      .success(function (data) {
        console.log(data);
        $scope.value = value;
        $('#displayCards').hide();
        $('#reset').show();
      })
      .error(function (data) {
        console.log(data);
      })
  }

  $scope.resetVoting = function () {
    $('#reset').hide();
    $('#displayCards').show();
  }

});
