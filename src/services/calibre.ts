import { exec } from 'child_process';

const debug = require('debug')('calibre-api:service');

function executeCommand(command: string) {
  return new Promise((resolve, reject) => {
    debug('will execute', command);
    exec(command, (error, stdout, stderr) => {
      if (error !== null) {
        debug('Error after command executed:');
        debug(error);
        debug(stderr);
        debug(stdout);
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

// eslint-disable-next-line import/prefer-default-export
export function ebookConvert(path: string, pathTo: string) {
  return executeCommand(`ebook-convert ${path} ${pathTo}`);
}
