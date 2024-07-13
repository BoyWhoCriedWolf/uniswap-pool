import { combineReducers } from '@reduxjs/toolkit';
import multicall from '../lib/state/multicall.js';
import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import { isDevelopmentEnv } from '../utils/env.js';
import application from './application/reducer.js';
import burn from './burn/reducer.js';
import burnV3 from './burn/v3/reducer.js';
import lists from './lists/reducer.js';
import logs from './logs/slice.js';
import { customCreateMigrate, migrations } from './migrations.js';
import mint from './mint/reducer.js';
import mintV3 from './mint/v3/reducer.js';
import { quickRouteApi } from './routing/quickRouteSlice.js';
import { routingApi } from './routing/slice.js';
import signatures from './signatures/reducer.js';
import transactions from './transactions/reducer.js';
import user from './user/reducer.js';
import wallets from './wallets/reducer.js';

const persistedReducers = {
  user,
  transactions,
  signatures,
  lists
};
const appReducer = combineReducers({
  application,
  wallets,
  mint,
  mintV3,
  burn,
  burnV3,
  multicall: multicall.reducer,
  logs,
  [routingApi.reducerPath]: routingApi.reducer,
  [quickRouteApi.reducerPath]: quickRouteApi.reducer,
  ...persistedReducers
});
const persistConfig = {
  key: "interface",
  version: 0,
  // see migrations.ts for more details about this version
  storage: localForage.createInstance({
    name: "redux"
  }),
  migrate: customCreateMigrate(migrations, {
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
  debug: isDevelopmentEnv()
};
const persistedReducer = persistReducer(persistConfig, appReducer);

export { persistedReducer as default };
