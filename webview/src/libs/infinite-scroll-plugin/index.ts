import Vue, { VueConstructor } from 'vue';
import { PluginFunction } from 'vue/types/umd';
import Directive from './directive';

const plugin: PluginFunction<never> = (vue: VueConstructor<Vue>) => {
  vue.directive('hd-infinite-scroll', Directive);
};

export default plugin;
