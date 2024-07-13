'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@web3-react/core');
var React = require('react');
var urlChecks = require('../utils/urlChecks.cjs');
var Tokens = require('./Tokens.cjs');
var useTokenContractsConstant = require('./useTokenContractsConstant.cjs');

function getUniqueAddressesFromPositions(positions) {
  return Array.from(new Set(positions.reduce(function (acc, position) {
    return acc.concat(position.token0, position.token1);
  }, [])));
}
/**
 * This function is an attempt to filter out an observed phishing attack from LP list UIs.
 * Attackers would airdrop valueless LP positions with urls in the symbol to render phishing sites into users' LP position list view.
 *
 * Our approach to filtering these out without naively prohibiting all valid URL symbols is to:
 * 1. allow any pair if both tokens are in the supported list
 * 2. allow one url if one token is in the supported list
 * 3. allow no urls if neither token is in the supported list
 *
 * The hope is that this approach removes the cheapest version of the attack without punishing non-malicious url symbols
 */
function useFilterPossiblyMaliciousPositions(positions) {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var activeTokensList = Tokens.useDefaultActiveTokens(chainId);
  var nonListPositionTokenAddresses = React.useMemo(function () {
    return getUniqueAddressesFromPositions(positions).filter(function (address) {
      return !activeTokensList[address];
    });
  }, [positions, activeTokensList]);
  var symbolCallStates = useTokenContractsConstant.useTokenContractsConstant(nonListPositionTokenAddresses, "symbol");
  var addressesToSymbol = React.useMemo(function () {
    var result = {};
    for (var i = 0; i < nonListPositionTokenAddresses.length; i++) {
      var callResult = symbolCallStates[i].result;
      if (!callResult) continue;
      var address = nonListPositionTokenAddresses[i];
      result[address] = callResult;
    }
    return result;
  }, [nonListPositionTokenAddresses, symbolCallStates]);
  return React.useMemo(function () {
    return positions.filter(function (position) {
      var _token0FromList$symbo, _token1FromList$symbo;
      var tokensInListCount = 0;
      var token0FromList = activeTokensList[position.token0];
      var token1FromList = activeTokensList[position.token1];
      if (token0FromList) tokensInListCount++;
      if (token1FromList) tokensInListCount++;
      // if both tokens are in the list, then we let both have url symbols (so we don't check)
      if (tokensInListCount === 2) return true;

      // check the token symbols to see if they contain a url
      // prioritize the token entity from the list if it exists
      // if the token isn't in the list, then use the data returned from chain calls
      var urlSymbolCount = 0;
      if (urlChecks.hasURL((_token0FromList$symbo = token0FromList === null || token0FromList === void 0 ? void 0 : token0FromList.symbol) !== null && _token0FromList$symbo !== void 0 ? _token0FromList$symbo : addressesToSymbol[position.token0])) urlSymbolCount++;
      if (urlChecks.hasURL((_token1FromList$symbo = token1FromList === null || token1FromList === void 0 ? void 0 : token1FromList.symbol) !== null && _token1FromList$symbo !== void 0 ? _token1FromList$symbo : addressesToSymbol[position.token1])) urlSymbolCount++;
      // if one token is in the list, then one token can have a url symbol
      if (tokensInListCount === 1 && urlSymbolCount < 2) return true;

      // if neither token is in the list, then neither can have a url symbol
      return urlSymbolCount === 0;
    });
  }, [addressesToSymbol, positions, activeTokensList]);
}

exports.useFilterPossiblyMaliciousPositions = useFilterPossiblyMaliciousPositions;
