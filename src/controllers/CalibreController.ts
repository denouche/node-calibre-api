import multiparty from 'multiparty';
import * as path from 'path';
import { Request, Response } from 'express';
import { HttpRequest, HttpResponse } from 'types';
import { makeId } from '../modules/helpers';
import { removeFile, saveFile } from '../modules/requests';
import * as CalibreService from '../services/calibre';

const debug = require('debug')('calibre-api:controller');

const conversionTimeout = 10 * 60 * 1000;

export async function ebookConvert(request: Request, res: Response) {
  res.setTimeout(conversionTimeout);
  const form = new multiparty.Form();
  debug('request.body', JSON.stringify(request.body));
  debug('form', form);
  debug('json.stringify(form)', JSON.stringify(form));
  form.parse(request, (_e, fields, files) => {
    debug('fields', fields);
    debug('files', files);

    debug('fields json', JSON.stringify(fields));
    debug('files json', JSON.stringify(files));

    debug('files json', JSON.stringify(files));
    if (!fields.to || fields.to.length !== 1) {
      res.status(400).send({
        error:
          'Error: Missing "to" field in the form. The "to" field must be set to the output file extension wanted',
      });
      return;
    }
    if (!files.file || files.file.length !== 1) {
      res.status(400).send({ error: 'Error: Missing file to convert in the form data' });
      return;
    }

    const extension = fields.to[0];

    const fileToConvert = files.file[0];
    const newFilename = `${path.basename(
      fileToConvert.originalFilename,
      path.extname(fileToConvert.originalFilename),
    )}.${extension}`;
    const newFilePath = `${fileToConvert.path.substring(
      0,
      fileToConvert.path.length - path.extname(fileToConvert.path).length,
    )}.${extension}`;

    CalibreService.ebookConvert(fileToConvert.path, newFilePath).then(
      () => {
        debug(`did it!, the ${extension} exists!`);
        res.download(newFilePath, newFilename);
      },
      (error: Error) => {
        res.status(500).send({ error: 'Error while converting file', trace: error });
      },
    );
  });
}

export async function ebookConvertBase64(httpRequest: HttpRequest): Promise<HttpResponse> {
  const { body } = httpRequest;

  try {
    const { bookContent: content, bookName: name, to = 'mobi' } = body;

    if (!content || !name) {
      throw new Error('Input Error: No bookContent nor bookName');
    }

    if (!name.includes('.')) {
      throw new Error('Input Error: bookName does not contains extension.');
    }

    if (typeof content !== 'string') {
      throw new Error(
        `Input Error: Can't read bookContent expecting string. ${typeof content} instead `,
      );
    }

    const [originalName, ext] = name.split('.');
    const fromPath = `/tmp/${makeId(12)}.${ext}`;
    const toPath = `/tmp/${makeId(12)}.${to}`;
    const newFileName = `${originalName}.${to}`;

    await saveFile(fromPath, content);

    await CalibreService.ebookConvert(fromPath, toPath);

    await removeFile(fromPath);

    return {
      statusCode: 200,
      isDownload: true,
      body: {
        path: toPath,
        name: newFileName,
      },
    };
  } catch (error: any) {
    debug(error.message);
    if (error.message.includes('Input Error')) {
      return {
        statusCode: 400,
        body: { error: error.message },
      };
    }

    return {
      statusCode: 500,
      body: { error: error.message },
    };
  }
}
