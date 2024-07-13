import React__default, { useState, useCallback, useMemo } from 'react';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { BigNumber } from '@ethersproject/bignumber';
import { LiquidityEventName, BrowserEvent, InterfaceEventName, InterfaceElementName } from '@uniswap/analytics-events';
import { Percent, NONFUNGIBLE_POSITION_MANAGER_ADDRESSES } from '@uniswap/sdk-core';
import { NonfungiblePositionManager } from '@uniswap/v3-sdk';
import { useWeb3React } from '@web3-react/core';
import { sendAnalyticsEvent, TraceEvent } from '../../analytics/index.js';
import { useToggleAccountDrawer } from '../../components/AccountDrawer/index.js';
import OwnershipWarning from '../../components/addLiquidity/OwnershipWarning.js';
import UnsupportedCurrencyFooter from '../../components/swap/UnsupportedCurrencyFooter.js';
import { isSupportedChain } from '../../constants/chains.js';
import { useSingleCallResult } from '../../lib/hooks/multicall.js';
import { PositionPageUnsupportedContent } from '../Pool/PositionPage.js';
import { AlertTriangle } from 'react-feather';
import { Text } from 'rebass';
import { useV3MintState, useV3DerivedMintInfo, useV3MintActionHandlers, useRangeHopCallbacks } from '../../state/mint/v3/hooks.js';
import { useTheme } from 'styled-components';
import '../../theme/components/index.js';
import { addressesAreEquivalent } from '../../utils/addressesAreEquivalent.js';
import { WrongChainError } from '../../utils/errors.js';
import { ButtonPrimary, ButtonText, ButtonLight, ButtonError } from '../../components/Button/index.js';
import { YellowCard, BlueCard, OutlineCard } from '../../components/Card/index.js';
import { AutoColumn } from '../../components/Column/index.js';
import CurrencyInputPanel from '../../components/CurrencyInputPanel/index.js';
import FeeSelector from '../../components/FeeSelector/index.js';
import HoverInlineText from '../../components/HoverInlineText/index.js';
import LiquidityChartRangeInput from '../../components/LiquidityChartRangeInput/index.js';
import { AddRemoveTabs } from '../../components/NavigationTabs/index.js';
import { PositionPreview } from '../../components/PositionPreview/index.js';
import RangeSelector from '../../components/RangeSelector/index.js';
import PresetsButtons from '../../components/RangeSelector/PresetsButtons.js';
import RateToggle from '../../components/RateToggle/index.js';
import Row, { RowBetween, RowFixed } from '../../components/Row/index.js';
import { SwitchLocaleLink } from '../../components/SwitchLocaleLink/index.js';
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal/index.js';
import { ZERO_PERCENT } from '../../constants/misc.js';
import { WRAPPED_NATIVE_CURRENCY } from '../../constants/tokens.js';
import { useCurrency } from '../../hooks/Tokens.js';
import { useApproveCallback } from '../../hooks/useApproveCallback.js';
import { useArgentWalletContract } from '../../hooks/useArgentWalletContract.js';
import { useV3NFTPositionManagerContract } from '../../hooks/useContract.js';
import { useDerivedPositionInfo } from '../../hooks/useDerivedPositionInfo.js';
import { useIsSwapUnsupported } from '../../hooks/useIsSwapUnsupported.js';
import { useStablecoinValue } from '../../hooks/useStablecoinPrice.js';
import useTransactionDeadline from '../../hooks/useTransactionDeadline.js';
import { useV3PositionFromTokenId } from '../../hooks/useV3Positions.js';
import { Field, Bound } from '../../state/mint/v3/actions.js';
import { useTransactionAdder } from '../../state/transactions/hooks.js';
import { TransactionType } from '../../state/transactions/types.js';
import { useUserSlippageToleranceWithDefault } from '../../state/user/hooks.js';
import approveAmountCalldata from '../../utils/approveAmountCalldata.js';
import { calculateGasMargin } from '../../utils/calculateGasMargin.js';
import { currencyId } from '../../utils/currencyId.js';
import { maxAmountSpend } from '../../utils/maxAmountSpend.js';
import { Dots } from '../Pool/styled.js';
import { Review } from './Review.js';
import { ScrollablePage, MediumOnly, Wrapper, ResponsiveTwoColumns, DynamicSection, StyledInput } from './styled.js';
import { ApprovalState } from '../../lib/hooks/useApproval.js';
import { ThemedText } from '../../theme/components/text.js';
import { useTrace } from '@uniswap/analytics';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE = new Percent(50, 10000);
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
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  if (isSupportedChain(chainId)) {
    return /*#__PURE__*/React__default.createElement(AddLiquidity, {
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
    return /*#__PURE__*/React__default.createElement(PositionPageUnsupportedContent, null);
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
  var _useWeb3React2 = useWeb3React(),
    account = _useWeb3React2.account,
    chainId = _useWeb3React2.chainId,
    provider = _useWeb3React2.provider;
  var theme = useTheme();
  var trace = useTrace();
  var toggleWalletDrawer = useToggleAccountDrawer(); // toggle wallet when disconnected
  var addTransaction = useTransactionAdder();
  var positionManager = useV3NFTPositionManagerContract();

  // min price, max price
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    minPrice = _useState2[0],
    setMinPrice = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    maxPrice = _useState4[0],
    setMaxPrice = _useState4[1];

  // check for existing position if tokenId in url
  var _useV3PositionFromTok = useV3PositionFromTokenId(tokenId ? BigNumber.from(tokenId) : undefined),
    existingPositionDetails = _useV3PositionFromTok.position,
    positionLoading = _useV3PositionFromTok.loading;
  var hasExistingPosition = !!existingPositionDetails && !positionLoading;
  var _useDerivedPositionIn = useDerivedPositionInfo(existingPositionDetails),
    existingPosition = _useDerivedPositionIn.position;
  var baseCurrency = useCurrency(currencyIdA);
  var currencyB = useCurrency(currencyIdB);
  // prevent an error if they input ETH/WETH
  var quoteCurrency = baseCurrency && currencyB && baseCurrency.wrapped.equals(currencyB.wrapped) ? undefined : currencyB;

  // mint state
  var _useV3MintState = useV3MintState(),
    independentField = _useV3MintState.independentField,
    typedValue = _useV3MintState.typedValue,
    startPriceTypedValue = _useV3MintState.startPriceTypedValue;
  var _useV3DerivedMintInfo = useV3DerivedMintInfo(baseCurrency !== null && baseCurrency !== void 0 ? baseCurrency : undefined, quoteCurrency !== null && quoteCurrency !== void 0 ? quoteCurrency : undefined, feeAmount, baseCurrency !== null && baseCurrency !== void 0 ? baseCurrency : undefined, existingPosition),
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
  var _useV3MintActionHandl = useV3MintActionHandlers(noLiquidity),
    onFieldAInput = _useV3MintActionHandl.onFieldAInput,
    onFieldBInput = _useV3MintActionHandl.onFieldBInput,
    onLeftRangeInput = _useV3MintActionHandl.onLeftRangeInput,
    onRightRangeInput = _useV3MintActionHandl.onRightRangeInput,
    onStartPriceInput = _useV3MintActionHandl.onStartPriceInput;
  var isValid = !errorMessage && !invalidRange;

  // modal and loading
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showConfirm = _useState6[0],
    setShowConfirm = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    attemptingTxn = _useState8[0],
    setAttemptingTxn = _useState8[1]; // clicked confirm

  // txn values
  var deadline = useTransactionDeadline(); // custom from users settings

  var _useState9 = useState(""),
    _useState10 = _slicedToArray(_useState9, 2),
    txHash = _useState10[0],
    setTxHash = _useState10[1];

  // get formatted amounts
  var formattedAmounts = _defineProperty(_defineProperty({}, independentField, typedValue), dependentField, (_parsedAmounts$depend = (_parsedAmounts$depend2 = parsedAmounts[dependentField]) === null || _parsedAmounts$depend2 === void 0 ? void 0 : _parsedAmounts$depend2.toSignificant(6)) !== null && _parsedAmounts$depend !== void 0 ? _parsedAmounts$depend : "");
  var usdcValues = _defineProperty(_defineProperty({}, Field.CURRENCY_A, useStablecoinValue(parsedAmounts[Field.CURRENCY_A])), Field.CURRENCY_B, useStablecoinValue(parsedAmounts[Field.CURRENCY_B]));

  // get the max amounts user can add
  var maxAmounts = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(function (accumulator, field) {
    return _objectSpread(_objectSpread({}, accumulator), {}, _defineProperty({}, field, maxAmountSpend(currencyBalances[field])));
  }, {});
  var atMaxAmounts = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(function (accumulator, field) {
    var _maxAmounts$field, _parsedAmounts$field;
    return _objectSpread(_objectSpread({}, accumulator), {}, _defineProperty({}, field, (_maxAmounts$field = maxAmounts[field]) === null || _maxAmounts$field === void 0 ? void 0 : _maxAmounts$field.equalTo((_parsedAmounts$field = parsedAmounts[field]) !== null && _parsedAmounts$field !== void 0 ? _parsedAmounts$field : "0")));
  }, {});
  var argentWalletContract = useArgentWalletContract();

  // check whether the user has approved the router on the tokens
  var _useApproveCallback = useApproveCallback(argentWalletContract ? undefined : parsedAmounts[Field.CURRENCY_A], chainId ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined),
    _useApproveCallback2 = _slicedToArray(_useApproveCallback, 2),
    approvalA = _useApproveCallback2[0],
    approveACallback = _useApproveCallback2[1];
  var _useApproveCallback3 = useApproveCallback(argentWalletContract ? undefined : parsedAmounts[Field.CURRENCY_B], chainId ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined),
    _useApproveCallback4 = _slicedToArray(_useApproveCallback3, 2),
    approvalB = _useApproveCallback4[0],
    approveBCallback = _useApproveCallback4[1];
  var allowedSlippage = useUserSlippageToleranceWithDefault(outOfRange ? ZERO_PERCENT : DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE);
  function onAdd() {
    return _onAdd.apply(this, arguments);
  }
  function _onAdd() {
    _onAdd = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var useNative, _ref5, calldata, value, txn, amountA, amountB, batch, data, connectedChainId;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
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
            _ref5 = hasExistingPosition && tokenId ? NonfungiblePositionManager.addCallParameters(position, {
              tokenId: tokenId,
              slippageTolerance: allowedSlippage,
              deadline: deadline.toString(),
              useNative: useNative
            }) : NonfungiblePositionManager.addCallParameters(position, {
              slippageTolerance: allowedSlippage,
              recipient: account,
              deadline: deadline.toString(),
              useNative: useNative,
              createPool: noLiquidity
            }), calldata = _ref5.calldata, value = _ref5.value;
            txn = {
              to: NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId],
              data: calldata,
              value: value
            };
            if (argentWalletContract) {
              amountA = parsedAmounts[Field.CURRENCY_A];
              amountB = parsedAmounts[Field.CURRENCY_B];
              batch = [].concat(_toConsumableArray(amountA && amountA.currency.isToken ? [approveAmountCalldata(amountA, NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId])] : []), _toConsumableArray(amountB && amountB.currency.isToken ? [approveAmountCalldata(amountB, NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId])] : []), [{
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
            throw new WrongChainError();
          case 14:
            setAttemptingTxn(true);
            provider.getSigner().estimateGas(txn).then(function (estimate) {
              var newTxn = _objectSpread(_objectSpread({}, txn), {}, {
                gasLimit: calculateGasMargin(estimate)
              });
              return provider.getSigner().sendTransaction(newTxn).then(function (response) {
                var _parsedAmounts$Field$3, _parsedAmounts$Field$4, _parsedAmounts$Field$5, _parsedAmounts$Field$6, _currencies$Field$CUR11, _currencies$Field$CUR12;
                setAttemptingTxn(false);
                var transactionInfo = {
                  type: TransactionType.ADD_LIQUIDITY_V3_POOL,
                  baseCurrencyId: currencyId(baseCurrency),
                  quoteCurrencyId: currencyId(quoteCurrency),
                  createPool: Boolean(noLiquidity),
                  expectedAmountBaseRaw: (_parsedAmounts$Field$3 = (_parsedAmounts$Field$4 = parsedAmounts[Field.CURRENCY_A]) === null || _parsedAmounts$Field$4 === void 0 || (_parsedAmounts$Field$4 = _parsedAmounts$Field$4.quotient) === null || _parsedAmounts$Field$4 === void 0 ? void 0 : _parsedAmounts$Field$4.toString()) !== null && _parsedAmounts$Field$3 !== void 0 ? _parsedAmounts$Field$3 : "0",
                  expectedAmountQuoteRaw: (_parsedAmounts$Field$5 = (_parsedAmounts$Field$6 = parsedAmounts[Field.CURRENCY_B]) === null || _parsedAmounts$Field$6 === void 0 || (_parsedAmounts$Field$6 = _parsedAmounts$Field$6.quotient) === null || _parsedAmounts$Field$6 === void 0 ? void 0 : _parsedAmounts$Field$6.toString()) !== null && _parsedAmounts$Field$5 !== void 0 ? _parsedAmounts$Field$5 : "0",
                  feeAmount: position.pool.fee
                };
                addTransaction(response, transactionInfo);
                setTxHash(response.hash);
                sendAnalyticsEvent(LiquidityEventName.ADD_LIQUIDITY_SUBMITTED, _objectSpread(_objectSpread({
                  label: [(_currencies$Field$CUR11 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR11 === void 0 ? void 0 : _currencies$Field$CUR11.symbol, (_currencies$Field$CUR12 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR12 === void 0 ? void 0 : _currencies$Field$CUR12.symbol].join("/")
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
  var handleCurrencySelect = useCallback(function (currencyNew, currencyIdOther) {
    var currencyIdNew = currencyId(currencyNew);
    if (currencyIdNew === currencyIdOther) {
      // not ideal, but for now clobber the other if the currency ids are equal
      return [currencyIdNew, undefined];
    } else {
      var _WRAPPED_NATIVE_CURRE, _WRAPPED_NATIVE_CURRE2;
      // prevent weth + eth
      var isETHOrWETHNew = currencyIdNew === "ETH" || chainId !== undefined && currencyIdNew === ((_WRAPPED_NATIVE_CURRE = WRAPPED_NATIVE_CURRENCY[chainId]) === null || _WRAPPED_NATIVE_CURRE === void 0 ? void 0 : _WRAPPED_NATIVE_CURRE.address);
      var isETHOrWETHOther = currencyIdOther !== undefined && (currencyIdOther === "ETH" || chainId !== undefined && currencyIdOther === ((_WRAPPED_NATIVE_CURRE2 = WRAPPED_NATIVE_CURRENCY[chainId]) === null || _WRAPPED_NATIVE_CURRE2 === void 0 ? void 0 : _WRAPPED_NATIVE_CURRE2.address));
      if (isETHOrWETHNew && isETHOrWETHOther) {
        return [currencyIdNew, undefined];
      } else {
        return [currencyIdNew, currencyIdOther];
      }
    }
  }, [chainId]);
  var handleCurrencyASelect = useCallback(function (currencyANew) {
    var _handleCurrencySelect = handleCurrencySelect(currencyANew, currencyIdB),
      _handleCurrencySelect2 = _slicedToArray(_handleCurrencySelect, 2),
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
  var handleCurrencyBSelect = useCallback(function (currencyBNew) {
    var _handleCurrencySelect3 = handleCurrencySelect(currencyBNew, currencyIdA),
      _handleCurrencySelect4 = _slicedToArray(_handleCurrencySelect3, 2),
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
  var handleFeePoolSelect = useCallback(function (newFeeAmount) {
    onLeftRangeInput("");
    onRightRangeInput("");
    // navigate(`/add/${currencyIdA}/${currencyIdB}/${newFeeAmount}`);

    onChangeFeeAmount(newFeeAmount);
  }, [onChangeFeeAmount, onLeftRangeInput, onRightRangeInput]);
  var handleDismissConfirmation = useCallback(function () {
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
  var addIsUnsupported = useIsSwapUnsupported(currencies === null || currencies === void 0 ? void 0 : currencies.CURRENCY_A, currencies === null || currencies === void 0 ? void 0 : currencies.CURRENCY_B);
  var clearAll = useCallback(function () {
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
  var tickLower = ticks[Bound.LOWER],
    tickUpper = ticks[Bound.UPPER];
  var priceLower = pricesAtTicks[Bound.LOWER],
    priceUpper = pricesAtTicks[Bound.UPPER];
  var _useRangeHopCallbacks = useRangeHopCallbacks(baseCurrency !== null && baseCurrency !== void 0 ? baseCurrency : undefined, quoteCurrency !== null && quoteCurrency !== void 0 ? quoteCurrency : undefined, feeAmount, tickLower, tickUpper, pool),
    getDecrementLower = _useRangeHopCallbacks.getDecrementLower,
    getIncrementLower = _useRangeHopCallbacks.getIncrementLower,
    getDecrementUpper = _useRangeHopCallbacks.getDecrementUpper,
    getIncrementUpper = _useRangeHopCallbacks.getIncrementUpper,
    getSetFullRange = _useRangeHopCallbacks.getSetFullRange;

  // we need an existence check on parsed amounts for single-asset deposits
  var showApprovalA = !argentWalletContract && approvalA !== ApprovalState.APPROVED && !!parsedAmounts[Field.CURRENCY_A];
  var showApprovalB = !argentWalletContract && approvalB !== ApprovalState.APPROVED && !!parsedAmounts[Field.CURRENCY_B];
  var pendingText = "Supplying ".concat(!depositADisabled ? (_parsedAmounts$Field$ = parsedAmounts[Field.CURRENCY_A]) === null || _parsedAmounts$Field$ === void 0 ? void 0 : _parsedAmounts$Field$.toSignificant(6) : "", " ").concat(!depositADisabled ? (_currencies$Field$CUR = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR === void 0 ? void 0 : _currencies$Field$CUR.symbol : "", " ").concat(!outOfRange ? "and" : "", " ").concat(!depositBDisabled ? (_parsedAmounts$Field$2 = parsedAmounts[Field.CURRENCY_B]) === null || _parsedAmounts$Field$2 === void 0 ? void 0 : _parsedAmounts$Field$2.toSignificant(6) : "", " ").concat(!depositBDisabled ? (_currencies$Field$CUR2 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR2 === void 0 ? void 0 : _currencies$Field$CUR2.symbol : "");

  // const [searchParams, setSearchParams] = useSearchParams();

  var handleSetFullRange = useCallback(function () {
    var _minP$toSignificant, _maxP$toSignificant;
    getSetFullRange();

    // const minPrice = pricesAtLimit[Bound.LOWER];
    // if (minPrice) searchParams.set("minPrice", minPrice.toSignificant(5));
    // const maxPrice = pricesAtLimit[Bound.UPPER];
    // if (maxPrice) searchParams.set("maxPrice", maxPrice.toSignificant(5));
    // setSearchParams(searchParams);

    var minP = pricesAtLimit[Bound.LOWER];
    var minPValue = (_minP$toSignificant = minP === null || minP === void 0 ? void 0 : minP.toSignificant(5)) !== null && _minP$toSignificant !== void 0 ? _minP$toSignificant : "";
    if (minPValue && typeof minPValue === "string" && !isNaN(minPValue) && (!minPrice || minPrice !== minPValue)) {
      onLeftRangeInput(minPValue);
    }
    setMinPrice(minPValue);
    var maxP = pricesAtLimit[Bound.UPPER];
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
    return addIsUnsupported ? /*#__PURE__*/React__default.createElement(ButtonPrimary, {
      disabled: true,
      $borderRadius: "12px",
      padding: "12px"
    }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
      mb: "4px"
    }, /*#__PURE__*/React__default.createElement(Trans, {
      id: "Iac4Ia",
      message: "Unsupported Asset"
    }))) : !account ? /*#__PURE__*/React__default.createElement(TraceEvent, {
      events: [BrowserEvent.onClick],
      name: InterfaceEventName.CONNECT_WALLET_BUTTON_CLICKED,
      properties: {
        received_swap_quote: false
      },
      element: InterfaceElementName.CONNECT_WALLET_BUTTON
    }, /*#__PURE__*/React__default.createElement(ButtonLight, {
      onClick: toggleWalletDrawer,
      $borderRadius: "12px",
      padding: "12px"
    }, /*#__PURE__*/React__default.createElement(Trans, {
      id: "VHOVEJ",
      message: "Connect wallet"
    }))) : /*#__PURE__*/React__default.createElement(AutoColumn, {
      gap: "md"
    }, (approvalA === ApprovalState.NOT_APPROVED || approvalA === ApprovalState.PENDING || approvalB === ApprovalState.NOT_APPROVED || approvalB === ApprovalState.PENDING) && isValid && /*#__PURE__*/React__default.createElement(RowBetween, null, showApprovalA && /*#__PURE__*/React__default.createElement(ButtonPrimary, {
      onClick: approveACallback,
      disabled: approvalA === ApprovalState.PENDING,
      width: showApprovalB ? "48%" : "100%"
    }, approvalA === ApprovalState.PENDING ? /*#__PURE__*/React__default.createElement(Dots, null, /*#__PURE__*/React__default.createElement(Trans, {
      id: "MfyhMG",
      message: "Approving {0}",
      values: {
        "0": (_currencies$Field$CUR3 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR3 === void 0 ? void 0 : _currencies$Field$CUR3.symbol
      }
    })) : /*#__PURE__*/React__default.createElement(Trans, {
      id: "fgGids",
      message: "Approve {0}",
      values: {
        "0": (_currencies$Field$CUR4 = currencies[Field.CURRENCY_A]) === null || _currencies$Field$CUR4 === void 0 ? void 0 : _currencies$Field$CUR4.symbol
      }
    })), showApprovalB && /*#__PURE__*/React__default.createElement(ButtonPrimary, {
      onClick: approveBCallback,
      disabled: approvalB === ApprovalState.PENDING,
      width: showApprovalA ? "48%" : "100%"
    }, approvalB === ApprovalState.PENDING ? /*#__PURE__*/React__default.createElement(Dots, null, /*#__PURE__*/React__default.createElement(Trans, {
      id: "MfyhMG",
      message: "Approving {0}",
      values: {
        "0": (_currencies$Field$CUR5 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR5 === void 0 ? void 0 : _currencies$Field$CUR5.symbol
      }
    })) : /*#__PURE__*/React__default.createElement(Trans, {
      id: "fgGids",
      message: "Approve {0}",
      values: {
        "0": (_currencies$Field$CUR6 = currencies[Field.CURRENCY_B]) === null || _currencies$Field$CUR6 === void 0 ? void 0 : _currencies$Field$CUR6.symbol
      }
    }))), /*#__PURE__*/React__default.createElement(ButtonError, {
      onClick: function onClick() {
        setShowConfirm(true);
      },
      disabled: !isValid || !argentWalletContract && approvalA !== ApprovalState.APPROVED && !depositADisabled || !argentWalletContract && approvalB !== ApprovalState.APPROVED && !depositBDisabled,
      error: !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]
    }, /*#__PURE__*/React__default.createElement(Text, {
      fontWeight: 535
    }, errorMessage ? errorMessage : /*#__PURE__*/React__default.createElement(Trans, {
      id: "rdUucN",
      message: "Preview"
    }))));
  };
  var usdcValueCurrencyA = usdcValues[Field.CURRENCY_A];
  var usdcValueCurrencyB = usdcValues[Field.CURRENCY_B];
  var currencyAFiat = useMemo(function () {
    return {
      data: usdcValueCurrencyA ? parseFloat(usdcValueCurrencyA.toSignificant()) : undefined,
      isLoading: false
    };
  }, [usdcValueCurrencyA]);
  var currencyBFiat = useMemo(function () {
    return {
      data: usdcValueCurrencyB ? parseFloat(usdcValueCurrencyB.toSignificant()) : undefined,
      isLoading: false
    };
  }, [usdcValueCurrencyB]);
  var owner = (_useSingleCallResult$ = useSingleCallResult(tokenId ? positionManager : null, "ownerOf", [tokenId]).result) === null || _useSingleCallResult$ === void 0 ? void 0 : _useSingleCallResult$[0];
  var ownsNFT = addressesAreEquivalent(owner, account) || addressesAreEquivalent(existingPositionDetails === null || existingPositionDetails === void 0 ? void 0 : existingPositionDetails.operator, account);
  var showOwnershipWarning = Boolean(hasExistingPosition && account && !ownsNFT);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(ScrollablePage, {
    noPadding: true
  }, /*#__PURE__*/React__default.createElement(TransactionConfirmationModal, {
    isOpen: showConfirm,
    onDismiss: handleDismissConfirmation,
    attemptingTxn: attemptingTxn,
    hash: txHash,
    reviewContent: function reviewContent() {
      return /*#__PURE__*/React__default.createElement(ConfirmationModalContent, {
        title: /*#__PURE__*/React__default.createElement(Trans, {
          id: "OBdohg",
          message: "Add Liquidity"
        }),
        onDismiss: handleDismissConfirmation,
        topContent: function topContent() {
          return /*#__PURE__*/React__default.createElement(Review, {
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
          return /*#__PURE__*/React__default.createElement(ButtonPrimary, {
            style: {
              marginTop: "1rem"
            },
            onClick: onAdd
          }, /*#__PURE__*/React__default.createElement(Text, {
            fontWeight: 535,
            fontSize: 20
          }, /*#__PURE__*/React__default.createElement(Trans, {
            id: "m16xKo",
            message: "Add"
          })));
        }
      });
    },
    pendingText: pendingText
  }), /*#__PURE__*/React__default.createElement(AddRemoveTabs, {
    creating: false,
    adding: true,
    positionID: tokenId,
    autoSlippage: DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE,
    showBackLink: !hasExistingPosition,
    onBack: openPools
  }, !hasExistingPosition && /*#__PURE__*/React__default.createElement(Row, {
    justifyContent: "flex-end",
    style: {
      width: "fit-content",
      minWidth: "fit-content"
    }
  }, /*#__PURE__*/React__default.createElement(MediumOnly, null, /*#__PURE__*/React__default.createElement(ButtonText, {
    onClick: clearAll
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedBlue, {
    fontSize: "12px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "yYxB17",
    message: "Clear all"
  })))))), /*#__PURE__*/React__default.createElement(Wrapper, null, /*#__PURE__*/React__default.createElement(ResponsiveTwoColumns, {
    wide: !hasExistingPosition
  }, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "lg"
  }, !hasExistingPosition && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(RowBetween, {
    paddingBottom: "20px"
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "nxRg31",
    message: "Select pair"
  }))), /*#__PURE__*/React__default.createElement(RowBetween, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(CurrencyInputPanel, {
    value: formattedAmounts[Field.CURRENCY_A],
    onUserInput: onFieldAInput,
    hideInput: true,
    onMax: function onMax() {
      var _maxAmounts$Field$CUR, _maxAmounts$Field$CUR2;
      onFieldAInput((_maxAmounts$Field$CUR = (_maxAmounts$Field$CUR2 = maxAmounts[Field.CURRENCY_A]) === null || _maxAmounts$Field$CUR2 === void 0 ? void 0 : _maxAmounts$Field$CUR2.toExact()) !== null && _maxAmounts$Field$CUR !== void 0 ? _maxAmounts$Field$CUR : "");
    },
    onCurrencySelect: handleCurrencyASelect,
    showMaxButton: !atMaxAmounts[Field.CURRENCY_A],
    currency: (_currencies$Field$CUR7 = currencies[Field.CURRENCY_A]) !== null && _currencies$Field$CUR7 !== void 0 ? _currencies$Field$CUR7 : null,
    id: "add-liquidity-input-tokena",
    showCommonBases: true
  }), /*#__PURE__*/React__default.createElement(CurrencyInputPanel, {
    value: formattedAmounts[Field.CURRENCY_B],
    hideInput: true,
    onUserInput: onFieldBInput,
    onCurrencySelect: handleCurrencyBSelect,
    onMax: function onMax() {
      var _maxAmounts$Field$CUR3, _maxAmounts$Field$CUR4;
      onFieldBInput((_maxAmounts$Field$CUR3 = (_maxAmounts$Field$CUR4 = maxAmounts[Field.CURRENCY_B]) === null || _maxAmounts$Field$CUR4 === void 0 ? void 0 : _maxAmounts$Field$CUR4.toExact()) !== null && _maxAmounts$Field$CUR3 !== void 0 ? _maxAmounts$Field$CUR3 : "");
    },
    showMaxButton: !atMaxAmounts[Field.CURRENCY_B],
    currency: (_currencies$Field$CUR8 = currencies[Field.CURRENCY_B]) !== null && _currencies$Field$CUR8 !== void 0 ? _currencies$Field$CUR8 : null,
    id: "add-liquidity-input-tokenb",
    showCommonBases: true
  })), /*#__PURE__*/React__default.createElement(FeeSelector, {
    disabled: !quoteCurrency || !baseCurrency,
    feeAmount: feeAmount,
    handleFeePoolSelect: handleFeePoolSelect,
    currencyA: baseCurrency !== null && baseCurrency !== void 0 ? baseCurrency : undefined,
    currencyB: quoteCurrency !== null && quoteCurrency !== void 0 ? quoteCurrency : undefined
  })), " "), hasExistingPosition && existingPosition && /*#__PURE__*/React__default.createElement(PositionPreview, {
    position: existingPosition,
    title: /*#__PURE__*/React__default.createElement(Trans, {
      id: "dWPDm3",
      message: "Selected range"
    }),
    inRange: !outOfRange,
    ticksAtLimit: ticksAtLimit
  })), !hasExistingPosition && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DynamicSection, {
    gap: "md",
    disabled: !feeAmount || invalidPool
  }, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "5CZbyC",
    message: "Set price range"
  })), Boolean(baseCurrency && quoteCurrency) && /*#__PURE__*/React__default.createElement(RowFixed, {
    gap: "8px"
  }, /*#__PURE__*/React__default.createElement(PresetsButtons, {
    onSetFullRange: handleSetFullRange
  }), /*#__PURE__*/React__default.createElement(RateToggle, {
    currencyA: baseCurrency,
    currencyB: quoteCurrency,
    handleRateToggle: function handleRateToggle() {
      if (!ticksAtLimit[Bound.LOWER] && !ticksAtLimit[Bound.UPPER]) {
        var _toSignificant, _ref3, _toSignificant2, _ref4, _formattedAmounts$Fie;
        onLeftRangeInput((_toSignificant = (_ref3 = invertPrice ? priceLower : priceUpper === null || priceUpper === void 0 ? void 0 : priceUpper.invert()) === null || _ref3 === void 0 ? void 0 : _ref3.toSignificant(6)) !== null && _toSignificant !== void 0 ? _toSignificant : "");
        onRightRangeInput((_toSignificant2 = (_ref4 = invertPrice ? priceUpper : priceLower === null || priceLower === void 0 ? void 0 : priceLower.invert()) === null || _ref4 === void 0 ? void 0 : _ref4.toSignificant(6)) !== null && _toSignificant2 !== void 0 ? _toSignificant2 : "");
        onFieldAInput((_formattedAmounts$Fie = formattedAmounts[Field.CURRENCY_B]) !== null && _formattedAmounts$Fie !== void 0 ? _formattedAmounts$Fie : "");
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
  }))), /*#__PURE__*/React__default.createElement(RangeSelector, {
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
  }), outOfRange && /*#__PURE__*/React__default.createElement(YellowCard, {
    padding: "8px 12px",
    $borderRadius: "12px"
  }, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(AlertTriangle, {
    stroke: theme.deprecated_yellow3,
    size: "16px"
  }), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedYellow, {
    ml: "12px",
    fontSize: "12px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "b+KjnH",
    message: "Your position will not earn fees or be used in trades until the market price moves into your range."
  })))), invalidRange && /*#__PURE__*/React__default.createElement(YellowCard, {
    padding: "8px 12px",
    $borderRadius: "12px"
  }, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(AlertTriangle, {
    stroke: theme.deprecated_yellow3,
    size: "16px"
  }), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedYellow, {
    ml: "12px",
    fontSize: "12px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Jh223O",
    message: "Invalid range selected. The min price must be lower than the max price."
  }))))), /*#__PURE__*/React__default.createElement(DynamicSection, {
    gap: "md",
    disabled: !feeAmount || invalidPool
  }, !noLiquidity ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, Boolean(price && baseCurrency && quoteCurrency && !noLiquidity) && /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "2px",
    style: {
      marginTop: "0.5rem"
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "7k623k",
    message: "<0>Current price:</0><1>{0}</1>{1}",
    values: {
      "0": price && /*#__PURE__*/React__default.createElement(HoverInlineText, {
        maxCharacters: 20,
        text: invertPrice ? price.invert().toSignificant(6) : price.toSignificant(6)
      }),
      "1": baseCurrency && /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedBody, {
        color: "text2",
        fontSize: 12
      }, quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol, " per", " ", baseCurrency.symbol)
    },
    components: {
      "0": /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
        fontWeight: 535,
        fontSize: 12,
        color: "text1"
      }),
      "1": /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedBody, {
        fontWeight: 535,
        fontSize: 20,
        color: "text1"
      })
    }
  })), /*#__PURE__*/React__default.createElement(LiquidityChartRangeInput, {
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
  })) : /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "md"
  }, noLiquidity && /*#__PURE__*/React__default.createElement(BlueCard, {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "1rem 1rem"
    }
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedBody, {
    fontSize: 14,
    style: {
      fontWeight: 535
    },
    textAlign: "left",
    color: theme.accent1
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "X6T02b",
    message: "This pool must be initialized before you can add liquidity. To initialize, select a starting price for the pool. Then, enter your liquidity price range and deposit amount. Gas fees will be higher than usual due to the initialization transaction."
  }))), /*#__PURE__*/React__default.createElement(OutlineCard, {
    padding: "12px"
  }, /*#__PURE__*/React__default.createElement(StyledInput, {
    className: "start-price-input",
    value: startPriceTypedValue,
    onUserInput: onStartPriceInput
  })), /*#__PURE__*/React__default.createElement(RowBetween, {
    style: {
      backgroundColor: theme.surface1,
      padding: "12px",
      borderRadius: "12px"
    }
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Ay/EYV",
    message: "Starting {0} Price:",
    values: {
      "0": baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol
    }
  })), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, null, price ? /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, null, /*#__PURE__*/React__default.createElement(RowFixed, null, /*#__PURE__*/React__default.createElement(HoverInlineText, {
    maxCharacters: 20,
    text: invertPrice ? price === null || price === void 0 || (_price$invert = price.invert()) === null || _price$invert === void 0 ? void 0 : _price$invert.toSignificant(8) : price === null || price === void 0 ? void 0 : price.toSignificant(8)
  }), " ", /*#__PURE__*/React__default.createElement("span", {
    style: {
      marginLeft: "4px"
    }
  }, quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol, " per", " ", baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol))) : "-"))))), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(DynamicSection, {
    disabled: invalidPool || invalidRange || noLiquidity && !startPriceTypedValue
  }, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, null, hasExistingPosition ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "BRi+RY",
    message: "Add more liquidity"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "MU9s7M",
    message: "Deposit amounts"
  })), /*#__PURE__*/React__default.createElement(CurrencyInputPanel, {
    value: formattedAmounts[Field.CURRENCY_A],
    onUserInput: onFieldAInput,
    onMax: function onMax() {
      var _maxAmounts$Field$CUR5, _maxAmounts$Field$CUR6;
      onFieldAInput((_maxAmounts$Field$CUR5 = (_maxAmounts$Field$CUR6 = maxAmounts[Field.CURRENCY_A]) === null || _maxAmounts$Field$CUR6 === void 0 ? void 0 : _maxAmounts$Field$CUR6.toExact()) !== null && _maxAmounts$Field$CUR5 !== void 0 ? _maxAmounts$Field$CUR5 : "");
    },
    showMaxButton: !atMaxAmounts[Field.CURRENCY_A],
    currency: (_currencies$Field$CUR9 = currencies[Field.CURRENCY_A]) !== null && _currencies$Field$CUR9 !== void 0 ? _currencies$Field$CUR9 : null,
    id: "add-liquidity-input-tokena",
    fiatValue: currencyAFiat,
    showCommonBases: true,
    locked: depositADisabled
  }), /*#__PURE__*/React__default.createElement(CurrencyInputPanel, {
    value: formattedAmounts[Field.CURRENCY_B],
    onUserInput: onFieldBInput,
    onMax: function onMax() {
      var _maxAmounts$Field$CUR7, _maxAmounts$Field$CUR8;
      onFieldBInput((_maxAmounts$Field$CUR7 = (_maxAmounts$Field$CUR8 = maxAmounts[Field.CURRENCY_B]) === null || _maxAmounts$Field$CUR8 === void 0 ? void 0 : _maxAmounts$Field$CUR8.toExact()) !== null && _maxAmounts$Field$CUR7 !== void 0 ? _maxAmounts$Field$CUR7 : "");
    },
    showMaxButton: !atMaxAmounts[Field.CURRENCY_B],
    fiatValue: currencyBFiat,
    currency: (_currencies$Field$CUR10 = currencies[Field.CURRENCY_B]) !== null && _currencies$Field$CUR10 !== void 0 ? _currencies$Field$CUR10 : null,
    id: "add-liquidity-input-tokenb",
    showCommonBases: true,
    locked: depositBDisabled
  })))), /*#__PURE__*/React__default.createElement(Buttons, null))), showOwnershipWarning && /*#__PURE__*/React__default.createElement(OwnershipWarning, {
    ownerAddress: owner
  }), addIsUnsupported && /*#__PURE__*/React__default.createElement(UnsupportedCurrencyFooter, {
    show: addIsUnsupported,
    currencies: [currencies.CURRENCY_A, currencies.CURRENCY_B]
  })), /*#__PURE__*/React__default.createElement(SwitchLocaleLink, null));
}

export { AddLiquidityWrapper as default };
