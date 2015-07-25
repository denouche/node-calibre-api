var q = require('q'),
    exec = require('child_process').exec,
    logger = require('util'),
    request = require('request');

function executeCommand (command) {
    var deferred = q.defer();
    logger.log("WILL EXECUTE: " + command);
    var child = exec(command, function (error, stdout, stderr) {
        if (error !== null) {
            console.error(error);
            console.error(stderr);
            console.error(stdout);
            deferred.reject(stderr);
        }
        else {
            deferred.resolve(stdout);
        }
    });
    return deferred.promise;
}

function ebookConvert (path, pathTo) {
    return executeCommand('ebook-convert ' + path + ' ' + pathTo);
}

exports.ebookConvert = ebookConvert;


