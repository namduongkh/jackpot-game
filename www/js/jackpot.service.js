(function() {
    'use strict';

    angular.module("Jackpot")
        .service("JackpotSvc", JackpotSvc);

    function JackpotSvc(localStorageService) {
        return {
            getSaveLog: function() {
                return localStorageService.get('saveLog') || [];
            },
            getRandomLog: function() {
                return localStorageService.get('randomLog') || {};
            },
            getStatistic: function() {
                return localStorageService.get('statistic') || null;
            },
            setSaveLog: function(log) {
                localStorageService.set('saveLog', log);
            },
            setRandomLog: function(log) {
                localStorageService.set('randomLog', log);
            },
            setStatistic: function(log) {
                localStorageService.set('statistic', log);
            },
            getNumberData: function(number) {
                let random = 0;
                let statistic = 0;
                let randomData = this.getRandomLog();
                let statisticData = this.getStatistic();
                if (randomData && randomData[number]) {
                    random = randomData[number]
                }
                if (statisticData && statisticData.data && statisticData.data[Number(number)]) {
                    statistic = Number(statisticData.data[Number(number)].value);
                }
                return { random, statistic };
            },
        };
    }
})();