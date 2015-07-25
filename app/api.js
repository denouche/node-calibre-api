'use strict';

var express = require('express'),
    apiApp = express(),
    requireDir = require('require-dir'),
    logger = require('util'),
    bodyParser = require('body-parser');

apiApp.use(bodyParser.json());

apiApp.all('/*', function (req, res, next) {
    logger.log(req.method + ' ' + req.url);
    next();
});

apiApp.use(function(err, req, res, next) {
    console.error('Error while calling ' + req.method + ' ' + req.url);
    console.error(logger.inspect(req.headers));
    console.error(logger.inspect(req.body));
    console.error('Error is:');
    console.error(logger.inspect(err));
    console.error(err.status);
    console.error(err.stack);
    res.send(500);
});



var routes = requireDir(__dirname + '/routes', {recurse: true});

for(var route in routes) {
    routes[route](apiApp);
}

module.exports = apiApp;
