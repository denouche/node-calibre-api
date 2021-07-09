const exec = require('child_process').exec;
const logger = require('util');
const request = require('request');
const debug = require('debug')('calibre-api:service');

function executeCommand (command) {
    return new Promise(function(resolve, reject) {
        debug("will execute", command);
        const child = exec(command, function (error, stdout, stderr) {
            if (error !== null) {
                debug('Error after command executed:');
                debug(error);
                debug(stderr);
                debug(stdout);
                reject(stderr);
            }
            else {
                resolve(stdout);
            }
        });
    });
}

function ebookConvert (path, pathTo) {
    return executeCommand('ebook-convert ' + path + ' ' + pathTo);
}

exports.ebookConvert = ebookConvert;


