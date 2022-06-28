import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

import { Button } from 'element-ui';
import WithRender from './quizz-empty-state.html?style=./quizz-empty-state.scss';

export enum Events {
  CREATE = 'create-quizz',
}

interface QuizzEmptyStateProps {
  loading: boolean;
}

@WithRender
@Component({
  components: {
    [Button.name]: Button,
  },
})
export default class QuizzEmptyState extends Vue implements QuizzEmptyStateProps {
  @Prop({ default: false })
  readonly loading: boolean;

  @Emit(Events.CREATE)
  emitCreateQuizz() {}
}
