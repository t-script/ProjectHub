'use strict';

angular.module('phStart').controller('SingupCtrl', function($scope){
    $scope.signup = function() {
        if ($scope.frmSignUp.$valid) {
            var data = {};
            data.firstname = $scope.user.firstname;
            data.lastname = $scope.user.lastname;
            data.email = $scope.user.email;
            data.username = $scope.user.username;
            data.password = $scope.user.password;
            $.ajax({
                type: "POST",
                url: '/user',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function(data)
                {
                    console.log("Sign up --> Okay");
                }
            });
        }
    };
});
