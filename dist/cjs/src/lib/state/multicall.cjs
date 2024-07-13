'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reduxMulticall = require('@uniswap/redux-multicall');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var useContract = require('../../hooks/useContract.cjs');
var useBlockNumber = require('../hooks/useBlockNumber.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var multicall = reduxMulticall.createMulticall();

/**
 *
 * @param chainId
 * @returns The approximate whole number of blocks written to the corresponding chainId per Ethereum mainnet epoch.
 */
function getBlocksPerFetchForChainId(chainId) {
  // TODO(WEB-2437): See if these numbers need to be updated
  switch (chainId) {
    case sdkCore.ChainId.ARBITRUM_ONE:
    case sdkCore.ChainId.OPTIMISM:
      return 15;
    case sdkCore.ChainId.AVALANCHE:
    case sdkCore.ChainId.BNB:
    case sdkCore.ChainId.CELO:
    case sdkCore.ChainId.CELO_ALFAJORES:
      return 5;
    default:
      return 1;
  }
}
function MulticallUpdater() {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var latestBlockNumber = useBlockNumber["default"]();
  var latestMainnetBlockNumber = useBlockNumber.useMainnetBlockNumber();
  var contract = useContract.useInterfaceMulticall();
  var mainnetContract = useContract.useMainnetInterfaceMulticall();
  var listenerOptions = React.useMemo(function () {
    return {
      blocksPerFetch: getBlocksPerFetchForChainId(chainId)
    };
  }, [chainId]);
  var mainnetListener = React.useMemo(function () {
    return {
      blocksPerFetch: getBlocksPerFetchForChainId(sdkCore.ChainId.MAINNET)
    };
  }, []);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(multicall.Updater, {
    chainId: sdkCore.ChainId.MAINNET,
    latestBlockNumber: latestMainnetBlockNumber,
    contract: mainnetContract,
    listenerOptions: mainnetListener
  }), chainId !== sdkCore.ChainId.MAINNET && /*#__PURE__*/React__default["default"].createElement(multicall.Updater, {
    chainId: chainId,
    latestBlockNumber: latestBlockNumber,
    contract: contract,
    listenerOptions: listenerOptions
  }));
}

exports.MulticallUpdater = MulticallUpdater;
exports["default"] = multicall;
