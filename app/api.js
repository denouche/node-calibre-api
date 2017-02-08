'use strict';

var express = require('express'),
    apiApp = express(),
    requireDir = require('require-dir'),
    logger = require('util'),
    bodyParser = require('body-parser'),
    debug = require('debug')('calibre-api:api');

apiApp.use(bodyParser.json());

apiApp.all('/*', function (req, res, next) {
    debug(req.method + ' ' + req.url);
    next();
});

apiApp.use(function(err, req, res, next) {
    debug('Error while calling ' + req.method + ' ' + req.url);
    debug(logger.inspect(req.headers));
    debug(logger.inspect(req.body));
    debug('Error is:');
    debug(logger.inspect(err));
    debug(err.status);
    debug(err.stack);
    res.send(500);
});



var routes = requireDir(__dirname + '/routes', {recurse: true});

for(var route in routes) {
    routes[route](apiApp);
}

module.exports = apiApp;
