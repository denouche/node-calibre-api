'use strict';

const express = require('express');
const cors = require('cors');
const apiApp = express();
const requireDir = require('require-dir');
const logger = require('util');
const bodyParser = require('body-parser');
const debug = require('debug')('calibre-api:api');

apiApp.use(cors());
apiApp.use(bodyParser.json({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));

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



const routes = requireDir(__dirname + '/routes', {recurse: true});

for(const route in routes) {
    routes[route](apiApp);
}

module.exports = apiApp;
