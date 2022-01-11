import * as CalibreController from '../../src/controllers/CalibreController';
import * as CalibreService from '../../src/services/calibre';
import * as helpers from '../../src/modules/helpers';
import * as requests from '../../src/modules/requests';
import { content } from '../__fixtures__/book';

const mockEbookConvert = jest
  .spyOn(CalibreService, 'ebookConvert')
  .mockImplementation(() => Promise.resolve(null));

jest.spyOn(helpers, 'makeId').mockImplementation(() => '123456');

jest.spyOn(requests, 'saveFile').mockImplementation(() => Promise.resolve(null));

jest.spyOn(requests, 'removeFile').mockImplementation(() => Promise.resolve(null));

describe('CalibreController', () => {
  describe('ebookConvertBase64', () => {
    it('should fail without body', async () => {
      const { statusCode, body } = await CalibreController.ebookConvertBase64({
        body: {},
      });

      expect(statusCode).toBe(400);
      expect(body.error).toBe('Input Error: No bookContent nor bookName');
    });

    it('should fail without a valid bookContent', async () => {
      const { statusCode, body } = await CalibreController.ebookConvertBase64({
        body: { bookContent: 123, bookName: 'Test.epub' },
      });

      expect(statusCode).toBe(400);
      expect(body.error).toBe(
        "Input Error: Can't read bookContent expecting string. number instead ",
      );
    });

    it('should throw if bookName not contains extension', async () => {
      const { statusCode, body } = await CalibreController.ebookConvertBase64({
        body: { bookContent: content, bookName: 'Test' },
      });

      expect(statusCode).toBe(400);
      expect(body.error).toBe('Input Error: bookName does not contains extension.');
    });

    it('should handle default "to" param', async () => {
      const { statusCode, body } = await CalibreController.ebookConvertBase64({
        body: { bookContent: content, bookName: 'Test.epub' },
      });

      expect(mockEbookConvert).toHaveBeenCalledWith('/tmp/123456.epub', '/tmp/123456.mobi');

      expect(statusCode).toBe(200);
      expect(body.error).toBe(undefined);
    });
  });
});
