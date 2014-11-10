'use strict';

angular.module('phStart').controller('SinginCtrl', function($scope){
    $scope.signin = function() {
        if ($scope.frmSignIn.$valid) {
            var data = {};
            data.username = user.username;
            data.password = user.password;
            console.log(user.username);
            $.ajax({
                type: "POST",
                url: '/login',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function(data)
                {
                    console.log("Sign --> Okay");
                }
            });
        }
    };
});
