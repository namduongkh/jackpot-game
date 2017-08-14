(function() {
    'use strict';

    angular.module("Jackpot")
        .filter("statisticNumber", statisticNumber)
        .filter("randomNumber", randomNumber);

    function statisticNumber() {
        return function(input, filterNumber, sortCond) {
            if (filterNumber && input && input.length) {
                input = input.filter(function(item, index) {
                    if (item.key == Number(filterNumber)) {
                        return item;
                    }
                });
            }
            input.sort(function(a, b) {
                switch (sortCond) {
                    case 2:
                        return b.key - a.key;
                    case 3:
                        if (Number(a.value) == Number(b.value)) {
                            return a.key - b.key;
                        }
                        return Number(a.value) - Number(b.value);
                    case 4:
                        if (Number(a.value) == Number(b.value)) {
                            return b.key - a.key;
                        }
                        return Number(b.value) - Number(a.value);
                    default:
                        return a.key - b.key;
                };
            });
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