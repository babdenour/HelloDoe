import WithRender from './temp-cost-calculator.html?style=./temp-cost-calculator.scss';
import helloDoeLogoWhite from '@assets/one-line-white-logo.png';

const TempCostCalculator = {
  computed: {
    helloDoeLogoWhite: function () {
      return helloDoeLogoWhite;
    },
  },
  methods: {
    calcul() {
      let workers = parseInt($('#workers').val() as string);
      let hours = parseInt($('#hours').val() as string);
      let days = parseInt($('#days').val() as string);
      let salary = parseInt($('#salary').val() as string);
      let periodsalary = salary * days * hours;
      let period = days * hours;
      let doughperiodsalary = period * 12;

      $('#cdd-hour-student').text(salary + '€');
      $('#interim-hour-student').text(salary + '€');
      $('#dough-hour-student').text('12 €');

      $('#cdd-total-student').text(periodsalary.toFixed(2) + '€');
      $('#interim-total-student').text(periodsalary.toFixed(2) + '€');
      $('#dough-total-student').text(doughperiodsalary.toFixed(2) + '€');

      $('#cdd-end-contract').text(0.1 * salary + '€');
      $('#interim-end-contract').text(0.1 * salary + '€');
      $('#dough-end-contract').text('----');

      let endcontract = 0.1 * salary;
      let holidays = 0.1 * salary + 0.1 * endcontract;

      $('#cdd-holidays').text(holidays.toFixed(1) + '€');
      $('#interim-holidays').text(holidays.toFixed(1) + '€');
      $('#dough-holidays').text('----');

      let salary2 = 0.42 * salary + 0.42 * endcontract + 0.42 * holidays;

      $('#charges-patronales-cdd').text(salary2.toFixed(1) + '€');
      $('#charges-patronales-interim').text(salary2.toFixed(1) + '€');
      $('#charges-patronales-dough').text('----');

      let salary3 = 1 * salary + 1 * endcontract + 1 * holidays + 1 * salary2;

      $('#hour-net-salary-cdd').text(salary3.toFixed(1) + '€');
      $('#hour-net-salary-interim').text(salary3.toFixed(1) + '€');
      $('#hour-net-salary-dough').text('12 €');

      let totalsalary = salary3 * hours * days;
      let totalsalarydough = period * 12;

      $('#total-net-salary-cdd').text(totalsalary.toFixed(1) + '€');
      $('#total-net-salary-interim').text(totalsalary.toFixed(1) + '€');
      $('#total-net-salary-dough').text(totalsalarydough.toFixed(1) + '€');

      let interimcoef = parseInt($('#coef-agency').val() as string);
      let doughcommission = 5;

      $('#cdd-commission').text('----');
      $('#interim-commission').text((interimcoef * salary - salary).toFixed(1) + '€');
      $('#dough-commission').text(doughcommission + '€');

      let interimcom = interimcoef * salary - salary;
      let hourtotaltopaycdd = salary3;
      let hourtotaltopayinterim = interimcoef * salary;

      $('#hour-salary-cdd').text(hourtotaltopaycdd.toFixed(1) + '€');
      $('#hour-salary-interim').text(hourtotaltopayinterim.toFixed(1) + '€');
      $('#hour-salary-dough').text('17 €');

      let cdd = (hourtotaltopaycdd * period * workers).toFixed(1);
      let int = (hourtotaltopayinterim * period * workers).toFixed(1);
      let dou = (workers * days * hours * 17).toFixed(1);

      $('#total-period-cdd').text(cdd + '€');
      $('#total-period-interim').text(int + '€');
      $('#total-period-dough').text(dou + '€');

      let max = Math.max(parseInt(cdd), parseInt(int), parseInt(dou));
      /* $("#diff01").text((max - cdd).toFixed(1) + "€");
  				$("#diff02").text((max - int).toFixed(1) + "€"); */
      $('#diff03').text((max - parseInt(dou)).toFixed(1) + '€');
    },
  },
};

export default WithRender(TempCostCalculator);
