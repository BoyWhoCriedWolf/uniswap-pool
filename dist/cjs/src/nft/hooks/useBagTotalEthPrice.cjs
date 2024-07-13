'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bignumber = require('@ethersproject/bignumber');
require('@ethersproject/units');
require('@babel/runtime/helpers/defineProperty');
require('@uniswap/sdk-core');
require('@web3-react/core');
require('../../constants/chainInfo.cjs');
require('../../constants/lists.cjs');
require('@ethersproject/bytes');
require('@ethersproject/strings');
require('@uniswap/analytics-events');
require('../../analytics/index.cjs');
require('../../constants/chains.cjs');
require('../../constants/providers.cjs');
require('../../constants/tokens.cjs');
require('../../featureFlags/index.cjs');
var React = require('react');
require('@ethersproject/address');
require('@ethersproject/constants');
require('@ethersproject/contracts');
require('@babel/runtime/helpers/slicedToArray');
require('../../lib/state/multicall.cjs');
require('@uniswap/redux-multicall');
require('react-redux');
require('@babel/runtime/helpers/createClass');
require('@babel/runtime/helpers/classCallCheck');
require('@babel/runtime/helpers/possibleConstructorReturn');
require('@babel/runtime/helpers/getPrototypeOf');
require('@babel/runtime/helpers/inherits');
require('../../utils/listSort.cjs');
require('../../hooks/useStablecoinPrice.cjs');
require('jsbi');
var index = require('../types/checkout/index.cjs');
var useBag = require('./useBag.cjs');

function useBagTotalEthPrice() {
  var itemsInBag = useBag.useBag(function (state) {
    return state.itemsInBag;
  });
  return React.useMemo(function () {
    var totalEthPrice = itemsInBag.reduce(function (total, item) {
      return item.status !== index.BagItemStatus.UNAVAILABLE ? total.add(bignumber.BigNumber.from(item.asset.updatedPriceInfo ? item.asset.updatedPriceInfo.ETHPrice : item.asset.priceInfo.ETHPrice)) : total;
    }, bignumber.BigNumber.from(0));
    return totalEthPrice;
  }, [itemsInBag]);
}

exports.useBagTotalEthPrice = useBagTotalEthPrice;
