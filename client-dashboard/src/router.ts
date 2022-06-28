import { createRouter as createClientRouter } from '@client/router';
import Vue from 'vue';
import { default as Router, default as VueRouter } from 'vue-router';

Vue.use(Router);

export const createRouter = (): VueRouter => {
  return new Router({
    mode: 'history',
  });
};

export const loadRoutes = (router: VueRouter): void => {
  router.addRoutes(createClientRouter());
};
