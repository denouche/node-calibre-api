import fs from 'fs';

const prefix = 'data:application/epub+zip;base64';
export async function existFile(fullPath: string) {
  return Promise.resolve(fs.existsSync(fullPath));
}

export async function saveFile(fullPath: string, content: string, type = 'base64' as const) {
  const data = content.includes(prefix) ? content.split(prefix)[1] : content;
  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(fullPath, data, { encoding: type });

      resolve(null);
    } catch (err) {
      reject(err);
    }
  });
}

export async function removeFile(fullPath: string) {
  return new Promise((resolve, reject) => {
    try {
      fs.unlinkSync(fullPath);

      resolve(null);
    } catch (err) {
      reject(err);
    }
  });
}
