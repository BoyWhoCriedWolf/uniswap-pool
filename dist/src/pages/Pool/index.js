import React__default, { useState, useMemo } from 'react';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { InterfacePageName, BrowserEvent, InterfaceEventName, InterfaceElementName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { Trace, TraceEvent } from '../../analytics/index.js';
import { useToggleAccountDrawer } from '../../components/AccountDrawer/index.js';
import { ButtonPrimary, ButtonText } from '../../components/Button/index.js';
import { AutoColumn } from '../../components/Column/index.js';
import PositionList from '../../components/PositionList/index.js';
import { RowBetween, RowFixed } from '../../components/Row/index.js';
import { SwitchLocaleLink } from '../../components/SwitchLocaleLink/index.js';
import { isSupportedChain } from '../../constants/chains.js';
import { useFilterPossiblyMaliciousPositions } from '../../hooks/useFilterPossiblyMaliciousPositions.js';
import { useV3Positions } from '../../hooks/useV3Positions.js';
import AddLiquidityWrapper from '../AddLiquidity/index.js';
import { Inbox } from 'react-feather';
import { useUserHideClosedPositions } from '../../state/user/hooks.js';
import styled, { css, useTheme } from 'styled-components';
import { HideSmall } from '../../theme/components/index.js';
import CTACards from './CTACards.js';
import PositionsLoadingPlaceholder from './PositionLoadingPlaceHolder.js';
import WrongNetworkCard from './WrongNetworkCard.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
var PageWrapper = styled(AutoColumn)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 8px;\n  width: 100%;\n"])));
var TitleRow = styled(RowBetween)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  color: ", ";\n  @media (max-width: ", ") {\n    flex-wrap: wrap;\n    gap: 12px;\n    width: 100%;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
}, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var ButtonRow = styled(RowFixed)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  & > *:not(:last-child) {\n    margin-left: 8px;\n  }\n\n  @media (max-width: ", ") {\n    width: 100%;\n    flex-direction: row;\n    justify-content: space-between;\n  }\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var ErrorContainer = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin: auto;\n  max-width: 300px;\n  min-height: 25vh;\n"])));
var IconStyle = css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  width: 48px;\n  height: 48px;\n  margin-bottom: 0.5rem;\n"])));
var InboxIcon = styled(Inbox)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  ", "\n"])), IconStyle);
var ResponsiveButtonPrimary = styled(ButtonPrimary)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  border-radius: 12px;\n  font-size: 16px;\n  padding: 6px 8px;\n  width: fit-content;\n  @media (max-width: ", ") {\n    flex: 1 1 auto;\n    width: 50%;\n  }\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var MainContentWrapper = styled.main(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border: 1px solid ", ";\n  padding: 0;\n  border-radius: 16px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface1;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.surface3;
});
function Pool() {
  var _positions$reduce;
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId;
  var toggleWalletDrawer = useToggleAccountDrawer();
  var theme = useTheme();
  var _useUserHideClosedPos = useUserHideClosedPositions(),
    _useUserHideClosedPos2 = _slicedToArray(_useUserHideClosedPos, 2),
    userHideClosedPositions = _useUserHideClosedPos2[0],
    setUserHideClosedPositions = _useUserHideClosedPos2[1];
  var _useV3Positions = useV3Positions(account),
    positions = _useV3Positions.positions,
    positionsLoading = _useV3Positions.loading;
  var _ref7 = (_positions$reduce = positions === null || positions === void 0 ? void 0 : positions.reduce(function (acc, p) {
      var _p$liquidity;
      acc[(_p$liquidity = p.liquidity) !== null && _p$liquidity !== void 0 && _p$liquidity.isZero() ? 1 : 0].push(p);
      return acc;
    }, [[], []])) !== null && _positions$reduce !== void 0 ? _positions$reduce : [[], []],
    _ref8 = _slicedToArray(_ref7, 2),
    openPositions = _ref8[0],
    closedPositions = _ref8[1];
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpenAdd = _useState2[0],
    setIsOpenAdd = _useState2[1];
  var _useState3 = useState("ETH"),
    _useState4 = _slicedToArray(_useState3, 2),
    currencyIdA = _useState4[0],
    setCurrencyIdA = _useState4[1];
  var _useState5 = useState(undefined),
    _useState6 = _slicedToArray(_useState5, 2),
    currencyIdB = _useState6[0],
    setCurrencyIdB = _useState6[1];
  var _useState7 = useState(undefined),
    _useState8 = _slicedToArray(_useState7, 2),
    feeAmount = _useState8[0],
    setFeeAmount = _useState8[1];
  var userSelectedPositionSet = useMemo(function () {
    return [].concat(_toConsumableArray(openPositions), _toConsumableArray(userHideClosedPositions ? [] : closedPositions));
  }, [closedPositions, openPositions, userHideClosedPositions]);
  var filteredPositions = useFilterPossiblyMaliciousPositions(userSelectedPositionSet);
  if (!isSupportedChain(chainId)) {
    return /*#__PURE__*/React__default.createElement(WrongNetworkCard, null);
  }
  var handleOpenAdd = function handleOpenAdd() {
    setIsOpenAdd(true);
  };
  var showConnectAWallet = Boolean(!account);
  return /*#__PURE__*/React__default.createElement(Trace, {
    page: InterfacePageName.POOL_PAGE,
    shouldLogImpression: true
  }, /*#__PURE__*/React__default.createElement(PageWrapper, null, isOpenAdd ? /*#__PURE__*/React__default.createElement(AddLiquidityWrapper, {
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
  }) : /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "lg",
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "lg",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React__default.createElement(TitleRow, {
    padding: "0"
  }, /*#__PURE__*/React__default.createElement(ThemedText.LargeHeader, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "lQfOr9",
    message: "Pools"
  })), /*#__PURE__*/React__default.createElement(ButtonRow, null, /*#__PURE__*/React__default.createElement(ResponsiveButtonPrimary, {
    "data-cy": "join-pool-button",
    id: "join-pool-button"
    // as={Link}
    // to="/add/ETH"
    ,
    onClick: handleOpenAdd
  }, "+ ", /*#__PURE__*/React__default.createElement(Trans, {
    id: "1k0YWs",
    message: "New position"
  })))), /*#__PURE__*/React__default.createElement(MainContentWrapper, null, positionsLoading ? /*#__PURE__*/React__default.createElement(PositionsLoadingPlaceholder, null) : filteredPositions && closedPositions && filteredPositions.length > 0 ? /*#__PURE__*/React__default.createElement(PositionList, {
    positions: filteredPositions,
    setUserHideClosedPositions: setUserHideClosedPositions,
    userHideClosedPositions: userHideClosedPositions
  }) : /*#__PURE__*/React__default.createElement(ErrorContainer, null, /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
    color: theme.neutral3,
    textAlign: "center"
  }, /*#__PURE__*/React__default.createElement(InboxIcon, {
    strokeWidth: 1,
    style: {
      marginTop: "2em"
    }
  }), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "YgSnQ0",
    message: "Your active V3 liquidity positions will appear here."
  }))), !showConnectAWallet && closedPositions.length > 0 && /*#__PURE__*/React__default.createElement(ButtonText, {
    style: {
      marginTop: ".5rem"
    },
    onClick: function onClick() {
      return setUserHideClosedPositions(!userHideClosedPositions);
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "GOctE4",
    message: "Show closed positions"
  })), showConnectAWallet && /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick],
    name: InterfaceEventName.CONNECT_WALLET_BUTTON_CLICKED,
    properties: {
      received_swap_quote: false
    },
    element: InterfaceElementName.CONNECT_WALLET_BUTTON
  }, /*#__PURE__*/React__default.createElement(ButtonPrimary, {
    style: {
      marginTop: "2em",
      marginBottom: "2em",
      padding: "8px 16px"
    },
    onClick: toggleWalletDrawer
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "GdzYJ9",
    message: "Connect a wallet"
  }))))), /*#__PURE__*/React__default.createElement(HideSmall, null, /*#__PURE__*/React__default.createElement(CTACards, null))))), /*#__PURE__*/React__default.createElement(SwitchLocaleLink, null));
}

export { Pool as default };
