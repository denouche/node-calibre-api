'use strict';

const multiparty = require('multiparty');
const path = require('path');
const CalibreService = require('../services/calibre');
const debug = require('debug')('calibre-api:controller');
const basedBlob = require('based-blob');
const fs = require('fs');
const fetch =  require('node-fetch');
const conversionTimeout = 10 * 60 * 1000;

const { makeId } = require('../modules/helpers');


const saveFile = (fullPath, content, type='base64') => {

    const data = content.includes('data:application/epub+zip;base64,') ? content.split('data:application/epub+zip;base64,')[1]: content;
    fs.writeFile(fullPath, data, type, function(err) {
        if(err) {
            console.log(err);
            throw new Error(err.message);
        }
    });
}

module.exports.ebookConvert = function (req, res) {
    res.setTimeout(conversionTimeout);
    const form = new multiparty.Form();
    debug('request.body', JSON.stringify(req.body));
    debug('form', form);
    debug('json.stringify(form)', JSON.stringify(form));
    form.parse(req, function(err, fields, files) {
        debug('fields', fields);
        debug('files', files)

        debug('fields json', JSON.stringify(fields))
        debug('files json', JSON.stringify(files))

        debug('files json', JSON.stringify(files))
        if(!fields.to || fields.to.length !== 1) {
            res.status(400).send({error: 'Error: Missing "to" field in the form. The "to" field must be set to the output file extension wanted'});
            return;
        }
        if(!files.file || files.file.length !== 1) {
            res.status(400).send({error: 'Error: Missing file to convert in the form data'});
            return;
        }

        const extension = fields.to[0];

        const fileToConvert = files.file[0];
//        debug(fileToConvert);
//        debug(typeof fileToConvert)
        const newFilename = path.basename(fileToConvert.originalFilename, path.extname(fileToConvert.originalFilename)) + '.' + extension;
        const newFilePath = fileToConvert.path.substring(0, fileToConvert.path.length - path.extname(fileToConvert.path).length) + '.' + extension;

//        debug('fileToConvert.path', fileToConvert.path)

        CalibreService.ebookConvert(fileToConvert.path, newFilePath)
            .then(function(){
                debug(`did it!, the ${extension} exists!`)
                res.download(newFilePath, newFilename);
            }, function(err) {
                res.status(500).send({error: 'Error while converting file', trace: err});
            });
    });
};
	


module.exports.ebookConvertBase64 = function (req, res) {
    const { body } = req;
    const {bookContent, bookName, to} = body;
    let blob;

    if(!bookContent || !bookName) {
        throw new Error('No bookContent nor bookName');
    }

    if(typeof bookContent !== 'string'){
        throw new Error(`Can't read bookContent expecting string. ${typeof bookContent} instead `);
    }

    try{
        const [originalName, ext] = bookName.split('.');
        const fromPath = `/tmp/${makeId(12)}.${ext}`
        const toPath = `/tmp/${makeId(12)}.${to}`;

        saveFile(fromPath, bookContent);

        CalibreService.ebookConvert(fromPath, toPath)
          .then(function(){
              debug(`did it!, the ${to} exists!`)
              res.download(toPath, `${originalName}.${to}`);
          }, function(err) {
              res.status(500).send({error: 'Error while converting file', trace: err});
          });

    }catch(error) {
        throw new Error('Cant parse bookContent to Blob: ' + error.message);
    }

};