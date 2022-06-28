import { Component, Prop, Vue } from 'vue-property-decorator';

import WithRender from './loader.html?style=./loader.scss';

interface LoaderProps {
  size?: string;
}

@WithRender
@Component
export default class Loader extends Vue implements LoaderProps {
  @Prop({ default: 'medium' })
  readonly size: string;

  getSizeClass(): string {
    if (this.size === 'medium') {
      return 'medium';
    }

    return 'small';
  }
}
