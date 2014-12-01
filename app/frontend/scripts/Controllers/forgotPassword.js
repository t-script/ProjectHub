'use strict';

angular.module('phStart').controller('ForgotPasswordCtrl', function($scope){
    $scope.forgotPassword = function() {
        if ($scope.frmForgotPassword.$valid) {
            $.ajax({
                type: "POST",
                url: '/forgot',
                data: JSON.stringify({'email': $scope.user.email}),
                contentType: 'application/json',
                success: function(data)
                {
                    console.log("Forgot --> Okay");
                }
            });
            window.location.replace('/');
        }
     };
    });
