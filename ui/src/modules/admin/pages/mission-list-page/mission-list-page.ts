import { MissionInterface } from '@/types/mission.interface';
import MissionCreationProcess from '@admin/components/mission-creation-process/mission-creation-process';
import Mission from '@admin/components/mission/mission';
import { Item } from '@components/page/components/menu-item/menu-item';
import Page from '@components/page/page';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Button } from 'element-ui';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './mission-list-page.html?style=./mission-list-page.scss';

interface MissionsListPageProps {
  menu: Item[];
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.ADMIN_MISSION]: Mission,
    [COMPONENTS_NAMES.ADMIN_MISSION_CREATION_PROCESS]: MissionCreationProcess,
    [COMPONENTS_NAMES.PAGE]: Page,
    [Button.name]: Button,
  },
})
export default class MissionsListPage extends Vue implements MissionsListPageProps {
  @Prop({ required: true })
  menu: Item[];

  missions: MissionInterface[] = [];
  fetchingMissions: boolean = false;

  async mounted() {
    this.fetchingMissions = true;
    this.missions = await this.$missionsService.getAllMissions();
    this.fetchingMissions = false;
  }

  openNav() {
    document.getElementById('overlay').style.height = '100vh';
  }

  closeNav() {
    document.getElementById('overlay').style.height = '0';
  }
}
