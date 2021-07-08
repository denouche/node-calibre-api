'use strict';

var path = require('path'),
 express = require('express'),
 webApp = express(),
 apiApp = require('./app/api'),
 logger = require('util'),
 errorhandler = require('errorhandler'),
 debug = require('debug')('calibre-api:app');

webApp.set('port', process.env.PORT || 3000);
webApp.use(apiApp);

var env = process.env.NODE_ENV || 'development';
if ('production' === env) {
    webApp.use(errorhandler({dumpExceptions: false, showStack: false}));
}
else if ('development' === env) {
    webApp.use(errorhandler({dumpExceptions: true, showStack: true}));
}


webApp.listen(webApp.get('port'), '0.0.0.0');
debug("Started in " + webApp.settings.env + " on port " + webApp.get('port'));

