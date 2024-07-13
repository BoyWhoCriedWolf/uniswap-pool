'use strict';

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var toolkit = require('@reduxjs/toolkit');
var multicall = require('../lib/state/multicall.cjs');
var localForage = require('localforage');
var reduxPersist = require('redux-persist');
var env = require('../utils/env.cjs');
var reducer = require('./application/reducer.cjs');
var reducer$4 = require('./burn/reducer.cjs');
var reducer$5 = require('./burn/v3/reducer.cjs');
var reducer$9 = require('./lists/reducer.cjs');
var slice = require('./logs/slice.cjs');
var migrations = require('./migrations.cjs');
var reducer$2 = require('./mint/reducer.cjs');
var reducer$3 = require('./mint/v3/reducer.cjs');
var quickRouteSlice = require('./routing/quickRouteSlice.cjs');
var slice$1 = require('./routing/slice.cjs');
var reducer$8 = require('./signatures/reducer.cjs');
var reducer$7 = require('./transactions/reducer.cjs');
var reducer$6 = require('./user/reducer.cjs');
var reducer$1 = require('./wallets/reducer.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var localForage__default = /*#__PURE__*/_interopDefaultLegacy(localForage);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var persistedReducers = {
  user: reducer$6["default"],
  transactions: reducer$7["default"],
  signatures: reducer$8["default"],
  lists: reducer$9["default"]
};
var appReducer = toolkit.combineReducers(_objectSpread(_defineProperty__default["default"](_defineProperty__default["default"]({
  application: reducer["default"],
  wallets: reducer$1["default"],
  mint: reducer$2["default"],
  mintV3: reducer$3,
  burn: reducer$4,
  burnV3: reducer$5,
  multicall: multicall["default"].reducer,
  logs: slice["default"]
}, slice$1.routingApi.reducerPath, slice$1.routingApi.reducer), quickRouteSlice.quickRouteApi.reducerPath, quickRouteSlice.quickRouteApi.reducer), persistedReducers));
var persistConfig = {
  key: "interface",
  version: 0,
  // see migrations.ts for more details about this version
  storage: localForage__default["default"].createInstance({
    name: "redux"
  }),
  migrate: migrations.customCreateMigrate(migrations.migrations, {
    debug: false
  }),
  whitelist: Object.keys(persistedReducers),
  throttle: 1000,
  // ms
  serialize: false,
  // The typescript definitions are wrong - we need this to be false for unserialized storage to work.
  // We need unserialized storage for inspectable db entries for debugging.
  // @ts-ignore
  deserialize: false,
  debug: env.isDevelopmentEnv()
};
var persistedReducer = reduxPersist.persistReducer(persistConfig, appReducer);

module.exports = persistedReducer;
