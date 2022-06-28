import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './heart-button.html?style=./heart-button.scss';

@WithRender
@Component
export default class HeartButton extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly forceFill: boolean;

  @Prop({ default: '100%' })
  readonly size: string;

  get scssHeartClass(): string {
    return this.forceFill ? 'heart-button__host__path--filled' : 'heart-button__host__path';
  }

  get heartStyle(): { [k: string]: string } {
    return {
      '--size': this.size,
    };
  }
}
