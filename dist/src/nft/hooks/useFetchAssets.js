import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { useWeb3React } from '@web3-react/core';
import { useNftRouteLazyQuery } from '../../graphql/data/__generated__/types-and-hooks.js';
import { BagStatus } from '../types/checkout/index.js';
import { useMemo, useCallback } from 'react';
import '@babel/runtime/helpers/toConsumableArray';
import '../components/icons.js';
import 'uuid';
import { buildNftTradeInputFromBagItems } from '../utils/buildSellObject.js';
import '@ethersproject/units';
import 'video-extensions';
import '../../locales/en-US.js';
import 'numbro';
import { recalculateBagUsingPooledAssets } from '../utils/pooledAssets.js';
import '../utils/time.js';
import '@ethersproject/bignumber';
import { getPurchasableAssets, getNextBagState } from '../utils/bag.js';
import { buildRouteResponse } from '../utils/nftRoute.js';
import { useBag } from './useBag.js';
import { usePurchaseAssets } from './usePurchaseAssets.js';
import { useTokenInput } from './useTokenInput.js';

function useFetchAssets() {
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account;
  var _useBag = useBag(function (_ref) {
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
  var tokenTradeInput = useTokenInput(function (state) {
    return state.tokenTradeInput;
  });
  var itemsInBag = useMemo(function () {
    return recalculateBagUsingPooledAssets(uncheckedItemsInBag);
  }, [uncheckedItemsInBag]);
  var _useNftRouteLazyQuery = useNftRouteLazyQuery(),
    _useNftRouteLazyQuery2 = _slicedToArray(_useNftRouteLazyQuery, 1),
    fetchGqlRoute = _useNftRouteLazyQuery2[0];
  var purchaseAssets = usePurchaseAssets();
  var resetStateBeforeFetch = useCallback(function () {
    didOpenUnavailableAssets && setDidOpenUnavailableAssets(false);
    !bagIsLocked && setBagLocked(true);
    setBagStatus(BagStatus.FETCHING_ROUTE);
  }, [bagIsLocked, didOpenUnavailableAssets, setBagLocked, setBagStatus, setDidOpenUnavailableAssets]);
  return useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          resetStateBeforeFetch();
          fetchGqlRoute({
            variables: {
              senderAddress: account ? account : "",
              nftTrades: buildNftTradeInputFromBagItems(itemsInBag),
              tokenTrades: tokenTradeInput ? tokenTradeInput : undefined
            },
            onCompleted: function onCompleted(data) {
              if (!data.nftRoute || !data.nftRoute.route) {
                setBagStatus(BagStatus.ADDING_TO_BAG);
                setBagLocked(false);
                return;
              }
              var wishAssetsToBuy = getPurchasableAssets(itemsInBag);
              var purchasingWithErc20 = !!tokenTradeInput;
              var _buildRouteResponse = buildRouteResponse(data.nftRoute, purchasingWithErc20),
                route = _buildRouteResponse.route,
                routeResponse = _buildRouteResponse.routeResponse;
              var _getNextBagState = getNextBagState(wishAssetsToBuy, route, purchasingWithErc20),
                newBagItems = _getNextBagState.newBagItems,
                nextBagStatus = _getNextBagState.nextBagStatus;
              setItemsInBag(newBagItems);
              setBagStatus(nextBagStatus);
              if (nextBagStatus === BagStatus.CONFIRMING_IN_WALLET) {
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

export { useFetchAssets };
