'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var index = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var sdkCore = require('@uniswap/sdk-core');
var v3Sdk = require('@uniswap/v3-sdk');
var core = require('@web3-react/core');
var usePools = require('../../../hooks/usePools.cjs');
var JSBI = require('jsbi');
var tryParseCurrencyAmount = require('../../../lib/utils/tryParseCurrencyAmount.cjs');
var hooks = require('../../hooks.cjs');
var getTickToPrice = require('../../../utils/getTickToPrice.cjs');
var misc = require('../../../constants/misc.cjs');
var useCurrencyBalance = require('../../../lib/hooks/useCurrencyBalance.cjs');
var actions = require('./actions.cjs');
var utils = require('./utils.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

function useV3MintState() {
  return hooks.useAppSelector(function (state) {
    return state.mintV3;
  });
}
function useV3MintActionHandlers(noLiquidity) {
  var dispatch = hooks.useAppDispatch();
  var onFieldAInput = React.useCallback(function (typedValue) {
    dispatch(actions.typeInput({
      field: actions.Field.CURRENCY_A,
      typedValue: typedValue,
      noLiquidity: noLiquidity === true
    }));
  }, [dispatch, noLiquidity]);
  var onFieldBInput = React.useCallback(function (typedValue) {
    dispatch(actions.typeInput({
      field: actions.Field.CURRENCY_B,
      typedValue: typedValue,
      noLiquidity: noLiquidity === true
    }));
  }, [dispatch, noLiquidity]);

  // const [searchParams, setSearchParams] = useSearchParams();

  var onLeftRangeInput = React.useCallback(function (typedValue) {
    dispatch(actions.typeLeftRangeInput({
      typedValue: typedValue
    }));
    // const paramMinPrice = searchParams.get("minPrice");
    // if (!paramMinPrice || (paramMinPrice && paramMinPrice !== typedValue)) {
    //   searchParams.set("minPrice", typedValue);
    //   setSearchParams(searchParams);
    // }
  },
  // [dispatch, searchParams, setSearchParams]
  [dispatch]);
  var onRightRangeInput = React.useCallback(function (typedValue) {
    dispatch(actions.typeRightRangeInput({
      typedValue: typedValue
    }));
    // const paramMaxPrice = searchParams.get("maxPrice");
    // if (!paramMaxPrice || (paramMaxPrice && paramMaxPrice !== typedValue)) {
    //   searchParams.set("maxPrice", typedValue);
    //   setSearchParams(searchParams);
    // }
  },
  // [dispatch, searchParams, setSearchParams]
  [dispatch]);
  var onStartPriceInput = React.useCallback(function (typedValue) {
    dispatch(actions.typeStartPriceInput({
      typedValue: typedValue
    }));
  }, [dispatch]);
  return {
    onFieldAInput: onFieldAInput,
    onFieldBInput: onFieldBInput,
    onLeftRangeInput: onLeftRangeInput,
    onRightRangeInput: onRightRangeInput,
    onStartPriceInput: onStartPriceInput
  };
}
function useV3DerivedMintInfo(currencyA, currencyB, feeAmount, baseCurrency,
// override for existing position
existingPosition) {
  var _currencyBalances$Fie, _currencyBalances$Fie2;
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account;
  var _useV3MintState = useV3MintState(),
    independentField = _useV3MintState.independentField,
    typedValue = _useV3MintState.typedValue,
    leftRangeTypedValue = _useV3MintState.leftRangeTypedValue,
    rightRangeTypedValue = _useV3MintState.rightRangeTypedValue,
    startPriceTypedValue = _useV3MintState.startPriceTypedValue;
  var dependentField = independentField === actions.Field.CURRENCY_A ? actions.Field.CURRENCY_B : actions.Field.CURRENCY_A;

  // currencies
  var currencies = React.useMemo(function () {
    return _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Field.CURRENCY_A, currencyA), actions.Field.CURRENCY_B, currencyB);
  }, [currencyA, currencyB]);

  // formatted with tokens
  var _useMemo = React.useMemo(function () {
      return [currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped, baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.wrapped];
    }, [currencyA, currencyB, baseCurrency]),
    _useMemo2 = _slicedToArray__default["default"](_useMemo, 3),
    tokenA = _useMemo2[0],
    tokenB = _useMemo2[1],
    baseToken = _useMemo2[2];
  var _useMemo3 = React.useMemo(function () {
      return tokenA && tokenB ? tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] : [undefined, undefined];
    }, [tokenA, tokenB]),
    _useMemo4 = _slicedToArray__default["default"](_useMemo3, 2),
    token0 = _useMemo4[0],
    token1 = _useMemo4[1];

  // balances
  var balances = useCurrencyBalance.useCurrencyBalances(account !== null && account !== void 0 ? account : undefined, React.useMemo(function () {
    return [currencies[actions.Field.CURRENCY_A], currencies[actions.Field.CURRENCY_B]];
  }, [currencies]));
  var currencyBalances = _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Field.CURRENCY_A, balances[0]), actions.Field.CURRENCY_B, balances[1]);

  // pool
  var _usePool = usePools.usePool(currencies[actions.Field.CURRENCY_A], currencies[actions.Field.CURRENCY_B], feeAmount),
    _usePool2 = _slicedToArray__default["default"](_usePool, 2),
    poolState = _usePool2[0],
    pool = _usePool2[1];
  var noLiquidity = poolState === usePools.PoolState.NOT_EXISTS;

  // note to parse inputs in reverse
  var invertPrice = Boolean(baseToken && token0 && !baseToken.equals(token0));

  // always returns the price with 0 as base token
  var price = React.useMemo(function () {
    // if no liquidity use typed value
    if (noLiquidity) {
      var parsedQuoteAmount = tryParseCurrencyAmount(startPriceTypedValue, invertPrice ? token0 : token1);
      if (parsedQuoteAmount && token0 && token1) {
        var _ref2;
        var baseAmount = tryParseCurrencyAmount("1", invertPrice ? token1 : token0);
        var _price = baseAmount && parsedQuoteAmount ? new sdkCore.Price(baseAmount.currency, parsedQuoteAmount.currency, baseAmount.quotient, parsedQuoteAmount.quotient) : undefined;
        return (_ref2 = invertPrice ? _price === null || _price === void 0 ? void 0 : _price.invert() : _price) !== null && _ref2 !== void 0 ? _ref2 : undefined;
      }
      return undefined;
    } else {
      // get the amount of quote currency
      return pool && token0 ? pool.priceOf(token0) : undefined;
    }
  }, [noLiquidity, startPriceTypedValue, invertPrice, token1, token0, pool]);

  // check for invalid price input (converts to invalid ratio)
  var invalidPrice = React.useMemo(function () {
    var sqrtRatioX96 = price ? v3Sdk.encodeSqrtRatioX96(price.numerator, price.denominator) : undefined;
    return price && sqrtRatioX96 && !(JSBI__default["default"].greaterThanOrEqual(sqrtRatioX96, v3Sdk.TickMath.MIN_SQRT_RATIO) && JSBI__default["default"].lessThan(sqrtRatioX96, v3Sdk.TickMath.MAX_SQRT_RATIO));
  }, [price]);

  // used for ratio calculation when pool not initialized
  var mockPool = React.useMemo(function () {
    if (tokenA && tokenB && feeAmount && price && !invalidPrice) {
      var currentTick = v3Sdk.priceToClosestTick(price);
      var currentSqrt = v3Sdk.TickMath.getSqrtRatioAtTick(currentTick);
      return new v3Sdk.Pool(tokenA, tokenB, feeAmount, currentSqrt, JSBI__default["default"].BigInt(0), currentTick, []);
    } else {
      return undefined;
    }
  }, [feeAmount, invalidPrice, price, tokenA, tokenB]);

  // if pool exists use it, if not use the mock pool
  var poolForPosition = pool !== null && pool !== void 0 ? pool : mockPool;

  // lower and upper limits in the tick space for `feeAmoun<Trans>
  var tickSpaceLimits = React.useMemo(function () {
    return _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Bound.LOWER, feeAmount ? v3Sdk.nearestUsableTick(v3Sdk.TickMath.MIN_TICK, v3Sdk.TICK_SPACINGS[feeAmount]) : undefined), actions.Bound.UPPER, feeAmount ? v3Sdk.nearestUsableTick(v3Sdk.TickMath.MAX_TICK, v3Sdk.TICK_SPACINGS[feeAmount]) : undefined);
  }, [feeAmount]);

  // parse typed range values and determine closest ticks
  // lower should always be a smaller tick
  var ticks = React.useMemo(function () {
    return _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Bound.LOWER, typeof (existingPosition === null || existingPosition === void 0 ? void 0 : existingPosition.tickLower) === "number" ? existingPosition.tickLower : invertPrice && typeof rightRangeTypedValue === "boolean" || !invertPrice && typeof leftRangeTypedValue === "boolean" ? tickSpaceLimits[actions.Bound.LOWER] : invertPrice ? utils.tryParseTick(token1, token0, feeAmount, rightRangeTypedValue.toString()) : utils.tryParseTick(token0, token1, feeAmount, leftRangeTypedValue.toString())), actions.Bound.UPPER, typeof (existingPosition === null || existingPosition === void 0 ? void 0 : existingPosition.tickUpper) === "number" ? existingPosition.tickUpper : !invertPrice && typeof rightRangeTypedValue === "boolean" || invertPrice && typeof leftRangeTypedValue === "boolean" ? tickSpaceLimits[actions.Bound.UPPER] : invertPrice ? utils.tryParseTick(token1, token0, feeAmount, leftRangeTypedValue.toString()) : utils.tryParseTick(token0, token1, feeAmount, rightRangeTypedValue.toString()));
  }, [existingPosition, feeAmount, invertPrice, leftRangeTypedValue, rightRangeTypedValue, token0, token1, tickSpaceLimits]);
  var _ref5 = ticks || {},
    tickLower = _ref5[actions.Bound.LOWER],
    tickUpper = _ref5[actions.Bound.UPPER];

  // specifies whether the lower and upper ticks is at the exteme bounds
  var ticksAtLimit = React.useMemo(function () {
    return _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Bound.LOWER, feeAmount && tickLower === tickSpaceLimits.LOWER), actions.Bound.UPPER, feeAmount && tickUpper === tickSpaceLimits.UPPER);
  }, [tickSpaceLimits, tickLower, tickUpper, feeAmount]);

  // mark invalid range
  var invalidRange = Boolean(typeof tickLower === "number" && typeof tickUpper === "number" && tickLower >= tickUpper);
  var pricesAtLimit = React.useMemo(function () {
    return _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Bound.LOWER, getTickToPrice.getTickToPrice(token0, token1, tickSpaceLimits.LOWER)), actions.Bound.UPPER, getTickToPrice.getTickToPrice(token0, token1, tickSpaceLimits.UPPER));
  }, [token0, token1, tickSpaceLimits.LOWER, tickSpaceLimits.UPPER]);

  // always returns the price with 0 as base token
  var pricesAtTicks = React.useMemo(function () {
    return _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Bound.LOWER, getTickToPrice.getTickToPrice(token0, token1, ticks[actions.Bound.LOWER])), actions.Bound.UPPER, getTickToPrice.getTickToPrice(token0, token1, ticks[actions.Bound.UPPER]));
  }, [token0, token1, ticks]);
  var lowerPrice = pricesAtTicks[actions.Bound.LOWER],
    upperPrice = pricesAtTicks[actions.Bound.UPPER];

  // liquidity range warning
  var outOfRange = Boolean(!invalidRange && price && lowerPrice && upperPrice && (price.lessThan(lowerPrice) || price.greaterThan(upperPrice)));

  // amounts
  var independentAmount = tryParseCurrencyAmount(typedValue, currencies[independentField]);
  var dependentAmount = React.useMemo(function () {
    // we wrap the currencies just to get the price in terms of the other token
    var wrappedIndependentAmount = independentAmount === null || independentAmount === void 0 ? void 0 : independentAmount.wrapped;
    var dependentCurrency = dependentField === actions.Field.CURRENCY_B ? currencyB : currencyA;
    if (independentAmount && wrappedIndependentAmount && typeof tickLower === "number" && typeof tickUpper === "number" && poolForPosition) {
      // if price is out of range or invalid range - return 0 (single deposit will be independent)
      if (outOfRange || invalidRange) {
        return undefined;
      }
      var _position = wrappedIndependentAmount.currency.equals(poolForPosition.token0) ? v3Sdk.Position.fromAmount0({
        pool: poolForPosition,
        tickLower: tickLower,
        tickUpper: tickUpper,
        amount0: independentAmount.quotient,
        useFullPrecision: true // we want full precision for the theoretical position
      }) : v3Sdk.Position.fromAmount1({
        pool: poolForPosition,
        tickLower: tickLower,
        tickUpper: tickUpper,
        amount1: independentAmount.quotient
      });
      var dependentTokenAmount = wrappedIndependentAmount.currency.equals(poolForPosition.token0) ? _position.amount1 : _position.amount0;
      return dependentCurrency && sdkCore.CurrencyAmount.fromRawAmount(dependentCurrency, dependentTokenAmount.quotient);
    }
    return undefined;
  }, [independentAmount, outOfRange, dependentField, currencyB, currencyA, tickLower, tickUpper, poolForPosition, invalidRange]);
  var parsedAmounts = React.useMemo(function () {
    return _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Field.CURRENCY_A, independentField === actions.Field.CURRENCY_A ? independentAmount : dependentAmount), actions.Field.CURRENCY_B, independentField === actions.Field.CURRENCY_A ? dependentAmount : independentAmount);
  }, [dependentAmount, independentAmount, independentField]);

  // single deposit only if price is out of range
  var deposit0Disabled = Boolean(typeof tickUpper === "number" && poolForPosition && poolForPosition.tickCurrent >= tickUpper);
  var deposit1Disabled = Boolean(typeof tickLower === "number" && poolForPosition && poolForPosition.tickCurrent <= tickLower);

  // sorted for token order
  var depositADisabled = invalidRange || Boolean(deposit0Disabled && poolForPosition && tokenA && poolForPosition.token0.equals(tokenA) || deposit1Disabled && poolForPosition && tokenA && poolForPosition.token1.equals(tokenA));
  var depositBDisabled = invalidRange || Boolean(deposit0Disabled && poolForPosition && tokenB && poolForPosition.token0.equals(tokenB) || deposit1Disabled && poolForPosition && tokenB && poolForPosition.token1.equals(tokenB));

  // create position entity based on users selection
  var position = React.useMemo(function () {
    var _parsedAmounts, _parsedAmounts2;
    if (!poolForPosition || !tokenA || !tokenB || typeof tickLower !== "number" || typeof tickUpper !== "number" || invalidRange) {
      return undefined;
    }

    // mark as 0 if disabled because out of range
    var amount0 = !deposit0Disabled ? parsedAmounts === null || parsedAmounts === void 0 || (_parsedAmounts = parsedAmounts[tokenA.equals(poolForPosition.token0) ? actions.Field.CURRENCY_A : actions.Field.CURRENCY_B]) === null || _parsedAmounts === void 0 ? void 0 : _parsedAmounts.quotient : misc.BIG_INT_ZERO;
    var amount1 = !deposit1Disabled ? parsedAmounts === null || parsedAmounts === void 0 || (_parsedAmounts2 = parsedAmounts[tokenA.equals(poolForPosition.token0) ? actions.Field.CURRENCY_B : actions.Field.CURRENCY_A]) === null || _parsedAmounts2 === void 0 ? void 0 : _parsedAmounts2.quotient : misc.BIG_INT_ZERO;
    if (amount0 !== undefined && amount1 !== undefined) {
      return v3Sdk.Position.fromAmounts({
        pool: poolForPosition,
        tickLower: tickLower,
        tickUpper: tickUpper,
        amount0: amount0,
        amount1: amount1,
        useFullPrecision: true // we want full precision for the theoretical position
      });
    } else {
      return undefined;
    }
  }, [parsedAmounts, poolForPosition, tokenA, tokenB, deposit0Disabled, deposit1Disabled, invalidRange, tickLower, tickUpper]);
  var errorMessage;
  if (!account) {
    errorMessage = /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "VHOVEJ",
      message: "Connect wallet"
    });
  }
  if (poolState === usePools.PoolState.INVALID) {
    var _errorMessage;
    errorMessage = (_errorMessage = errorMessage) !== null && _errorMessage !== void 0 ? _errorMessage : /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "R7D79P",
      message: "Invalid pair"
    });
  }
  if (invalidPrice) {
    var _errorMessage2;
    errorMessage = (_errorMessage2 = errorMessage) !== null && _errorMessage2 !== void 0 ? _errorMessage2 : /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "HXBqgG",
      message: "Invalid price input"
    });
  }
  if (!parsedAmounts[actions.Field.CURRENCY_A] && !depositADisabled || !parsedAmounts[actions.Field.CURRENCY_B] && !depositBDisabled) {
    var _errorMessage3;
    errorMessage = (_errorMessage3 = errorMessage) !== null && _errorMessage3 !== void 0 ? _errorMessage3 : /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "iPMIoT",
      message: "Enter an amount"
    });
  }
  var currencyAAmount = parsedAmounts[actions.Field.CURRENCY_A],
    currencyBAmount = parsedAmounts[actions.Field.CURRENCY_B];
  if (currencyAAmount && currencyBalances !== null && currencyBalances !== void 0 && (_currencyBalances$Fie = currencyBalances[actions.Field.CURRENCY_A]) !== null && _currencyBalances$Fie !== void 0 && _currencyBalances$Fie.lessThan(currencyAAmount)) {
    var _currencies$Field$CUR;
    errorMessage = /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "m6RmA/",
      message: "Insufficient {0} balance",
      values: {
        "0": (_currencies$Field$CUR = currencies[actions.Field.CURRENCY_A]) === null || _currencies$Field$CUR === void 0 ? void 0 : _currencies$Field$CUR.symbol
      }
    });
  }
  if (currencyBAmount && currencyBalances !== null && currencyBalances !== void 0 && (_currencyBalances$Fie2 = currencyBalances[actions.Field.CURRENCY_B]) !== null && _currencyBalances$Fie2 !== void 0 && _currencyBalances$Fie2.lessThan(currencyBAmount)) {
    var _currencies$Field$CUR2;
    errorMessage = /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "m6RmA/",
      message: "Insufficient {0} balance",
      values: {
        "0": (_currencies$Field$CUR2 = currencies[actions.Field.CURRENCY_B]) === null || _currencies$Field$CUR2 === void 0 ? void 0 : _currencies$Field$CUR2.symbol
      }
    });
  }
  var invalidPool = poolState === usePools.PoolState.INVALID;
  return {
    dependentField: dependentField,
    currencies: currencies,
    pool: pool,
    poolState: poolState,
    currencyBalances: currencyBalances,
    parsedAmounts: parsedAmounts,
    ticks: ticks,
    price: price,
    pricesAtTicks: pricesAtTicks,
    pricesAtLimit: pricesAtLimit,
    position: position,
    noLiquidity: noLiquidity,
    errorMessage: errorMessage,
    invalidPool: invalidPool,
    invalidRange: invalidRange,
    outOfRange: outOfRange,
    depositADisabled: depositADisabled,
    depositBDisabled: depositBDisabled,
    invertPrice: invertPrice,
    ticksAtLimit: ticksAtLimit
  };
}
function useRangeHopCallbacks(baseCurrency, quoteCurrency, feeAmount, tickLower, tickUpper, pool) {
  var dispatch = hooks.useAppDispatch();
  var baseToken = React.useMemo(function () {
    return baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.wrapped;
  }, [baseCurrency]);
  var quoteToken = React.useMemo(function () {
    return quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.wrapped;
  }, [quoteCurrency]);
  var getDecrementLower = React.useCallback(function () {
    if (baseToken && quoteToken && typeof tickLower === "number" && feeAmount) {
      var newPrice = v3Sdk.tickToPrice(baseToken, quoteToken, tickLower - v3Sdk.TICK_SPACINGS[feeAmount]);
      return newPrice.toSignificant(5, undefined, sdkCore.Rounding.ROUND_UP);
    }
    // use pool current tick as starting tick if we have pool but no tick input
    if (!(typeof tickLower === "number") && baseToken && quoteToken && feeAmount && pool) {
      var _newPrice = v3Sdk.tickToPrice(baseToken, quoteToken, pool.tickCurrent - v3Sdk.TICK_SPACINGS[feeAmount]);
      return _newPrice.toSignificant(5, undefined, sdkCore.Rounding.ROUND_UP);
    }
    return "";
  }, [baseToken, quoteToken, tickLower, feeAmount, pool]);
  var getIncrementLower = React.useCallback(function () {
    if (baseToken && quoteToken && typeof tickLower === "number" && feeAmount) {
      var newPrice = v3Sdk.tickToPrice(baseToken, quoteToken, tickLower + v3Sdk.TICK_SPACINGS[feeAmount]);
      return newPrice.toSignificant(5, undefined, sdkCore.Rounding.ROUND_UP);
    }
    // use pool current tick as starting tick if we have pool but no tick input
    if (!(typeof tickLower === "number") && baseToken && quoteToken && feeAmount && pool) {
      var _newPrice2 = v3Sdk.tickToPrice(baseToken, quoteToken, pool.tickCurrent + v3Sdk.TICK_SPACINGS[feeAmount]);
      return _newPrice2.toSignificant(5, undefined, sdkCore.Rounding.ROUND_UP);
    }
    return "";
  }, [baseToken, quoteToken, tickLower, feeAmount, pool]);
  var getDecrementUpper = React.useCallback(function () {
    if (baseToken && quoteToken && typeof tickUpper === "number" && feeAmount) {
      var newPrice = v3Sdk.tickToPrice(baseToken, quoteToken, tickUpper - v3Sdk.TICK_SPACINGS[feeAmount]);
      return newPrice.toSignificant(5, undefined, sdkCore.Rounding.ROUND_UP);
    }
    // use pool current tick as starting tick if we have pool but no tick input
    if (!(typeof tickUpper === "number") && baseToken && quoteToken && feeAmount && pool) {
      var _newPrice3 = v3Sdk.tickToPrice(baseToken, quoteToken, pool.tickCurrent - v3Sdk.TICK_SPACINGS[feeAmount]);
      return _newPrice3.toSignificant(5, undefined, sdkCore.Rounding.ROUND_UP);
    }
    return "";
  }, [baseToken, quoteToken, tickUpper, feeAmount, pool]);
  var getIncrementUpper = React.useCallback(function () {
    if (baseToken && quoteToken && typeof tickUpper === "number" && feeAmount) {
      var newPrice = v3Sdk.tickToPrice(baseToken, quoteToken, tickUpper + v3Sdk.TICK_SPACINGS[feeAmount]);
      return newPrice.toSignificant(5, undefined, sdkCore.Rounding.ROUND_UP);
    }
    // use pool current tick as starting tick if we have pool but no tick input
    if (!(typeof tickUpper === "number") && baseToken && quoteToken && feeAmount && pool) {
      var _newPrice4 = v3Sdk.tickToPrice(baseToken, quoteToken, pool.tickCurrent + v3Sdk.TICK_SPACINGS[feeAmount]);
      return _newPrice4.toSignificant(5, undefined, sdkCore.Rounding.ROUND_UP);
    }
    return "";
  }, [baseToken, quoteToken, tickUpper, feeAmount, pool]);
  var getSetFullRange = React.useCallback(function () {
    dispatch(actions.setFullRange());
  }, [dispatch]);
  return {
    getDecrementLower: getDecrementLower,
    getIncrementLower: getIncrementLower,
    getDecrementUpper: getDecrementUpper,
    getIncrementUpper: getIncrementUpper,
    getSetFullRange: getSetFullRange
  };
}

exports.useRangeHopCallbacks = useRangeHopCallbacks;
exports.useV3DerivedMintInfo = useV3DerivedMintInfo;
exports.useV3MintActionHandlers = useV3MintActionHandlers;
exports.useV3MintState = useV3MintState;
