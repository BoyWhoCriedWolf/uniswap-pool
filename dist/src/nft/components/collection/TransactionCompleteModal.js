import React__default, { useState, useRef, useMemo, useEffect } from 'react';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { formatEther } from '@ethersproject/units';
import { InterfaceModalName, NFTEventName } from '@uniswap/analytics-events';
import { Trace } from '../../../analytics/index.js';
import clsx from 'clsx';
import { OpacityHoverState } from '../../../components/Common/index.js';
import { Box } from '../Box.js';
import { Portal } from '../common/Portal.js';
import { Row } from '../Flex.js';
import { UniIcon, TwitterIcon, LightningBoltIcon, ChevronUpIcon, BackArrowIcon } from '../icons.js';
import { Overlay, stopPropagation } from '../modals/Overlay.js';
import { vars, themeVars } from '../../css/sprinkles.css.js';
import '../../hooks/useBag.js';
import '../../hooks/useCollectionFilters.js';
import '../../hooks/useFiltersExpanded.js';
import '../../hooks/useIsCollectionLoading.js';
import { useIsMobile } from '../../hooks/useIsMobile.js';
import '../../../hooks/useScreenSize.js';
import '../../hooks/useNFTList.js';
import '../../hooks/useProfilePageState.js';
import '../../hooks/useSellAsset.js';
import { useSendTransaction } from '../../hooks/useSendTransaction.js';
import { useTransactionResponse } from '../../hooks/useTransactionResponse.js';
import { useNativeUsdPrice } from '../../hooks/useUsdPrice.js';
import '@web3-react/core';
import '../../../lib/hooks/useCurrencyBalance.js';
import '../../hooks/useWalletCollections.js';
import { TxStateType } from '../../types/checkout/index.js';
import { generateTweetForPurchase } from '../../utils/asset.js';
import { formatEthPrice, formatUSDPriceWithCommas, formatUsdPrice } from '../../utils/currency.js';
import { formatAssetEventProperties } from '../../utils/formatEventProperties.js';
import 'video-extensions';
import '../../../locales/en-US.js';
import 'numbro';
import '../../utils/pooledAssets.js';
import '../../utils/time.js';
import { parseTransactionResponse, getSuccessfulImageSize } from '../../utils/transactionResponse.js';
import '@ethersproject/bignumber';
import styled from 'styled-components';
import { getExplorerLink, ExplorerDataType } from '../../../utils/getExplorerLink.js';
import { modalContainer, successModal, uniLogo, title, subHeading, successAssetsContainer, successAssetImage, successAssetImageGrid, overflowFade, bottomBar, mixedRefundModal, subtitle, interStd, totalEthCost, totalUsdRefund, refundAssetsContainer, refundAssetImage, refundOverflowFade, fullRefundModal, bodySmall, allUnavailableAssets, toggleUnavailable, unavailableAssetPreview, unavailableText, unavailableItems, chevronDown, chevron, assetContainer, fullRefundImage, fullRefundOverflowFade, walletAddress, addressHash, returnButton, fullRefundBackArrow } from './TransactionCompleteModal.css.js';
import { useTrace } from '@uniswap/analytics';

