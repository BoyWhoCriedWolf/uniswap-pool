'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var core = require('@web3-react/core');
var index = require('../Row/index.cjs');
var chainInfo = require('../../constants/chainInfo.cjs');
var useCurrentBlockTimestamp = require('../../hooks/useCurrentBlockTimestamp.cjs');
var useMachineTime = require('../../hooks/useMachineTime.cjs');
var useBlockNumber = require('../../lib/hooks/useBlockNumber.cjs');
var ms = require('ms');
var styled = require('styled-components');
var index$1 = require('../../theme/components/index.cjs');
var getExplorerLink = require('../../utils/getExplorerLink.cjs');
var index$2 = require('../Tooltip/index.cjs');
var ChainConnectivityWarning = require('./ChainConnectivityWarning.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var StyledPolling = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  bottom: 0;\n  color: ", ";\n  display: none;\n  padding: 1rem;\n  position: fixed;\n  right: 0;\n  transition: 250ms ease color;\n\n  a {\n    color: unset;\n  }\n  a:hover {\n    color: unset;\n    text-decoration: none;\n  }\n\n  @media screen and (min-width: ", "px) {\n    display: flex;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral3;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.breakpoint.md;
});
var StyledPollingBlockNumber = styled__default["default"](text.ThemedText.DeprecatedSmall)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  transition: opacity 0.25s ease;\n  opacity: ", ";\n  :hover {\n    opacity: 1;\n  }\n\n  a {\n    color: unset;\n  }\n  a:hover {\n    text-decoration: none;\n    color: unset;\n  }\n"])), function (_ref3) {
  var theme = _ref3.theme,
    warning = _ref3.warning;
  return warning ? theme.deprecated_yellow3 : theme.success;
}, function (_ref4) {
  var breathe = _ref4.breathe,
    hovering = _ref4.hovering;
  return hovering ? 0.7 : breathe ? 1 : 0.5;
});
var StyledPollingDot = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  width: 8px;\n  height: 8px;\n  min-height: 8px;\n  min-width: 8px;\n  border-radius: 50%;\n  position: relative;\n  background-color: ", ";\n  transition: 250ms ease background-color;\n"])), function (_ref5) {
  var theme = _ref5.theme,
    warning = _ref5.warning;
  return warning ? theme.deprecated_yellow3 : theme.success;
});
var rotate360 = styled.keyframes(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var Spinner = styled__default["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  animation: ", " 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;\n  transform: translateZ(0);\n\n  border-top: 1px solid transparent;\n  border-right: 1px solid transparent;\n  border-bottom: 1px solid transparent;\n  border-left: 2px solid\n    ", ";\n  background: transparent;\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  position: relative;\n  transition: 250ms ease border-color;\n\n  left: -3px;\n  top: -3px;\n"])), rotate360, function (_ref6) {
  var theme = _ref6.theme,
    warning = _ref6.warning;
  return warning ? theme.deprecated_yellow3 : theme.success;
});
var DEFAULT_MS_BEFORE_WARNING = ms__default["default"]("10m");
var NETWORK_HEALTH_CHECK_MS = ms__default["default"]("10s");
function Polling() {
  var _ref7, _getChainInfo;
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var blockNumber = useBlockNumber["default"]();
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    isMounting = _useState2[0],
    setIsMounting = _useState2[1];
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    isHover = _useState4[0],
    setIsHover = _useState4[1];
  var machineTime = useMachineTime(NETWORK_HEALTH_CHECK_MS);
  var blockTime = useCurrentBlockTimestamp();
  var waitMsBeforeWarning = (_ref7 = chainId ? (_getChainInfo = chainInfo.getChainInfo(chainId)) === null || _getChainInfo === void 0 ? void 0 : _getChainInfo.blockWaitMsBeforeWarning : DEFAULT_MS_BEFORE_WARNING) !== null && _ref7 !== void 0 ? _ref7 : DEFAULT_MS_BEFORE_WARNING;
  var warning = Boolean(!!blockTime && machineTime - blockTime.mul(1000).toNumber() > waitMsBeforeWarning);
  React.useEffect(function () {
    if (!blockNumber) {
      return;
    }
    setIsMounting(true);
    var mountingTimer = setTimeout(function () {
      return setIsMounting(false);
    }, 1000);

    // this will clear Timeout when component unmount like in willComponentUnmount
    return function () {
      clearTimeout(mountingTimer);
    };
  }, [blockNumber] //useEffect will run only one time
  //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
  );

  //TODO - chainlink gas oracle is really slow. Can we get a better data source?

  var blockExternalLinkHref = React.useMemo(function () {
    if (!chainId || !blockNumber) return "";
    return getExplorerLink.getExplorerLink(chainId, blockNumber.toString(), getExplorerLink.ExplorerDataType.BLOCK);
  }, [blockNumber, chainId]);
  return /*#__PURE__*/React__default["default"].createElement(index.RowFixed, null, /*#__PURE__*/React__default["default"].createElement(StyledPolling, {
    onMouseEnter: function onMouseEnter() {
      return setIsHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsHover(false);
    }
  }, /*#__PURE__*/React__default["default"].createElement(StyledPollingBlockNumber, {
    breathe: isMounting,
    hovering: isHover,
    warning: warning
  }, /*#__PURE__*/React__default["default"].createElement(index$1.ExternalLink, {
    href: blockExternalLinkHref
  }, /*#__PURE__*/React__default["default"].createElement(index$2.MouseoverTooltip, {
    text: /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
      id: "MCr7bN",
      message: "The most recent block number on this network. Prices update on every block."
    })
  }, blockNumber, "\u2002"))), /*#__PURE__*/React__default["default"].createElement(StyledPollingDot, {
    warning: warning
  }, isMounting && /*#__PURE__*/React__default["default"].createElement(Spinner, {
    warning: warning
  })), " "), warning && /*#__PURE__*/React__default["default"].createElement(ChainConnectivityWarning.ChainConnectivityWarning, null));
}

module.exports = Polling;
