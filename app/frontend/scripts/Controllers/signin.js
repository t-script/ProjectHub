'use strict';

angular.module('phStart').controller('SinginCtrl', function($scope){
    $scope.signin = function() {
        if ($scope.frmSignIn.$valid) {
            var data = {};
            data.username = $scope.user.username;
            data.password = $scope.user.password;
            $.ajax({
                type: "POST",
                url: '/login',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function(data)
                {
                    console.log(data);
                    console.log("Sign in --> Okay");
                    window.location.replace('/');
                    window.location.reload();
                },
                error: function (data) {
                  console.log(JSON.stringify(data.responseJSON.error));
                  $('.message').html(JSON.stringify(data.responseJSON.error));
                  $('.message').css('visibility', 'visible');
                  setTimeout(function() {
                    $('.message').css('visibility', 'hidden');
                  }, 3000);
                  console.log("Error");
                }
            });
        }
    };
});
