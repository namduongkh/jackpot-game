'use strict';

module.exports = {
    minDir: "./www/min",
    css: [
        "./www/css/style.css",
        "./www/css/*.scss",
    ],
    js: [
        "./www/js/app.js",
        "./www/js/jackpot.directive.js",
        "./www/js/config.service.js",
        "./www/js/jackpot.service.js",
        "./www/js/jackpot.filter.js",
        "./www/js/root.controller.js",
        "./www/js/jackpot.controller.js",
        "./www/js/statistic.controller.js",
        "./www/js/winning.controller.js",
        "./www/js/result.controller.js",
    ],
    vendorJs: [
        "./www/lib/ionic/js/ionic.bundle.js",
        "./www/lib/angular-local-storage/dist/angular-local-storage.min.js",
        "./www/lib/async/dist/async.min.js",
        "./www/lib/lodash/dist/lodash.min.js",
    ],
    vendorCss: [
        "./www/lib/ionic/css/ionic.min.css"
    ]
};