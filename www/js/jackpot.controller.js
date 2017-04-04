(function() {
    'use strict';

    angular
        .module("Jackpot")
        .controller("JackpotCtrl", JackpotCtrl);

    function JackpotCtrl($scope, $timeout, localStorageService, $rootScope, $state, JackpotSvc) {
        // console.log("Start!");
        var jackpot = this;
        jackpot.startLabel = "Bắt đầu";
        jackpot.step = 0;
        jackpot.disabled_random6 = false;
        jackpot.defaultResult = function() {
            return [null, null, null, null, null, null];
        };

        function initSaveLog() {
            jackpot.saveLog = JackpotSvc.getSaveLog() || [];
        }

        function initRandomLog() {
            jackpot.randomLog = JackpotSvc.getRandomLog() || {};
        }

        var calculate = function(n) {
            var result = Math.floor((Math.random() * (39 + n)) + (0 + n));
            if (result < 10) {
                return "0" + result;
            }
            return result;
        };

        jackpot.render = function() {
            jackpot.interval = setInterval(function() {
                // jackpot.renderNumber = calculate(1);
                jackpot.result[jackpot.step - 1] = calculate(1);
                $scope.$apply();
            }, 50);
        };

        jackpot.renderRandomNumber = function() {
            jackpot.randomInterval = setInterval(function() {
                // jackpot.renderNumber = calculate(1);
                jackpot.renderRandom = calculate(1);
                $scope.$apply();
            }, 50);
        };

        jackpot.start = function() {
            if (jackpot.checkFullResult()) {
                if (!confirm("Bạn có chắc chắn bắt đầu lại?")) {
                    return;
                } else {
                    initResult();
                }
            }
            jackpot.startLabel = "Ngẫu nhiên số thứ " + (jackpot.step + 1);
            if (jackpot.step == 0) {
                jackpot.render();
            } else if (jackpot.step >= 1 && jackpot.step <= 6) {
                var newElem = calculate(jackpot.step).toString();
                while (jackpot.result.indexOf(newElem) != -1 || Number(newElem) < 1 || Number(newElem) > 45) {
                    newElem = calculate(jackpot.step).toString();
                }
                setAndLogResult(jackpot.step - 1, newElem);
                if (jackpot.step == 6) {
                    clearInterval(jackpot.interval);
                    // jackpot.renderNumber = newElem;
                    jackpot.startLabel = "Bắt đầu";
                    jackpot.step = 0;
                    jackpot.getListRandomLog(6);
                    jackpot.result.sort(function(a, b) {
                        return a - b;
                    })
                    return;
                }
            }
            jackpot.step++;
        };

        jackpot.quick = function() {
            if (jackpot.checkFullResult()) {
                if (!confirm("Bạn có chắc chắn ngẫu nhiên 6 số từ đầu?")) {
                    return;
                } else {
                    initResult();
                }
            }
            jackpot.disabled_random6 = true;
            // jackpot.render();
            jackpot.renderRandomNumber();
            if (jackpot.step == 0) {
                jackpot.step++;
            }
            if (jackpot.step >= 1 && jackpot.step <= 6) {
                var innerInterval = setInterval(function() {
                    var newElem = calculate(jackpot.step).toString();
                    while (jackpot.result.indexOf(newElem) != -1 || Number(newElem) < 1 || Number(newElem) > 45) {
                        newElem = calculate(jackpot.step).toString();
                    }
                    setAndLogResult(jackpot.step - 1, newElem);
                    if (jackpot.step == 6) {
                        // clearInterval(jackpot.interval);
                        clearInterval(jackpot.randomInterval);
                        // jackpot.renderNumber = newElem;
                        jackpot.startLabel = "Bắt đầu";
                        jackpot.step = 0;
                        jackpot.result.sort(function(a, b) {
                            return a - b;
                        });
                        jackpot.disabled_random6 = false;
                        jackpot.getListRandomLog(6);
                        $scope.$apply();
                        clearInterval(innerInterval);
                    } else {
                        jackpot.step++;
                    }
                }, 500);
            }
        };

        function initResult() {
            jackpot.renderRandom = null;
            jackpot.result = jackpot.defaultResult();
        }

        function setAndLogResult(pos, value) {
            jackpot.result[pos] = value;
            if (!jackpot.randomLog[value]) {
                jackpot.randomLog[value] = 0;
            }
            jackpot.randomLog[value]++;
            JackpotSvc.setRandomLog(jackpot.randomLog);
            // console.log(jackpot.result);
        }

        jackpot.getRandomLog = function(number) {
            // if (number) {
            //     return jackpot.randomLog[number] || 0;
            // }
            // return;
            return JackpotSvc.getNumberData(number).random;
        };

        jackpot.getStatisticLog = function(number) {
            return JackpotSvc.getNumberData(number).statistic;
        };

        jackpot.getNRandomLog = function(number) {
            if (number) {
                return jackpot.nRandomLog[number] || 0;
            }
            return;
        };

        jackpot.checkFullResult = function() {
            if (jackpot.step == 0 && jackpot.result.indexOf(null) == -1) {
                return true;
            }
            return false;
        };

        jackpot.getListRandomLog = function(count) {
            var list = [];
            for (var i in jackpot.randomLog) {
                list.push({
                    key: i,
                    value: jackpot.randomLog[i]
                });
            }
            list = list.sort(function(a, b) {
                if (a.value != b.value) {
                    return b.value - a.value;
                } else {
                    return Number(a.key) - Number(b.key);
                }
            });
            if (count) {
                jackpot.listRandomLog = list.splice(0, count);
            } else {
                jackpot.listRandomLog = list;
            }
        };

        jackpot.save = function(list) {
            var list = list || jackpot.result;
            jackpot.saveLog.unshift(list.join(","));
            JackpotSvc.setSaveLog(jackpot.saveLog);
            // console.log(jackpot.saveLog);
        };

        jackpot.checkSaved = function(list) {
            var list = list || jackpot.result;
            // console.log("checkSaved", list);
            if (jackpot.saveLog.indexOf(list.join(",")) == -1) {
                return false;
            }
            return true;
        };

        jackpot.unSave = function(list) {
            if (list) {
                if (!confirm("Bạn có chắc chắn xóa dãy kết quả này?")) {
                    return;
                }
                var index = jackpot.saveLog.indexOf(list.join(","));
            } else {
                var index = jackpot.saveLog.indexOf(jackpot.result.join(","));
            }
            if (index > -1) {
                jackpot.saveLog.splice(index, 1);
                if (jackpot.saveLogList && jackpot.saveLogList.length) {
                    jackpot.saveLogList.splice(index, 1);
                }
                JackpotSvc.setSaveLog(jackpot.saveLog);
            }
            // console.log(jackpot.saveLog);
        };


        //Jackpot Init
        jackpot.jackpotInit = function() {
            function init() {
                initRandomLog();
                initSaveLog();
                jackpot.getListRandomLog(6);
            }
            init();
            initResult();
            $rootScope.$on("$stateChangeStart", function(event, data) {
                init();
            });
        };

        //Random Init
        jackpot.randomLogInit = function() {
            initRandomLog();
            initSaveLog();
            jackpot.getListRandomLog();
            if (jackpot.listRandomLog.length >= 6) {
                var list = [];
                for (var i = 0; i < 6; i++) {
                    list.push(jackpot.listRandomLog[i]);
                }
                jackpot.suggestNumber = list.splice(0, 6).map(function(item) {
                    return item.key;
                }).sort(function(a, b) {
                    return a - b;
                });
                // console.log("Suggest", jackpot.suggestNumber);
            }
        };

        jackpot.unSaveAll = function() {
            if (confirm("Bạn có chắc chắn xóa tất cả?")) {
                jackpot.saveLog = [];
                jackpot.saveLogList = [];
                JackpotSvc.setSaveLog(jackpot.saveLog);
            }
        };

        jackpot.clearRandomLog = function() {
            if (confirm("Bạn có chắc chắn xóa tất cả?")) {
                jackpot.randomLog = {};
                JackpotSvc.setRandomLog(jackpot.randomLog);
                jackpot.getListRandomLog();
            }
        };

        //N Random Init
        jackpot.nRandomInit = function() {
            initRandomLog();
            initSaveLog();
            if (!jackpot.nRandomSpeed) {
                jackpot.nRandomSpeed = 500;
            }
            jackpot.renderRandom = "01";
            jackpot.runningNRandom = false;
            jackpot.nRandomCount = 0;
            $rootScope.$on("$stateChangeStart", function() {
                jackpot.stopNRandom();
                // jackpot.nRandomInit();
            });
            jackpot.nRandomLog = {};
            jackpot.nRandomList = [];
            jackpot.suggestNumber = jackpot.defaultResult();
            jackpot.allowMin = 0;
            jackpot.limitRandomOneTurn = 1000;
        };

        function invokeNRandomRun() {
            if (jackpot.nRandomCount != jackpot.allowMin && jackpot.nRandomCount % jackpot.limitRandomOneTurn == 0) {
                jackpot.stopNRandom();
                $scope.$apply();
                if (confirm("Đã chạy " + jackpot.nRandomCount + " lượt, bạn có muốn tiếp tục?")) {
                    jackpot.allowMin = jackpot.nRandomCount;
                    jackpot.runNRandom();
                } else {
                    jackpot.allowMin = jackpot.nRandomCount;
                    return;
                }
            }
            jackpot.nRandomCount++;
            jackpot.renderRandom = Math.floor((Math.random() * (45)) + (1));
            if (!jackpot.nRandomLog[jackpot.renderRandom]) {
                jackpot.nRandomLog[jackpot.renderRandom] = 0;
            }
            jackpot.nRandomLog[jackpot.renderRandom]++;
            //--------------------------
            if (!jackpot.randomLog[jackpot.renderRandom]) {
                jackpot.randomLog[jackpot.renderRandom] = 0;
            }
            jackpot.randomLog[jackpot.renderRandom]++;
            JackpotSvc.setRandomLog(jackpot.randomLog);
            jackpot.getListRandomLog(6);
            //---------------------------
            var list = [];
            for (var i in jackpot.nRandomLog) {
                list.push({
                    key: i,
                    value: jackpot.nRandomLog[i]
                });
            }
            jackpot.nRandomList = list.sort(function(a, b) {
                if (a.value != b.value) {
                    return b.value - a.value;
                } else {
                    return Number(a.key) - Number(b.key);
                }
            }).splice(0, 6);
            jackpot.suggestNumber = jackpot.nRandomList.map(function(item) {
                return item.key;
            }).sort(function(a, b) {
                return a - b;
            });
            jackpot.suggestNumber = jackpot.suggestNumber.concat(jackpot.defaultResult());
            jackpot.suggestNumber = jackpot.suggestNumber.splice(0, 6);
            $scope.$apply();
        }

        jackpot.runNRandom = function() {
            jackpot.runningNRandom = true;
            jackpot.nRandomInterval = setInterval(invokeNRandomRun, 1100 - jackpot.nRandomSpeed);
        };

        jackpot.stopNRandom = function() {
            clearInterval(jackpot.nRandomInterval);
            jackpot.runningNRandom = false;
        };


        //Save Log Init
        jackpot.saveLogInit = function() {
            initRandomLog();
            initSaveLog();
            jackpot.saveLogList = jackpot.saveLog.map(function(item) {
                return item.split(",");
            })
        };

        jackpot.nRandomSpeedChange = function() {
            if (jackpot.runningNRandom) {
                clearInterval(jackpot.nRandomInterval);
                jackpot.nRandomInterval = setInterval(invokeNRandomRun, 1100 - jackpot.nRandomSpeed);
            }
            // console.log("Run", jackpot.nRandomSpeed);
        };

        jackpot.renderNumber = function(number) {
            var number = Number(number);
            if (number >= 0 && number < 10) {
                return "0" + number;
            }
            return number;
        };

        //N Random Init
        jackpot.fastInit = function() {
            initRandomLog();
            initSaveLog();
            if (!jackpot.fastCount) {
                jackpot.fastCount = 100;
            }
            jackpot.suggestNumber = [];
            jackpot.nRandomLog = {};
            jackpot.nRandomList = [];
            jackpot.nRandomCount = 0;
        };

        jackpot.startFast = function() {
            if (jackpot.fastCount < 100) {
                jackpot.fastCount = 100;
            }
            if (jackpot.fastCount > 10000) {
                jackpot.fastCount = 10000;
            }
            for (var j = 0; j < Number(jackpot.fastCount); j++) {
                var number = Math.floor((Math.random() * (45)) + (1));
                if (!jackpot.nRandomLog[number]) {
                    jackpot.nRandomLog[number] = 0;
                }
                jackpot.nRandomLog[number]++;
                //--------------------------
                if (!jackpot.randomLog[number]) {
                    jackpot.randomLog[number] = 0;
                }
                jackpot.randomLog[number]++;

                // console.log("Suggest", jackpot.suggestNumber);
                // $scope.$apply();
            }
            jackpot.nRandomCount += Number(jackpot.fastCount);
            JackpotSvc.setRandomLog(jackpot.randomLog);
            jackpot.getListRandomLog(6);
            //---------------------------
            var list = [];
            for (var i in jackpot.nRandomLog) {
                list.push({
                    key: i,
                    value: jackpot.nRandomLog[i]
                });
            }
            jackpot.nRandomList = list.sort(function(a, b) {
                if (a.value != b.value) {
                    return b.value - a.value;
                } else {
                    return Number(a.key) - Number(b.key);
                }
            }).splice(0, 6);
            jackpot.suggestNumber = jackpot.nRandomList.map(function(item) {
                return item.key;
            }).sort(function(a, b) {
                return a - b;
            });
        };
    }
})();