import WithRender from './charte-utilisation.html?style=./charte-utilisation.scss';
import inlineWhiteLogo from '@assets/one-line-white-logo.png';

const CharteUtilisation = {
  computed: {
    inlineWhiteLogo: function () {
      return inlineWhiteLogo;
    },
  },
};

export default WithRender(CharteUtilisation);
