import AdminRoutes from '@admin/router';
import { createRouter as createClientRouter } from '@client/router';
import PublicRoutes from '@public/router';
import { createRouter as createWebviewRouter } from '@public/webview/router';
import Vue from 'vue';
import { default as Router, default as VueRouter } from 'vue-router';

Vue.use(Router);

export const createRouter = () => {
  return new Router({
    mode: 'history',
  });
};

export const loadRoutes = (router: VueRouter) => {
  router.addRoutes(PublicRoutes);
  router.addRoutes(AdminRoutes);
  router.addRoutes(createClientRouter());
  router.addRoutes(createWebviewRouter());
};
