'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var index = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var apple_logo = require('../../../assets/svg/apple_logo.cjs');
var base_background_icon = require('../../../assets/svg/base_background_icon.cjs');
var useScreenSize = require('../../../hooks/useScreenSize.cjs');
var hooks = require('../../../state/user/hooks.cjs');
require('../../../theme/components/index.cjs');
var openDownloadApp = require('../../../utils/openDownloadApp.cjs');
var userAgent = require('../../../utils/userAgent.cjs');
var styled = require('./styled.cjs');
var text = require('../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function BaseWalletBanner() {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _useHideBaseWalletBan = hooks.useHideBaseWalletBanner(),
    _useHideBaseWalletBan2 = _slicedToArray__default["default"](_useHideBaseWalletBan, 2),
    hideBaseWalletBanner = _useHideBaseWalletBan2[0],
    toggleHideBaseWalletBanner = _useHideBaseWalletBan2[1];
  // const location = useLocation();
  // const isLandingScreen =
  //   location.search === "?intro=true" || location.pathname === "/";
  var isLandingScreen = false;
  var shouldDisplay = Boolean(!hideBaseWalletBanner && !isLandingScreen && chainId === sdkCore.ChainId.BASE);
  var screenSize = useScreenSize.useScreenSize();
  if (userAgent.isMobileSafari) return null;
  return /*#__PURE__*/React__default["default"].createElement(styled.PopupContainer, {
    show: shouldDisplay
  }, /*#__PURE__*/React__default["default"].createElement(styled.StyledXButton, {
    "data-testid": "uniswap-wallet-banner",
    size: 20,
    onClick: function onClick(e) {
      // prevent click from bubbling to UI on the page underneath, i.e. clicking a token row
      e.preventDefault();
      e.stopPropagation();
      toggleHideBaseWalletBanner();
    }
  }), /*#__PURE__*/React__default["default"].createElement(styled.BaseBackgroundImage, {
    src: base_background_icon,
    alt: "transparent base background logo"
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineMedium, {
    fontSize: "24px",
    lineHeight: "28px",
    color: "white",
    maxWidth: "224px"
  }, /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "+XqHT+",
    message: "Swap on <0><1/></0> BASE in the Uniswap wallet",
    components: {
      "0": /*#__PURE__*/React__default["default"].createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 20 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }),
      "1": /*#__PURE__*/React__default["default"].createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M19.5689 10C19.5689 15.4038 15.1806 19.7845 9.76737 19.7845C4.63163 19.7845 0.418433 15.8414 0 10.8225H12.9554V9.17755H0C0.418433 4.15863 4.63163 0.215576 9.76737 0.215576C15.1806 0.215576 19.5689 4.59621 19.5689 10Z",
        fill: "white"
      })
    }
  })), /*#__PURE__*/React__default["default"].createElement(styled.ButtonRow, null, userAgent.isIOS ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(styled.BannerButton, {
    backgroundColor: "white",
    onClick: function onClick() {
      return openDownloadApp.openDownloadApp({
        element: analyticsEvents.InterfaceElementName.UNISWAP_WALLET_BANNER_DOWNLOAD_BUTTON,
        appStoreParams: "pt=123625782&ct=base-app-banner&mt=8"
      });
    }
  }, /*#__PURE__*/React__default["default"].createElement(apple_logo.ReactComponent, {
    width: 14,
    height: 14
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelSmall, {
    color: "black",
    marginLeft: "5px"
  }, !screenSize["xs"] ? /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "mzI/c+",
    message: "Download"
  }) : /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "n4vt3Q",
    message: "Download app"
  }))), /*#__PURE__*/React__default["default"].createElement(styled.BannerButton, {
    backgroundColor: "black",
    onClick: function onClick() {
      return openDownloadApp.openWalletMicrosite();
    }
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelSmall, {
    color: "white"
  }, /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "zwWKhA",
    message: "Learn more"
  })))) : /*#__PURE__*/React__default["default"].createElement(styled.BannerButton, {
    backgroundColor: "white",
    width: "125px",
    onClick: function onClick() {
      return openDownloadApp.openWalletMicrosite();
    }
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelSmall, {
    color: "black"
  }, /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "zwWKhA",
    message: "Learn more"
  })))));
}

module.exports = BaseWalletBanner;
