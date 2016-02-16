'use strict';

/* ALBUMS (SINGULAR) CONTROLLER */

juke.controller('AlbumCtrl', function ($scope, $log, PlayerFactory, theAlbum) {
  $scope.album = theAlbum;
});

/* ALBUMS (PLURAL) CONTROLLER */

juke.controller('AlbumsCtrl', function ($scope, allAlbums) {
  $scope.albums = allAlbums;
});

juke.directive('albumList', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/album/templates/album-list.html',
    scope: {
      albums: '=' 
    },
    link: function(scope, element, attricutes) {
    }
  }
})

juke.directive('songList', function(PlayerFactory,  PlaylistFactory){
  return {
    restrict: 'E',
    templateUrl: '/js/album/templates/song-list.html',
    scope: {
      songs: '='
      
    },
    link: function(scope, element, attricutes) {
      console.log('Im an  song-list');
      
      scope.toggle = function (song) {
      if (song !== PlayerFactory.getCurrentSong()) {
        PlayerFactory.start(song, scope.songs);
        } else if ( PlayerFactory.isPlaying() ) {
          PlayerFactory.pause();
        } else {
          PlayerFactory.resume();
        }
      };

      scope.getCurrentSong = function () {
        return PlayerFactory.getCurrentSong();
      };

      scope.isPlaying = function (song) {
        return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
      };
    }
  }
})









