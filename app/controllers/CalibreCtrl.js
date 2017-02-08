'use strict';

var multiparty = require('multiparty'),
    path = require('path'),
    CalibreService = require('../services/calibre'),
    debug = require('debug')('calibre-api:controller');

var conversionTimeout = 10 * 60 * 1000;

module.exports.ebookConvert = function (req, res) {
    res.setTimeout(conversionTimeout);
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        if(!fields.to || fields.to.length !== 1) {
            res.status(400).send({error: 'Error: Missing "to" field in the form. The "to" field must be set to the output file extension wanted'});
            return;
        }
        if(!files.file || files.file.length !== 1) {
            res.status(400).send({error: 'Error: Missing file to convert in the form data'});
            return;
        }

        var toFormat = fields.to[0];

        var fileToConvert = files.file[0],
            newFilename = path.basename(fileToConvert.originalFilename, path.extname(fileToConvert.originalFilename)) + '.' + toFormat,
            newFilePath = fileToConvert.path.substring(0, fileToConvert.path.length - path.extname(fileToConvert.path).length) + '.' + toFormat;

        CalibreService.ebookConvert(fileToConvert.path, newFilePath)
            .then(function(){
                debug('did it!, the epub exists!')
                res.download(newFilePath, newFilename);
            }, function(err) {
                res.status(500).send({error: 'Error while converting file', trace: err});
            });
    });
};
	
