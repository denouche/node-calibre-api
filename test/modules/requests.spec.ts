import { existFile, removeFile, saveFile } from '../../src/modules/requests';
import { content } from '../__fixtures__/book';

const testFileName = 'src/test.epub';

describe('requests', () => {
  describe('existFile', () => {
    it('should detect if file does not exists', async () =>
      expect(existFile('src/random.txt')).resolves.toBe(false));

    it('should detect if package.json exists', () =>
      expect(existFile('package.json')).resolves.toBe(true));
  });

  describe('removeFile', () => {
    beforeEach(async () => {
      await saveFile(testFileName, content);
    });

    it('should throw if file does not exists', async () =>
      expect(removeFile('src/doesnotexists.txt')).rejects.toThrow(
        "ENOENT: no such file or directory, unlink 'src/doesnotexists.txt",
      ));

    it('should remove file', async () => {
      await removeFile(testFileName);

      expect(await existFile(testFileName)).toBe(false);
    });
  });

  describe('saveFile', () => {
    afterEach(async () => removeFile(testFileName));

    it('should create file', async () => {
      await saveFile(testFileName, content);

      return expect(existFile(testFileName)).resolves.toBe(true);
    });
  });
});
