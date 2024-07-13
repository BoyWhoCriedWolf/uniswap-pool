import { BigNumber } from '@ethersproject/bignumber';
import '@ethersproject/units';
import '@babel/runtime/helpers/defineProperty';
import '@uniswap/sdk-core';
import '@web3-react/core';
import '../../constants/chainInfo.js';
import '../../constants/lists.js';
import '@ethersproject/bytes';
import '@ethersproject/strings';
import '@uniswap/analytics-events';
import '../../analytics/index.js';
import '../../constants/chains.js';
import '../../constants/providers.js';
import '../../constants/tokens.js';
import '../../featureFlags/index.js';
import { useMemo } from 'react';
import '@ethersproject/address';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import '../../lib/state/multicall.js';
import '@uniswap/redux-multicall';
import 'react-redux';
import '@babel/runtime/helpers/createClass';
import '@babel/runtime/helpers/classCallCheck';
import '@babel/runtime/helpers/possibleConstructorReturn';
import '@babel/runtime/helpers/getPrototypeOf';
import '@babel/runtime/helpers/inherits';
import '@babel/runtime/helpers/slicedToArray';
import '../../utils/listSort.js';
import '../../hooks/useStablecoinPrice.js';
import 'jsbi';
import { BagItemStatus } from '../types/checkout/index.js';
import { useBag } from './useBag.js';

function useBagTotalEthPrice() {
  var itemsInBag = useBag(function (state) {
    return state.itemsInBag;
  });
  return useMemo(function () {
    var totalEthPrice = itemsInBag.reduce(function (total, item) {
      return item.status !== BagItemStatus.UNAVAILABLE ? total.add(BigNumber.from(item.asset.updatedPriceInfo ? item.asset.updatedPriceInfo.ETHPrice : item.asset.priceInfo.ETHPrice)) : total;
    }, BigNumber.from(0));
    return totalEthPrice;
  }, [itemsInBag]);
}

export { useBagTotalEthPrice };
