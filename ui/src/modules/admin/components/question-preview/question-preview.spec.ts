import QuestionPreview, {
  QuestionPreviewProps,
} from '@admin/components/question-preview/question-preview';
import { Wrapper, shallowMount } from '@vue/test-utils';
import { find, findAll } from '@/utils/test';

import { Question } from '@domains/question';
import { QuestionFactory } from '@factories/question.factory';
import { QuickRepliesMessageFactory } from '@factories/quick-replies-message.factory';

const SUMMARY_SELECTOR = 'summary';
const TAG_SELECTOR = 'tag';

describe('QuestionPreview', () => {
  let wrapper: Wrapper<QuestionPreview>;

  let questionProp: Question;

  const createWrapper = async (): Promise<void> => {
    const props: QuestionPreviewProps = {
      question: questionProp,
    };

    wrapper = shallowMount(QuestionPreview);
    await wrapper.setProps(props);
  };

  beforeEach(async () => {
    questionProp = QuestionFactory.create();
    await createWrapper();
  });

  describe('when default question', () => {
    it('should display empty summary text', () => {
      const summary = find(wrapper, SUMMARY_SELECTOR);

      expect(summary.text()).toBe('');
    });

    it('should not display tags', () => {
      expect(find(wrapper, TAG_SELECTOR).exists()).toBe(false);
    });
  });

  describe('when question specified', () => {
    const SUMMARY_TEXT = 'summary text';
    const TAG_0 = 'tag0';
    const TAG_1 = 'tag1';

    beforeEach(async () => {
      questionProp = QuestionFactory.create({
        messages: [
          QuickRepliesMessageFactory.create({
            text: SUMMARY_TEXT,
          }),
        ],
        tags: [TAG_0, TAG_1],
      });
      await createWrapper();
    });

    it('should display summary text', () => {
      const summary = find(wrapper, SUMMARY_SELECTOR);

      expect(summary.text()).toBe(SUMMARY_TEXT);
    });

    it('should not display tags', () => {
      const tags = findAll(wrapper, TAG_SELECTOR);

      expect(tags.at(0).text()).toBe(TAG_0);
      expect(tags.at(1).text()).toBe(TAG_1);
    });
  });
});
