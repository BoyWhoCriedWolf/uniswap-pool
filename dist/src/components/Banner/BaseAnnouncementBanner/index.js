import React__default from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { InterfaceElementName } from '@uniswap/analytics-events';
import { ChainId } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { ReactComponent as SvgAppleLogo } from '../../../assets/svg/apple_logo.svg.js';
import baseLogoUrl from '../../../assets/svg/base_background_icon.svg.js';
import { useScreenSize } from '../../../hooks/useScreenSize.js';
import { useHideBaseWalletBanner } from '../../../state/user/hooks.js';
import '../../../theme/components/index.js';
import { openDownloadApp, openWalletMicrosite } from '../../../utils/openDownloadApp.js';
import { isMobileSafari, isIOS } from '../../../utils/userAgent.js';
import { PopupContainer, StyledXButton, BaseBackgroundImage, ButtonRow, BannerButton } from './styled.js';
import { ThemedText } from '../../../theme/components/text.js';

function BaseWalletBanner() {
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _useHideBaseWalletBan = useHideBaseWalletBanner(),
    _useHideBaseWalletBan2 = _slicedToArray(_useHideBaseWalletBan, 2),
    hideBaseWalletBanner = _useHideBaseWalletBan2[0],
    toggleHideBaseWalletBanner = _useHideBaseWalletBan2[1];
  // const location = useLocation();
  // const isLandingScreen =
  //   location.search === "?intro=true" || location.pathname === "/";
  var isLandingScreen = false;
  var shouldDisplay = Boolean(!hideBaseWalletBanner && !isLandingScreen && chainId === ChainId.BASE);
  var screenSize = useScreenSize();
  if (isMobileSafari) return null;
  return /*#__PURE__*/React__default.createElement(PopupContainer, {
    show: shouldDisplay
  }, /*#__PURE__*/React__default.createElement(StyledXButton, {
    "data-testid": "uniswap-wallet-banner",
    size: 20,
    onClick: function onClick(e) {
      // prevent click from bubbling to UI on the page underneath, i.e. clicking a token row
      e.preventDefault();
      e.stopPropagation();
      toggleHideBaseWalletBanner();
    }
  }), /*#__PURE__*/React__default.createElement(BaseBackgroundImage, {
    src: baseLogoUrl,
    alt: "transparent base background logo"
  }), /*#__PURE__*/React__default.createElement(ThemedText.HeadlineMedium, {
    fontSize: "24px",
    lineHeight: "28px",
    color: "white",
    maxWidth: "224px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "+XqHT+",
    message: "Swap on <0><1/></0> BASE in the Uniswap wallet",
    components: {
      "0": /*#__PURE__*/React__default.createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 20 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }),
      "1": /*#__PURE__*/React__default.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M19.5689 10C19.5689 15.4038 15.1806 19.7845 9.76737 19.7845C4.63163 19.7845 0.418433 15.8414 0 10.8225H12.9554V9.17755H0C0.418433 4.15863 4.63163 0.215576 9.76737 0.215576C15.1806 0.215576 19.5689 4.59621 19.5689 10Z",
        fill: "white"
      })
    }
  })), /*#__PURE__*/React__default.createElement(ButtonRow, null, isIOS ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(BannerButton, {
    backgroundColor: "white",
    onClick: function onClick() {
      return openDownloadApp({
        element: InterfaceElementName.UNISWAP_WALLET_BANNER_DOWNLOAD_BUTTON,
        appStoreParams: "pt=123625782&ct=base-app-banner&mt=8"
      });
    }
  }, /*#__PURE__*/React__default.createElement(SvgAppleLogo, {
    width: 14,
    height: 14
  }), /*#__PURE__*/React__default.createElement(ThemedText.LabelSmall, {
    color: "black",
    marginLeft: "5px"
  }, !screenSize["xs"] ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "mzI/c+",
    message: "Download"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "n4vt3Q",
    message: "Download app"
  }))), /*#__PURE__*/React__default.createElement(BannerButton, {
    backgroundColor: "black",
    onClick: function onClick() {
      return openWalletMicrosite();
    }
  }, /*#__PURE__*/React__default.createElement(ThemedText.LabelSmall, {
    color: "white"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "zwWKhA",
    message: "Learn more"
  })))) : /*#__PURE__*/React__default.createElement(BannerButton, {
    backgroundColor: "white",
    width: "125px",
    onClick: function onClick() {
      return openWalletMicrosite();
    }
  }, /*#__PURE__*/React__default.createElement(ThemedText.LabelSmall, {
    color: "black"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "zwWKhA",
    message: "Learn more"
  })))));
}

export { BaseWalletBanner as default };
