import WithRender from './credit-card-paiement.html?style=./credit-card-paiement.scss';

const CreditCardPaiement = {
  props: {
    missionAmount: {
      type: Number,
    },
    missionNbWorkers: {
      type: Number,
    },
    missionDates: {
      type: Array,
    },
    payable: {
      type: Boolean,
    },
  },
  data() {
    return {
      retrievingToken: false,
      complete: false,
      errorMsg: null,
    };
  },
  computed: {
    hourlyEarningWithCommission() {
      return this.formatNumber(1.5 * this.missionAmount);
    },
    total() {
      return this.formatNumber(
        this.workDuration * this.missionNbWorkers * this.hourlyEarningWithCommission
      );
    },
    workDuration() {
      let duration = 0;
      this.missionDates.forEach((date) => {
        let dateBegin = new Date(`${date.date}T${date.timeBegin}`);
        let dateEnd = new Date(`${date.date}T${date.timeEnd}`);
        let diffHours = (dateEnd.getTime() - dateBegin.getTime()) / (1000 * 60 * 60);
        duration += diffHours;
      });
      return this.formatNumber(duration);
    },
  },
  methods: {
    previousStep(e) {
      this.$emit('previous');
      e.preventDefault();
    },
    retrieveToken() {
      this.$emit('next', null);
    },
    formatNumber(nb) {
      return Math.round(nb * 100) / 100;
    },
  },
};

export default WithRender(CreditCardPaiement);
