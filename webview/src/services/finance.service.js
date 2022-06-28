'use strict';

export default {
  /*
    Format a number to two decimals.
    @params {number} nb - Number to format.
    @return {number} Formatted number.
  */
  formatNumber(nb) {
    return Math.round(nb * 100) / 100;
  },
};
