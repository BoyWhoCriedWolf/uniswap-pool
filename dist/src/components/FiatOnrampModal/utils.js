import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { WETH9, ChainId } from '@uniswap/sdk-core';
import { USDC_MAINNET, USDT, WBTC, MATIC, USDC_ARBITRUM, BRIDGED_USDC_ARBITRUM, USDC_OPTIMISM, USDC_POLYGON, WETH_POLYGON } from '../../constants/tokens.js';
import { Chain } from '../../graphql/data/__generated__/types-and-hooks.js';
import { validateUrlChainParam } from '../../graphql/data/util.js';

var _WETH9$ChainId$MAINNE;
var moonPaySupportedChains = [Chain.Ethereum, Chain.Polygon, Chain.Arbitrum, Chain.Optimism];
var CURRENCY_CODES = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, Chain.Ethereum, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, (_WETH9$ChainId$MAINNE = WETH9[ChainId.MAINNET]) === null || _WETH9$ChainId$MAINNE === void 0 ? void 0 : _WETH9$ChainId$MAINNE.address.toLowerCase(), "weth"), USDC_MAINNET.address.toLowerCase(), "usdc"), USDT.address.toLowerCase(), "usdt"), WBTC.address.toLowerCase(), "wbtc"), MATIC.address.toLowerCase(), "polygon"), "native", "eth")), Chain.Arbitrum, _defineProperty(_defineProperty(_defineProperty({}, USDC_ARBITRUM.address.toLowerCase(), "usdc_arbitrum"), BRIDGED_USDC_ARBITRUM.address.toLowerCase(), "usdc_arbitrum"), "native", "eth_arbitrum")), Chain.Optimism, _defineProperty(_defineProperty({}, USDC_OPTIMISM.address.toLowerCase(), "usdc_optimism"), "native", "eth_optimism")), Chain.Polygon, _defineProperty(_defineProperty(_defineProperty({}, USDC_POLYGON.address.toLowerCase(), "usdc_polygon"), WETH_POLYGON.address.toLowerCase(), "eth_polygon"), "native", "matic_polygon"));
function getDefaultCurrencyCode(address, chainName) {
  var chain = validateUrlChainParam(chainName);
  if (!address || !chain) return "eth";
  if (moonPaySupportedChains.includes(chain)) {
    var _CURRENCY_CODES2;
    var code = (_CURRENCY_CODES2 = CURRENCY_CODES[chain]) === null || _CURRENCY_CODES2 === void 0 ? void 0 : _CURRENCY_CODES2[address.toLowerCase()];
    return code !== null && code !== void 0 ? code : "eth";
  }
  return "eth";
}

/**
 * You should use useParams() from react-router-dom instead of this function if possible.
 * This function is only used in the case where we need to parse the path outside the scope of the router.
 */
function parsePathParts(pathname) {
  var pathParts = pathname.split("/");
  // Matches the /tokens/<network>/<tokenAddress> path.
  var network = pathParts.length > 2 ? pathParts[pathParts.length - 2] : undefined;
  var tokenAddress = pathParts.length > 2 ? pathParts[pathParts.length - 1] : undefined;
  return {
    network: network,
    tokenAddress: tokenAddress
  };
}

export { getDefaultCurrencyCode, parsePathParts };
