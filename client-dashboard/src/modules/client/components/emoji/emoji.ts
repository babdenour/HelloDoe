import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './emoji.html?style=./emoji.scss';

@WithRender
@Component
export default class Emoji extends Vue {
  @Prop()
  readonly name: string;

  @Prop()
  readonly size: string;

  get urlImage(): string {
    return require(`@/assets/emoji/base/${this.name}.png`);
  }

  get emojiStyle(): { [k: string]: string } {
    return {
      '--size': this.size,
    };
  }
}
