import DateTimeService from '@services/date-time.service';
import WithRender from './date-card-list.html?style=./date-card-list.scss';

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

const DateCardList = {
  name: 'DateCardsListComponent',
  props: ['cards'],
  data() {
    return {};
  },
  methods: {
    getDay(date) {
      return new Date(date).getDate();
    },
    getDayName(date) {
      const dateObj = new Date(date);
      return days[dateObj.getDay()];
    },
    getMonthName(date) {
      const dateObj = new Date(date);
      return months[dateObj.getMonth()];
    },
  },
  mounted() {
    this.cards = DateTimeService.sortDates(this.cards);
  },
};

export default WithRender(DateCardList);
