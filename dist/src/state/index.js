import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { persistStore } from 'redux-persist';
import { updateVersion } from './global/actions.js';
import { sentryEnhancer } from './logging.js';
import persistedReducer from './reducer.js';
import { quickRouteApi } from './routing/quickRouteSlice.js';
import { routingApi } from './routing/slice.js';

function createDefaultStore() {
  return configureStore({
    reducer: persistedReducer,
    enhancers: defaultEnhancers => defaultEnhancers.concat(sentryEnhancer),
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: true,
      immutableCheck: {
        ignoredPaths: [routingApi.reducerPath, "logs", "lists"]
      },
      serializableCheck: {
        // meta.arg and meta.baseQueryMeta are defaults. payload.trade is a nonserializable return value, but that's ok
        // because we are not adding it into any persisted store that requires serialization (e.g. localStorage)
        ignoredActionPaths: ["meta.arg", "meta.baseQueryMeta", "payload.trade"],
        ignoredPaths: [routingApi.reducerPath, quickRouteApi.reducerPath],
        ignoredActions: [
        // ignore the redux-persist actions
        "persist/PERSIST", "persist/REHYDRATE", "persist/PURGE", "persist/FLUSH"]
      }
    }).concat(routingApi.middleware).concat(quickRouteApi.middleware)
  });
}
const store = createDefaultStore();
const persistor = persistStore(store);
setupListeners(store.dispatch);
store.dispatch(updateVersion());

export { createDefaultStore, store as default, persistor };
