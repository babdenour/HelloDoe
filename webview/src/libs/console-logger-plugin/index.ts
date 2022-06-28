import Vue, { VueConstructor } from 'vue';
import { PluginFunction } from 'vue/types/umd';
import ConsoleLogger from './logger';

const plugin: PluginFunction<never> = (vue: VueConstructor<Vue>) => {
  const tags: HTMLCollectionOf<HTMLBodyElement> = document.getElementsByTagName('body');
  const body: HTMLBodyElement = tags.item(0);

  const loggerEl: HTMLDivElement = document.createElement('div');

  body.appendChild(loggerEl);

  const loggerCtor: ReturnType<typeof vue.extend> = vue.extend(ConsoleLogger);
  const loggerInstance = new loggerCtor();
  loggerInstance.$mount(loggerEl);
};

export default plugin;
