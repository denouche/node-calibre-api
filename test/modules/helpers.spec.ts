import { makeId } from '../../src/modules/helpers';

describe('helpers', () => {
  describe('makeId', () => {
    it('should return properly', () => {
      const result = makeId(4);

      expect(typeof result).toBe('string');
      expect(result.length).toBe(4);
    });

    it('should handle default params', () => {
      expect(makeId().length).toBe(6);
    });
  });
});
