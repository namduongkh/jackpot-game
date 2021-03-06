(function() {
    'use strict';

    angular.module('Jackpot')
        .controller("WinningController", WinningController);

    function WinningController($http, $sce, ConfigSvc, $ionicPopup) {
        var winning = this;
        winning.winningData = "";
        var showPopup = false;
        var oldData = null;
        winning.getWinningData = function(page, cb) {
            cb = cb || function() {};
            $http({
                    method: 'get',
                    url: ConfigSvc.winningUrl + '/?p=' + page
                })
                .then(function(resp) {
                    // console.log("Resp", resp);
                    if (resp.status == 200) {
                        resp.data = resp.data.replace(/\n/g, "").replace(/\s+/g, " ");
                        // console.log("Data", resp.data);
                        resp.data.replace(/<table\sclass="table\stable-striped">.*<tbody>(.+)<\/tbody>.*<\/table>\s/g, function(str, s1) {
                            s1 = s1.replace(/href="[^"]+"/g, "");
                            winning.winningData = $sce.trustAsHtml(winning.winningData + s1);
                            if (!oldData || oldData != s1) {
                                oldData = s1;
                                winning.getWinningData(page + 1);
                            }
                        });
                    }
                })
                .catch(function(err) {
                    // console.log("err", err);
                    if (!showPopup) {
                        showPopup = true;
                        winning.showAlert();
                    }
                });
        }

        winning.getWinningData(1);

        // async.eachSeries([0, 1, 2, 3, 4, 5], function(item, cb) {
        //     winning.getWinningData(item + 1, cb);
        // }, function() {});

        winning.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Thông báo',
                template: '<div style="text-align: center;">Không cập nhật được dữ liệu thống kê, vui lòng kiểm tra truy cập Internet.</div>'
            });
        };
    }
})();