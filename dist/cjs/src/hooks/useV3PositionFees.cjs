'use strict';

require('@babel/runtime/helpers/asyncToGenerator');
require('@babel/runtime/helpers/slicedToArray');
require('@babel/runtime/regenerator');
var bignumber = require('@ethersproject/bignumber');
require('@uniswap/sdk-core');
require('@web3-react/core');
require('react');
require('@babel/runtime/helpers/defineProperty');
require('../constants/providers.cjs');
require('../featureFlags/index.cjs');
require('../lib/state/multicall.cjs');
require('@uniswap/redux-multicall');
require('../constants/chains.cjs');
require('../constants/tokens.cjs');
require('@uniswap/analytics-events');
require('../analytics/index.cjs');
require('@ethersproject/address');
require('@ethersproject/constants');
require('@ethersproject/contracts');

bignumber.BigNumber.from(2).pow(128).sub(1);
