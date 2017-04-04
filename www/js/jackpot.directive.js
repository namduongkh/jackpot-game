(function() {
    'use strict';

    angular.module("Jackpot")
        .directive("suggestNumber", suggestNumber);

    function suggestNumber() {
        return {
            restrict: 'AE',
            templateUrl: "./js/template/suggest-number.html"
        }
    }
})();