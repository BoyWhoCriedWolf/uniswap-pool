import React__default, { useMemo } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { useWeb3React } from '@web3-react/core';
import { Column } from '../../../../../components/Column/index.js';
import { ScrollBarStyles } from '../../../../../components/Common/index.js';
import Row from '../../../../../components/Row/index.js';
import { useStablecoinValue } from '../../../../../hooks/useStablecoinPrice.js';
import useNativeCurrency from '../../../../../lib/hooks/useNativeCurrency.js';
import tryParseCurrencyAmount from '../../../../../lib/utils/tryParseCurrencyAmount.js';
import { getTotalEthValue } from '../utils.js';
import '../../../../hooks/useBag.js';
import '../../../../hooks/useCollectionFilters.js';
import '../../../../hooks/useFiltersExpanded.js';
import '../../../../hooks/useIsCollectionLoading.js';
import '../../../../../hooks/useScreenSize.js';
import '../../../../hooks/useNFTList.js';
import '../../../../hooks/useProfilePageState.js';
import { useSellAsset } from '../../../../hooks/useSellAsset.js';
import '../../../../hooks/useSendTransaction.js';
import '@babel/runtime/helpers/slicedToArray';
import '../../../../hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../../../../hooks/useUSDPrice.js';
import '../../../../../lib/hooks/useCurrencyBalance.js';
import '../../../../hooks/useWalletCollections.js';
import { generateTweetForList } from '../../../../utils/asset.js';
import { formatEth } from '../../../../utils/currency.js';
import 'video-extensions';
import '../../../../../locales/en-US.js';
import 'numbro';
import '../../../../utils/pooledAssets.js';
import { pluralize } from '../../../../utils/roundAndPluralize.js';
import '../../../../utils/time.js';
import '@ethersproject/bignumber';
import { X, Twitter } from 'react-feather';
import styled, { css, useTheme } from 'styled-components';
import { BREAKPOINTS } from '../../../../../theme/index.js';
import '../../../../../theme/components/index.js';
import { useFormatter, NumberType } from '../../../../../utils/formatNumbers.js';
import { TitleRow } from '../shared.js';
import { ThemedText } from '../../../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var SuccessImage = styled.img(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: calc(\n    ", " - 12px\n  );\n  border-radius: 12px;\n"])), function (_ref) {
  var numImages = _ref.numImages;
  return numImages > 1 ? numImages > 2 ? "33%" : "50%" : "100%";
});
var SuccessImageWrapper = styled(Row)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  flex-wrap: wrap;\n  gap: 12px;\n  justify-content: center;\n  overflow-y: scroll;\n  margin-bottom: 16px;\n  ", "\n"])), ScrollBarStyles);
var ProceedsColumn = styled(Column)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  text-align: right;\n"])));
var buttonStyle = css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  width: 182px;\n  cursor: pointer;\n  padding: 12px 0px;\n  text-align: center;\n  font-weight: 535;\n  font-size: 16px;\n  line-height: 20px;\n  border-radius: 12px;\n  border: none;\n\n  &:hover {\n    opacity: 0.6;\n  }\n\n  @media screen and (max-width: ", "px) {\n    width: 100%;\n    margin-bottom: 8px;\n  }\n"])), BREAKPOINTS.sm);
var ReturnButton = styled.button(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  color: ", ";\n  ", "\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral1;
}, buttonStyle);
var TweetButton = styled.a(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  color: ", ";\n  text-decoration: none;\n  ", "\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.accent1;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.deprecated_accentTextLightPrimary;
}, buttonStyle);
var TweetRow = styled(Row)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  justify-content: center;\n  gap: 4px;\n"])));
var SuccessScreen = function SuccessScreen(_ref6) {
  var overlayClick = _ref6.overlayClick;
  var theme = useTheme();
  var sellAssets = useSellAsset(function (state) {
    return state.sellAssets;
  });
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var nativeCurrency = useNativeCurrency(chainId);
  var _useFormatter = useFormatter(),
    formatCurrencyAmount = _useFormatter.formatCurrencyAmount;
  var totalEthListingValue = useMemo(function () {
    return getTotalEthValue(sellAssets);
  }, [sellAssets]);
  var parsedAmount = tryParseCurrencyAmount(totalEthListingValue.toString(), nativeCurrency);
  var usdcValue = useStablecoinValue(parsedAmount);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(TitleRow, null, /*#__PURE__*/React__default.createElement(ThemedText.HeadlineSmall, {
    lineHeight: "28px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "n3Wa1f",
    message: "Successfully listed"
  }), "\xA0", sellAssets.length > 1 ? " ".concat(sellAssets.length, " ") : "", "NFT", pluralize(sellAssets.length), "!"), /*#__PURE__*/React__default.createElement(X, {
    size: 24,
    cursor: "pointer",
    onClick: overlayClick
  })), /*#__PURE__*/React__default.createElement(SuccessImageWrapper, null, sellAssets.map(function (asset) {
    var _asset$asset_contract, _asset$asset_contract2;
    return /*#__PURE__*/React__default.createElement(SuccessImage, {
      src: asset.imageUrl,
      key: (_asset$asset_contract = asset === null || asset === void 0 || (_asset$asset_contract2 = asset.asset_contract) === null || _asset$asset_contract2 === void 0 ? void 0 : _asset$asset_contract2.address) !== null && _asset$asset_contract !== void 0 ? _asset$asset_contract : "" + (asset === null || asset === void 0 ? void 0 : asset.tokenId),
      numImages: sellAssets.length
    });
  })), /*#__PURE__*/React__default.createElement(Row, {
    justify: "space-between",
    align: "flex-start",
    marginBottom: "16px"
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "ORzP3x",
    message: "Proceeds if sold"
  })), /*#__PURE__*/React__default.createElement(ProceedsColumn, null, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, formatEth(totalEthListingValue), " ETH"), usdcValue && /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    lineHeight: "20px",
    color: "neutral2"
  }, formatCurrencyAmount({
    amount: usdcValue,
    type: NumberType.FiatTokenPrice
  })))), /*#__PURE__*/React__default.createElement(Row, {
    justify: "space-between",
    flexWrap: "wrap"
  }, /*#__PURE__*/React__default.createElement(ReturnButton, {
    onClick: function onClick() {
      return window.location.reload();
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "eIO6eZ",
    message: "Return to My NFTs"
  })), /*#__PURE__*/React__default.createElement(TweetButton, {
    href: generateTweetForList(sellAssets),
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React__default.createElement(TweetRow, null, /*#__PURE__*/React__default.createElement(Twitter, {
    height: 20,
    width: 20,
    color: theme.deprecated_accentTextLightPrimary,
    fill: theme.deprecated_accentTextLightPrimary
  }), /*#__PURE__*/React__default.createElement(Trans, {
    id: "BMdkoo",
    message: "Share on Twitter"
  })))));
};

export { SuccessScreen };
