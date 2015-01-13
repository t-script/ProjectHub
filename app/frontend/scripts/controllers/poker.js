'use strict';

angular.module('phApp').controller('PokerCtrl', function($scope, $sails, $stateParams){
  $scope.value = 0;
  $scope.members=[];
  $scope.leader=[];
  $scope.tickets=[];
  $scope.ticket=[];

  //Schätzung an den Server senden
  $scope.sendEstimate = function (value) {
    var data = {value : value};
    $sails.post('/', data)
      .success(function (data) {
        console.log(data);
        $scope.value = value;
        $('#displayCards').hide();
        $('#reset').show();
      })
      .error(function (data) {
        console.log(data);
      })
  }

  $scope.resetVoting = function () {
    $('#reset').hide();
    $('#displayCards').show();
  }

  // Zeigt die Tickets an
  $scope.chooseTicket = function () {
    $('#ticketsOverview').toggle();
  }

  //Ticket auswählen
  $scope.setTicket = function (id, title) {
    $('#ticketsOverview').hide();
    $('#choose').hide();
    $('#play').show();
    $('#ticket').html(title)

  }

  //Start planning poker
  $scope.start = function () {
    $sails.post('/')
      .success(function (data) {
        $('#play').hide();
        $('#stop').show();
      })
      .error(function (data) {
        console.log(data);
      })

  }

  //Stop planning poker
  $scope.stop = function () {
    $sails.post('/')
      .success(function (data) {
        $('#play').hide();
        $('#stop').hide();
        $('#ticket').html('Choose a ticket')
        $('#choose').show();
      })
      .error(function(data) {
        console.log(data);
      })
  }

  //Ab hier: nicht relevant für dich!!!!
  $scope.getUsers = function () {
    $sails.get('/getMembers', {'projectId': $stateParams.id})
      .success(function (data) {
        $scope.members = data.members;
        $scope.leader = data.leader;
        $scope.isLeader();
      })
      .error(function (data) {
        console.log(data);
      })
  }

  $scope.isLeader = function () {
    $sails.get('/getUsername')
      .success(function (data) {
        if (data.username != $scope.leader.username) {
          $('#leader').hide();
        }
      })
  }

  $scope.getTickets = function () {
    $sails.get('/getTickets', { project: $stateParams.id})
      .success(function (data) {
        $scope.tickets = data;
      })
      .error(function (data) {
        console.log(data);
      })
  }

});
