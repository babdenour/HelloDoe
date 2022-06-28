import { AllWorkers } from '@/services/workers.service';
import { DoerInterface } from '@/types/doer.interface';
import Broadcast from '@admin/components/broadcast/broadcast';
import Doer from '@admin/components/doer/doer';
import Loader from '@components/loader/loader';
import { Item } from '@components/page/components/menu-item/menu-item';
import Page from '@components/page/page';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Button } from 'element-ui';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './doer-list-page.html?style=./doer-list-page.scss';

interface DoerListPageProps {
  menu: Item[];
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.PAGE]: Page,
    [Button.name]: Button,
    Broadcast,
    Doer,
    Loader,
  },
})
export default class DoerListPage extends Vue implements DoerListPageProps {
  @Prop({ required: true })
  menu: Item[];

  fetchingDoers = false;
  doers: DoerInterface[] = [];
  nbPages = 0;
  page = 0;

  async mounted(): Promise<any> {
    this.fetchDoers();
  }

  async fetchDoers(): Promise<void> {
    this.fetchingDoers = true;
    const token = this.$tokenService.getToken();

    try {
      const response: AllWorkers = await this.$workersService.getAllWorkers(token, this.page);
      this.doers = response.workers;
      this.nbPages = response.nb_pages;
    } catch (error) {
      this.$toastService.error('Erreur lors de la récupération des Doers');
    }

    this.fetchingDoers = false;
  }

  nextPage(): void {
    this.page++;
    this.fetchDoers();
  }

  previousPage(): void {
    this.page--;
    this.fetchDoers();
  }
}
