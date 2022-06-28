import { Item } from '@components/page/components/menu-item/menu-item';
import Page from '@components/page/page';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './landing-page.html';

interface LandingPageProps {
  menu: Item[];
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.PAGE]: Page,
  },
})
export default class LandingPage extends Vue implements LandingPageProps {
  @Prop({ required: true })
  menu: Item[];
}
