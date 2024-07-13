import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { i18n } from '../../../../../node_modules/@lingui/core/dist/index.mjs.js';
import { TransactionStatus } from '../../../../graphql/data/__generated__/types-and-hooks.js';
import isSameDay from '../../../../../node_modules/date-fns/esm/isSameDay/index.js';
import isSameWeek from '../../../../../node_modules/date-fns/esm/isSameWeek/index.js';
import isSameMonth from '../../../../../node_modules/date-fns/esm/isSameMonth/index.js';
import isSameYear from '../../../../../node_modules/date-fns/esm/isSameYear/index.js';
import getYear from '../../../../../node_modules/date-fns/esm/getYear/index.js';

var sortActivities = function sortActivities(a, b) {
  return b.timestamp - a.timestamp;
};
var createGroups = function createGroups(activities) {
  if (!activities) return undefined;
  var now = Date.now();
  var pending = [];
  var today = [];
  var currentWeek = [];
  var last30Days = [];
  var currentYear = [];
  var yearMap = {};

  // TODO(cartcrom): create different time bucket system for activities to fall in based on design wants
  activities.forEach(function (activity) {
    if (activity.status === TransactionStatus.Pending) {
      pending.push(activity);
      return;
    }
    var addedTime = activity.timestamp * 1000;
    if (isSameDay(now, addedTime)) {
      today.push(activity);
    } else if (isSameWeek(addedTime, now)) {
      currentWeek.push(activity);
    } else if (isSameMonth(addedTime, now)) {
      last30Days.push(activity);
    } else if (isSameYear(addedTime, now)) {
      currentYear.push(activity);
    } else {
      var year = getYear(addedTime);
      if (!yearMap[year]) {
        yearMap[year] = [activity];
      } else {
        yearMap[year].push(activity);
      }
    }
  });
  var sortedYears = Object.keys(yearMap).sort(function (a, b) {
    return parseInt(b) - parseInt(a);
  }).map(function (year) {
    return {
      title: year,
      transactions: yearMap[year]
    };
  });
  var transactionGroups = [{
    title: i18n._(
    /*i18n*/
    {
      id: "UbRKMZ",
      message: "Pending"
    }),
    transactions: pending.sort(sortActivities)
  }, {
    title: i18n._(
    /*i18n*/
    {
      id: "ecUA8p",
      message: "Today"
    }),
    transactions: today.sort(sortActivities)
  }, {
    title: i18n._(
    /*i18n*/
    {
      id: "yByRxz",
      message: "This week"
    }),
    transactions: currentWeek.sort(sortActivities)
  }, {
    title: i18n._(
    /*i18n*/
    {
      id: "oW3yYY",
      message: "This month"
    }),
    transactions: last30Days.sort(sortActivities)
  }, {
    title: i18n._(
    /*i18n*/
    {
      id: "xYHlfW",
      message: "This year"
    }),
    transactions: currentYear.sort(sortActivities)
  }].concat(_toConsumableArray(sortedYears));
  return transactionGroups.filter(function (transactionInformation) {
    return transactionInformation.transactions.length > 0;
  });
};

export { createGroups };
