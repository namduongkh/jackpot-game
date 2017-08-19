(function() {
    'use strict';

    angular.module('Jackpot')
        .controller("ResultController", ResultController);

    function ResultController($http, $sce, ConfigSvc, $ionicPopup) {
        var result = this;
        var showPopup = false;

        result.getResultData = function() {
            $http({
                    method: 'get',
                    url: ConfigSvc.resultUrl
                })
                .then(function(resp) {
                    // console.log("Resp", resp);
                    if (resp.status == 200) {
                        resp.data = resp.data.replace(/\n/g, "").replace(/\s+/g, " ");
                        var div = document.createElement("div");
                        div.innerHTML = resp.data;
                        var resultDetail = div.getElementsByClassName("box-result-detail");
                        // console.log("resultDetail.innerHTML", resultDetail);
                        result.resultDetail = $sce.trustAsHtml(resultDetail[0].outerHTML);
                        var resultPrize = div.getElementsByClassName("result")[0].getElementsByClassName("table");
                        // [0].getElementsByTagName("table");
                        result.resultPrize = $sce.trustAsHtml(resultPrize[0].outerHTML.replace(/href="[^"]+"/gi, ""));
                    }
                })
                .catch(function(err) {
                    // console.log("err", err);
                    if (!showPopup) {
                        showPopup = true;
                        result.showAlert();
                    }
                });
        }

        result.getResultData();

        result.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Thông báo',
                template: '<div style="text-align: center;">Không cập nhật được dữ liệu thống kê, vui lòng kiểm tra truy cập Internet.</div>'
            });
        };
    }
})();