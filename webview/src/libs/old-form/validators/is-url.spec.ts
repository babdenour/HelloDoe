import { Rule } from '@libs/old-form/types/rule';
import { isUrl } from '@libs/old-form/validators/is-url';

describe('isUrl', () => {
  const RULE: Rule<string> = {
    trigger: 'blur',
  };

  describe('when url', () => {
    const URLS = ['https://www.john.doe', 'https://john.doe'];

    it('should pass', () => {
      URLS.forEach((url) => {
        const mockCallback = jest.fn();
        isUrl(RULE, url, mockCallback);
        expect(mockCallback).toHaveBeenCalledWith();
      });
    });
  });

  describe('when not url', () => {
    const NOT_URLS = ['data:image/png;base64,blabla'];

    it('should fail', () => {
      NOT_URLS.forEach((url) => {
        const mockCallback = jest.fn();
        isUrl(RULE, url, mockCallback);
        expect(mockCallback).toHaveBeenCalledWith(new Error());
      });
    });
  });
});
