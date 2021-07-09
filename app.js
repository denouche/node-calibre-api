'use strict';

const path = require('path');
const express = require('express');
const webApp = express();
const apiApp = require('./app/api');
const logger = require('util');
const errorhandler = require('errorhandler');
const debug = require('debug')('calibre-api:app');

webApp.set('port', process.env.PORT || 3000);
webApp.use(apiApp);

const env = process.env.NODE_ENV || 'development';
if ('production' === env) {
    webApp.use(errorhandler({dumpExceptions: false, showStack: false}));
}
else if ('development' === env) {
    webApp.use(errorhandler({dumpExceptions: true, showStack: true}));
}


webApp.listen(webApp.get('port'), '0.0.0.0');
debug("Started in " + webApp.settings.env + " on port " + webApp.get('port'));

