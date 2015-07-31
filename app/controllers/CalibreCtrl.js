'use strict';

var multiparty = require('multiparty'),
    convert = require('ebook-convert'),
    path = require('path'),
    _ = require('lodash'),
    CalibreService = require('../services/calibre');


module.exports.ebookConvert = function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        var toFormat = fields.to[0];

        var fileToConvert = files.file[0],
            newFilename = path.basename(fileToConvert.originalFilename, path.extname(fileToConvert.originalFilename)) + '.' + toFormat,
            newFilePath = fileToConvert.path.substring(0, fileToConvert.path.length - path.extname(fileToConvert.path).length) + '.' + toFormat;

        CalibreService.ebookConvert(fileToConvert.path, newFilePath)
            .then(function(){
                console.log('did it!, the epub exists!')
                res.download(newFilePath, newFilename);
            }, function(err) {
                res.status(500).send({error: 'Error while converting file', trace: err});
            });
    });
};
	
