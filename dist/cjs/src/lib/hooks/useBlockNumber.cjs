'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var providers = require('../../constants/providers.cjs');
var fallbackProvider = require('../../featureFlags/flags/fallbackProvider.cjs');
var useIsWindowVisible = require('../../hooks/useIsWindowVisible.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var MISSING_PROVIDER = Symbol();
var BlockNumberContext = /*#__PURE__*/React.createContext(MISSING_PROVIDER);
function useBlockNumberContext() {
  var blockNumber = React.useContext(BlockNumberContext);
  if (blockNumber === MISSING_PROVIDER) {
    throw new Error("BlockNumber hooks must be wrapped in a <BlockNumberProvider>");
  }
  return blockNumber;
}
function useFastForwardBlockNumber() {
  return useBlockNumberContext().fastForward;
}

/** Requires that BlockUpdater be installed in the DOM tree. */
function useBlockNumber() {
  return useBlockNumberContext().block;
}
function useMainnetBlockNumber() {
  return useBlockNumberContext().mainnetBlock;
}
function BlockNumberProvider(_ref) {
  var children = _ref.children;
  var _useWeb3React = core.useWeb3React(),
    activeChainId = _useWeb3React.chainId,
    provider = _useWeb3React.provider;
  var _useState = React.useState({}),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    _useState2$ = _useState2[0],
    chainId = _useState2$.chainId,
    block = _useState2$.block,
    mainnetBlock = _useState2$.mainnetBlock,
    setChainBlock = _useState2[1];
  var activeBlock = chainId === activeChainId ? block : undefined;
  var onChainBlock = React.useCallback(function (chainId, block) {
    setChainBlock(function (chainBlock) {
      if (chainBlock.chainId === chainId) {
        if (!chainBlock.block || chainBlock.block < block) {
          return {
            chainId: chainId,
            block: block,
            mainnetBlock: chainId === sdkCore.ChainId.MAINNET ? block : chainBlock.mainnetBlock
          };
        }
      } else if (chainId === sdkCore.ChainId.MAINNET) {
        if (!chainBlock.mainnetBlock || chainBlock.mainnetBlock < block) {
          return _objectSpread(_objectSpread({}, chainBlock), {}, {
            mainnetBlock: block
          });
        }
      }
      return chainBlock;
    });
  }, []);
  var windowVisible = useIsWindowVisible();
  React.useEffect(function () {
    var stale = false;
    if (provider && activeChainId && windowVisible) {
      setChainBlock(function (chainBlock) {
        // If chainId hasn't changed, don't clear the block. This prevents re-fetching still valid data.
        if (chainBlock.chainId !== activeChainId) {
          return {
            chainId: activeChainId,
            mainnetBlock: chainBlock.mainnetBlock
          };
        }
        return chainBlock;
      });
      provider.getBlockNumber().then(function (block) {
        if (!stale) onChainBlock(activeChainId, block);
      })["catch"](function (error) {
        console.error("Failed to get block number for chainId ".concat(activeChainId), error);
      });
      var onBlock = function onBlock(block) {
        return onChainBlock(activeChainId, block);
      };
      provider.on("block", onBlock);
      return function () {
        stale = true;
        provider.removeListener("block", onBlock);
      };
    }
    return void 0;
  }, [activeChainId, provider, windowVisible, onChainBlock]);
  var networkProviders = fallbackProvider.useFallbackProviderEnabled() ? providers.RPC_PROVIDERS : providers.DEPRECATED_RPC_PROVIDERS;
  React.useEffect(function () {
    if (mainnetBlock === undefined) {
      networkProviders[sdkCore.ChainId.MAINNET].getBlockNumber().then(function (block) {
        onChainBlock(sdkCore.ChainId.MAINNET, block);
      })
      // swallow errors - it's ok if this fails, as we'll try again if we activate mainnet
      ["catch"](function () {
        return undefined;
      });
    }
  }, [mainnetBlock, networkProviders, onChainBlock]);
  var value = React.useMemo(function () {
    return {
      fastForward: function fastForward(update) {
        if (activeBlock && update > activeBlock) {
          setChainBlock({
            chainId: activeChainId,
            block: update,
            mainnetBlock: activeChainId === sdkCore.ChainId.MAINNET ? update : mainnetBlock
          });
        }
      },
      block: activeBlock,
      mainnetBlock: mainnetBlock
    };
  }, [activeBlock, activeChainId, mainnetBlock]);
  return /*#__PURE__*/React__default["default"].createElement(BlockNumberContext.Provider, {
    value: value
  }, children);
}

exports.BlockNumberProvider = BlockNumberProvider;
exports["default"] = useBlockNumber;
exports.useFastForwardBlockNumber = useFastForwardBlockNumber;
exports.useMainnetBlockNumber = useMainnetBlockNumber;
