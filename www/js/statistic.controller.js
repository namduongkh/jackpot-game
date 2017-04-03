(function() {
    'use strict';

    angular.module("Jackpot")
        .controller('StatisticCtrl', StatisticCtrl);

    function StatisticCtrl($http) {
        var statistic = this;

        statistic.getStatisticData = function() {
            $http({
                    method: 'GET',
                    url: 'http://vietlott.vn/vi/choi/mega-6-45/thong-ke/?FromDate=01%2F08%2F2016'
                })
                .then(function(resp) {
                    if (resp.status == 200) {
                        statistic.statisticData = [];
                        resp.data.replace(/<div\sstyle="float:\sleft;\sfont-weight:\sbold;\spadding-left:\s10px;\spadding-top:\s5px;">(\d+)<\/div>\s/g, function(str, s1) {
                            // console.log("S1", s1);
                            statistic.statisticData.push(s1);
                        });
                        // console.log("Thống kê", statisticData);
                    }
                    // console.log("Resp", resp);
                });
        };

        statistic.getStatisticData();
    }
})();