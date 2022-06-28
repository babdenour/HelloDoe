export default {
  /*
    Sort an array of date time objects.
    @params {array} datetimes - contains ↓
    @params {string} date
    @params {string} timeBegin
    @params {string} timeEnd
    @return {array}
  */
  sortDates(datetimes) {
    return datetimes.sort((a, b) => {
      if (a.date < b.date || (a.date === b.date && a.timeBegin < b.timeBegin)) {
        return -1;
      } else if (a.date === b.date && a.timeBegin === b.timeBegin) {
        return 0;
      } else {
        return 1;
      }
    });
  },
};
