(function() {
    'use strict';

    angular.module("Jackpot")
        .controller('StatisticCtrl', StatisticCtrl);

    function StatisticCtrl($http, JackpotSvc, $ionicPopup) {
        var statistic = this;

        var data = JackpotSvc.getStatistic();
        // console.log("Data", data);

        statistic.getStatisticData = function() {
            $http({
                    method: 'GET',
                    url: 'http://vietlott.vn/vi/choi/mega-6-45/thong-ke/?FromDate=01%2F08%2F2016'
                })
                .then(function(resp) {
                    if (resp.status == 200) {
                        var statisticData = [];
                        resp.data.replace(/<div\sstyle="float:\sleft;\sfont-weight:\sbold;\spadding-left:\s10px;\spadding-top:\s5px;">(\d+)<\/div>\s/g, function(str, s1) {
                            statisticData.push({
                                key: statisticData.length + 1,
                                value: s1
                            });
                        });
                        statistic.statisticData = statisticData;
                        JackpotSvc.setStatistic({
                            date: new Date(),
                            data: statisticData
                        });
                    }
                })
                .catch(function(err) {
                    if (data && data.data) {
                        statistic.statisticData = data.data;
                    }
                    statistic.showAlert();
                });
        };

        if (!data ||
            !data.date ||
            new Date(data.date).toDateString() != new Date().toDateString()
        ) {
            statistic.getStatisticData();
        } else {
            statistic.statisticData = data.data;
        }

        statistic.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Thông báo',
                template: '<div style="text-align: center;">Không cập nhật được dữ liệu thống kê, vui lòng kiểm tra truy cập Internet.</div>'
            });

            // alertPopup.then(function(res) {
            //     console.log('Thank you for not eating my delicious ice cream cone');
            // });
        };

        statistic.sortOptions = [{
            name: "Số tăng dần",
            value: 1
        }, {
            name: "Số giảm dần",
            value: 2
        }, {
            name: "Xuất hiện tăng dần",
            value: 3
        }, {
            name: "Xuất hiện giảm dần",
            value: 4
        }];
        statistic.sortCond = statistic.sortOptions[0].value;

        // console.log(JackpotSvc.getNumberData(40));
    }
})();