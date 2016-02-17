'use strict';

juke.factory('ArtistFactory', function ($http, $q, AlbumFactory, SongFactory) {

  var ArtistFactory = {};
  var allArtists = null;

  ArtistFactory.fetchAll = function () {
    if(allArtists) return allArtists;
    else {
      return $http.get('/api/artists')
      .then(function(res) {
        allArtists = res.data;
        return allArtists;
      });
      
    }
  };

  ArtistFactory.fetchById = function (id) {
    var url = '/api/artists/' + id;
    return $q.all([$http.get(url), $http.get(url + '/songs'), $http.get(url + '/albums')])
    .then( responses => responses.map(res => res.data) )
    .then( results => {
      var artist = results[0];
      var songs = results[1].map(SongFactory.convert);
      var albums = results[2].map(AlbumFactory.convert);
      artist.songs = songs;
      artist.albums = albums;
      return artist;
    });
  };

  return ArtistFactory;

});
