(function() {
    'use strict';

    angular.module("Jackpot")
        .filter("statisticNumber", statisticNumber)
        .filter("randomNumber", randomNumber);

    function statisticNumber() {
        return function(input, filterNumber) {
            if (filterNumber && input && input.length) {
                return input.filter(function(item, index) {
                    if (index + 1 == Number(filterNumber)) {
                        return item;
                    }
                });
            }
            return input;
        }
    }

    function randomNumber() {
        return function(input, filterNumber) {
            if (filterNumber && input && input.length) {
                return input.filter(function(item, index) {
                    if (Number(item.key) == Number(filterNumber)) {
                        return item;
                    }
                });
            }
            return input;
        }
    }
})();