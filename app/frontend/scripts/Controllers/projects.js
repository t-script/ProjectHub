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
      // TODO : Session id, firstname, lastname
      var data = {name: $scope.projectName, members: [{id: 1, firstname: 'Tom', lastname : 'Schalbar'}], leader: 1};
      $sails.post('/project', data)
        .success(function (data) {
          console.log('success');
          $scope.getProjects();
        })
        .error(function (data) {
          console.log(data)
        })
    }
  }
});

