'use strict';

var juke = angular.module('juke', ['ui.router', 'ngMessages']);

juke.config(function($urlRouterProvider) {
	$urlRouterProvider.when('', '/albums')
	$urlRouterProvider.when('/artist/:artistId', '/artist/:artistId/albums')
});