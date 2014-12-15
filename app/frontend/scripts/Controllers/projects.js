'use strict';

angular.module('phApp').controller('ProjectsCtrl', function($scope, $sails){
  $scope.projects = [];

  $scope.getProjects = function () {
    $sails.get('/ownProject')
      .success(function (data) {
        $scope.projects = data;
      })
      .error(function (data) {
        console.log(data);
      })
  },

  $scope.createProject = function () {
    if ($scope.frmCreateProject.$valid) {
      $('#projectName').val(null);
      var data = {projectName: $scope.projectName};
      $sails.post('/createProject', data)
        .success(function (data) {
          console.log('success');
          $scope.projects = data;
        })
        .error(function (data) {
          console.log(data)
        })
    }
  }
});
