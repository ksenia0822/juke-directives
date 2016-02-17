'use strict';

juke.factory('AlbumFactory', function ($http, SongFactory) {

  var AlbumFactory = {};
  var allAlbums = null;

  AlbumFactory.fetchAll = function () {
    if(allAlbums) return allAlbums;
    else { return $http.get('/api/albums')
      .then(response => response.data)
      .then(function(albums) {
        allAlbums = albums.map(AlbumFactory.convert); 
        return allAlbums;
      });
    } 
  };

  AlbumFactory.fetchById = function (id) {
    return $http.get('/api/albums/' + id)
    .then(response => response.data)
    .then(AlbumFactory.convert)
    .then(album => {
      album.songs = album.songs.map(SongFactory.convert);
      return album;
    });
  };

  AlbumFactory.convert = function (album) {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    return album;
  };

  return AlbumFactory;

});
