import Config from '@/config';
import { createContainer } from '@/di-container';
import { loadPlugins } from '@/plugins';
import DateCardList from '@components/date-card-list/date-card-list';
import Loader from '@components/loader/loader';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app';
import { i18n } from './i18n';
import { createRouter, loadRoutes } from './router';
import { store } from './store';

const router: VueRouter = createRouter();
Config.loadEnvVars();
createContainer(router, i18n);
loadPlugins();
loadRoutes(router);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.component('app-loader', Loader);
Vue.component('app-date-cards-list', DateCardList);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