var _templateObject;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var TWITTER_WIDTH = 560;
var TWITTER_HEIGHT = 480;
var UploadLink = styled.a(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  right: 32px;\n  top: 32px;\n  color: ", ";\n  cursor: pointer;\n\n  ", "\n\n  @media only screen and (max-width: ", ") {\n    right: 12px;\n    top: 28px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
}, OpacityHoverState, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var TxCompleteModal = function TxCompleteModal() {
  var ethUsdPrice = useNativeUsdPrice();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showUnavailable = _useState2[0],
    setShowUnavailable = _useState2[1];
  var txHash = useSendTransaction(function (state) {
    return state.txHash;
  });
  var purchasedWithErc20 = useSendTransaction(function (state) {
    return state.purchasedWithErc20;
  });
  var setTxState = useSendTransaction(function (state) {
    return state.setState;
  });
  var txState = useSendTransaction(function (state) {
    return state.state;
  });
  var transactionStateRef = useRef(txState);
  var transactionResponse = useTransactionResponse(function (state) {
    return state.transactionResponse;
  });
  var setTransactionResponse = useTransactionResponse(function (state) {
    return state.setTransactionResponse;
  });
  var isMobile = useIsMobile();
  var txHashUrl = getExplorerLink(1, txHash, ExplorerDataType.TRANSACTION);
  var shouldShowModal = (txState === TxStateType.Success || txState === TxStateType.Failed) && txState;
  var trace = useTrace({
    modal: InterfaceModalName.NFT_TX_COMPLETE
  });
  var _useMemo = useMemo(function () {
      return parseTransactionResponse(transactionResponse, ethUsdPrice);
    }, [transactionResponse, ethUsdPrice]),
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
    setTxState(TxStateType.New);
  }
  useEffect(function () {
    useSendTransaction.subscribe(function (state) {
      return transactionStateRef.current = state.state;
    });
  }, []);
  var shareTweet = function shareTweet() {
    window.open(generateTweetForPurchase(nftsPurchased, txHashUrl), "newwindow", "left=".concat((window.screen.width - TWITTER_WIDTH) / 2, ", top=").concat((window.screen.height - TWITTER_HEIGHT) / 2, ", width=").concat(TWITTER_WIDTH, ", height=").concat(TWITTER_HEIGHT));
  };
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, shouldShowModal && /*#__PURE__*/React__default.createElement(Portal, null, /*#__PURE__*/React__default.createElement(Overlay, {
    onClick: closeTxCompleteScreen
  }), /*#__PURE__*/React__default.createElement(Box, {
    className: modalContainer,
    onClick: closeTxCompleteScreen
  }, showPurchasedModal && /*#__PURE__*/React__default.createElement(Trace, {
    name: NFTEventName.NFT_BUY_BAG_SUCCEEDED,
    properties: _objectSpread(_objectSpread({
      buy_quantity: nftsPurchased.length,
      usd_value: parseFloat(formatEther(totalPurchaseValue)) * ethUsdPrice,
      transaction_hash: txHash,
      using_erc20: purchasedWithErc20
    }, formatAssetEventProperties(nftsPurchased)), trace),
    shouldLogImpression: true
  }, /*#__PURE__*/React__default.createElement(Box, {
    className: successModal,
    onClick: stopPropagation
  }, /*#__PURE__*/React__default.createElement(UniIcon, {
    color: vars.color.pink400,
    width: "36",
    height: "36",
    className: uniLogo
  }), /*#__PURE__*/React__default.createElement(Box, {
    display: "flex",
    flexWrap: "wrap",
    width: "full",
    height: "min"
  }, /*#__PURE__*/React__default.createElement("h1", {
    className: title
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "6Mjzfq",
    message: "Complete!"
  })), /*#__PURE__*/React__default.createElement("p", {
    className: subHeading
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "utdv8e",
    message: "Uniswap has granted your wish!"
  }))), /*#__PURE__*/React__default.createElement(UploadLink, {
    onClick: shareTweet,
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement(TwitterIcon, {
    width: 32,
    height: 32,
    color: themeVars.colors.neutral2
  })), /*#__PURE__*/React__default.createElement(Box, {
    className: successAssetsContainer,
    style: {
      maxHeight: nftsPurchased.length > 32 ? isMobile ? "172px" : "292px" : "min-content"
    }
  }, _toConsumableArray(nftsPurchased).map(function (nft, index) {
    return /*#__PURE__*/React__default.createElement("img", {
      className: clsx(successAssetImage, nftsPurchased.length > 1 && successAssetImageGrid),
      style: {
        maxHeight: "".concat(getSuccessfulImageSize(nftsPurchased.length, isMobile), "px"),
        maxWidth: "".concat(getSuccessfulImageSize(nftsPurchased.length, isMobile), "px")
      },
      src: nft.imageUrl,
      alt: nft.name,
      key: index
    });
  })), nftsPurchased.length > 32 && /*#__PURE__*/React__default.createElement(Box, {
    className: overflowFade
  }), /*#__PURE__*/React__default.createElement(Box, {
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
    className: bottomBar,
    justifyContent: "space-between"
  }, /*#__PURE__*/React__default.createElement(Row, null, /*#__PURE__*/React__default.createElement(Box, {
    marginRight: "16"
  }, nftsPurchased.length, " NFT", nftsPurchased.length === 1 ? "" : "s"), /*#__PURE__*/React__default.createElement(Box, null, formatEthPrice(totalPurchaseValue.toString()), " ETH")), /*#__PURE__*/React__default.createElement("a", {
    href: txHashUrl,
    target: "_blank",
    rel: "noreferrer",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React__default.createElement(Box, {
    color: "neutral2",
    fontWeight: "book"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "rd4eHq",
    message: "View on Etherscan"
  })))))), showRefundModal && ( /* Showing both purchases & refunds */
  showPurchasedModal ? /*#__PURE__*/React__default.createElement(Trace, {
    name: NFTEventName.NFT_BUY_BAG_REFUNDED,
    properties: _objectSpread({
      buy_quantity: nftsPurchased.length,
      fail_quantity: nftsNotPurchased.length,
      refund_amount_usd: totalUSDRefund,
      transaction_hash: txHash
    }, trace),
    shouldLogImpression: true
  }, /*#__PURE__*/React__default.createElement(Box, {
    className: mixedRefundModal,
    onClick: stopPropagation
  }, /*#__PURE__*/React__default.createElement(Box, {
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
  }, /*#__PURE__*/React__default.createElement(LightningBoltIcon, {
    color: "pink"
  }), /*#__PURE__*/React__default.createElement("p", {
    className: subtitle
  }, "Instant Refund"), /*#__PURE__*/React__default.createElement("p", {
    className: interStd
  }, "Uniswap returned", " ", /*#__PURE__*/React__default.createElement("span", {
    style: {
      fontWeight: "535"
    }
  }, formatEthPrice(totalRefundValue.toString()), " ETH"), " ", "back to your wallet for unavailable items."), /*#__PURE__*/React__default.createElement(Box, {
    display: "flex",
    flexWrap: "wrap",
    bottom: "24",
    width: "full",
    alignSelf: "flex-end",
    position: {
      sm: "absolute",
      md: "static"
    }
  }, /*#__PURE__*/React__default.createElement("p", {
    className: totalEthCost,
    style: {
      marginBottom: "2px"
    }
  }, formatEthPrice(totalRefundValue.toString()), " ETH"), /*#__PURE__*/React__default.createElement("p", {
    className: totalUsdRefund
  }, formatUSDPriceWithCommas(totalUSDRefund)), /*#__PURE__*/React__default.createElement("p", {
    className: totalEthCost,
    style: {
      width: "100%"
    }
  }, "for ", nftsNotPurchased.length, " unavailable item", nftsNotPurchased.length === 1 ? "" : "s", "."), /*#__PURE__*/React__default.createElement(Box, {
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
  }, /*#__PURE__*/React__default.createElement("a", {
    href: txHashUrl,
    target: "_blank",
    rel: "noreferrer",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React__default.createElement(Box, {
    fontWeight: "book",
    marginTop: "16",
    color: "neutral2",
    className: totalEthCost
  }, "View on Etherscan"))))), /*#__PURE__*/React__default.createElement(Box, {
    className: refundAssetsContainer
  }, nftsNotPurchased.map(function (nft, index) {
    return /*#__PURE__*/React__default.createElement(Box, {
      display: "flex",
      flexWrap: "wrap",
      height: "min",
      width: "52",
      key: index
    }, /*#__PURE__*/React__default.createElement("img", {
      className: refundAssetImage,
      src: nft.imageUrl,
      alt: nft.name,
      key: index
    }));
  })), /*#__PURE__*/React__default.createElement(Box, {
    className: refundOverflowFade
  }))) :
  /*#__PURE__*/
  // Only showing when all assets are unavailable
  React__default.createElement(Trace, {
    name: NFTEventName.NFT_BUY_BAG_REFUNDED,
    properties: _objectSpread({
      buy_quantity: 0,
      fail_quantity: nftsNotPurchased.length,
      refund_amount_usd: totalUSDRefund
    }, trace),
    shouldLogImpression: true
  }, /*#__PURE__*/React__default.createElement(Box, {
    className: fullRefundModal,
    onClick: stopPropagation
  }, /*#__PURE__*/React__default.createElement(Box, {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex"
  }, txState === TxStateType.Success ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(LightningBoltIcon, null), /*#__PURE__*/React__default.createElement("h1", {
    className: title
  }, "Instant Refund")) : /*#__PURE__*/React__default.createElement("h1", {
    className: title
  }, "Failed Transaction")), /*#__PURE__*/React__default.createElement("p", {
    className: bodySmall
  }, txState === TxStateType.Success && "Selected item".concat(nftsPurchased.length === 1 ? " is" : "s are", " no longer available. Uniswap instantly refunded you for this incomplete transaction. "), formatUsdPrice(txFeeFiat), " was used for gas in attempt to complete this transaction. For support, please visit our", " ", /*#__PURE__*/React__default.createElement("a", {
    href: "https://discord.gg/FCfyBSbCU5"
  }, "Discord")), /*#__PURE__*/React__default.createElement(Box, {
    className: allUnavailableAssets
  }, nftsNotPurchased.length >= 3 && /*#__PURE__*/React__default.createElement(Box, {
    className: toggleUnavailable,
    onClick: function onClick() {
      return toggleShowUnavailable();
    }
  }, !showUnavailable && /*#__PURE__*/React__default.createElement(Box, {
    paddingLeft: "20",
    paddingTop: "8",
    paddingBottom: "8"
  }, nftsNotPurchased.slice(0, 3).map(function (asset, index) {
    return /*#__PURE__*/React__default.createElement("img", {
      style: {
        zIndex: 2 - index
      },
      className: unavailableAssetPreview,
      src: asset.imageUrl,
      alt: asset.name,
      key: index
    });
  })), /*#__PURE__*/React__default.createElement(Box, {
    color: showUnavailable ? "neutral1" : "neutral2",
    className: unavailableText
  }, "Unavailable", /*#__PURE__*/React__default.createElement(Box, {
    className: unavailableItems
  }, nftsNotPurchased.length, " item", nftsNotPurchased.length === 1 ? "" : "s")), /*#__PURE__*/React__default.createElement(ChevronUpIcon, {
    className: "".concat(!showUnavailable && chevronDown, " ").concat(chevron)
  })), (showUnavailable || nftsNotPurchased.length < 3) && nftsNotPurchased.map(function (asset, index) {
    return /*#__PURE__*/React__default.createElement(Box, {
      backgroundColor: "surface1",
      display: "flex",
      padding: "4",
      marginBottom: "1",
      borderRadius: "8",
      key: index
    }, /*#__PURE__*/React__default.createElement(Box, {
      className: assetContainer
    }, /*#__PURE__*/React__default.createElement("img", {
      className: fullRefundImage,
      src: asset.imageUrl,
      alt: asset.name
    })), /*#__PURE__*/React__default.createElement(Box, {
      flexWrap: "wrap",
      marginTop: "4"
    }, /*#__PURE__*/React__default.createElement(Box, {
      marginLeft: "4",
      width: "full",
      display: "flex"
    }, /*#__PURE__*/React__default.createElement("p", {
      className: totalEthCost,
      style: {
        marginBottom: "2px"
      }
    }, formatEthPrice(asset.updatedPriceInfo ? asset.updatedPriceInfo.ETHPrice : asset.priceInfo.ETHPrice), " ", "ETH")), /*#__PURE__*/React__default.createElement(Box, {
      color: "neutral1",
      className: totalUsdRefund
    }, txState === TxStateType.Success ? "Refunded" : asset.name)));
  })), showUnavailable && /*#__PURE__*/React__default.createElement(Box, {
    className: fullRefundOverflowFade
  }), /*#__PURE__*/React__default.createElement("p", {
    className: totalEthCost,
    style: {
      marginBottom: "2px"
    }
  }, formatEthPrice(totalRefundValue.toString()), " ETH"), /*#__PURE__*/React__default.createElement("p", {
    className: totalUsdRefund
  }, formatUSDPriceWithCommas(totalUSDRefund)), /*#__PURE__*/React__default.createElement(Box, {
    className: walletAddress,
    marginLeft: "auto",
    marginRight: "0"
  }, /*#__PURE__*/React__default.createElement("a", {
    href: txHashUrl,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React__default.createElement(Box, {
    className: addressHash
  }, "View on Etherscan"))), /*#__PURE__*/React__default.createElement("p", {
    className: totalEthCost
  }, "for ", nftsNotPurchased.length, " unavailable item", nftsNotPurchased.length === 1 ? "" : "s", "."), /*#__PURE__*/React__default.createElement(Box, {
    as: "button",
    border: "none",
    backgroundColor: "accent1",
    cursor: "pointer",
    className: returnButton,
    type: "button",
    onClick: function onClick() {
      return closeTxCompleteScreen();
    }
  }, /*#__PURE__*/React__default.createElement(BackArrowIcon, {
    className: fullRefundBackArrow
  }), "Return to Marketplace")))))));
};
var TransactionCompleteModal = TxCompleteModal;

export { TransactionCompleteModal as default };
