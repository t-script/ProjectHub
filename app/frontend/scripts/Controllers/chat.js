'use strict';

angular.module('phApp').controller('ChatCtrl', function($scope, $sails){
  $scope.users = [];
  $scope.chatTabs = [];

/*
 * Nach dem connecten mit Socket.IO Userliste holen
 */
  $sails.on('connect', function(){
    $scope.subscribeUsers();
  });

/*
 * Update, wenn sich der Onlinestatus eines Users ändert
 */
  $sails.on('user', function(msg){
    if (msg.verb == 'updated') {
      if ($scope.users[msg.data.username]){
        $scope.users[msg.data.username] = msg.data;
      }else{
        $scope.users.push(msg.data);
      }
    }
  });

  /*
   * Bei eingehender privater Nachricht, Verlauf holen (wenn nötig) und Chatnachrichten anzeigen
   */
  $sails.on('privateMsg', function(data){
      //Msg-Data in Konsole ausgeben
      console.log(data);

      /* TODO
       * Abfrage, ob Chatfenster schon offen! Wenn nicht, Verlauf vom Server holen, Chatfenster öffnen
       */
      $sails.get('/chat/getPrivateMessages', {'sender': data.sender})
      .success(function(msgs){
          console.log(msgs);
      });

      /* TODO
       * Wenn Chatfenster schon offen, nur Msg zum Fenster hinzufügen
       */

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
  }

  /*
   * Testfunktion -> wenn ein neuer Chat geöffnet werden würde
   */
  $scope.openPrivateChat = function(reciever){
    $sails.post('/chat/sendPrivateMsg', {'reciever': reciever, 'msg': 'Test Nachricht'});
  }
});
