'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toolkit = require('@reduxjs/toolkit');
var react = require('@reduxjs/toolkit/query/react');
var reduxPersist = require('redux-persist');
var actions = require('./global/actions.cjs');
var logging = require('./logging.cjs');
var reducer = require('./reducer.cjs');
var quickRouteSlice = require('./routing/quickRouteSlice.cjs');
var slice = require('./routing/slice.cjs');

function createDefaultStore() {
  return toolkit.configureStore({
    reducer: reducer,
    enhancers: function enhancers(defaultEnhancers) {
      return defaultEnhancers.concat(logging.sentryEnhancer);
    },
    middleware: function middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: true,
        immutableCheck: {
          ignoredPaths: [slice.routingApi.reducerPath, "logs", "lists"]
        },
        serializableCheck: {
          // meta.arg and meta.baseQueryMeta are defaults. payload.trade is a nonserializable return value, but that's ok
          // because we are not adding it into any persisted store that requires serialization (e.g. localStorage)
          ignoredActionPaths: ["meta.arg", "meta.baseQueryMeta", "payload.trade"],
          ignoredPaths: [slice.routingApi.reducerPath, quickRouteSlice.quickRouteApi.reducerPath],
          ignoredActions: [
          // ignore the redux-persist actions
          "persist/PERSIST", "persist/REHYDRATE", "persist/PURGE", "persist/FLUSH"]
        }
      }).concat(slice.routingApi.middleware).concat(quickRouteSlice.quickRouteApi.middleware);
    }
  });
}
var store = createDefaultStore();
var persistor = reduxPersist.persistStore(store);
react.setupListeners(store.dispatch);
store.dispatch(actions.updateVersion());

exports.createDefaultStore = createDefaultStore;
exports["default"] = store;
exports.persistor = persistor;
