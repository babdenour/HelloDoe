import { config } from '@vue/test-utils';
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

Vue.directive('loading', {});
Vue.directive('hd-infinite-scroll', {});

config.mocks.$i18nSvc = {};
config.mocks.$i18nSvc['t'] = (key: string) => key;
config.mocks.$i18nSvc['tc'] = (key: string) => key;

// Catch unhandled promise rejections.
process.on('unhandledRejection', (err: any) => {
  console.error(err.stack);
});

// Dont display console logs.
global.console.info = jest.fn();
