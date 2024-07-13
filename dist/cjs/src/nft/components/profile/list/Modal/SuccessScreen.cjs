'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$4 = require('../../../../../../node_modules/@lingui/react/dist/index.cjs');
var core = require('@web3-react/core');
var index$2 = require('../../../../../components/Column/index.cjs');
var index$1 = require('../../../../../components/Common/index.cjs');
var index = require('../../../../../components/Row/index.cjs');
var useStablecoinPrice = require('../../../../../hooks/useStablecoinPrice.cjs');
var useNativeCurrency = require('../../../../../lib/hooks/useNativeCurrency.cjs');
var tryParseCurrencyAmount = require('../../../../../lib/utils/tryParseCurrencyAmount.cjs');
var utils = require('../utils.cjs');
require('../../../../hooks/useBag.cjs');
require('../../../../hooks/useCollectionFilters.cjs');
require('../../../../hooks/useFiltersExpanded.cjs');
require('../../../../hooks/useIsCollectionLoading.cjs');
require('../../../../../hooks/useScreenSize.cjs');
require('../../../../hooks/useNFTList.cjs');
require('../../../../hooks/useProfilePageState.cjs');
var useSellAsset = require('../../../../hooks/useSellAsset.cjs');
require('../../../../hooks/useSendTransaction.cjs');
require('@babel/runtime/helpers/slicedToArray');
require('../../../../hooks/useTransactionResponse.cjs');
require('@ethersproject/units');
require('@uniswap/sdk-core');
require('../../../../../hooks/useUSDPrice.cjs');
require('../../../../../lib/hooks/useCurrencyBalance.cjs');
require('../../../../hooks/useWalletCollections.cjs');
var asset = require('../../../../utils/asset.cjs');
var currency = require('../../../../utils/currency.cjs');
require('video-extensions');
require('../../../../../locales/en-US.cjs');
require('numbro');
require('../../../../utils/pooledAssets.cjs');
var roundAndPluralize = require('../../../../utils/roundAndPluralize.cjs');
require('../../../../utils/time.cjs');
require('@ethersproject/bignumber');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var index$3 = require('../../../../../theme/index.cjs');
require('../../../../../theme/components/index.cjs');
var formatNumbers = require('../../../../../utils/formatNumbers.cjs');
var shared = require('../shared.cjs');
var text = require('../../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var SuccessImage = styled__default["default"].img(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  width: calc(\n    ", " - 12px\n  );\n  border-radius: 12px;\n"])), function (_ref) {
  var numImages = _ref.numImages;
  return numImages > 1 ? numImages > 2 ? "33%" : "50%" : "100%";
});
var SuccessImageWrapper = styled__default["default"](index["default"])(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  flex-wrap: wrap;\n  gap: 12px;\n  justify-content: center;\n  overflow-y: scroll;\n  margin-bottom: 16px;\n  ", "\n"])), index$1.ScrollBarStyles);
var ProceedsColumn = styled__default["default"](index$2.Column)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  text-align: right;\n"])));
var buttonStyle = styled.css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  width: 182px;\n  cursor: pointer;\n  padding: 12px 0px;\n  text-align: center;\n  font-weight: 535;\n  font-size: 16px;\n  line-height: 20px;\n  border-radius: 12px;\n  border: none;\n\n  &:hover {\n    opacity: 0.6;\n  }\n\n  @media screen and (max-width: ", "px) {\n    width: 100%;\n    margin-bottom: 8px;\n  }\n"])), index$3.BREAKPOINTS.sm);
var ReturnButton = styled__default["default"].button(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  color: ", ";\n  ", "\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral1;
}, buttonStyle);
var TweetButton = styled__default["default"].a(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  color: ", ";\n  text-decoration: none;\n  ", "\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.accent1;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.deprecated_accentTextLightPrimary;
}, buttonStyle);
var TweetRow = styled__default["default"](index["default"])(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  justify-content: center;\n  gap: 4px;\n"])));
var SuccessScreen = function SuccessScreen(_ref6) {
  var overlayClick = _ref6.overlayClick;
  var theme = styled.useTheme();
  var sellAssets = useSellAsset.useSellAsset(function (state) {
    return state.sellAssets;
  });
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var nativeCurrency = useNativeCurrency(chainId);
  var _useFormatter = formatNumbers.useFormatter(),
    formatCurrencyAmount = _useFormatter.formatCurrencyAmount;
  var totalEthListingValue = React.useMemo(function () {
    return utils.getTotalEthValue(sellAssets);
  }, [sellAssets]);
  var parsedAmount = tryParseCurrencyAmount(totalEthListingValue.toString(), nativeCurrency);
  var usdcValue = useStablecoinPrice.useStablecoinValue(parsedAmount);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(shared.TitleRow, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineSmall, {
    lineHeight: "28px"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "n3Wa1f",
    message: "Successfully listed"
  }), "\xA0", sellAssets.length > 1 ? " ".concat(sellAssets.length, " ") : "", "NFT", roundAndPluralize.pluralize(sellAssets.length), "!"), /*#__PURE__*/React__default["default"].createElement(reactFeather.X, {
    size: 24,
    cursor: "pointer",
    onClick: overlayClick
  })), /*#__PURE__*/React__default["default"].createElement(SuccessImageWrapper, null, sellAssets.map(function (asset) {
    var _asset$asset_contract, _asset$asset_contract2;
    return /*#__PURE__*/React__default["default"].createElement(SuccessImage, {
      src: asset.imageUrl,
      key: (_asset$asset_contract = asset === null || asset === void 0 || (_asset$asset_contract2 = asset.asset_contract) === null || _asset$asset_contract2 === void 0 ? void 0 : _asset$asset_contract2.address) !== null && _asset$asset_contract !== void 0 ? _asset$asset_contract : "" + (asset === null || asset === void 0 ? void 0 : asset.tokenId),
      numImages: sellAssets.length
    });
  })), /*#__PURE__*/React__default["default"].createElement(index["default"], {
    justify: "space-between",
    align: "flex-start",
    marginBottom: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "ORzP3x",
    message: "Proceeds if sold"
  })), /*#__PURE__*/React__default["default"].createElement(ProceedsColumn, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, currency.formatEth(totalEthListingValue), " ETH"), usdcValue && /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    lineHeight: "20px",
    color: "neutral2"
  }, formatCurrencyAmount({
    amount: usdcValue,
    type: formatNumbers.NumberType.FiatTokenPrice
  })))), /*#__PURE__*/React__default["default"].createElement(index["default"], {
    justify: "space-between",
    flexWrap: "wrap"
  }, /*#__PURE__*/React__default["default"].createElement(ReturnButton, {
    onClick: function onClick() {
      return window.location.reload();
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "eIO6eZ",
    message: "Return to My NFTs"
  })), /*#__PURE__*/React__default["default"].createElement(TweetButton, {
    href: asset.generateTweetForList(sellAssets),
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React__default["default"].createElement(TweetRow, null, /*#__PURE__*/React__default["default"].createElement(reactFeather.Twitter, {
    height: 20,
    width: 20,
    color: theme.deprecated_accentTextLightPrimary,
    fill: theme.deprecated_accentTextLightPrimary
  }), /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "BMdkoo",
    message: "Share on Twitter"
  })))));
};

exports.SuccessScreen = SuccessScreen;
