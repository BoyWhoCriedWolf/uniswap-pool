'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var core = require('@web3-react/core');
var typesAndHooks = require('../../graphql/data/__generated__/types-and-hooks.cjs');
var index = require('../types/checkout/index.cjs');
var React = require('react');
require('@babel/runtime/helpers/toConsumableArray');
require('../components/icons.cjs');
require('uuid');
var buildSellObject = require('../utils/buildSellObject.cjs');
require('@ethersproject/units');
require('video-extensions');
require('../../locales/en-US.cjs');
require('numbro');
var pooledAssets = require('../utils/pooledAssets.cjs');
require('../utils/time.cjs');
require('@ethersproject/bignumber');
var bag = require('../utils/bag.cjs');
var nftRoute = require('../utils/nftRoute.cjs');
var useBag = require('./useBag.cjs');
var usePurchaseAssets = require('./usePurchaseAssets.cjs');
var useTokenInput = require('./useTokenInput.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function useFetchAssets() {
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account;
  var _useBag = useBag.useBag(function (_ref) {
      var itemsInBag = _ref.itemsInBag,
        setBagStatus = _ref.setBagStatus,
        didOpenUnavailableAssets = _ref.didOpenUnavailableAssets,
        setDidOpenUnavailableAssets = _ref.setDidOpenUnavailableAssets,
        isLocked = _ref.isLocked,
        setLocked = _ref.setLocked,
        setItemsInBag = _ref.setItemsInBag;
      return {
        itemsInBag: itemsInBag,
        setBagStatus: setBagStatus,
        didOpenUnavailableAssets: didOpenUnavailableAssets,
        setDidOpenUnavailableAssets: setDidOpenUnavailableAssets,
        isLocked: isLocked,
        setLocked: setLocked,
        setItemsInBag: setItemsInBag
      };
    }),
    uncheckedItemsInBag = _useBag.itemsInBag,
    setBagStatus = _useBag.setBagStatus,
    didOpenUnavailableAssets = _useBag.didOpenUnavailableAssets,
    setDidOpenUnavailableAssets = _useBag.setDidOpenUnavailableAssets,
    bagIsLocked = _useBag.isLocked,
    setBagLocked = _useBag.setLocked,
    setItemsInBag = _useBag.setItemsInBag;
  var tokenTradeInput = useTokenInput.useTokenInput(function (state) {
    return state.tokenTradeInput;
  });
  var itemsInBag = React.useMemo(function () {
    return pooledAssets.recalculateBagUsingPooledAssets(uncheckedItemsInBag);
  }, [uncheckedItemsInBag]);
  var _useNftRouteLazyQuery = typesAndHooks.useNftRouteLazyQuery(),
    _useNftRouteLazyQuery2 = _slicedToArray__default["default"](_useNftRouteLazyQuery, 1),
    fetchGqlRoute = _useNftRouteLazyQuery2[0];
  var purchaseAssets = usePurchaseAssets.usePurchaseAssets();
  var resetStateBeforeFetch = React.useCallback(function () {
    didOpenUnavailableAssets && setDidOpenUnavailableAssets(false);
    !bagIsLocked && setBagLocked(true);
    setBagStatus(index.BagStatus.FETCHING_ROUTE);
  }, [bagIsLocked, didOpenUnavailableAssets, setBagLocked, setBagStatus, setDidOpenUnavailableAssets]);
  return React.useCallback( /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          resetStateBeforeFetch();
          fetchGqlRoute({
            variables: {
              senderAddress: account ? account : "",
              nftTrades: buildSellObject.buildNftTradeInputFromBagItems(itemsInBag),
              tokenTrades: tokenTradeInput ? tokenTradeInput : undefined
            },
            onCompleted: function onCompleted(data) {
              if (!data.nftRoute || !data.nftRoute.route) {
                setBagStatus(index.BagStatus.ADDING_TO_BAG);
                setBagLocked(false);
                return;
              }
              var wishAssetsToBuy = bag.getPurchasableAssets(itemsInBag);
              var purchasingWithErc20 = !!tokenTradeInput;
              var _buildRouteResponse = nftRoute.buildRouteResponse(data.nftRoute, purchasingWithErc20),
                route = _buildRouteResponse.route,
                routeResponse = _buildRouteResponse.routeResponse;
              var _getNextBagState = bag.getNextBagState(wishAssetsToBuy, route, purchasingWithErc20),
                newBagItems = _getNextBagState.newBagItems,
                nextBagStatus = _getNextBagState.nextBagStatus;
              setItemsInBag(newBagItems);
              setBagStatus(nextBagStatus);
              if (nextBagStatus === index.BagStatus.CONFIRMING_IN_WALLET) {
                purchaseAssets(routeResponse, wishAssetsToBuy, purchasingWithErc20);
                setBagLocked(true);
                return;
              }
              setBagLocked(false);
            }
          });
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })), [account, fetchGqlRoute, itemsInBag, purchaseAssets, resetStateBeforeFetch, setBagLocked, setBagStatus, setItemsInBag, tokenTradeInput]);
}

exports.useFetchAssets = useFetchAssets;
