// spiredeck

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'spiredeck' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'spiredeck.controllers' is found in controllers.js
var spiredeck = angular.module('spiredeck', ['ionic', 'ngCordova'])

.constant ('gcm_id',	"com-dustbunnies-spiredeck")

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {

		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	
	.state('app', {
		url: "/app",
		abstract: true,
		templateUrl: "templates/menu.html",
		controller: 'AppCtrl'
	})
	
	.state('app.play', {
		url: "/play",
		views: {
			'menuContent': {
				templateUrl: "templates/play.html"
			}
		}
	})
	
	.state('app.search', {
		url: "/search",
		views: {
			'menuContent': {
				templateUrl: "templates/search.html"
			}
		}
	})
	
	.state('app.collection', {
		url: "/collection",
		views: {
			'menuContent': {
				templateUrl: "templates/collection.html"
			}
		}
	})
	.state('app.decks', {
		url: "/decks",
		views: {
			'menuContent': {
				templateUrl: "templates/decks.html",
				controller: 'DecksCtrl'
			}
		}
	})
	
	.state('app.deck', {
		url: "/decks/:deckId",
		views: {
			'menuContent': {
				templateUrl: "templates/deck.html",
				controller: 'DeckCtrl'
			}
		}
	})
	
	.state('app.card', {
		url: "/collection/:cardId",
		views: {
			'menuContent': {
				templateUrl: "templates/card.html",
				controller: 'CardCtrl'
			}
		}
	})
	
	.state('app.profile', {
		url: "/profile",
		views: {
			'menuContent': {
				templateUrl: "templates/profile.html"
			}
		}
	});
	
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/decks');
});