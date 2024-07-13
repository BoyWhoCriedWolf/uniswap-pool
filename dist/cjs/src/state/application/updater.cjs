'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var core = require('@web3-react/core');
var chains = require('../../constants/chains.cjs');
var useDebounce = require('../../hooks/useDebounce.cjs');
var useIsWindowVisible = require('../../hooks/useIsWindowVisible.cjs');
var React = require('react');
var hooks = require('../hooks.cjs');
var reducer = require('./reducer.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function Updater() {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId,
    provider = _useWeb3React.provider;
  var dispatch = hooks.useAppDispatch();
  var windowVisible = useIsWindowVisible();
  var _useState = React.useState(chainId),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    activeChainId = _useState2[0],
    setActiveChainId = _useState2[1];
  React.useEffect(function () {
    if (provider && chainId && windowVisible) {
      setActiveChainId(chainId);
    }
  }, [dispatch, chainId, provider, windowVisible]);
  var debouncedChainId = useDebounce(activeChainId, 100);
  React.useEffect(function () {
    var chainId = debouncedChainId ? chains.asSupportedChain(debouncedChainId) : null;
    dispatch(reducer.updateChainId({
      chainId: chainId
    }));
  }, [dispatch, debouncedChainId]);
  return null;
}

module.exports = Updater;
