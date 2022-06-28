import { ROUTE_NAMES } from '@/route-names';
import { buildMenu } from '@admin/router/menu';
import { Route } from 'vue-router';
import adminTokenGuard from './guards/adminToken';

export default [
  {
    path: '/admin/login',
    name: 'AdminLoginPage',
    component: () => import(/* webpackChunkName: "admin" */ '../pages/login-page/login-page'),
  },
  {
    path: '/admin',
    name: ROUTE_NAMES.ADMIN_DASHBOARD,
    component: () => import(/* webpackChunkName: "admin" */ '../pages/landing-page/landing-page'),
    props: (route: Route) => ({ menu: buildMenu(route.params.id) }),
    beforeEnter: adminTokenGuard,
  },
  {
    path: '/admin/doers',
    name: ROUTE_NAMES.ADMIN_DOER_LIST,
    component: () =>
      import(/* webpackChunkName: "admin" */ '../pages/doer-list-page/doer-list-page'),
    props: (route: Route) => ({ menu: buildMenu(route.params.id) }),
    beforeEnter: adminTokenGuard,
  },
  {
    path: '/admin/mission',
    name: ROUTE_NAMES.ADMIN_MISSION_LIST,
    component: () =>
      import(/* webpackChunkName: "admin" */ '../pages/mission-list-page/mission-list-page'),
    props: (route: Route) => ({ menu: buildMenu(route.params.id) }),
    beforeEnter: adminTokenGuard,
  },
  {
    path: '/admin/mission/:id',
    name: ROUTE_NAMES.ADMIN_MISSION_READ,
    component: () =>
      import(/* webpackChunkName: "admin" */ '../pages/mission-info-page/mission-info-page'),
    props: (route: Route) => ({ menu: buildMenu(route.params.id) }),
    beforeEnter: adminTokenGuard,
  },
  {
    path: '/admin/mission/:id/ad',
    name: ROUTE_NAMES.ADMIN_MISSION_AD,
    component: () =>
      import(/* webpackChunkName: "admin" */ '../pages/mission-com-page/mission-com-page'),
    props: (route: Route) => ({ menu: buildMenu(route.params.id) }),
    beforeEnter: adminTokenGuard,
  },
  {
    path: '/admin/mission/:id/edit',
    name: ROUTE_NAMES.ADMIN_MISSION_EDIT,
    component: () =>
      import(/* webpackChunkName: "admin" */ '../pages/mission-edit-page/mission-edit-page'),
  },
  {
    path: '/admin/mission/:id/quizz',
    name: ROUTE_NAMES.ADMIN_MISSION_QUIZZ,
    component: () =>
      import(/* webpackChunkName: "admin" */ '../pages/mission-quizz-page/mission-quizz-page'),
    props: (route: Route) => ({ menu: buildMenu(route.params.id) }),
  },
  {
    path: '/admin/mission/:id/workers/candidates',
    name: ROUTE_NAMES.ADMIN_MISSION_CANDIDATE_LIST,
    component: () =>
      import(/* webpackChunkName: "admin" */ '../pages/candidate-list-page/candidate-list-page'),
    props: (route: Route) => ({ menu: buildMenu(route.params.id) }),
    beforeEnter: adminTokenGuard,
  },
];
