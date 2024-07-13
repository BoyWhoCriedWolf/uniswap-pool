'use strict';

var React = require('react');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var units = require('@ethersproject/units');
var analyticsEvents = require('@uniswap/analytics-events');
var index$2 = require('../../../analytics/index.cjs');
var clsx = require('clsx');
var index = require('../../../components/Common/index.cjs');
var Box = require('../Box.cjs');
var Portal = require('../common/Portal.cjs');
var Flex = require('../Flex.cjs');
var icons = require('../icons.cjs');
var Overlay = require('../modals/Overlay.cjs');
var sprinkles_css = require('../../css/sprinkles.css.cjs');
require('../../hooks/useBag.cjs');
require('../../hooks/useCollectionFilters.cjs');
require('../../hooks/useFiltersExpanded.cjs');
require('../../hooks/useIsCollectionLoading.cjs');
var useIsMobile = require('../../hooks/useIsMobile.cjs');
require('../../../hooks/useScreenSize.cjs');
require('../../hooks/useNFTList.cjs');
require('../../hooks/useProfilePageState.cjs');
require('../../hooks/useSellAsset.cjs');
var useSendTransaction = require('../../hooks/useSendTransaction.cjs');
var useTransactionResponse = require('../../hooks/useTransactionResponse.cjs');
var useUsdPrice = require('../../hooks/useUsdPrice.cjs');
require('@web3-react/core');
require('../../../lib/hooks/useCurrencyBalance.cjs');
require('../../hooks/useWalletCollections.cjs');
var index$1 = require('../../types/checkout/index.cjs');
var asset = require('../../utils/asset.cjs');
var currency = require('../../utils/currency.cjs');
var formatEventProperties = require('../../utils/formatEventProperties.cjs');
require('video-extensions');
require('../../../locales/en-US.cjs');
require('numbro');
require('../../utils/pooledAssets.cjs');
require('../../utils/time.cjs');
var transactionResponse = require('../../utils/transactionResponse.cjs');
require('@ethersproject/bignumber');
var styled = require('styled-components');
var getExplorerLink = require('../../../utils/getExplorerLink.cjs');
var TransactionCompleteModal_css = require('./TransactionCompleteModal.css.cjs');
var analytics = require('@uniswap/analytics');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var clsx__default = /*#__PURE__*/_interopDefaultLegacy(clsx);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var TWITTER_WIDTH = 560;
var TWITTER_HEIGHT = 480;
var UploadLink = styled__default["default"].a(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  right: 32px;\n  top: 32px;\n  color: ", ";\n  cursor: pointer;\n\n  ", "\n\n  @media only screen and (max-width: ", ") {\n    right: 12px;\n    top: 28px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
}, index.OpacityHoverState, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var TxCompleteModal = function TxCompleteModal() {
  var ethUsdPrice = useUsdPrice.useNativeUsdPrice();
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    showUnavailable = _useState2[0],
    setShowUnavailable = _useState2[1];
  var txHash = useSendTransaction.useSendTransaction(function (state) {
    return state.txHash;
  });
  var purchasedWithErc20 = useSendTransaction.useSendTransaction(function (state) {
    return state.purchasedWithErc20;
  });
  var setTxState = useSendTransaction.useSendTransaction(function (state) {
    return state.setState;
  });
  var txState = useSendTransaction.useSendTransaction(function (state) {
    return state.state;
  });
  var transactionStateRef = React.useRef(txState);
  var transactionResponse$1 = useTransactionResponse.useTransactionResponse(function (state) {
    return state.transactionResponse;
  });
  var setTransactionResponse = useTransactionResponse.useTransactionResponse(function (state) {
    return state.setTransactionResponse;
  });
  var isMobile = useIsMobile.useIsMobile();
  var txHashUrl = getExplorerLink.getExplorerLink(1, txHash, getExplorerLink.ExplorerDataType.TRANSACTION);
  var shouldShowModal = (txState === index$1.TxStateType.Success || txState === index$1.TxStateType.Failed) && txState;
  var trace = analytics.useTrace({
    modal: analyticsEvents.InterfaceModalName.NFT_TX_COMPLETE
  });
  var _useMemo = React.useMemo(function () {
      return transactionResponse.parseTransactionResponse(transactionResponse$1, ethUsdPrice);
    }, [transactionResponse$1, ethUsdPrice]),
    nftsPurchased = _useMemo.nftsPurchased,
    nftsNotPurchased = _useMemo.nftsNotPurchased,
    showPurchasedModal = _useMemo.showPurchasedModal,
    showRefundModal = _useMemo.showRefundModal,
    totalPurchaseValue = _useMemo.totalPurchaseValue,
    totalRefundValue = _useMemo.totalRefundValue,
    totalUSDRefund = _useMemo.totalUSDRefund,
    txFeeFiat = _useMemo.txFeeFiat;
  var toggleShowUnavailable = function toggleShowUnavailable() {
    setShowUnavailable(!showUnavailable);
  };
  function closeTxCompleteScreen() {
    setTransactionResponse({});
    setTxState(index$1.TxStateType.New);
  }
  React.useEffect(function () {
    useSendTransaction.useSendTransaction.subscribe(function (state) {
      return transactionStateRef.current = state.state;
    });
  }, []);
  var shareTweet = function shareTweet() {
    window.open(asset.generateTweetForPurchase(nftsPurchased, txHashUrl), "newwindow", "left=".concat((window.screen.width - TWITTER_WIDTH) / 2, ", top=").concat((window.screen.height - TWITTER_HEIGHT) / 2, ", width=").concat(TWITTER_WIDTH, ", height=").concat(TWITTER_HEIGHT));
  };
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, shouldShowModal && /*#__PURE__*/React__default["default"].createElement(Portal.Portal, null, /*#__PURE__*/React__default["default"].createElement(Overlay.Overlay, {
    onClick: closeTxCompleteScreen
  }), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: TransactionCompleteModal_css.modalContainer,
    onClick: closeTxCompleteScreen
  }, showPurchasedModal && /*#__PURE__*/React__default["default"].createElement(index$2.Trace, {
    name: analyticsEvents.NFTEventName.NFT_BUY_BAG_SUCCEEDED,
    properties: _objectSpread(_objectSpread({
      buy_quantity: nftsPurchased.length,
      usd_value: parseFloat(units.formatEther(totalPurchaseValue)) * ethUsdPrice,
      transaction_hash: txHash,
      using_erc20: purchasedWithErc20
    }, formatEventProperties.formatAssetEventProperties(nftsPurchased)), trace),
    shouldLogImpression: true
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: TransactionCompleteModal_css.successModal,
    onClick: Overlay.stopPropagation
  }, /*#__PURE__*/React__default["default"].createElement(icons.UniIcon, {
    color: sprinkles_css.vars.color.pink400,
    width: "36",
    height: "36",
    className: TransactionCompleteModal_css.uniLogo
  }), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    display: "flex",
    flexWrap: "wrap",
    width: "full",
    height: "min"
  }, /*#__PURE__*/React__default["default"].createElement("h1", {
    className: TransactionCompleteModal_css.title
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "6Mjzfq",
    message: "Complete!"
  })), /*#__PURE__*/React__default["default"].createElement("p", {
    className: TransactionCompleteModal_css.subHeading
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "utdv8e",
    message: "Uniswap has granted your wish!"
  }))), /*#__PURE__*/React__default["default"].createElement(UploadLink, {
    onClick: shareTweet,
    target: "_blank"
  }, /*#__PURE__*/React__default["default"].createElement(icons.TwitterIcon, {
    width: 32,
    height: 32,
    color: sprinkles_css.themeVars.colors.neutral2
  })), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: TransactionCompleteModal_css.successAssetsContainer,
    style: {
      maxHeight: nftsPurchased.length > 32 ? isMobile ? "172px" : "292px" : "min-content"
    }
  }, _toConsumableArray__default["default"](nftsPurchased).map(function (nft, index) {
    return /*#__PURE__*/React__default["default"].createElement("img", {
      className: clsx__default["default"](TransactionCompleteModal_css.successAssetImage, nftsPurchased.length > 1 && TransactionCompleteModal_css.successAssetImageGrid),
      style: {
        maxHeight: "".concat(transactionResponse.getSuccessfulImageSize(nftsPurchased.length, isMobile), "px"),
        maxWidth: "".concat(transactionResponse.getSuccessfulImageSize(nftsPurchased.length, isMobile), "px")
      },
      src: nft.imageUrl,
      alt: nft.name,
      key: index
    });
  })), nftsPurchased.length > 32 && /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: TransactionCompleteModal_css.overflowFade
  }), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    display: "flex",
    width: "full",
    height: "min",
    flexDirection: "row",
    marginTop: {
      sm: "20",
      md: "20"
    },
    flexWrap: {
      sm: "wrap",
      md: "nowrap"
    },
    alignItems: "center",
    paddingRight: "40",
    paddingLeft: "40",
    className: TransactionCompleteModal_css.bottomBar,
    justifyContent: "space-between"
  }, /*#__PURE__*/React__default["default"].createElement(Flex.Row, null, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    marginRight: "16"
  }, nftsPurchased.length, " NFT", nftsPurchased.length === 1 ? "" : "s"), /*#__PURE__*/React__default["default"].createElement(Box.Box, null, currency.formatEthPrice(totalPurchaseValue.toString()), " ETH")), /*#__PURE__*/React__default["default"].createElement("a", {
    href: txHashUrl,
    target: "_blank",
    rel: "noreferrer",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    color: "neutral2",
    fontWeight: "book"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "rd4eHq",
    message: "View on Etherscan"
  })))))), showRefundModal && ( /* Showing both purchases & refunds */
  showPurchasedModal ? /*#__PURE__*/React__default["default"].createElement(index$2.Trace, {
    name: analyticsEvents.NFTEventName.NFT_BUY_BAG_REFUNDED,
    properties: _objectSpread({
      buy_quantity: nftsPurchased.length,
      fail_quantity: nftsNotPurchased.length,
      refund_amount_usd: totalUSDRefund,
      transaction_hash: txHash
    }, trace),
    shouldLogImpression: true
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: TransactionCompleteModal_css.mixedRefundModal,
    onClick: Overlay.stopPropagation
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    display: "inline-flex",
    flexWrap: "wrap",
    width: {
      sm: "full",
      md: "half"
    },
    paddingRight: {
      sm: "0",
      md: "32"
    }
  }, /*#__PURE__*/React__default["default"].createElement(icons.LightningBoltIcon, {
    color: "pink"
  }), /*#__PURE__*/React__default["default"].createElement("p", {
    className: TransactionCompleteModal_css.subtitle
  }, "Instant Refund"), /*#__PURE__*/React__default["default"].createElement("p", {
    className: TransactionCompleteModal_css.interStd
  }, "Uniswap returned", " ", /*#__PURE__*/React__default["default"].createElement("span", {
    style: {
      fontWeight: "535"
    }
  }, currency.formatEthPrice(totalRefundValue.toString()), " ETH"), " ", "back to your wallet for unavailable items."), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    display: "flex",
    flexWrap: "wrap",
    bottom: "24",
    width: "full",
    alignSelf: "flex-end",
    position: {
      sm: "absolute",
      md: "static"
    }
  }, /*#__PURE__*/React__default["default"].createElement("p", {
    className: TransactionCompleteModal_css.totalEthCost,
    style: {
      marginBottom: "2px"
    }
  }, currency.formatEthPrice(totalRefundValue.toString()), " ETH"), /*#__PURE__*/React__default["default"].createElement("p", {
    className: TransactionCompleteModal_css.totalUsdRefund
  }, currency.formatUSDPriceWithCommas(totalUSDRefund)), /*#__PURE__*/React__default["default"].createElement("p", {
    className: TransactionCompleteModal_css.totalEthCost,
    style: {
      width: "100%"
    }
  }, "for ", nftsNotPurchased.length, " unavailable item", nftsNotPurchased.length === 1 ? "" : "s", "."), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    position: {
      sm: "absolute",
      md: "relative"
    },
    right: {
      sm: "0",
      md: "auto"
    },
    bottom: {
      sm: "0",
      md: "auto"
    },
    justifyContent: {
      sm: "flex-end",
      md: "flex-start"
    },
    textAlign: {
      sm: "right",
      md: "left"
    },
    flexShrink: "0",
    marginRight: {
      sm: "40",
      md: "24"
    },
    width: {
      sm: "half",
      md: "auto"
    }
  }, /*#__PURE__*/React__default["default"].createElement("a", {
    href: txHashUrl,
    target: "_blank",
    rel: "noreferrer",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    fontWeight: "book",
    marginTop: "16",
    color: "neutral2",
    className: TransactionCompleteModal_css.totalEthCost
  }, "View on Etherscan"))))), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: TransactionCompleteModal_css.refundAssetsContainer
  }, nftsNotPurchased.map(function (nft, index) {
    return /*#__PURE__*/React__default["default"].createElement(Box.Box, {
      display: "flex",
      flexWrap: "wrap",
      height: "min",
      width: "52",
      key: index
    }, /*#__PURE__*/React__default["default"].createElement("img", {
      className: TransactionCompleteModal_css.refundAssetImage,
      src: nft.imageUrl,
      alt: nft.name,
      key: index
    }));
  })), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: TransactionCompleteModal_css.refundOverflowFade
  }))) :
  /*#__PURE__*/
  // Only showing when all assets are unavailable
  React__default["default"].createElement(index$2.Trace, {
    name: analyticsEvents.NFTEventName.NFT_BUY_BAG_REFUNDED,
    properties: _objectSpread({
      buy_quantity: 0,
      fail_quantity: nftsNotPurchased.length,
      refund_amount_usd: totalUSDRefund
    }, trace),
    shouldLogImpression: true
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: TransactionCompleteModal_css.fullRefundModal,
    onClick: Overlay.stopPropagation
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex"
  }, txState === index$1.TxStateType.Success ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(icons.LightningBoltIcon, null), /*#__PURE__*/React__default["default"].createElement("h1", {
    className: TransactionCompleteModal_css.title
  }, "Instant Refund")) : /*#__PURE__*/React__default["default"].createElement("h1", {
    className: TransactionCompleteModal_css.title
  }, "Failed Transaction")), /*#__PURE__*/React__default["default"].createElement("p", {
    className: TransactionCompleteModal_css.bodySmall
  }, txState === index$1.TxStateType.Success && "Selected item".concat(nftsPurchased.length === 1 ? " is" : "s are", " no longer available. Uniswap instantly refunded you for this incomplete transaction. "), currency.formatUsdPrice(txFeeFiat), " was used for gas in attempt to complete this transaction. For support, please visit our", " ", /*#__PURE__*/React__default["default"].createElement("a", {
    href: "https://discord.gg/FCfyBSbCU5"
  }, "Discord")), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: TransactionCompleteModal_css.allUnavailableAssets
  }, nftsNotPurchased.length >= 3 && /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: TransactionCompleteModal_css.toggleUnavailable,
    onClick: function onClick() {
      return toggleShowUnavailable();
    }
  }, !showUnavailable && /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    paddingLeft: "20",
    paddingTop: "8",
    paddingBottom: "8"
  }, nftsNotPurchased.slice(0, 3).map(function (asset, index) {
    return /*#__PURE__*/React__default["default"].createElement("img", {
      style: {
        zIndex: 2 - index
      },
      className: TransactionCompleteModal_css.unavailableAssetPreview,
      src: asset.imageUrl,
      alt: asset.name,
      key: index
    });
  })), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    color: showUnavailable ? "neutral1" : "neutral2",
    className: TransactionCompleteModal_css.unavailableText
  }, "Unavailable", /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: TransactionCompleteModal_css.unavailableItems
  }, nftsNotPurchased.length, " item", nftsNotPurchased.length === 1 ? "" : "s")), /*#__PURE__*/React__default["default"].createElement(icons.ChevronUpIcon, {
    className: "".concat(!showUnavailable && TransactionCompleteModal_css.chevronDown, " ").concat(TransactionCompleteModal_css.chevron)
  })), (showUnavailable || nftsNotPurchased.length < 3) && nftsNotPurchased.map(function (asset, index) {
    return /*#__PURE__*/React__default["default"].createElement(Box.Box, {
      backgroundColor: "surface1",
      display: "flex",
      padding: "4",
      marginBottom: "1",
      borderRadius: "8",
      key: index
    }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
      className: TransactionCompleteModal_css.assetContainer
    }, /*#__PURE__*/React__default["default"].createElement("img", {
      className: TransactionCompleteModal_css.fullRefundImage,
      src: asset.imageUrl,
      alt: asset.name
    })), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
      flexWrap: "wrap",
      marginTop: "4"
    }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
      marginLeft: "4",
      width: "full",
      display: "flex"
    }, /*#__PURE__*/React__default["default"].createElement("p", {
      className: TransactionCompleteModal_css.totalEthCost,
      style: {
        marginBottom: "2px"
      }
    }, currency.formatEthPrice(asset.updatedPriceInfo ? asset.updatedPriceInfo.ETHPrice : asset.priceInfo.ETHPrice), " ", "ETH")), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
      color: "neutral1",
      className: TransactionCompleteModal_css.totalUsdRefund
    }, txState === index$1.TxStateType.Success ? "Refunded" : asset.name)));
  })), showUnavailable && /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: TransactionCompleteModal_css.fullRefundOverflowFade
  }), /*#__PURE__*/React__default["default"].createElement("p", {
    className: TransactionCompleteModal_css.totalEthCost,
    style: {
      marginBottom: "2px"
    }
  }, currency.formatEthPrice(totalRefundValue.toString()), " ETH"), /*#__PURE__*/React__default["default"].createElement("p", {
    className: TransactionCompleteModal_css.totalUsdRefund
  }, currency.formatUSDPriceWithCommas(totalUSDRefund)), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: TransactionCompleteModal_css.walletAddress,
    marginLeft: "auto",
    marginRight: "0"
  }, /*#__PURE__*/React__default["default"].createElement("a", {
    href: txHashUrl,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: TransactionCompleteModal_css.addressHash
  }, "View on Etherscan"))), /*#__PURE__*/React__default["default"].createElement("p", {
    className: TransactionCompleteModal_css.totalEthCost
  }, "for ", nftsNotPurchased.length, " unavailable item", nftsNotPurchased.length === 1 ? "" : "s", "."), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "button",
    border: "none",
    backgroundColor: "accent1",
    cursor: "pointer",
    className: TransactionCompleteModal_css.returnButton,
    type: "button",
    onClick: function onClick() {
      return closeTxCompleteScreen();
    }
  }, /*#__PURE__*/React__default["default"].createElement(icons.BackArrowIcon, {
    className: TransactionCompleteModal_css.fullRefundBackArrow
  }), "Return to Marketplace")))))));
};
var TransactionCompleteModal = TxCompleteModal;

module.exports = TransactionCompleteModal;
