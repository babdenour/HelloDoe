import { ROUTE_NAMES } from '@/route-names';
import { MissionInterface } from '@/types/mission.interface';
import { Button, Card, Tag } from 'element-ui';
import { truncate } from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './mission.html?style=./mission.scss';

interface MissionProps {
  mission: MissionInterface;
}

@WithRender
@Component({
  components: {
    [Button.name]: Button,
    [Card.name]: Card,
    [Tag.name]: Tag,
  },
})
export default class Mission extends Vue implements MissionProps {
  @Prop()
  readonly mission!: MissionInterface;

  get i18n(): { [k: string]: string } {
    return {
      missionStatus: this.$i18nSvc.t(`mission.status.${this.missionStatus}`).toString(),
      missionCategory: this.$i18nSvc.t(`mission.category.${this.missionCategory}`).toString(),
    };
  }

  get startDate(): string {
    if (this.mission.startDate) {
      const isoDate = new Date(this.mission.startDate).toISOString();
      const date = isoDate.split('T')[0];
      const formattedDate = date.split('-').reverse().join('/');
      return formattedDate;
    }

    return undefined;
  }

  get missionStatus(): string {
    return this.mission.status;
  }
  get missionCategory(): string {
    return this.mission.category;
  }

  get categoryName(): string {
    return this.$missionsService.getCategoryName(this.mission.category);
  }

  get description(): string {
    return truncate(this.mission.description, {
      length: 500,
      omission: '...',
    });
  }

  navigateToMissionDetails(missionId) {
    this.$router.push({
      name: ROUTE_NAMES.ADMIN_MISSION_READ,
      params: {
        id: missionId,
      },
    });
  }

  navigateToMissionCom(missionId) {
    this.$router.push({
      name: ROUTE_NAMES.ADMIN_MISSION_AD,
      params: {
        id: missionId,
      },
    });
  }
}
