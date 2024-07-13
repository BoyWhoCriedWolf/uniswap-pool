import { createSlice } from '@reduxjs/toolkit';
import { filterToKey } from './utils.js';

const slice = createSlice({
  name: "logs",
  initialState: {},
  reducers: {
    addListener(state, _ref) {
      let {
        payload: {
          chainId,
          filter
        }
      } = _ref;
      if (!state[chainId]) state[chainId] = {};
      const key = filterToKey(filter);
      if (!state[chainId][key]) state[chainId][key] = {
        listeners: 1
      };else state[chainId][key].listeners++;
    },
    fetchingLogs(state, _ref2) {
      let {
        payload: {
          chainId,
          filters,
          blockNumber
        }
      } = _ref2;
      if (!state[chainId]) return;
      for (const filter of filters) {
        const key = filterToKey(filter);
        if (!state[chainId][key]) continue;
        state[chainId][key].fetchingBlockNumber = blockNumber;
      }
    },
    fetchedLogs(state, _ref3) {
      let {
        payload: {
          chainId,
          filter,
          results
        }
      } = _ref3;
      if (!state[chainId]) return;
      const key = filterToKey(filter);
      const fetchState = state[chainId][key];
      if (!fetchState || fetchState.results && fetchState.results.blockNumber > results.blockNumber) return;
      fetchState.results = results;
    },
    fetchedLogsError(state, _ref4) {
      let {
        payload: {
          chainId,
          filter,
          blockNumber
        }
      } = _ref4;
      if (!state[chainId]) return;
      const key = filterToKey(filter);
      const fetchState = state[chainId][key];
      if (!fetchState || fetchState.results && fetchState.results.blockNumber > blockNumber) return;
      fetchState.results = {
        blockNumber,
        error: true
      };
    },
    removeListener(state, _ref5) {
      let {
        payload: {
          chainId,
          filter
        }
      } = _ref5;
      if (!state[chainId]) return;
      const key = filterToKey(filter);
      if (!state[chainId][key]) return;
      state[chainId][key].listeners--;
    }
  }
});
var logs = slice.reducer;
const {
  addListener,
  removeListener,
  fetchedLogs,
  fetchedLogsError,
  fetchingLogs
} = slice.actions;

export { addListener, logs as default, fetchedLogs, fetchedLogsError, fetchingLogs, removeListener };
