'use strict';

var React = require('react');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$6 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var core = require('@web3-react/core');
var index$4 = require('../../analytics/index.cjs');
var index$3 = require('../../components/AccountDrawer/index.cjs');
var index$2 = require('../../components/Button/index.cjs');
var index = require('../../components/Column/index.cjs');
var index$7 = require('../../components/PositionList/index.cjs');
var index$1 = require('../../components/Row/index.cjs');
var index$9 = require('../../components/SwitchLocaleLink/index.cjs');
var chains = require('../../constants/chains.cjs');
var useFilterPossiblyMaliciousPositions = require('../../hooks/useFilterPossiblyMaliciousPositions.cjs');
var useV3Positions = require('../../hooks/useV3Positions.cjs');
var index$5 = require('../AddLiquidity/index.cjs');
var reactFeather = require('react-feather');
var hooks = require('../../state/user/hooks.cjs');
var styled = require('styled-components');
var index$8 = require('../../theme/components/index.cjs');
var CTACards = require('./CTACards.cjs');
var PositionLoadingPlaceHolder = require('./PositionLoadingPlaceHolder.cjs');
var WrongNetworkCard = require('./WrongNetworkCard.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
var PageWrapper = styled__default["default"](index.AutoColumn)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 8px;\n  width: 100%;\n"])));
var TitleRow = styled__default["default"](index$1.RowBetween)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  @media (max-width: ", ") {\n    flex-wrap: wrap;\n    gap: 12px;\n    width: 100%;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
}, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var ButtonRow = styled__default["default"](index$1.RowFixed)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  & > *:not(:last-child) {\n    margin-left: 8px;\n  }\n\n  @media (max-width: ", ") {\n    width: 100%;\n    flex-direction: row;\n    justify-content: space-between;\n  }\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var ErrorContainer = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin: auto;\n  max-width: 300px;\n  min-height: 25vh;\n"])));
var IconStyle = styled.css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  width: 48px;\n  height: 48px;\n  margin-bottom: 0.5rem;\n"])));
var InboxIcon = styled__default["default"](reactFeather.Inbox)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  ", "\n"])), IconStyle);
var ResponsiveButtonPrimary = styled__default["default"](index$2.ButtonPrimary)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  border-radius: 12px;\n  font-size: 16px;\n  padding: 6px 8px;\n  width: fit-content;\n  @media (max-width: ", ") {\n    flex: 1 1 auto;\n    width: 50%;\n  }\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var MainContentWrapper = styled__default["default"].main(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  border: 1px solid ", ";\n  padding: 0;\n  border-radius: 16px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface1;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.surface3;
});
function Pool() {
  var _positions$reduce;
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId;
  var toggleWalletDrawer = index$3.useToggleAccountDrawer();
  var theme = styled.useTheme();
  var _useUserHideClosedPos = hooks.useUserHideClosedPositions(),
    _useUserHideClosedPos2 = _slicedToArray__default["default"](_useUserHideClosedPos, 2),
    userHideClosedPositions = _useUserHideClosedPos2[0],
    setUserHideClosedPositions = _useUserHideClosedPos2[1];
  var _useV3Positions = useV3Positions.useV3Positions(account),
    positions = _useV3Positions.positions,
    positionsLoading = _useV3Positions.loading;
  var _ref7 = (_positions$reduce = positions === null || positions === void 0 ? void 0 : positions.reduce(function (acc, p) {
      var _p$liquidity;
      acc[(_p$liquidity = p.liquidity) !== null && _p$liquidity !== void 0 && _p$liquidity.isZero() ? 1 : 0].push(p);
      return acc;
    }, [[], []])) !== null && _positions$reduce !== void 0 ? _positions$reduce : [[], []],
    _ref8 = _slicedToArray__default["default"](_ref7, 2),
    openPositions = _ref8[0],
    closedPositions = _ref8[1];
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    isOpenAdd = _useState2[0],
    setIsOpenAdd = _useState2[1];
  var _useState3 = React.useState("ETH"),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    currencyIdA = _useState4[0],
    setCurrencyIdA = _useState4[1];
  var _useState5 = React.useState(undefined),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
    currencyIdB = _useState6[0],
    setCurrencyIdB = _useState6[1];
  var _useState7 = React.useState(undefined),
    _useState8 = _slicedToArray__default["default"](_useState7, 2),
    feeAmount = _useState8[0],
    setFeeAmount = _useState8[1];
  var userSelectedPositionSet = React.useMemo(function () {
    return [].concat(_toConsumableArray__default["default"](openPositions), _toConsumableArray__default["default"](userHideClosedPositions ? [] : closedPositions));
  }, [closedPositions, openPositions, userHideClosedPositions]);
  var filteredPositions = useFilterPossiblyMaliciousPositions.useFilterPossiblyMaliciousPositions(userSelectedPositionSet);
  if (!chains.isSupportedChain(chainId)) {
    return /*#__PURE__*/React__default["default"].createElement(WrongNetworkCard, null);
  }
  var handleOpenAdd = function handleOpenAdd() {
    setIsOpenAdd(true);
  };
  var showConnectAWallet = Boolean(!account);
  return /*#__PURE__*/React__default["default"].createElement(index$4.Trace, {
    page: analyticsEvents.InterfacePageName.POOL_PAGE,
    shouldLogImpression: true
  }, /*#__PURE__*/React__default["default"].createElement(PageWrapper, null, isOpenAdd ? /*#__PURE__*/React__default["default"].createElement(index$5, {
    currencyIdA: currencyIdA,
    onChangeCurrencyIdA: function onChangeCurrencyIdA(v) {
      return setCurrencyIdA(v !== null && v !== void 0 ? v : undefined);
    },
    currencyIdB: currencyIdB,
    onChangeCurrencyIdB: function onChangeCurrencyIdB(v) {
      return setCurrencyIdB(v !== null && v !== void 0 ? v : undefined);
    },
    feeAmount: feeAmount,
    onChangeFeeAmount: function onChangeFeeAmount(v) {
      return setFeeAmount(v !== null && v !== void 0 ? v : undefined);
    },
    openPools: function openPools() {
      return setIsOpenAdd(false);
    }
  }) : /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "lg",
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "lg",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React__default["default"].createElement(TitleRow, {
    padding: "0"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LargeHeader, null, /*#__PURE__*/React__default["default"].createElement(index$6.Trans, {
    id: "lQfOr9",
    message: "Pools"
  })), /*#__PURE__*/React__default["default"].createElement(ButtonRow, null, /*#__PURE__*/React__default["default"].createElement(ResponsiveButtonPrimary, {
    "data-cy": "join-pool-button",
    id: "join-pool-button"
    // as={Link}
    // to="/add/ETH"
    ,
    onClick: handleOpenAdd
  }, "+ ", /*#__PURE__*/React__default["default"].createElement(index$6.Trans, {
    id: "1k0YWs",
    message: "New position"
  })))), /*#__PURE__*/React__default["default"].createElement(MainContentWrapper, null, positionsLoading ? /*#__PURE__*/React__default["default"].createElement(PositionLoadingPlaceHolder, null) : filteredPositions && closedPositions && filteredPositions.length > 0 ? /*#__PURE__*/React__default["default"].createElement(index$7, {
    positions: filteredPositions,
    setUserHideClosedPositions: setUserHideClosedPositions,
    userHideClosedPositions: userHideClosedPositions
  }) : /*#__PURE__*/React__default["default"].createElement(ErrorContainer, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
    color: theme.neutral3,
    textAlign: "center"
  }, /*#__PURE__*/React__default["default"].createElement(InboxIcon, {
    strokeWidth: 1,
    style: {
      marginTop: "2em"
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(index$6.Trans, {
    id: "YgSnQ0",
    message: "Your active V3 liquidity positions will appear here."
  }))), !showConnectAWallet && closedPositions.length > 0 && /*#__PURE__*/React__default["default"].createElement(index$2.ButtonText, {
    style: {
      marginTop: ".5rem"
    },
    onClick: function onClick() {
      return setUserHideClosedPositions(!userHideClosedPositions);
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$6.Trans, {
    id: "GOctE4",
    message: "Show closed positions"
  })), showConnectAWallet && /*#__PURE__*/React__default["default"].createElement(index$4.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    name: analyticsEvents.InterfaceEventName.CONNECT_WALLET_BUTTON_CLICKED,
    properties: {
      received_swap_quote: false
    },
    element: analyticsEvents.InterfaceElementName.CONNECT_WALLET_BUTTON
  }, /*#__PURE__*/React__default["default"].createElement(index$2.ButtonPrimary, {
    style: {
      marginTop: "2em",
      marginBottom: "2em",
      padding: "8px 16px"
    },
    onClick: toggleWalletDrawer
  }, /*#__PURE__*/React__default["default"].createElement(index$6.Trans, {
    id: "GdzYJ9",
    message: "Connect a wallet"
  }))))), /*#__PURE__*/React__default["default"].createElement(index$8.HideSmall, null, /*#__PURE__*/React__default["default"].createElement(CTACards, null))))), /*#__PURE__*/React__default["default"].createElement(index$9.SwitchLocaleLink, null));
}

module.exports = Pool;
