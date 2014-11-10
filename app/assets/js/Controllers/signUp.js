'use strict';

angular.module('phStart').controller('SingupCtrl', function($scope){
    $scope.signup = function() {
        if ($scope.frmSignUp.$valid) {
            console.log("Okay");
        }
    };
});
