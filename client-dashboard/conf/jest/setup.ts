import { config } from '@vue/test-utils';
import { Dialog, Dropdown } from 'element-ui';
import Vue, { CreateElement, VNode } from 'vue';

Vue.component('router-link', {
  render(h: CreateElement): VNode {
    return h('a', {}, this.$slots.default);
  },
});
Vue.component('router-view', {
  render(h: CreateElement): VNode {
    return h('div', {}, 'Router view zone');
  },
});
Vue.component('portal', {
  render(h: CreateElement): VNode {
    return h('div', {}, 'Portal');
  },
});
Vue.component('portal-target', {
  render(h: CreateElement): VNode {
    return h('div', {}, 'Portal Target');
  },
});

Vue.directive('loading', {});
Vue.directive('hd-infinite-scroll', {});

config.mocks.$i18nSvc = {};
config.mocks.$i18nSvc['t'] = (key: string) => key;
config.mocks.$i18nSvc['tc'] = (key: string) => key;

config.stubs = {
  [Dialog.name]: Vue.extend({
    template: `<div>
        <div><slot></slot></div>
        <div><slot name="footer"></slot></div>
      </div>`,
    props: ['title', 'visible'],
  }),
  [Dropdown.name]: Vue.extend({
    template: `<div>
        <div><slot></slot></div>
        <div><slot name="dropdown"></slot></div>
      </div>`,
  }),
};

// Catch unhandled promise rejections.
process.on('unhandledRejection', (err: any) => {
  console.error(err.stack);
});

// Dont display console logs.
global.console.info = jest.fn();
