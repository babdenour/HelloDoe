import get from 'lodash/get';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DoerInterface } from '../../../../types/doer.interface';
import WithRender from './doer.html?style=./doer.scss';

interface DoerProps {
  doer: DoerInterface;
}

@WithRender
@Component
export default class Doer extends Vue implements DoerProps {
  @Prop()
  readonly doer!: DoerInterface;

  get = get;
}
