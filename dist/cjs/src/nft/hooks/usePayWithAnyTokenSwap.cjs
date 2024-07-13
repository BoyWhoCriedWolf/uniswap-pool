'use strict';

var typesAndHooks = require('../../graphql/data/__generated__/types-and-hooks.cjs');
var tokenRoutes = require('../utils/tokenRoutes.cjs');
var React = require('react');
var utils = require('../../state/routing/utils.cjs');
var useTokenInput = require('./useTokenInput.cjs');

function usePayWithAnyTokenSwap(trade, allowance, allowedSlippage) {
  var setTokenTradeInput = useTokenInput.useTokenInput(function (state) {
    return state.setTokenTradeInput;
  });
  var hasRoutes = utils.isClassicTrade(trade) && trade.routes;
  var hasInputAmount = !!trade && !!trade.inputAmount && trade.inputAmount.currency.isToken;
  var hasAllowance = !!allowedSlippage && !!allowance;
  React.useEffect(function () {
    if (!hasRoutes || !hasInputAmount || !hasAllowance) {
      setTokenTradeInput(undefined);
      return;
    }
    var slippage = parseInt(allowedSlippage.multiply(100).toSignificant(2));
    var _buildAllTradeRouteIn = tokenRoutes.buildAllTradeRouteInputs(trade),
      mixedTokenTradeRouteInputs = _buildAllTradeRouteIn.mixedTokenTradeRouteInputs,
      v2TokenTradeRouteInputs = _buildAllTradeRouteIn.v2TokenTradeRouteInputs,
      v3TokenTradeRouteInputs = _buildAllTradeRouteIn.v3TokenTradeRouteInputs;
    var routes = {
      mixedRoutes: mixedTokenTradeRouteInputs,
      tradeType: typesAndHooks.TokenTradeType.ExactOutput,
      v2Routes: v2TokenTradeRouteInputs,
      v3Routes: v3TokenTradeRouteInputs
    };
    var permitInput = "permitSignature" in allowance && allowance.permitSignature ? {
      details: {
        amount: allowance.permitSignature.details.amount.toString(),
        expiration: allowance.permitSignature.details.expiration.toString(),
        nonce: allowance.permitSignature.details.nonce.toString(),
        token: allowance.permitSignature.details.token
      },
      sigDeadline: allowance.permitSignature.sigDeadline.toString(),
      signature: allowance.permitSignature.signature,
      spender: allowance.permitSignature.spender
    } : undefined;
    setTokenTradeInput({
      permit: permitInput,
      routes: routes,
      slippageToleranceBasisPoints: slippage,
      tokenAmount: {
        amount: trade.inputAmount.quotient.toString(),
        token: {
          address: trade.inputAmount.currency.address,
          chainId: trade.inputAmount.currency.chainId,
          decimals: trade.inputAmount.currency.decimals,
          isNative: trade.inputAmount.currency.isNative
        }
      }
    });
  }, [allowance, allowedSlippage, hasAllowance, hasInputAmount, hasRoutes, setTokenTradeInput, trade]);
}

module.exports = usePayWithAnyTokenSwap;
