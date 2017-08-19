(function() {
    'use strict';

    angular.module("Jackpot")
        .service("ConfigSvc", ConfigSvc);

    function ConfigSvc(localStorageService, $rootScope) {
        return {
            statisticUrl: "http://vietlott.vn/vi/choi/mega-6-45/thong-ke/?FromDate=01%2F01%2F2016",
            resultUrl: "http://vietlott.vn/vi/trung-thuong/ket-qua-trung-thuong/mega-6-45/",
            winningUrl: "http://vietlott.vn/vi/trung-thuong/ket-qua-trung-thuong/mega-6-45/winning-numbers/"
        };
    }
})();