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
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'RootController as rootCtrl'
        })
        .state('app.jackpot', {
            url: '/jackpot',
            views: {
                'menuContent': {
                    templateUrl: 'templates/jackpot.html',
                    controller: 'JackpotCtrl as jackpot',
                }
            }
        })
        .state('app.randomLog', {
            url: '/randomLog',
            views: {
                'menuContent': {
                    templateUrl: 'templates/randomLog.html',
                    controller: 'JackpotCtrl as jackpot',
                }
            }
        })
        .state('app.nRandom', {
            url: '/nRandom',
            views: {
                'menuContent': {
                    templateUrl: 'templates/nRandom.html',
                    controller: 'JackpotCtrl as jackpot',
                }
            }
        })
        .state('app.saveLog', {
            url: '/saveLog',
            views: {
                'menuContent': {
                    templateUrl: 'templates/saveLog.html',
                    controller: 'JackpotCtrl as jackpot'
                }
            }
        })
        .state('app.statistic', {
            url: '/statistic',
            views: {
                'menuContent': {
                    templateUrl: 'templates/statistic.html',
                    controller: 'StatisticCtrl as statistic'
                }
            }
        })
        .state('app.nRandomFast', {
            url: '/nRandomFast',
            views: {
                'menuContent': {
                    templateUrl: 'templates/nRandomFast.html',
                    controller: 'JackpotCtrl as jackpot'
                }
            }
        })
        .state('app.winning', {
            url: '/winning',
            views: {
                'menuContent': {
                    templateUrl: 'templates/winning.html',
                    controller: 'WinningController as winning'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/jackpot');
    localStorageServiceProvider
        .setPrefix('Jackpot')
        .setStorageCookie(365 * 50, '/', false);
});