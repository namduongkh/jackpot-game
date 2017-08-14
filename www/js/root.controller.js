(function() {
    'use strict';

    angular
        .module("Jackpot")
        .controller("RootController", RootController);

    function RootController($scope, $timeout, $ionicHistory, $state, $rootScope, localStorageService, $ionicPopup, JackpotSvc) {
        var rootCtrl = this;
        rootCtrl.processNumber = function(number) {
            if (number >= 0 && number < 10) {
                return "0" + number;
            }
            return number + "";
        };

        rootCtrl.openAddLogPopup = function() {
            rootCtrl.logListErr = null;
            var myPopup = $ionicPopup.show({
                template: '\
                    <span ng-bind="rootCtrl.logListErr" class="popup-sub-title assertive"></span>\
                    <input type="text" ng-model="rootCtrl.logList" placeholder="Ví dụ: 1,5,10,25,32,44">',
                title: 'Nhập dãy số',
                subTitle: 'Nhập 6 số, mỗi số cách nhau bởi dấu phẩy (,)',
                scope: $scope,
                buttons: [
                    { text: 'Đóng' },
                    {
                        text: '<b>Lưu</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            rootCtrl.logListErr = null;

                            function error(error) {
                                rootCtrl.logListErr = error;
                                e.preventDefault();
                            }
                            var pattern = /\d{1,2},\d{1,2},\d{1,2},\d{1,2},\d{1,2},\d{1,2}/gi;
                            if (!rootCtrl.logList || !pattern.test(rootCtrl.logList)) {
                                //don't allow the user to close unless he enters wifi password
                                error("Vui lòng nhập đúng định dạng dãy số");
                            } else {
                                var split = rootCtrl.logList.split(",");
                                var result = [];
                                for (var i in split) {
                                    var number = Number(split[i]);
                                    if (number && number <= 45) {
                                        result.push(number);
                                    }
                                }
                                result = _.uniq(result);
                                rootCtrl.logList = result;
                                if (rootCtrl.logList.length == 6) {
                                    rootCtrl.logList = rootCtrl.logList.sort(function(a, b) {
                                        return a - b;
                                    }).join(",");
                                    var log = JackpotSvc.getSaveLog() || [];
                                    log.unshift(rootCtrl.logList);
                                    JackpotSvc.setSaveLog(log);
                                    alert("Đã lưu!");
                                    rootCtrl.logList = null;
                                } else {
                                    error("Dãy số phải có đúng 6 số");
                                }
                                // return rootCtrl.logList;
                            }
                        }
                    }
                ]
            });
        };
    }
})();