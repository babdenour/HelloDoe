import { fr as localeFr } from 'date-fns/locale';

const formatRelativeLocale = {
  lastWeek: "eeee 'dernier à' p",
  yesterday: "'hier à' p",
  today: "'aujourd’hui à' p",
  tomorrow: "'demain à' p",
  nextWeek: "eeee 'prochain à' p",
  other: 'eeee PPP',
};

export const fr: typeof localeFr = {
  ...localeFr,
  formatRelative(token: keyof typeof formatRelativeLocale): string {
    return formatRelativeLocale[token];
  },
};
