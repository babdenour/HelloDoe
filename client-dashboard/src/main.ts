import Config from '@/config';
import { createContainer } from '@/di-container';
import { loadPlugins } from '@/plugins';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app';
import { i18n } from './i18n';
import { createRouter, loadRoutes } from './router';
import { store } from './store';
import './styles/global.scss';

const router: VueRouter = createRouter();
Config.loadEnvVars();
createContainer(router, i18n);
loadPlugins();
loadRoutes(router);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
