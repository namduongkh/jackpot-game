(function() {
    'use strict';

    angular.module('Jackpot')
        .controller("WinningController", WinningController);

    function WinningController($http, $sce) {
        var winning = this;
        winning.winningData = "";
        var showPopup = false;
        winning.getWinningData = function(page) {
            $http({
                    method: 'get',
                    url: 'http://vietlott.vn/vi/trung-thuong/ket-qua-trung-thuong/mega-6-45/winning-numbers/?p=' + page
                })
                .then(function(resp) {
                    // console.log("Resp", resp);
                    if (resp.status == 200) {
                        resp.data = resp.data.replace(/\n/g, "").replace(/\s+/g, " ");
                        // console.log("Data", resp.data);
                        resp.data.replace(/<table\sclass="table\stable-striped">.*<tbody>(.+)<\/tbody>.*<\/table>\s/g, function(str, s1) {
                            s1 = s1.replace(/href="[^"]+"/g, "");
                            winning.winningData = $sce.trustAsHtml(winning.winningData + s1);
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

        for (var i = 0; i < 5; i++) {
            winning.getWinningData(i + 1);
        }

        winning.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Thông báo',
                template: '<div style="text-align: center;">Không cập nhật được dữ liệu thống kê, vui lòng kiểm tra truy cập Internet.</div>'
            });
        };
    }
})()