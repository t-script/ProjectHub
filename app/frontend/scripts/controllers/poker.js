'use strict';

angular.module('phApp').controller('PokerCtrl', function($scope, $sails, $stateParams){
  $scope.value = 0;
  $scope.active = false;
  $scope.members=[];
  $scope.leader=[];
  $scope.tickets=[];
  $scope.curTicket=[];
  $scope.votes=[];
  $scope.ticketName = "";
  $scope.ticketDescription = "";

  //Schätzung an den Server senden

  $scope.startVoting = function(obj){
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

          $('div.card').removeClass('selected');

          if (value != null)
            $('#estimate-'+value.toString().replace('.', '')).addClass('selected');
          else
            $('#estimate-null').addClass('selected');
        })
        .error(function (data) {
          console.log(data);
        })
    }
  },

  $scope.saveValue = function(vote){
    if ($scope.active == false) {
      var data = {vote: vote.value, project: $stateParams.id, ticket: $scope.curTicket.id};
      $sails.post('/saveValue', data).success(function(data){
        console.log(data);
      });
    }
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
        $('#reset').hide();
        $('#displayCards').show();
        $scope.ticketName = "Choose a ticket";
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
    $scope.ticketName = msg.ticket.title;
    $scope.ticketDescription = msg.ticket.description;
    $('div.card').removeClass('selected');
    console.log(msg);
  });

  $sails.on('votingStoped', function(msg){
    $scope.active = false;
    console.log(msg);
  });

  $sails.on('voted', function(msg){
    $scope.votes = msg;
    console.log(msg);
  });


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
          $('.leader').hide();
          $scope.ticketName = "No ticket selected, wait for project leader.";
          $scope.ticketDescription = "";
        }else{
          $scope.ticketName = "Choose a ticket";
          $scope.ticketDescription = "";
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
