import Config from '@/config';
import { DiContainer, getContainer } from '@/di-container';
import HdConsoleLogger from '@libs/console-logger-plugin';
import HdInfiniteScroll from '@libs/infinite-scroll-plugin';
import { InfiniteScroll, Loading } from 'element-ui';
import PortalVue from 'portal-vue';
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';

export const loadPlugins = (): void => {
  usePlugins();
  injectServices();
};

function usePlugins(): void {
  Config.NODE_ENV === 'dev' ? Vue.use(HdConsoleLogger) : undefined;
  Vue.use(InfiniteScroll);
  Vue.use(Loading);
  Vue.use(PortalVue);
  Vue.use(HdInfiniteScroll);
  Vue.use(VueClipboard);
}

function injectServices(): void {
  const container: DiContainer = getContainer();
  Vue.prototype.$agenciesService = container.agencySvc;
  Vue.prototype.$broadcastService = container.broadcastSvc;
  Vue.prototype.$checkoutSvc = container.checkoutSvc;
  Vue.prototype.$candidateSvc = container.candidateSvc;
  Vue.prototype.$i18nSvc = container.i18nSvc;
  Vue.prototype.$inputValidator = container.inputValidator;
  Vue.prototype.$loginService = container.loginSvc;
  Vue.prototype.$missionsService = container.missionsSvc;
  Vue.prototype.$navigationSvc = container.navigationSvc;
  Vue.prototype.$questionsService = container.questionsSvc;
  Vue.prototype.$quizzesService = container.quizzesSvc;
  Vue.prototype.$toastService = container.toastSvc;
  Vue.prototype.$tokenService = container.tokenSvc;
  Vue.prototype.$workersService = container.workersSvc;
}
