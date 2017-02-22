// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Jackpot', ['ionic', 'LocalStorageModule'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    $stateProvider
        .state('jackpot', {
            url: '/jackpot',
            templateUrl: 'templates/jackpot.html',
            controller: 'JackpotCtrl as jackpot',
        })
        .state('randomLog', {
            url: '/randomLog',
            templateUrl: 'templates/randomLog.html',
            controller: 'JackpotCtrl as jackpot',
        })
        .state('nRandom', {
            url: '/nRandom',
            templateUrl: 'templates/nRandom.html',
            controller: 'JackpotCtrl as jackpot',
        })
        .state('saveLog', {
            url: '/saveLog',
            templateUrl: 'templates/saveLog.html',
            controller: 'JackpotCtrl as jackpot'
        })
        .state('nRandomFast', {
            url: '/nRandomFast',
            templateUrl: 'templates/nRandomFast.html',
            controller: 'JackpotCtrl as jackpot'
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/jackpot');
    localStorageServiceProvider
        .setPrefix('Jackpot')
        .setStorageCookie(365 * 50, '/', false);
});