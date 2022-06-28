import { Rule } from '@libs/old-form/types/rule';
import { arrayMinSize } from '@libs/old-form/validators/array-min-size';

describe('arrayMinSize', () => {
  const RULE: Rule<number[]> = {} as any;

  const MIN_SIZE = 1;
  const validator = arrayMinSize(MIN_SIZE);

  describe('when length strictly greater than min size', () => {
    it('should pass', () => {
      const mockCallback = jest.fn();
      validator(RULE, [1, 2, 3], mockCallback);
      expect(mockCallback).toHaveBeenCalledWith();
    });
  });

  describe('when length equals min size', () => {
    it('should pass', () => {
      const mockCallback = jest.fn();
      validator(RULE, [1], mockCallback);
      expect(mockCallback).toHaveBeenCalledWith();
    });
  });

  describe('when length strictly lower than min size', () => {
    it('should fail', () => {
      const mockCallback = jest.fn();
      validator(RULE, [], mockCallback);
      expect(mockCallback).toHaveBeenCalledWith(new Error());
    });
  });
});
