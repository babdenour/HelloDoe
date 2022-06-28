import QuizzEmptyState, { Events } from '@admin/components/quizz-empty-state/quizz-empty-state';
import { Wrapper, mount } from '@vue/test-utils';

import { find } from '@/utils/test';

describe('QuizzEmptyState', () => {
  let wrapper: Wrapper<QuizzEmptyState>;

  beforeEach(() => {
    wrapper = mount(QuizzEmptyState);
  });

  describe('when click create button', () => {
    it('should emit create event', () => {
      const button = find(wrapper, 'create-button');
      button.trigger('click');

      expect(wrapper.emitted()[Events.CREATE]).toBeTruthy();
    });
  });
});
