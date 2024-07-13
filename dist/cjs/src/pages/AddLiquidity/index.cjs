'use strict';

var React = require('react');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var bignumber = require('@ethersproject/bignumber');
var analyticsEvents = require('@uniswap/analytics-events');
var sdkCore = require('@uniswap/sdk-core');
var v3Sdk = require('@uniswap/v3-sdk');
var core = require('@web3-react/core');
var index$g = require('../../analytics/index.cjs');
var index = require('../../components/AccountDrawer/index.cjs');
var OwnershipWarning = require('../../components/addLiquidity/OwnershipWarning.cjs');
var UnsupportedCurrencyFooter = require('../../components/swap/UnsupportedCurrencyFooter.cjs');
var chains = require('../../constants/chains.cjs');
var multicall = require('../../lib/hooks/multicall.cjs');
var PositionPage = require('../Pool/PositionPage.cjs');
var reactFeather = require('react-feather');
var rebass = require('rebass');
var hooks$1 = require('../../state/mint/v3/hooks.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var addressesAreEquivalent = require('../../utils/addressesAreEquivalent.cjs');
var errors = require('../../utils/errors.cjs');
var index$3 = require('../../components/Button/index.cjs');
var index$c = require('../../components/Card/index.cjs');
var index$6 = require('../../components/Column/index.cjs');
var index$7 = require('../../components/CurrencyInputPanel/index.cjs');
var index$8 = require('../../components/FeeSelector/index.cjs');
var index$d = require('../../components/HoverInlineText/index.cjs');
var index$e = require('../../components/LiquidityChartRangeInput/index.cjs');
var index$4 = require('../../components/NavigationTabs/index.cjs');
var index$9 = require('../../components/PositionPreview/index.cjs');
var index$b = require('../../components/RangeSelector/index.cjs');
var PresetsButtons = require('../../components/RangeSelector/PresetsButtons.cjs');
var index$a = require('../../components/RateToggle/index.cjs');
var index$5 = require('../../components/Row/index.cjs');
var index$f = require('../../components/SwitchLocaleLink/index.cjs');
var index$1 = require('../../components/TransactionConfirmationModal/index.cjs');
var misc = require('../../constants/misc.cjs');
var tokens = require('../../constants/tokens.cjs');
var Tokens = require('../../hooks/Tokens.cjs');
var useApproveCallback = require('../../hooks/useApproveCallback.cjs');
var useArgentWalletContract = require('../../hooks/useArgentWalletContract.cjs');
var useContract = require('../../hooks/useContract.cjs');
var useDerivedPositionInfo = require('../../hooks/useDerivedPositionInfo.cjs');
var useIsSwapUnsupported = require('../../hooks/useIsSwapUnsupported.cjs');
var useStablecoinPrice = require('../../hooks/useStablecoinPrice.cjs');
var useTransactionDeadline = require('../../hooks/useTransactionDeadline.cjs');
var useV3Positions = require('../../hooks/useV3Positions.cjs');
var actions = require('../../state/mint/v3/actions.cjs');
var hooks = require('../../state/transactions/hooks.cjs');
var types = require('../../state/transactions/types.cjs');
var hooks$2 = require('../../state/user/hooks.cjs');
var approveAmountCalldata = require('../../utils/approveAmountCalldata.cjs');
var calculateGasMargin = require('../../utils/calculateGasMargin.cjs');
var currencyId = require('../../utils/currencyId.cjs');
var maxAmountSpend = require('../../utils/maxAmountSpend.cjs');
var styled$2 = require('../Pool/styled.cjs');
var Review = require('./Review.cjs');
var styled$1 = require('./styled.cjs');
var useApproval = require('../../lib/hooks/useApproval.cjs');
var text = require('../../theme/components/text.cjs');
var analytics = require('@uniswap/analytics');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE = new sdkCore.Percent(50, 10000);
function AddLiquidityWrapper() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$currencyIdA = _ref.currencyIdA,
    currencyIdA = _ref$currencyIdA === void 0 ? "ETH" : _ref$currencyIdA,
    currencyIdB = _ref.currencyIdB,
    _ref$onChangeCurrency = _ref.onChangeCurrencyIdA,
    onChangeCurrencyIdA = _ref$onChangeCurrency === void 0 ? function () {
      return null;
    } : _ref$onChangeCurrency,
    _ref$onChangeCurrency2 = _ref.onChangeCurrencyIdB,
    onChangeCurrencyIdB = _ref$onChangeCurrency2 === void 0 ? function () {
      return null;
    } : _ref$onChangeCurrency2,
    feeAmount = _ref.feeAmount,
    _ref$onChangeFeeAmoun = _ref.onChangeFeeAmount,
    onChangeFeeAmount = _ref$onChangeFeeAmoun === void 0 ? function () {
      return null;
    } : _ref$onChangeFeeAmoun,
    tokenId = _ref.tokenId,
    _ref$openPools = _ref.openPools,
    openPools = _ref$openPools === void 0 ? function () {
      return null;
    } : _ref$openPools;
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  if (chains.isSupportedChain(chainId)) {
    return /*#__PURE__*/React__default["default"].createElement(AddLiquidity, {
      currencyIdA: currencyIdA,
      onChangeCurrencyIdA: onChangeCurrencyIdA,
      currencyIdB: currencyIdB,
      onChangeCurrencyIdB: onChangeCurrencyIdB,
      feeAmount: feeAmount,
      onChangeFeeAmount: onChangeFeeAmount,
      tokenId: tokenId,
      openPools: openPools
    });
  } else {
    return /*#__PURE__*/React__default["default"].createElement(PositionPage.PositionPageUnsupportedContent, null);
  }
}
function AddLiquidity() {
  var _parsedAmounts$depend, _parsedAmounts$depend2, _parsedAmounts$Field$, _currencies$Field$CUR, _parsedAmounts$Field$2, _currencies$Field$CUR2, _useSingleCallResult$, _currencies$Field$CUR7, _currencies$Field$CUR8, _price$invert, _currencies$Field$CUR9, _currencies$Field$CUR10;
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref2$currencyIdA = _ref2.currencyIdA,
    currencyIdA = _ref2$currencyIdA === void 0 ? "ETH" : _ref2$currencyIdA,
    currencyIdB = _ref2.currencyIdB,
    _ref2$onChangeCurrenc = _ref2.onChangeCurrencyIdA,
    onChangeCurrencyIdA = _ref2$onChangeCurrenc === void 0 ? function () {
      return null;
    } : _ref2$onChangeCurrenc,
    _ref2$onChangeCurrenc2 = _ref2.onChangeCurrencyIdB,
    onChangeCurrencyIdB = _ref2$onChangeCurrenc2 === void 0 ? function () {
      return null;
    } : _ref2$onChangeCurrenc2,
    feeAmount = _ref2.feeAmount,
    _ref2$onChangeFeeAmou = _ref2.onChangeFeeAmount,
    onChangeFeeAmount = _ref2$onChangeFeeAmou === void 0 ? function () {
      return null;
    } : _ref2$onChangeFeeAmou,
    tokenId = _ref2.tokenId,
    _ref2$openPools = _ref2.openPools,
    openPools = _ref2$openPools === void 0 ? function () {
      return null;
    } : _ref2$openPools;
  var _useWeb3React2 = core.useWeb3React(),
    account = _useWeb3React2.account,
    chainId = _useWeb3React2.chainId,
    provider = _useWeb3React2.provider;
  var theme = styled.useTheme();
  var trace = analytics.useTrace();
  var toggleWalletDrawer = index.useToggleAccountDrawer(); // toggle wallet when disconnected
  var addTransaction = hooks.useTransactionAdder();
  var positionManager = useContract.useV3NFTPositionManagerContract();

  // min price, max price
  var _useState = React.useState(""),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    minPrice = _useState2[0],
    setMinPrice = _useState2[1];
  var _useState3 = React.useState(""),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    maxPrice = _useState4[0],
    setMaxPrice = _useState4[1];

  // check for existing position if tokenId in url
  var _useV3PositionFromTok = useV3Positions.useV3PositionFromTokenId(tokenId ? bignumber.BigNumber.from(tokenId) : undefined),
    existingPositionDetails = _useV3PositionFromTok.position,
    positionLoading = _useV3PositionFromTok.loading;
  var hasExistingPosition = !!existingPositionDetails && !positionLoading;
  var _useDerivedPositionIn = useDerivedPositionInfo.useDerivedPositionInfo(existingPositionDetails),
    existingPosition = _useDerivedPositionIn.position;
  var baseCurrency = Tokens.useCurrency(currencyIdA);
  var currencyB = Tokens.useCurrency(currencyIdB);
  // prevent an error if they input ETH/WETH
  var quoteCurrency = baseCurrency && currencyB && baseCurrency.wrapped.equals(currencyB.wrapped) ? undefined : currencyB;

  // mint state
  var _useV3MintState = hooks$1.useV3MintState(),
    independentField = _useV3MintState.independentField,
    typedValue = _useV3MintState.typedValue,
    startPriceTypedValue = _useV3MintState.startPriceTypedValue;
  var _useV3DerivedMintInfo = hooks$1.useV3DerivedMintInfo(baseCurrency !== null && baseCurrency !== void 0 ? baseCurrency : undefined, quoteCurrency !== null && quoteCurrency !== void 0 ? quoteCurrency : undefined, feeAmount, baseCurrency !== null && baseCurrency !== void 0 ? baseCurrency : undefined, existingPosition),
    pool = _useV3DerivedMintInfo.pool,
    ticks = _useV3DerivedMintInfo.ticks,
    dependentField = _useV3DerivedMintInfo.dependentField,
    price = _useV3DerivedMintInfo.price,
    pricesAtTicks = _useV3DerivedMintInfo.pricesAtTicks,
    pricesAtLimit = _useV3DerivedMintInfo.pricesAtLimit,
    parsedAmounts = _useV3DerivedMintInfo.parsedAmounts,
    currencyBalances = _useV3DerivedMintInfo.currencyBalances,
    position = _useV3DerivedMintInfo.position,
    noLiquidity = _useV3DerivedMintInfo.noLiquidity,
    currencies = _useV3DerivedMintInfo.currencies,
    errorMessage = _useV3DerivedMintInfo.errorMessage,
    invalidPool = _useV3DerivedMintInfo.invalidPool,
    invalidRange = _useV3DerivedMintInfo.invalidRange,
    outOfRange = _useV3DerivedMintInfo.outOfRange,
    depositADisabled = _useV3DerivedMintInfo.depositADisabled,
    depositBDisabled = _useV3DerivedMintInfo.depositBDisabled,
    invertPrice = _useV3DerivedMintInfo.invertPrice,
    ticksAtLimit = _useV3DerivedMintInfo.ticksAtLimit;
  var _useV3MintActionHandl = hooks$1.useV3MintActionHandlers(noLiquidity),
    onFieldAInput = _useV3MintActionHandl.onFieldAInput,
    onFieldBInput = _useV3MintActionHandl.onFieldBInput,
    onLeftRangeInput = _useV3MintActionHandl.onLeftRangeInput,
    onRightRangeInput = _useV3MintActionHandl.onRightRangeInput,
    onStartPriceInput = _useV3MintActionHandl.onStartPriceInput;
  var isValid = !errorMessage && !invalidRange;

  // modal and loading
  var _useState5 = React.useState(false),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
    showConfirm = _useState6[0],
    setShowConfirm = _useState6[1];
  var _useState7 = React.useState(false),
    _useState8 = _slicedToArray__default["default"](_useState7, 2),
    attemptingTxn = _useState8[0],
    setAttemptingTxn = _useState8[1]; // clicked confirm

  // txn values
  var deadline = useTransactionDeadline(); // custom from users settings

  var _useState9 = React.useState(""),
    _useState10 = _slicedToArray__default["default"](_useState9, 2),
    txHash = _useState10[0],
    setTxHash = _useState10[1];

  // get formatted amounts
  var formattedAmounts = _defineProperty__default["default"](_defineProperty__default["default"]({}, independentField, typedValue), dependentField, (_parsedAmounts$depend = (_parsedAmounts$depend2 = parsedAmounts[dependentField]) === null || _parsedAmounts$depend2 === void 0 ? void 0 : _parsedAmounts$depend2.toSignificant(6)) !== null && _parsedAmounts$depend !== void 0 ? _parsedAmounts$depend : "");
  var usdcValues = _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Field.CURRENCY_A, useStablecoinPrice.useStablecoinValue(parsedAmounts[actions.Field.CURRENCY_A])), actions.Field.CURRENCY_B, useStablecoinPrice.useStablecoinValue(parsedAmounts[actions.Field.CURRENCY_B]));

  // get the max amounts user can add
  var maxAmounts = [actions.Field.CURRENCY_A, actions.Field.CURRENCY_B].reduce(function (accumulator, field) {
    return _objectSpread(_objectSpread({}, accumulator), {}, _defineProperty__default["default"]({}, field, maxAmountSpend.maxAmountSpend(currencyBalances[field])));
  }, {});
  var atMaxAmounts = [actions.Field.CURRENCY_A, actions.Field.CURRENCY_B].reduce(function (accumulator, field) {
    var _maxAmounts$field, _parsedAmounts$field;
    return _objectSpread(_objectSpread({}, accumulator), {}, _defineProperty__default["default"]({}, field, (_maxAmounts$field = maxAmounts[field]) === null || _maxAmounts$field === void 0 ? void 0 : _maxAmounts$field.equalTo((_parsedAmounts$field = parsedAmounts[field]) !== null && _parsedAmounts$field !== void 0 ? _parsedAmounts$field : "0")));
  }, {});
  var argentWalletContract = useArgentWalletContract.useArgentWalletContract();

  // check whether the user has approved the router on the tokens
  var _useApproveCallback = useApproveCallback.useApproveCallback(argentWalletContract ? undefined : parsedAmounts[actions.Field.CURRENCY_A], chainId ? sdkCore.NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined),
    _useApproveCallback2 = _slicedToArray__default["default"](_useApproveCallback, 2),
    approvalA = _useApproveCallback2[0],
    approveACallback = _useApproveCallback2[1];
  var _useApproveCallback3 = useApproveCallback.useApproveCallback(argentWalletContract ? undefined : parsedAmounts[actions.Field.CURRENCY_B], chainId ? sdkCore.NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined),
    _useApproveCallback4 = _slicedToArray__default["default"](_useApproveCallback3, 2),
    approvalB = _useApproveCallback4[0],
    approveBCallback = _useApproveCallback4[1];
  var allowedSlippage = hooks$2.useUserSlippageToleranceWithDefault(outOfRange ? misc.ZERO_PERCENT : DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE);
  function onAdd() {
    return _onAdd.apply(this, arguments);
  }
  function _onAdd() {
    _onAdd = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      var useNative, _ref5, calldata, value, txn, amountA, amountB, batch, data, connectedChainId;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(!chainId || !provider || !account)) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            if (!(!positionManager || !baseCurrency || !quoteCurrency)) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return");
          case 4:
            if (!(position && account && deadline)) {
              _context.next = 18;
              break;
            }
            useNative = baseCurrency.isNative ? baseCurrency : quoteCurrency.isNative ? quoteCurrency : undefined;
            _ref5 = hasExistingPosition && tokenId ? v3Sdk.NonfungiblePositionManager.addCallParameters(position, {
              tokenId: tokenId,
              slippageTolerance: allowedSlippage,
              deadline: deadline.toString(),
              useNative: useNative
            }) : v3Sdk.NonfungiblePositionManager.addCallParameters(position, {
              slippageTolerance: allowedSlippage,
              recipient: account,
              deadline: deadline.toString(),
              useNative: useNative,
              createPool: noLiquidity
            }), calldata = _ref5.calldata, value = _ref5.value;
            txn = {
              to: sdkCore.NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId],
              data: calldata,
              value: value
            };
            if (argentWalletContract) {
              amountA = parsedAmounts[actions.Field.CURRENCY_A];
              amountB = parsedAmounts[actions.Field.CURRENCY_B];
              batch = [].concat(_toConsumableArray__default["default"](amountA && amountA.currency.isToken ? [approveAmountCalldata(amountA, sdkCore.NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId])] : []), _toConsumableArray__default["default"](amountB && amountB.currency.isToken ? [approveAmountCalldata(amountB, sdkCore.NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId])] : []), [{
                to: txn.to,
                data: txn.data,
                value: txn.value
              }]);
              data = argentWalletContract["interface"].encodeFunctionData("wc_multiCall", [batch]);
              txn = {
                to: argentWalletContract.address,
                data: data,
                value: "0x0"
              };
            }
            _context.next = 11;
            return provider.getSigner().getChainId();
          case 11:
            connectedChainId = _context.sent;
            if (!(chainId !== connectedChainId)) {
              _context.next = 14;
              break;
            }
            throw new errors.WrongChainError();
          case 14:
            setAttemptingTxn(true);
            provider.getSigner().estimateGas(txn).then(function (estimate) {
              var newTxn = _objectSpread(_objectSpread({}, txn), {}, {
                gasLimit: calculateGasMargin.calculateGasMargin(estimate)
              });
              return provider.getSigner().sendTransaction(newTxn).then(function (response) {
                var _parsedAmounts$Field$3, _parsedAmounts$Field$4, _parsedAmounts$Field$5, _parsedAmounts$Field$6, _currencies$Field$CUR11, _currencies$Field$CUR12;
                setAttemptingTxn(false);
                var transactionInfo = {
                  type: types.TransactionType.ADD_LIQUIDITY_V3_POOL,
                  baseCurrencyId: currencyId.currencyId(baseCurrency),
                  quoteCurrencyId: currencyId.currencyId(quoteCurrency),
                  createPool: Boolean(noLiquidity),
                  expectedAmountBaseRaw: (_parsedAmounts$Field$3 = (_parsedAmounts$Field$4 = parsedAmounts[actions.Field.CURRENCY_A]) === null || _parsedAmounts$Field$4 === void 0 || (_parsedAmounts$Field$4 = _parsedAmounts$Field$4.quotient) === null || _parsedAmounts$Field$4 === void 0 ? void 0 : _parsedAmounts$Field$4.toString()) !== null && _parsedAmounts$Field$3 !== void 0 ? _parsedAmounts$Field$3 : "0",
                  expectedAmountQuoteRaw: (_parsedAmounts$Field$5 = (_parsedAmounts$Field$6 = parsedAmounts[actions.Field.CURRENCY_B]) === null || _parsedAmounts$Field$6 === void 0 || (_parsedAmounts$Field$6 = _parsedAmounts$Field$6.quotient) === null || _parsedAmounts$Field$6 === void 0 ? void 0 : _parsedAmounts$Field$6.toString()) !== null && _parsedAmounts$Field$5 !== void 0 ? _parsedAmounts$Field$5 : "0",
                  feeAmount: position.pool.fee
                };
                addTransaction(response, transactionInfo);
                setTxHash(response.hash);
                index$g.sendAnalyticsEvent(analyticsEvents.LiquidityEventName.ADD_LIQUIDITY_SUBMITTED, _objectSpread(_objectSpread({
                  label: [(_currencies$Field$CUR11 = currencies[actions.Field.CURRENCY_A]) === null || _currencies$Field$CUR11 === void 0 ? void 0 : _currencies$Field$CUR11.symbol, (_currencies$Field$CUR12 = currencies[actions.Field.CURRENCY_B]) === null || _currencies$Field$CUR12 === void 0 ? void 0 : _currencies$Field$CUR12.symbol].join("/")
                }, trace), transactionInfo));
              });
            })["catch"](function (error) {
              console.error("Failed to send transaction", error);
              setAttemptingTxn(false);
              // we only care if the error is something _other_ than the user rejected the tx
              if ((error === null || error === void 0 ? void 0 : error.code) !== 4001) {
                console.error(error);
              }
            });
            _context.next = 19;
            break;
          case 18:
            return _context.abrupt("return");
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _onAdd.apply(this, arguments);
  }
  var handleCurrencySelect = React.useCallback(function (currencyNew, currencyIdOther) {
    var currencyIdNew = currencyId.currencyId(currencyNew);
    if (currencyIdNew === currencyIdOther) {
      // not ideal, but for now clobber the other if the currency ids are equal
      return [currencyIdNew, undefined];
    } else {
      var _WRAPPED_NATIVE_CURRE, _WRAPPED_NATIVE_CURRE2;
      // prevent weth + eth
      var isETHOrWETHNew = currencyIdNew === "ETH" || chainId !== undefined && currencyIdNew === ((_WRAPPED_NATIVE_CURRE = tokens.WRAPPED_NATIVE_CURRENCY[chainId]) === null || _WRAPPED_NATIVE_CURRE === void 0 ? void 0 : _WRAPPED_NATIVE_CURRE.address);
      var isETHOrWETHOther = currencyIdOther !== undefined && (currencyIdOther === "ETH" || chainId !== undefined && currencyIdOther === ((_WRAPPED_NATIVE_CURRE2 = tokens.WRAPPED_NATIVE_CURRENCY[chainId]) === null || _WRAPPED_NATIVE_CURRE2 === void 0 ? void 0 : _WRAPPED_NATIVE_CURRE2.address));
      if (isETHOrWETHNew && isETHOrWETHOther) {
        return [currencyIdNew, undefined];
      } else {
        return [currencyIdNew, currencyIdOther];
      }
    }
  }, [chainId]);
  var handleCurrencyASelect = React.useCallback(function (currencyANew) {
    var _handleCurrencySelect = handleCurrencySelect(currencyANew, currencyIdB),
      _handleCurrencySelect2 = _slicedToArray__default["default"](_handleCurrencySelect, 2),
      idA = _handleCurrencySelect2[0],
      idB = _handleCurrencySelect2[1];
    if (idB === undefined) {
      // navigate(`/add/${idA}`);
      onChangeCurrencyIdA(idA);
    } else {
      // navigate(`/add/${idA}/${idB}`);
      onChangeCurrencyIdA(idA);
      onChangeCurrencyIdB(idB);
    }
  }, [handleCurrencySelect, onChangeCurrencyIdA, onChangeCurrencyIdB, currencyIdB]);
  var handleCurrencyBSelect = React.useCallback(function (currencyBNew) {
    var _handleCurrencySelect3 = handleCurrencySelect(currencyBNew, currencyIdA),
      _handleCurrencySelect4 = _slicedToArray__default["default"](_handleCurrencySelect3, 2),
      idB = _handleCurrencySelect4[0],
      idA = _handleCurrencySelect4[1];
    if (idA === undefined) {
      // navigate(`/add/${idB}`);
      onChangeCurrencyIdA(idB);
    } else {
      // navigate(`/add/${idA}/${idB}`);
      onChangeCurrencyIdA(idA);
      onChangeCurrencyIdB(idB);
    }
  }, [handleCurrencySelect, onChangeCurrencyIdA, onChangeCurrencyIdB, currencyIdA]);
  var handleFeePoolSelect = React.useCallback(function (newFeeAmount) {
    onLeftRangeInput("");
    onRightRangeInput("");
    // navigate(`/add/${currencyIdA}/${currencyIdB}/${newFeeAmount}`);

    onChangeFeeAmount(newFeeAmount);
  }, [onChangeFeeAmount, onLeftRangeInput, onRightRangeInput]);
  var handleDismissConfirmation = React.useCallback(function () {
    setShowConfirm(false);
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput("");
      // dont jump to pool page if creating
      // navigate("/pools");
      openPools();
    }
    setTxHash("");
  }, [openPools, onFieldAInput, txHash]);
  var addIsUnsupported = useIsSwapUnsupported.useIsSwapUnsupported(currencies === null || currencies === void 0 ? void 0 : currencies.CURRENCY_A, currencies === null || currencies === void 0 ? void 0 : currencies.CURRENCY_B);
  var clearAll = React.useCallback(function () {
    onFieldAInput("");
    onFieldBInput("");
    onLeftRangeInput("");
    onRightRangeInput("");
    // navigate(`/add`);
    onChangeCurrencyIdA(undefined);
    onChangeCurrencyIdB(undefined);
    onChangeFeeAmount(undefined);
  }, [
  // navigate,
  onFieldAInput, onFieldBInput, onLeftRangeInput, onRightRangeInput, onChangeCurrencyIdA, onChangeCurrencyIdB, onChangeFeeAmount]);

  // get value and prices at ticks
  var tickLower = ticks[actions.Bound.LOWER],
    tickUpper = ticks[actions.Bound.UPPER];
  var priceLower = pricesAtTicks[actions.Bound.LOWER],
    priceUpper = pricesAtTicks[actions.Bound.UPPER];
  var _useRangeHopCallbacks = hooks$1.useRangeHopCallbacks(baseCurrency !== null && baseCurrency !== void 0 ? baseCurrency : undefined, quoteCurrency !== null && quoteCurrency !== void 0 ? quoteCurrency : undefined, feeAmount, tickLower, tickUpper, pool),
    getDecrementLower = _useRangeHopCallbacks.getDecrementLower,
    getIncrementLower = _useRangeHopCallbacks.getIncrementLower,
    getDecrementUpper = _useRangeHopCallbacks.getDecrementUpper,
    getIncrementUpper = _useRangeHopCallbacks.getIncrementUpper,
    getSetFullRange = _useRangeHopCallbacks.getSetFullRange;

  // we need an existence check on parsed amounts for single-asset deposits
  var showApprovalA = !argentWalletContract && approvalA !== useApproval.ApprovalState.APPROVED && !!parsedAmounts[actions.Field.CURRENCY_A];
  var showApprovalB = !argentWalletContract && approvalB !== useApproval.ApprovalState.APPROVED && !!parsedAmounts[actions.Field.CURRENCY_B];
  var pendingText = "Supplying ".concat(!depositADisabled ? (_parsedAmounts$Field$ = parsedAmounts[actions.Field.CURRENCY_A]) === null || _parsedAmounts$Field$ === void 0 ? void 0 : _parsedAmounts$Field$.toSignificant(6) : "", " ").concat(!depositADisabled ? (_currencies$Field$CUR = currencies[actions.Field.CURRENCY_A]) === null || _currencies$Field$CUR === void 0 ? void 0 : _currencies$Field$CUR.symbol : "", " ").concat(!outOfRange ? "and" : "", " ").concat(!depositBDisabled ? (_parsedAmounts$Field$2 = parsedAmounts[actions.Field.CURRENCY_B]) === null || _parsedAmounts$Field$2 === void 0 ? void 0 : _parsedAmounts$Field$2.toSignificant(6) : "", " ").concat(!depositBDisabled ? (_currencies$Field$CUR2 = currencies[actions.Field.CURRENCY_B]) === null || _currencies$Field$CUR2 === void 0 ? void 0 : _currencies$Field$CUR2.symbol : "");

  // const [searchParams, setSearchParams] = useSearchParams();

  var handleSetFullRange = React.useCallback(function () {
    var _minP$toSignificant, _maxP$toSignificant;
    getSetFullRange();

    // const minPrice = pricesAtLimit[Bound.LOWER];
    // if (minPrice) searchParams.set("minPrice", minPrice.toSignificant(5));
    // const maxPrice = pricesAtLimit[Bound.UPPER];
    // if (maxPrice) searchParams.set("maxPrice", maxPrice.toSignificant(5));
    // setSearchParams(searchParams);

    var minP = pricesAtLimit[actions.Bound.LOWER];
    var minPValue = (_minP$toSignificant = minP === null || minP === void 0 ? void 0 : minP.toSignificant(5)) !== null && _minP$toSignificant !== void 0 ? _minP$toSignificant : "";
    if (minPValue && typeof minPValue === "string" && !isNaN(minPValue) && (!minPrice || minPrice !== minPValue)) {
      onLeftRangeInput(minPValue);
    }
    setMinPrice(minPValue);
    var maxP = pricesAtLimit[actions.Bound.UPPER];
    var maxPValue = (_maxP$toSignificant = maxP === null || maxP === void 0 ? void 0 : maxP.toSignificant(5)) !== null && _maxP$toSignificant !== void 0 ? _maxP$toSignificant : "";
    if (maxPValue && typeof maxPValue === "string" && !isNaN(maxPValue) && (!maxPrice || maxPrice !== maxPValue)) {
      onRightRangeInput(maxPValue);
    }
    setMaxPrice(maxPValue);
  }, [getSetFullRange, pricesAtLimit, maxPrice, minPrice, onLeftRangeInput, onRightRangeInput]);

  // // START: sync values with query string
  // const oldSearchParams = usePrevious(searchParams);
  // // use query string as an input to onInput handlers
  // useEffect(() => {
  //   const minPrice = searchParams.get("minPrice");
  //   const oldMinPrice = oldSearchParams?.get("minPrice");
  //   if (
  //     minPrice &&
  //     typeof minPrice === "string" &&
  //     !isNaN(minPrice as any) &&
  //     (!oldMinPrice || oldMinPrice !== minPrice)
  //   ) {
  //     onLeftRangeInput(minPrice);
  //   }
  //   // disable eslint rule because this hook only cares about the url->input state data flow
  //   // input state -> url updates are handled in the input handlers
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchParams]);

  // useEffect(() => {
  //   const maxPrice = searchParams.get("maxPrice");
  //   const oldMaxPrice = oldSearchParams?.get("maxPrice");
  //   if (
  //     maxPrice &&
  //     typeof maxPrice === "string" &&
  //     !isNaN(maxPrice as any) &&
  //     (!oldMaxPrice || oldMaxPrice !== maxPrice)
  //   ) {
  //     onRightRangeInput(maxPrice);
  //   }
  //   // disable eslint rule because this hook only cares about the url->input state data flow
  //   // input state -> url updates are handled in the input handlers
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchParams]);
  // // END: sync values with query string

  var Buttons = function Buttons() {
    var _currencies$Field$CUR3, _currencies$Field$CUR4, _currencies$Field$CUR5, _currencies$Field$CUR6;
    return addIsUnsupported ? /*#__PURE__*/React__default["default"].createElement(index$3.ButtonPrimary, {
      disabled: true,
      $borderRadius: "12px",
      padding: "12px"
    }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
      mb: "4px"
    }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "Iac4Ia",
      message: "Unsupported Asset"
    }))) : !account ? /*#__PURE__*/React__default["default"].createElement(index$g.TraceEvent, {
      events: [analyticsEvents.BrowserEvent.onClick],
      name: analyticsEvents.InterfaceEventName.CONNECT_WALLET_BUTTON_CLICKED,
      properties: {
        received_swap_quote: false
      },
      element: analyticsEvents.InterfaceElementName.CONNECT_WALLET_BUTTON
    }, /*#__PURE__*/React__default["default"].createElement(index$3.ButtonLight, {
      onClick: toggleWalletDrawer,
      $borderRadius: "12px",
      padding: "12px"
    }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "VHOVEJ",
      message: "Connect wallet"
    }))) : /*#__PURE__*/React__default["default"].createElement(index$6.AutoColumn, {
      gap: "md"
    }, (approvalA === useApproval.ApprovalState.NOT_APPROVED || approvalA === useApproval.ApprovalState.PENDING || approvalB === useApproval.ApprovalState.NOT_APPROVED || approvalB === useApproval.ApprovalState.PENDING) && isValid && /*#__PURE__*/React__default["default"].createElement(index$5.RowBetween, null, showApprovalA && /*#__PURE__*/React__default["default"].createElement(index$3.ButtonPrimary, {
      onClick: approveACallback,
      disabled: approvalA === useApproval.ApprovalState.PENDING,
      width: showApprovalB ? "48%" : "100%"
    }, approvalA === useApproval.ApprovalState.PENDING ? /*#__PURE__*/React__default["default"].createElement(styled$2.Dots, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "MfyhMG",
      message: "Approving {0}",
      values: {
        "0": (_currencies$Field$CUR3 = currencies[actions.Field.CURRENCY_A]) === null || _currencies$Field$CUR3 === void 0 ? void 0 : _currencies$Field$CUR3.symbol
      }
    })) : /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "fgGids",
      message: "Approve {0}",
      values: {
        "0": (_currencies$Field$CUR4 = currencies[actions.Field.CURRENCY_A]) === null || _currencies$Field$CUR4 === void 0 ? void 0 : _currencies$Field$CUR4.symbol
      }
    })), showApprovalB && /*#__PURE__*/React__default["default"].createElement(index$3.ButtonPrimary, {
      onClick: approveBCallback,
      disabled: approvalB === useApproval.ApprovalState.PENDING,
      width: showApprovalA ? "48%" : "100%"
    }, approvalB === useApproval.ApprovalState.PENDING ? /*#__PURE__*/React__default["default"].createElement(styled$2.Dots, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "MfyhMG",
      message: "Approving {0}",
      values: {
        "0": (_currencies$Field$CUR5 = currencies[actions.Field.CURRENCY_B]) === null || _currencies$Field$CUR5 === void 0 ? void 0 : _currencies$Field$CUR5.symbol
      }
    })) : /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "fgGids",
      message: "Approve {0}",
      values: {
        "0": (_currencies$Field$CUR6 = currencies[actions.Field.CURRENCY_B]) === null || _currencies$Field$CUR6 === void 0 ? void 0 : _currencies$Field$CUR6.symbol
      }
    }))), /*#__PURE__*/React__default["default"].createElement(index$3.ButtonError, {
      onClick: function onClick() {
        setShowConfirm(true);
      },
      disabled: !isValid || !argentWalletContract && approvalA !== useApproval.ApprovalState.APPROVED && !depositADisabled || !argentWalletContract && approvalB !== useApproval.ApprovalState.APPROVED && !depositBDisabled,
      error: !isValid && !!parsedAmounts[actions.Field.CURRENCY_A] && !!parsedAmounts[actions.Field.CURRENCY_B]
    }, /*#__PURE__*/React__default["default"].createElement(rebass.Text, {
      fontWeight: 535
    }, errorMessage ? errorMessage : /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "rdUucN",
      message: "Preview"
    }))));
  };
  var usdcValueCurrencyA = usdcValues[actions.Field.CURRENCY_A];
  var usdcValueCurrencyB = usdcValues[actions.Field.CURRENCY_B];
  var currencyAFiat = React.useMemo(function () {
    return {
      data: usdcValueCurrencyA ? parseFloat(usdcValueCurrencyA.toSignificant()) : undefined,
      isLoading: false
    };
  }, [usdcValueCurrencyA]);
  var currencyBFiat = React.useMemo(function () {
    return {
      data: usdcValueCurrencyB ? parseFloat(usdcValueCurrencyB.toSignificant()) : undefined,
      isLoading: false
    };
  }, [usdcValueCurrencyB]);
  var owner = (_useSingleCallResult$ = multicall.useSingleCallResult(tokenId ? positionManager : null, "ownerOf", [tokenId]).result) === null || _useSingleCallResult$ === void 0 ? void 0 : _useSingleCallResult$[0];
  var ownsNFT = addressesAreEquivalent.addressesAreEquivalent(owner, account) || addressesAreEquivalent.addressesAreEquivalent(existingPositionDetails === null || existingPositionDetails === void 0 ? void 0 : existingPositionDetails.operator, account);
  var showOwnershipWarning = Boolean(hasExistingPosition && account && !ownsNFT);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(styled$1.ScrollablePage, {
    noPadding: true
  }, /*#__PURE__*/React__default["default"].createElement(index$1["default"], {
    isOpen: showConfirm,
    onDismiss: handleDismissConfirmation,
    attemptingTxn: attemptingTxn,
    hash: txHash,
    reviewContent: function reviewContent() {
      return /*#__PURE__*/React__default["default"].createElement(index$1.ConfirmationModalContent, {
        title: /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
          id: "OBdohg",
          message: "Add Liquidity"
        }),
        onDismiss: handleDismissConfirmation,
        topContent: function topContent() {
          return /*#__PURE__*/React__default["default"].createElement(Review.Review, {
            parsedAmounts: parsedAmounts,
            position: position,
            existingPosition: existingPosition,
            priceLower: priceLower,
            priceUpper: priceUpper,
            outOfRange: outOfRange,
            ticksAtLimit: ticksAtLimit
          });
        },
        bottomContent: function bottomContent() {
          return /*#__PURE__*/React__default["default"].createElement(index$3.ButtonPrimary, {
            style: {
              marginTop: "1rem"
            },
            onClick: onAdd
          }, /*#__PURE__*/React__default["default"].createElement(rebass.Text, {
            fontWeight: 535,
            fontSize: 20
          }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
            id: "m16xKo",
            message: "Add"
          })));
        }
      });
    },
    pendingText: pendingText
  }), /*#__PURE__*/React__default["default"].createElement(index$4.AddRemoveTabs, {
    creating: false,
    adding: true,
    positionID: tokenId,
    autoSlippage: DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE,
    showBackLink: !hasExistingPosition,
    onBack: openPools
  }, !hasExistingPosition && /*#__PURE__*/React__default["default"].createElement(index$5["default"], {
    justifyContent: "flex-end",
    style: {
      width: "fit-content",
      minWidth: "fit-content"
    }
  }, /*#__PURE__*/React__default["default"].createElement(styled$1.MediumOnly, null, /*#__PURE__*/React__default["default"].createElement(index$3.ButtonText, {
    onClick: clearAll
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedBlue, {
    fontSize: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "yYxB17",
    message: "Clear all"
  })))))), /*#__PURE__*/React__default["default"].createElement(styled$1.Wrapper, null, /*#__PURE__*/React__default["default"].createElement(styled$1.ResponsiveTwoColumns, {
    wide: !hasExistingPosition
  }, /*#__PURE__*/React__default["default"].createElement(index$6.AutoColumn, {
    gap: "lg"
  }, !hasExistingPosition && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(index$6.AutoColumn, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(index$5.RowBetween, {
    paddingBottom: "20px"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "nxRg31",
    message: "Select pair"
  }))), /*#__PURE__*/React__default["default"].createElement(index$5.RowBetween, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(index$7, {
    value: formattedAmounts[actions.Field.CURRENCY_A],
    onUserInput: onFieldAInput,
    hideInput: true,
    onMax: function onMax() {
      var _maxAmounts$Field$CUR, _maxAmounts$Field$CUR2;
      onFieldAInput((_maxAmounts$Field$CUR = (_maxAmounts$Field$CUR2 = maxAmounts[actions.Field.CURRENCY_A]) === null || _maxAmounts$Field$CUR2 === void 0 ? void 0 : _maxAmounts$Field$CUR2.toExact()) !== null && _maxAmounts$Field$CUR !== void 0 ? _maxAmounts$Field$CUR : "");
    },
    onCurrencySelect: handleCurrencyASelect,
    showMaxButton: !atMaxAmounts[actions.Field.CURRENCY_A],
    currency: (_currencies$Field$CUR7 = currencies[actions.Field.CURRENCY_A]) !== null && _currencies$Field$CUR7 !== void 0 ? _currencies$Field$CUR7 : null,
    id: "add-liquidity-input-tokena",
    showCommonBases: true
  }), /*#__PURE__*/React__default["default"].createElement(index$7, {
    value: formattedAmounts[actions.Field.CURRENCY_B],
    hideInput: true,
    onUserInput: onFieldBInput,
    onCurrencySelect: handleCurrencyBSelect,
    onMax: function onMax() {
      var _maxAmounts$Field$CUR3, _maxAmounts$Field$CUR4;
      onFieldBInput((_maxAmounts$Field$CUR3 = (_maxAmounts$Field$CUR4 = maxAmounts[actions.Field.CURRENCY_B]) === null || _maxAmounts$Field$CUR4 === void 0 ? void 0 : _maxAmounts$Field$CUR4.toExact()) !== null && _maxAmounts$Field$CUR3 !== void 0 ? _maxAmounts$Field$CUR3 : "");
    },
    showMaxButton: !atMaxAmounts[actions.Field.CURRENCY_B],
    currency: (_currencies$Field$CUR8 = currencies[actions.Field.CURRENCY_B]) !== null && _currencies$Field$CUR8 !== void 0 ? _currencies$Field$CUR8 : null,
    id: "add-liquidity-input-tokenb",
    showCommonBases: true
  })), /*#__PURE__*/React__default["default"].createElement(index$8, {
    disabled: !quoteCurrency || !baseCurrency,
    feeAmount: feeAmount,
    handleFeePoolSelect: handleFeePoolSelect,
    currencyA: baseCurrency !== null && baseCurrency !== void 0 ? baseCurrency : undefined,
    currencyB: quoteCurrency !== null && quoteCurrency !== void 0 ? quoteCurrency : undefined
  })), " "), hasExistingPosition && existingPosition && /*#__PURE__*/React__default["default"].createElement(index$9.PositionPreview, {
    position: existingPosition,
    title: /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "dWPDm3",
      message: "Selected range"
    }),
    inRange: !outOfRange,
    ticksAtLimit: ticksAtLimit
  })), !hasExistingPosition && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(styled$1.DynamicSection, {
    gap: "md",
    disabled: !feeAmount || invalidPool
  }, /*#__PURE__*/React__default["default"].createElement(index$5.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "5CZbyC",
    message: "Set price range"
  })), Boolean(baseCurrency && quoteCurrency) && /*#__PURE__*/React__default["default"].createElement(index$5.RowFixed, {
    gap: "8px"
  }, /*#__PURE__*/React__default["default"].createElement(PresetsButtons, {
    onSetFullRange: handleSetFullRange
  }), /*#__PURE__*/React__default["default"].createElement(index$a, {
    currencyA: baseCurrency,
    currencyB: quoteCurrency,
    handleRateToggle: function handleRateToggle() {
      if (!ticksAtLimit[actions.Bound.LOWER] && !ticksAtLimit[actions.Bound.UPPER]) {
        var _toSignificant, _ref3, _toSignificant2, _ref4, _formattedAmounts$Fie;
        onLeftRangeInput((_toSignificant = (_ref3 = invertPrice ? priceLower : priceUpper === null || priceUpper === void 0 ? void 0 : priceUpper.invert()) === null || _ref3 === void 0 ? void 0 : _ref3.toSignificant(6)) !== null && _toSignificant !== void 0 ? _toSignificant : "");
        onRightRangeInput((_toSignificant2 = (_ref4 = invertPrice ? priceUpper : priceLower === null || priceLower === void 0 ? void 0 : priceLower.invert()) === null || _ref4 === void 0 ? void 0 : _ref4.toSignificant(6)) !== null && _toSignificant2 !== void 0 ? _toSignificant2 : "");
        onFieldAInput((_formattedAmounts$Fie = formattedAmounts[actions.Field.CURRENCY_B]) !== null && _formattedAmounts$Fie !== void 0 ? _formattedAmounts$Fie : "");
      }
      // navigate(
      //   `/add/${currencyIdB as string}/${
      //     currencyIdA as string
      //   }${feeAmount ? "/" + feeAmount : ""}`
      // );

      onChangeCurrencyIdA(currencyIdB);
      onChangeCurrencyIdB(currencyIdA);
      onChangeFeeAmount(feeAmount);
    }
  }))), /*#__PURE__*/React__default["default"].createElement(index$b, {
    priceLower: priceLower,
    priceUpper: priceUpper,
    getDecrementLower: getDecrementLower,
    getIncrementLower: getIncrementLower,
    getDecrementUpper: getDecrementUpper,
    getIncrementUpper: getIncrementUpper,
    onLeftRangeInput: onLeftRangeInput,
    onRightRangeInput: onRightRangeInput,
    currencyA: baseCurrency,
    currencyB: quoteCurrency,
    feeAmount: feeAmount,
    ticksAtLimit: ticksAtLimit
  }), outOfRange && /*#__PURE__*/React__default["default"].createElement(index$c.YellowCard, {
    padding: "8px 12px",
    $borderRadius: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$5.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(reactFeather.AlertTriangle, {
    stroke: theme.deprecated_yellow3,
    size: "16px"
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedYellow, {
    ml: "12px",
    fontSize: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "b+KjnH",
    message: "Your position will not earn fees or be used in trades until the market price moves into your range."
  })))), invalidRange && /*#__PURE__*/React__default["default"].createElement(index$c.YellowCard, {
    padding: "8px 12px",
    $borderRadius: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$5.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(reactFeather.AlertTriangle, {
    stroke: theme.deprecated_yellow3,
    size: "16px"
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedYellow, {
    ml: "12px",
    fontSize: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "Jh223O",
    message: "Invalid range selected. The min price must be lower than the max price."
  }))))), /*#__PURE__*/React__default["default"].createElement(styled$1.DynamicSection, {
    gap: "md",
    disabled: !feeAmount || invalidPool
  }, !noLiquidity ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, Boolean(price && baseCurrency && quoteCurrency && !noLiquidity) && /*#__PURE__*/React__default["default"].createElement(index$6.AutoColumn, {
    gap: "2px",
    style: {
      marginTop: "0.5rem"
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "7k623k",
    message: "<0>Current price:</0><1>{0}</1>{1}",
    values: {
      "0": price && /*#__PURE__*/React__default["default"].createElement(index$d, {
        maxCharacters: 20,
        text: invertPrice ? price.invert().toSignificant(6) : price.toSignificant(6)
      }),
      "1": baseCurrency && /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedBody, {
        color: "text2",
        fontSize: 12
      }, quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol, " per", " ", baseCurrency.symbol)
    },
    components: {
      "0": /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
        fontWeight: 535,
        fontSize: 12,
        color: "text1"
      }),
      "1": /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedBody, {
        fontWeight: 535,
        fontSize: 20,
        color: "text1"
      })
    }
  })), /*#__PURE__*/React__default["default"].createElement(index$e, {
    currencyA: baseCurrency !== null && baseCurrency !== void 0 ? baseCurrency : undefined,
    currencyB: quoteCurrency !== null && quoteCurrency !== void 0 ? quoteCurrency : undefined,
    feeAmount: feeAmount,
    ticksAtLimit: ticksAtLimit,
    price: price ? parseFloat((invertPrice ? price.invert() : price).toSignificant(8)) : undefined,
    priceLower: priceLower,
    priceUpper: priceUpper,
    onLeftRangeInput: onLeftRangeInput,
    onRightRangeInput: onRightRangeInput,
    interactive: !hasExistingPosition
  })) : /*#__PURE__*/React__default["default"].createElement(index$6.AutoColumn, {
    gap: "md"
  }, noLiquidity && /*#__PURE__*/React__default["default"].createElement(index$c.BlueCard, {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "1rem 1rem"
    }
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedBody, {
    fontSize: 14,
    style: {
      fontWeight: 535
    },
    textAlign: "left",
    color: theme.accent1
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "X6T02b",
    message: "This pool must be initialized before you can add liquidity. To initialize, select a starting price for the pool. Then, enter your liquidity price range and deposit amount. Gas fees will be higher than usual due to the initialization transaction."
  }))), /*#__PURE__*/React__default["default"].createElement(index$c.OutlineCard, {
    padding: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(styled$1.StyledInput, {
    className: "start-price-input",
    value: startPriceTypedValue,
    onUserInput: onStartPriceInput
  })), /*#__PURE__*/React__default["default"].createElement(index$5.RowBetween, {
    style: {
      backgroundColor: theme.surface1,
      padding: "12px",
      borderRadius: "12px"
    }
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "Ay/EYV",
    message: "Starting {0} Price:",
    values: {
      "0": baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol
    }
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, null, price ? /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, null, /*#__PURE__*/React__default["default"].createElement(index$5.RowFixed, null, /*#__PURE__*/React__default["default"].createElement(index$d, {
    maxCharacters: 20,
    text: invertPrice ? price === null || price === void 0 || (_price$invert = price.invert()) === null || _price$invert === void 0 ? void 0 : _price$invert.toSignificant(8) : price === null || price === void 0 ? void 0 : price.toSignificant(8)
  }), " ", /*#__PURE__*/React__default["default"].createElement("span", {
    style: {
      marginLeft: "4px"
    }
  }, quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol, " per", " ", baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol))) : "-"))))), /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(styled$1.DynamicSection, {
    disabled: invalidPool || invalidRange || noLiquidity && !startPriceTypedValue
  }, /*#__PURE__*/React__default["default"].createElement(index$6.AutoColumn, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, null, hasExistingPosition ? /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "BRi+RY",
    message: "Add more liquidity"
  }) : /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "MU9s7M",
    message: "Deposit amounts"
  })), /*#__PURE__*/React__default["default"].createElement(index$7, {
    value: formattedAmounts[actions.Field.CURRENCY_A],
    onUserInput: onFieldAInput,
    onMax: function onMax() {
      var _maxAmounts$Field$CUR5, _maxAmounts$Field$CUR6;
      onFieldAInput((_maxAmounts$Field$CUR5 = (_maxAmounts$Field$CUR6 = maxAmounts[actions.Field.CURRENCY_A]) === null || _maxAmounts$Field$CUR6 === void 0 ? void 0 : _maxAmounts$Field$CUR6.toExact()) !== null && _maxAmounts$Field$CUR5 !== void 0 ? _maxAmounts$Field$CUR5 : "");
    },
    showMaxButton: !atMaxAmounts[actions.Field.CURRENCY_A],
    currency: (_currencies$Field$CUR9 = currencies[actions.Field.CURRENCY_A]) !== null && _currencies$Field$CUR9 !== void 0 ? _currencies$Field$CUR9 : null,
    id: "add-liquidity-input-tokena",
    fiatValue: currencyAFiat,
    showCommonBases: true,
    locked: depositADisabled
  }), /*#__PURE__*/React__default["default"].createElement(index$7, {
    value: formattedAmounts[actions.Field.CURRENCY_B],
    onUserInput: onFieldBInput,
    onMax: function onMax() {
      var _maxAmounts$Field$CUR7, _maxAmounts$Field$CUR8;
      onFieldBInput((_maxAmounts$Field$CUR7 = (_maxAmounts$Field$CUR8 = maxAmounts[actions.Field.CURRENCY_B]) === null || _maxAmounts$Field$CUR8 === void 0 ? void 0 : _maxAmounts$Field$CUR8.toExact()) !== null && _maxAmounts$Field$CUR7 !== void 0 ? _maxAmounts$Field$CUR7 : "");
    },
    showMaxButton: !atMaxAmounts[actions.Field.CURRENCY_B],
    fiatValue: currencyBFiat,
    currency: (_currencies$Field$CUR10 = currencies[actions.Field.CURRENCY_B]) !== null && _currencies$Field$CUR10 !== void 0 ? _currencies$Field$CUR10 : null,
    id: "add-liquidity-input-tokenb",
    showCommonBases: true,
    locked: depositBDisabled
  })))), /*#__PURE__*/React__default["default"].createElement(Buttons, null))), showOwnershipWarning && /*#__PURE__*/React__default["default"].createElement(OwnershipWarning, {
    ownerAddress: owner
  }), addIsUnsupported && /*#__PURE__*/React__default["default"].createElement(UnsupportedCurrencyFooter, {
    show: addIsUnsupported,
    currencies: [currencies.CURRENCY_A, currencies.CURRENCY_B]
  })), /*#__PURE__*/React__default["default"].createElement(index$f.SwitchLocaleLink, null));
}

module.exports = AddLiquidityWrapper;
