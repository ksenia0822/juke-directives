'use strict';

juke.controller('SongChooseCtrl', function ($scope, SongFactory) {

  $scope.songs = [];

  SongFactory.fetchAll()
  .then(function (songs) {
    $scope.songs = songs;
  });

  $scope.reset = function () {
    $scope.toAdd = null;
  };

  $scope.addIt = function () {
    $scope.addSong($scope.toAdd)
    .then(function () {
      $scope.reset();
    });
  };

});

juke.directive('doubleClick', function(PlayerFactory){
  return {
    restrict: 'A',
    scope: {
      doubleClick: '&',
    },
    link: function(scope, element) {
      element.on('dblclick', function () {
        console.log('we clicked')
        scope.doubleClick();

        scope.toggle = function (song) {
          if (song !== PlayerFactory.getCurrentSong()) {
            PlayerFactory.start(song, scope.songs);
            } else if ( PlayerFactory.isPlaying() ) {
              PlayerFactory.pause();
            } else {
              PlayerFactory.resume();
            }
        };        
      });
    }
  }
})