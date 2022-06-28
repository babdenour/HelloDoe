import { getContainer } from '@/di-container';
import { ROUTE_NAMES } from '@/route-names';
import { RouteConfig } from 'vue-router';

export const createRouter = (): RouteConfig[] => [
  {
    path: '/app/checkout/success',
    name: ROUTE_NAMES.CLIENT_CHECKOUT_SUCCESS,
    component: () => import(/* webpackChunkName: "client" */ '../pages/checkout-success/checkout-success'),
  },
  {
    path: '/app/checkout/failure',
    name: ROUTE_NAMES.CLIENT_CHECKOUT_FAILURE,
    component: () => import(/* webpackChunkName: "client" */ '../pages/checkout-failure/checkout-failure'),
  },
  {
    path: '/app/login',
    name: ROUTE_NAMES.CLIENT_LOGIN,
    component: () => import(/* webpackChunkName: "client" */ '../pages/login-page/login-page'),
  },
  {
    path: '/app',
    component: () => import(/* webpackChunkName: "client" */ '../pages/root-page/root-page'),
    beforeEnter: getContainer().clientAuthGuard,
    children: [
      {
        path: ':missionCode/doers',
        name: ROUTE_NAMES.CLIENT_CANDIDATES_PAGE,
        component: () => import(/* webpackChunkName: "client" */ '../pages/candidates-page/candidates-page'),
      },
      {
        path: ':missionCode/recruitment-process',
        name: ROUTE_NAMES.CLIENT_RECRUITMENT_PROCESS_PAGE,
        component: () => import(/* webpackChunkName: "client" */ '../pages/recruitment-process-page/recruitment-process-page'),
      },
      {
        path: ':missionCode/dashboard-tutorial',
        name: ROUTE_NAMES.CLIENT_DASHBOARD_TUTORIAL_PAGE,
        component: () => import(/* webpackChunkName: "client" */ '../pages/dashboard-tutorial-page/dashboard-tutorial-page'),
      },
      {
        path: ':missionCode/faq',
        name: ROUTE_NAMES.CLIENT_FAQ_PAGE,
        component: () => import(/* webpackChunkName: "client" */ '../pages/faq-page/faq-page'),
      },
      {
        path: ':missionCode',
        redirect: {
          name: ROUTE_NAMES.CLIENT_CANDIDATES_PAGE,
        },
      },
    ],
  },
];
