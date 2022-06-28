import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './chip.html?style=./chip.scss';

@WithRender
@Component
export default class Chip extends Vue {
  @Prop()
  readonly text: string;
}
