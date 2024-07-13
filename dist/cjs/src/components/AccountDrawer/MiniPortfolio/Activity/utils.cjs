'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var index$5 = require('../../../../../node_modules/@lingui/core/dist/index.cjs');
var typesAndHooks = require('../../../../graphql/data/__generated__/types-and-hooks.cjs');
var index = require('../../../../../node_modules/date-fns/esm/isSameDay/index.cjs');
var index$1 = require('../../../../../node_modules/date-fns/esm/isSameWeek/index.cjs');
var index$2 = require('../../../../../node_modules/date-fns/esm/isSameMonth/index.cjs');
var index$3 = require('../../../../../node_modules/date-fns/esm/isSameYear/index.cjs');
var index$4 = require('../../../../../node_modules/date-fns/esm/getYear/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

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
    if (activity.status === typesAndHooks.TransactionStatus.Pending) {
      pending.push(activity);
      return;
    }
    var addedTime = activity.timestamp * 1000;
    if (index(now, addedTime)) {
      today.push(activity);
    } else if (index$1(addedTime, now)) {
      currentWeek.push(activity);
    } else if (index$2(addedTime, now)) {
      last30Days.push(activity);
    } else if (index$3(addedTime, now)) {
      currentYear.push(activity);
    } else {
      var year = index$4(addedTime);
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
    title: index$5.i18n._(
    /*i18n*/
    {
      id: "UbRKMZ",
      message: "Pending"
    }),
    transactions: pending.sort(sortActivities)
  }, {
    title: index$5.i18n._(
    /*i18n*/
    {
      id: "ecUA8p",
      message: "Today"
    }),
    transactions: today.sort(sortActivities)
  }, {
    title: index$5.i18n._(
    /*i18n*/
    {
      id: "yByRxz",
      message: "This week"
    }),
    transactions: currentWeek.sort(sortActivities)
  }, {
    title: index$5.i18n._(
    /*i18n*/
    {
      id: "oW3yYY",
      message: "This month"
    }),
    transactions: last30Days.sort(sortActivities)
  }, {
    title: index$5.i18n._(
    /*i18n*/
    {
      id: "xYHlfW",
      message: "This year"
    }),
    transactions: currentYear.sort(sortActivities)
  }].concat(_toConsumableArray__default["default"](sortedYears));
  return transactionGroups.filter(function (transactionInformation) {
    return transactionInformation.transactions.length > 0;
  });
};

exports.createGroups = createGroups;
