'use strict';

const monitoringCtrl = require('../controllers/MonitoringCtrl');

module.exports = function (app) {
    app.route('/calibre/monitoring/')
        .get(monitoringCtrl.monitoring);
};

