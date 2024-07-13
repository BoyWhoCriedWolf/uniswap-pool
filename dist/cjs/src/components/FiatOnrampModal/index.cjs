'use strict';

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var index$1 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var core = require('@web3-react/core');
var hooks = require('../../state/application/hooks.cjs');
var reducer = require('../../state/application/reducer.cjs');
var styled = require('styled-components');
var index$2 = require('../../theme/components/index.cjs');
var ThemeToggle = require('../../theme/components/ThemeToggle.cjs');
var blueLoader = require('../../assets/images/blue-loader.cjs');
var index = require('../Modal/index.cjs');
var constants = require('./constants.cjs');
var utils = require('./utils.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var MOONPAY_DARK_BACKGROUND = "#1c1c1e";
var Wrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  // #1c1c1e is the background color for the darkmode moonpay iframe as of 2/16/2023\n  background-color: ", ";\n  border-radius: 20px;\n  box-shadow: ", ";\n  display: flex;\n  flex-flow: column nowrap;\n  margin: 0;\n  flex: 1 1;\n  min-width: 375px;\n  position: relative;\n  width: 100%;\n"])), function (_ref) {
  var isDarkMode = _ref.isDarkMode,
    theme = _ref.theme;
  return isDarkMode ? MOONPAY_DARK_BACKGROUND : theme.white;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.deprecated_deepShadow;
});
var ErrorText = styled__default["default"](text.ThemedText.BodyPrimary)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  margin: auto !important;\n  text-align: center;\n  width: 90%;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.critical;
});
var StyledIframe = styled__default["default"].iframe(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  // #1c1c1e is the background color for the darkmode moonpay iframe as of 2/16/2023\n  background-color: ", ";\n  border-radius: 12px;\n  bottom: 0;\n  left: 0;\n  height: calc(100% - 16px);\n  margin: 8px;\n  padding: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: calc(100% - 16px);\n"])), function (_ref4) {
  var isDarkMode = _ref4.isDarkMode,
    theme = _ref4.theme;
  return isDarkMode ? MOONPAY_DARK_BACKGROUND : theme.white;
});
var StyledSpinner = styled__default["default"](index$2.CustomLightSpinner)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n"])));
function FiatOnrampModal() {
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account;
  var theme = styled.useTheme();
  var isDarkMode = ThemeToggle.useIsDarkMode();
  var closeModal = hooks.useCloseModal();
  var fiatOnrampModalOpen = hooks.useModalIsOpen(reducer.ApplicationModal.FIAT_ONRAMP);
  var _parsePathParts = utils.parsePathParts(location.pathname),
    network = _parsePathParts.network,
    tokenAddress = _parsePathParts.tokenAddress;
  var _useState = React.useState(null),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    signedIframeUrl = _useState2[0],
    setSignedIframeUrl = _useState2[1];
  var _useState3 = React.useState(null),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    error = _useState4[0],
    setError = _useState4[1];
  var _useState5 = React.useState(false),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];

  // const swapUrl = useHref("/swap");
  var swapUrl = "/swap";
  var fetchSignedIframeUrl = React.useCallback( /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
    var signedIframeUrlFetchEndpoint, res, _yield$res$json, url;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (account) {
            _context.next = 3;
            break;
          }
          setError("Please connect an account before making a purchase.");
          return _context.abrupt("return");
        case 3:
          setLoading(true);
          setError(null);
          _context.prev = 5;
          // const signedIframeUrlFetchEndpoint = process.env
          //   .REACT_APP_MOONPAY_LINK as string;
          signedIframeUrlFetchEndpoint = "https://us-central1-uniswap-mobile.cloudfunctions.net/signMoonpayLinkV2?platform=web&env=staging";
          _context.next = 9;
          return fetch(signedIframeUrlFetchEndpoint, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
              theme: isDarkMode ? "dark" : "light",
              colorCode: theme.accent1,
              defaultCurrencyCode: utils.getDefaultCurrencyCode(tokenAddress, network),
              redirectUrl: swapUrl,
              walletAddresses: JSON.stringify(constants.MOONPAY_SUPPORTED_CURRENCY_CODES.reduce(function (acc, currencyCode) {
                return _objectSpread(_objectSpread({}, acc), {}, _defineProperty__default["default"]({}, currencyCode, account));
              }, {}))
            })
          });
        case 9:
          res = _context.sent;
          _context.next = 12;
          return res.json();
        case 12:
          _yield$res$json = _context.sent;
          url = _yield$res$json.url;
          setSignedIframeUrl(url);
          _context.next = 21;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](5);
          console.log("there was an error fetching the link", _context.t0);
          setError(_context.t0.toString());
        case 21:
          _context.prev = 21;
          setLoading(false);
          return _context.finish(21);
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 17, 21, 24]]);
  })), [account, isDarkMode, network, swapUrl, theme.accent1, tokenAddress]);
  React.useEffect(function () {
    fetchSignedIframeUrl();
  }, [fetchSignedIframeUrl]);
  return /*#__PURE__*/React__default["default"].createElement(index["default"], {
    isOpen: fiatOnrampModalOpen,
    onDismiss: function onDismiss() {
      return closeModal();
    },
    height: 80 /* vh */
  }, /*#__PURE__*/React__default["default"].createElement(Wrapper, {
    "data-testid": "fiat-onramp-modal",
    isDarkMode: isDarkMode
  }, error ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.MediumHeader, null, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "hn5VGM",
    message: "MoonPay fiat on-ramp iframe"
  })), /*#__PURE__*/React__default["default"].createElement(ErrorText, null, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "ywDBfs",
    message: "Something went wrong!"
  }), /*#__PURE__*/React__default["default"].createElement("br", null), error)) : loading ? /*#__PURE__*/React__default["default"].createElement(StyledSpinner, {
    src: blueLoader,
    alt: "loading spinner",
    size: "90px"
  }) : /*#__PURE__*/React__default["default"].createElement(StyledIframe, {
    src: signedIframeUrl !== null && signedIframeUrl !== void 0 ? signedIframeUrl : "",
    frameBorder: "0",
    title: "fiat-onramp-iframe",
    isDarkMode: isDarkMode
  })));
}

module.exports = FiatOnrampModal;
