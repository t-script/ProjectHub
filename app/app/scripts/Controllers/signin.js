'use strict';

angular.module('phStart').controller('SinginCtrl', function($scope){
    $scope.signin = function() {
        if ($scope.frmSignIn.$valid) {
            console.log("Okay");
        }
    };
});
