(function() {
    'use strict';

    angular
        .module("Jackpot")
        .controller("RootController", RootController);

    function RootController($scope, $timeout, $ionicHistory, $state, $rootScope, localStorageService, $ionicPopup) {
        var rootCtrl = this;
        rootCtrl.processNumber = function(number) {
            if (number >= 0 && number < 10) {
                return "0" + number;
            }
            return number + "";
        };

        rootCtrl.openAddLogPopup = function() {
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="rootCtrl.logList">',
                title: 'Nhập dãy số',
                subTitle: 'Mỗi số cách nhau bởi dấu phẩy (,)',
                scope: $scope,
                buttons: [
                    { text: 'Đóng' },
                    {
                        text: '<b>Lưu</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            var pattern = /\d,\d,\d,\d,\d,\d/gi;
                            if (!rootCtrl.logList || !pattern.test(rootCtrl.logList)) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                console.log(rootCtrl.logList);
                                rootCtrl.logList = null;
                                // return rootCtrl.logList;
                            }
                        }
                    }
                ]
            });
        };
    }
})();