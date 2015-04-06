'use strict';

angular.module('phApp').controller('ChatCtrl', function($scope, $sails){
  $scope.users = [];
  $scope.chatTabs = {};

  //region Userliste
  /*
   * Nach dem connecten mit Socket.IO Userliste holen
   */
  $sails.on('connect', function(){
    $scope.subscribeUsers();
  });

  /*
   * Aktuelle Userliste holen und diese User subscriben
   */
  $scope.subscribeUsers = function(){
    $sails.get('/chat/subscribeUsers')
      .success(function(data){
        $scope.users = data;
      })
      .error(function(data){
        console.log(data);
      });
  };

  // Update, wenn sich der Onlinestatus eines Users ändert
  $sails.on('user', function(msg){
    if (msg.verb == 'updated') {
      if ($scope.users[msg.data.username]){
        $scope.users[msg.data.username] = msg.data;
      }else{
        $scope.users.push(msg.data);
      }
    }
  });

  //endregion

  //region Chatfunktionen
  // Öffnet/Schließen eines Tabs
  $scope.selectTab = function (event){
    var tab = $(angular.element(event.currentTarget)).parent();
    var icon = $(tab).find('i.icon')[0];
    var chat = $(tab).children('div.chat-content');

    if ($(icon).hasClass('up')){
      $(icon).switchClass('up', 'down');
      $(chat).show();
      $(tab).animate({'height': '18.5em'});
    }else{
      $(icon).switchClass('down', 'up');
      $(tab).animate({'height': '2.2em'}, function(){
        $(chat).hide();
      });
    }
  };

  // Bei eingehender privater Nachricht, Verlauf holen (wenn nötig) und Chatnachrichten anzeigen
  // TODO Chatfenster austauschen, wenn bereits drei Fenster offen sind
  $sails.on('privateMsg', function(data){
    // Wenn Chatfenster schon vorhanden ist, Nachricht hinzufügen
    if ($scope.chatTabs.hasOwnProperty(data.sendername)){
      $scope.chatTabs[data.sendername]['msgs'].push(data);
    }else {
      // Bei neuem Chatrequest Verlauf holen und Nachrichten hinzufügen
      $sails.get('/chat/getPrivateMessages', {'sender': data.sender})
        .success(function (msgs) {
          $scope.chatTabs[data.sendername] = {msgs: msgs, active: true, username: data.sendername, id: data.id};
        });

      $scope.chatTabs[data.sendername]['msgs'].push(data);
    }
  });

  // Private Nachricht senden
   $scope.sendPrvtMsg = function(reciever){
    $sails.post('/chat/sendPrivateMsg', {'reciever': reciever, 'msg': $('#frm-msg-'+reciever).val()}, function(data){
      $scope.chatTabs[reciever]['msgs'].push(data);
    });
   };

  // Privates Chatfenster nach einem Click auf Usernamen in der Liste öffnen
  $scope.openPrivateChat = function(reciever){
    if ($scope.chatTabs.hasOwnProperty(reciever)){
      if ($scope.chatTabs[reciever].active == false){
        //TODO Inaktives Fenster wieder aufklappen
      }
    }else{
      // Verlauf laden und Nachrichten anzeigen
      $sails.get('/chat/getPrivateMessages', {'sender': reciever})
        .success(function (msgs) {
          $scope.chatTabs[reciever] = {msgs: msgs, active: true, username: reciever, id: 2};
        });
    }
  };

  //Tab schließen
  $scope.closeTab = function(reciever){
    delete $scope.chatTabs[reciever];
  };

  //endregion
});
