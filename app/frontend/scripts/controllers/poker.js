'use strict';

angular.module('phApp').controller('PokerCtrl', function($scope, $sails, $stateParams){
  $scope.value = 0;
  $scope.active = false;
  $scope.members=[];
  $scope.leader=[];
  $scope.tickets=[];
  $scope.curTicket=[];
  $scope.votes=[];

  //Schätzung an den Server senden

  $scope.startVoting = function(obj){
    // TODO CHECK IF LEADER
    if (obj.ticket.active == false){
      data = {
        project: $stateParams.id,
        ticket: obj.ticket.id
      };

      $sails.post('/startVoting', data).success(function(data) {
        console.log(data);
      });
    }
  },

  $scope.sendEstimate = function (value) {
    if ($scope.active == true) {
      var data = {vote: value, project: $stateParams.id, ticket: $scope.curTicket.id};
      $sails.post('/vote', data)
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
  },

  $scope.resetVoting = function () {
    $('#reset').hide();
    $('#displayCards').show();
  }

  // Zeigt die Tickets an
  $scope.chooseTicket = function () {
    $('#ticketsOverview').toggle();
  }

  //Ticket auswählen
  $scope.setTicket = function (ticket) {
    $('#ticketsOverview').hide();
    $('#choose').hide();
    $('#play').show();
    $('#ticket').html(ticket.title);
    $scope.curTicket = ticket;
  }

  //Start planning poker
  $scope.start = function () {
    $sails.post('/startVoting', {project: $stateParams.id, ticket: $scope.curTicket.id})
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
    $sails.post('/stopVoting', {project: $stateParams.id, ticket: $scope.curTicket.id})
      .success(function () {
        $('#play').hide();
        $('#stop').hide();
        $('#ticket').html('Choose a ticket')
        $('#choose').show();
      })
      .error(function(data) {
        console.log(data);
      })
  },

  $sails.on('votingStarted', function(msg){
    $scope.active = true;
    $scope.votes = [];
    $scope.curTicket = msg.ticket;
    console.log(msg);
  });

  $sails.on('votingStoped', function(msg){
    $scope.active = false;
    $scope.curTicket = [];
    console.log(msg);
  });

  $sails.on('voted', function(msg){
    $scope.votes = msg;
    console.log(msg);
  });


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
