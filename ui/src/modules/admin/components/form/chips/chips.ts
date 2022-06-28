import { Button, Input, Tag } from 'element-ui';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './chips.html?style=./chips.scss';

enum Events {
  INPUT = 'input',
}

interface ChipsProps {
  value: string[];
}

@WithRender
@Component({
  components: {
    [Button.name]: Button,
    [Input.name]: Input,
    [Tag.name]: Tag,
  },
})
export default class Chips extends Vue implements ChipsProps {
  @Prop({ default: () => [] })
  value: string[];

  tags: string[] = [];

  inputVisible = false;
  inputValue = '';

  $refs!: {
    saveTagInput: Input;
  };

  get i18n() {
    return {
      add: this.$i18nSvc.t('actions.add'),
    };
  }

  handleClose(tag: string): void {
    this.tags.splice(this.tags.indexOf(tag), 1);
    this.$emit(Events.INPUT, [...this.tags]);
  }

  showInput(): void {
    this.inputVisible = true;
    this.$nextTick(() => {
      (this.$refs.saveTagInput.$refs.input as any).focus();
    });
  }

  handleInputConfirm(): void {
    let inputValue = this.inputValue;
    if (inputValue && !this.hasTag(inputValue)) {
      this.tags.push(inputValue);
    }
    this.inputVisible = false;
    this.inputValue = '';
    this.$emit(Events.INPUT, [...this.tags]);
  }

  private hasTag(tag: string): boolean {
    return this.tags.indexOf(tag) >= 0;
  }

  @Watch('value')
  updateTags(): void {
    this.tags = [...this.value];
  }
}
