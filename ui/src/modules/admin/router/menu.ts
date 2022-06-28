import { ROUTE_NAMES } from '@/route-names';
import { Item } from '@components/page/components/menu-item/menu-item';

export const buildMenu = (missionId: string): Item[] => {
  return [
    {
      title: 'Dashboard',
      icon: 'el-icon-odometer',
      route: { name: ROUTE_NAMES.ADMIN_DASHBOARD },
    },
    {
      title: 'Missions',
      icon: 'el-icon-s-cooperation',
      children: [
        {
          title: 'Liste',
          icon: 'el-icon-menu',
          route: { name: ROUTE_NAMES.ADMIN_MISSION_LIST },
        },
        ...buildCurrentMissionMenu(missionId),
      ],
    },
    {
      title: 'Doers',
      icon: 'el-icon-user-solid',
      route: { name: ROUTE_NAMES.ADMIN_DOER_LIST },
    },
  ];
};

const buildCurrentMissionMenu = (missionId: string): Item[] => {
  const isCurrentMissionPage = !!missionId;

  return isCurrentMissionPage
    ? [
        {
          title: 'Mission actuelle',
          children: [
            {
              title: 'Consulter',
              icon: 'el-icon-view',
              route: {
                name: ROUTE_NAMES.ADMIN_MISSION_READ,
                params: { id: missionId },
              },
              disabled: !isCurrentMissionPage,
            },
            {
              title: 'Éditer',
              icon: 'el-icon-edit',
              route: {
                name: ROUTE_NAMES.ADMIN_MISSION_EDIT,
                params: { id: missionId },
              },
              disabled: true,
            },
            {
              title: 'Quizz',
              icon: 'el-icon-chat-round',
              route: {
                name: ROUTE_NAMES.ADMIN_MISSION_QUIZZ,
                params: { id: missionId },
              },
              disabled: !isCurrentMissionPage,
            },
            {
              title: 'Communication',
              icon: 'el-icon-star-off',
              route: {
                name: ROUTE_NAMES.ADMIN_MISSION_AD,
                params: { id: missionId },
              },
              disabled: !isCurrentMissionPage,
            },
            {
              title: 'Candidat(e)s',
              icon: 'el-icon-user',
              route: {
                name: ROUTE_NAMES.ADMIN_MISSION_CANDIDATE_LIST,
                params: { id: missionId },
              },
              disabled: !isCurrentMissionPage,
            },
          ],
        },
      ]
    : [];
};
