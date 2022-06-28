import Atempo from '@public/pages/atempo/atempo';
import Cgu from '@public/pages/cgu/cgu';
import CharteUtilisation from '@public/pages/charte-utilisation/charte-utilisation';
import LandingPageV2Page from '@public/pages/landing-page-v2/landing-page-v2';
import ProspectB3E6 from '@public/pages/prospect-b3e6/prospect-b3e6';
import StudyCaseHostnfly from '@public/pages/study-case-hostnfly/study-case-hostnfly';
import TempCostCalculator from '@public/pages/temp-cost-calculator/temp-cost-calculator';

export default [
  {
    path: '/',
    name: 'Home',
    component: LandingPageV2Page,
  },
  {
    path: '/blog/study-case/hostnfly',
    name: 'StudyCaseHostnfly',
    component: StudyCaseHostnfly,
  },
  {
    path: '/cgu',
    name: 'CGUPage',
    component: Cgu,
  },
  {
    path: '/blog/study-case/atempo',
    name: 'Atempo',
    component: Atempo,
  },
  {
    path: '/inside/mission/b3e6',
    name: 'B3E6',
    component: ProspectB3E6,
  },
  {
    path: '/price/calculez-ce-que-vous-coute-agence-interim',
    name: 'CoutInterimCalculator',
    component: TempCostCalculator,
  },
  {
    path: '/guide/charte-d-utilisation',
    name: 'CharteUtilisation',
    component: CharteUtilisation,
  },
];
