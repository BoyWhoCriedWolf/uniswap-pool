'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../types/checkout/index.cjs');

function buildRoutingItem(routingItem) {
  return {
    action: index.RoutingActions.Buy,
    marketplace: routingItem.marketplace.toLowerCase(),
    amountIn: routingItem.price.value,
    assetIn: {
      ETHPrice: routingItem.price.value,
      baseAsset: routingItem.price.currency,
      basePrice: routingItem.price.value,
      baseDecimals: "18"
    },
    amountOut: routingItem.amount.toString(),
    assetOut: {
      id: routingItem.id,
      decimals: 18,
      address: routingItem.contractAddress,
      priceInfo: {
        ETHPrice: routingItem.price.value,
        baseAsset: routingItem.price.currency,
        basePrice: routingItem.price.value,
        baseDecimals: "18"
      },
      tokenType: routingItem.tokenType,
      tokenId: routingItem.tokenId,
      amount: routingItem.amount.toString(),
      marketplace: routingItem.marketplace.toLowerCase(),
      orderSource: "api"
    }
  };
}
function buildRoutingItems(routingItems) {
  return routingItems.map(buildRoutingItem);
}
function buildRouteResponse(routeResponse, useErc20Token) {
  var route = routeResponse.route ? buildRoutingItems(routeResponse.route) : [];
  return {
    route: route,
    routeResponse: {
      route: route,
      valueToSend: useErc20Token ? undefined : routeResponse.sendAmount.value,
      data: routeResponse.calldata,
      to: routeResponse.toAddress
    }
  };
}

exports.buildRouteResponse = buildRouteResponse;
