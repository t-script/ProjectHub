'use strict';

angular.module('phStart').controller('ResetPasswordCtrl', function($scope, $stateParams){
    $scope.resetPassword = function() {
        if ($scope.frmResetPassword.$valid) {
          var data = {};
          data.username = $stateParams.username;
          data.key = $stateParams.key;
          data.password = $scope.user.password;

          $.ajax({
            type: "POST",
            url: '/reset',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(data)
            {
              console.log("Reset --> Okay");
            }
          });
          window.location.replace('/');
        }
    };
});

