'use strict';

var juke = angular.module('juke', ['ui.router', 'ngMessages'])
.config(function($locationProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.when('/', '/albums')
	$urlRouterProvider.when('/artist/:artistId', '/artist/:artistId/albums')
});