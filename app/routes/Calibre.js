'use strict';

const calibreCtrl = require('../controllers/CalibreCtrl');

module.exports = function (app) {
    app.route('/calibre/ebook-convert')
        .post(calibreCtrl.ebookConvert);

};

