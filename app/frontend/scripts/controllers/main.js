angular.module('phApp').controller('MainCtrl', function($scope, $sails){
  $scope.username = 'Unknown';

  $scope.getUsername = function() {
    $sails.get('/getUsername')
      .success(function (data) {
        $scope.username = data.firstname+' '+data.lastname;
      })
      .error(function (data) {
        console.log(data);
      })
  }

  $scope.logout = function () {
    $sails.post('/logout')
      .success (function (data) {
        console.log(data);
        location.reload();
      })
      .error(function (data) {
        console.log(data);
      })

  }
});
