'use strict';

export default {
  /*
    Get the hours contained in a range of dates.
    @params {array} dates - Array of objects containing date, timeBegin and timeEnd properties.
    @return {number} Work duration in hours.
  */
  computeWorkDuration(dates) {
    let duration = 0;
    dates.forEach((date) => {
      let dateBegin = new Date(`${date.date}T${date.timeBegin}`);
      let dateEnd = new Date(`${date.date}T${date.timeEnd}`);
      let diffHours = (dateEnd.getTime() - dateBegin.getTime()) / (1000 * 60 * 60);
      duration += diffHours;
    });
    return this.formatNumber(duration);
  },
  /*
    Format a number to two decimals.
    @params {number} price - Price to add commission to.
    @return {number} Price with added commission.
  */
  addCommission(price) {
    return this.formatNumber(1.375 * price);
  },
  /*
    Format a number to two decimals.
    @params {number} nb - Number to format.
    @return {number} Formatted number.
  */
  formatNumber(nb) {
    return Math.round(nb * 100) / 100;
  },
};
