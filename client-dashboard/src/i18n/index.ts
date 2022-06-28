import Vue from 'vue';
import VueI18n from 'vue-i18n';
import fr from './translations/fr.json';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: {
    fr,
  },
});
