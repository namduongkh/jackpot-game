(function() {
    'use strict';

    angular.module('Jackpot')
        .controller("WinningController", WinningController);

    function WinningController($http, $sce) {
        var winning = this;

        winning.getWinningData = function() {
            $http({
                    method: 'get',
                    url: 'http://vietlott.vn/vi/trung-thuong/ket-qua-trung-thuong/mega-6-45/winning-numbers/'
                })
                .then(function(resp) {
                    console.log("Resp", resp);
                    if (resp.status == 200) {
                        resp.data = resp.data.replace(/\n/g, "").replace(/\s+/g, " ");
                        // console.log("Data", resp.data);
                        resp.data.replace(/<table\sclass="table\stable-striped">.+<\/table>\s/g, function(str) {
                            winning.winningData = $sce.trustAsHtml(str);
                        });
                    }
                })
                .catch(function(err) {
                    console.log("err", err);
                });
        }

        winning.getWinningData();
    }
})()