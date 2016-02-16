'use strict'

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

juke.directive('sidebar', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/sidebar/templates/sidebar.html', 
		link: function(scope, element, attributes) {
			console.log('hello');
		}

	}
})

juke.directive('player', function(PlayerFactory) {
	return {
		restrict: 'E',
		templateUrl: '/js/player/templates/player.html',
		link: function(scope, element, attributes) {
		  	angular.extend(scope, PlayerFactory); // copy props from param2 to param1
		  	scope.toggle = function () {
		    	if ( PlayerFactory.isPlaying() ) PlayerFactory.pause();
		    	else PlayerFactory.resume();
		  	};
		  	scope.getPercent = function () {
		    	return PlayerFactory.getProgress() * 100;
		  	};
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

juke.directive('albumList', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/album/templates/album-list.html',
    scope: {
      albums: '=' 
    }
  }
})

juke.directive('keyToggle', function(PlayerFactory) {
  return function(scope, elm, attrs) {
    elm.bind("keypress", function(event) {
    	if(event.which === 32) {
    		if ( PlayerFactory.isPlaying() ) {
		      PlayerFactory.pause();
		    } else {
		      PlayerFactory.resume();
		      }				
    	}
    	console.log(event.which)
    	if(event.which === 45) {
    		console.log('previous')
    		PlayerFactory.previous();
    	}
    	 if(event.which === 61) {
    		console.log('next')
    		PlayerFactory.next();
    	}

    })
  };
});



