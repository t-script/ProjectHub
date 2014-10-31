'use strict';

angular.module('phStart').controller('ForgotPasswordCtrl', function($scope){
    $scope.forgotPassword = function() {
        if ($scope.frmForgotPassword.$valid) {
            console.log("Okay");
        }
    };
});

