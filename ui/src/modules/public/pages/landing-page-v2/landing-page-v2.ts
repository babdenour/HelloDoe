import adBroadcastSrc from '@/assets/showcase-site/mission-ad-broadcast.jpg';
import adDesignSrc from '@/assets/showcase-site/mission-ad-design.jpg';
import missionPreselectionSrc from '@/assets/showcase-site/mission-preselection.jpg';
import missionSelectionSrc from '@/assets/showcase-site/mission-selection.jpg';
import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './landing-page-v2.html?style=./landing-page-v2.scss';

@WithRender
@Component
export default class LandingPageV2Page extends Vue {
  get targettedAdSrc() {
    return adDesignSrc;
  }

  get lotOfCandidatesSrc() {
    return adBroadcastSrc;
  }

  get preselectionSrc() {
    return missionPreselectionSrc;
  }

  get dashboardSrc() {
    return missionSelectionSrc;
  }
}
