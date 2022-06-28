import debounce from 'lodash/debounce';
import { DirectiveOptions, VNode } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

const PROP_DISABLED: string = 'hd-infinite-scroll-disabled';

const DEFAULT_DEBOUNCE_MS: number = 100;
const DEFAULT_DISTANCE: number = 300;

class Directive implements DirectiveOptions {
  el: HTMLElement;
  debounceMs: number = DEFAULT_DEBOUNCE_MS;
  distance: number = DEFAULT_DISTANCE;
  callback: () => void;
  isDisabled: boolean = false;
  isImmediate: boolean = true;

  bind = (el: HTMLElement, binding: DirectiveBinding): void => {
    this.el = el;
    this.callback = binding.value;
  };

  inserted = (): void => {
    this.el.addEventListener('scroll', this.handleScroll);
    if (this.isImmediate) {
      this.handleScroll();
    }
  };

  componentUpdated = (_, __, vnode: VNode): void => {
    this.isDisabled = vnode.data?.attrs?.[PROP_DISABLED];
  };

  unbind = (): void => {
    this.el.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll: ReturnType<typeof debounce> = debounce((): void => {
    const parent: HTMLElement = this.el.parentElement;
    const isBottomReached: boolean = this.el.scrollTop + parent.scrollHeight >= this.el.scrollHeight - this.distance;

    const shouldExecCallback: boolean = isBottomReached && !this.isDisabled;
    if (shouldExecCallback) {
      this.callback();
    }
  }, this.debounceMs);
}

export default new Directive();
