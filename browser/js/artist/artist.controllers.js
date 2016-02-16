'use strict';

/* ARTISTS (PLURAL) CONTROLLER */

juke.controller('ArtistsCtrl', function ($scope, $log, allArtists) {

  $scope.artists = allArtists;

});

/* ARTIST (SINGULAR) CONTROLLER */

juke.controller('ArtistCtrl', function ($scope, $log, PlayerFactory, theArtist) {
  $scope.artist = theArtist;
 });
