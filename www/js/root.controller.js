(function() {
    'use strict';

    angular
        .module("Jackpot")
        .controller("RootController", RootController);

    function RootController($scope, $timeout, $ionicHistory, $state, $rootScope, localStorageService) {
        var rootCtrl = this;
        rootCtrl.processNumber = function(number) {
            if (number >= 0 && number < 10) {
                return "0" + number;
            }
            return number + "";
        }
    }
})();