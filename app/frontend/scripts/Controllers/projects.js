'use strict';

angular.module('phApp').controller('ProjectsCtrl', function($scope, $sails){
  $scope.projects = [];

  $scope.getProjects = function () {
    $sails.get('/project')
      .success(function (data) {
        $scope.projects = data;
      })
      .error(function (data) {
        console.log(data);
      })
  }

  $scope.createProject = function () {
    if ($scope.frmCreateProject.$valid) {
      $('#projectName').val(null);
      var data = {name: $scope.projectName};
      $scope.projects.push(data)
      $sails.post('/project', data)
        .success(function (data) {
          console.log('success');
        })
        .error(function (data) {
          console.log(data)
        })
    }
  }
});

