import { ROUTE_NAMES } from '@/route-names';
import { RouteConfig } from 'vue-router';

export const createRouter = (): RouteConfig[] => [
  {
    path: '/mission-timetable/:missionId',
    name: ROUTE_NAMES.WEBVIEW_MISSION,
    component: () => import(/* webpackChunkName: "webview" */ '../pages/mission-webview-page/mission-webview-page'),
  },
];
