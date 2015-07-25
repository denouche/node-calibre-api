'use strict';

var multiparty = require('multiparty'),
    convert = require('ebook-convert'),
    path = require('path'),
    _ = require('lodash'),
    CalibreService = require('../services/calibre');


module.exports.ebookConvert = function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        var body = JSON.parse(fields.body[0]);

        var fileToConvert = files.file[0],
            newFilename = path.basename(fileToConvert.originalFilename, path.extname(fileToConvert.originalFilename)) + '.' + body.to,
            newFilePath = fileToConvert.path.substring(0, fileToConvert.path.length - path.extname(fileToConvert.path).length) + '.' + body.to;

        CalibreService.ebookConvert(fileToConvert.path, newFilePath)
            .then(function(){
                console.log('did it!, the epub exists!')
                res.download(newFilePath, newFilename);
            });
    });
};
	
