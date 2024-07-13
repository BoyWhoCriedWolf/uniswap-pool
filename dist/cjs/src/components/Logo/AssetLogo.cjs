'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var sdkCore = require('@uniswap/sdk-core');
var chainInfo = require('../../constants/chainInfo.cjs');
var useAssetLogoSource = require('../../hooks/useAssetLogoSource.cjs');
var React = require('react');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var MissingImageLogo = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  --size: ", ";\n  border-radius: 100px;\n  color: ", ";\n  background-color: ", ";\n  font-size: calc(var(--size) / 3);\n  font-weight: 535;\n  height: ", ";\n  line-height: ", ";\n  text-align: center;\n  width: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])), function (_ref) {
  var size = _ref.size;
  return size;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral1;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
}, function (_ref4) {
  var size = _ref4.size;
  return size !== null && size !== void 0 ? size : "24px";
}, function (_ref5) {
  var size = _ref5.size;
  return size !== null && size !== void 0 ? size : "24px";
}, function (_ref6) {
  var size = _ref6.size;
  return size !== null && size !== void 0 ? size : "24px";
});
var LogoImage = styled__default["default"].img(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  opacity: ", ";\n  transition: opacity\n    ", ";\n  width: ", ";\n  height: ", ";\n  border-radius: 50%;\n"])), function (_ref7) {
  var imgLoaded = _ref7.imgLoaded;
  return imgLoaded ? 1 : 0;
}, function (_ref8) {
  var theme = _ref8.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing["in"]);
}, function (_ref9) {
  var size = _ref9.size;
  return size;
}, function (_ref10) {
  var size = _ref10.size;
  return size;
});
var LogoImageWrapper = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  width: ", ";\n  height: ", ";\n  background: ", ";\n  transition: background-color\n    ", ";\n  box-shadow: 0 0 1px white;\n  border-radius: 50%;\n"])), function (_ref11) {
  var size = _ref11.size;
  return size;
}, function (_ref12) {
  var size = _ref12.size;
  return size;
}, function (_ref13) {
  var theme = _ref13.theme,
    imgLoaded = _ref13.imgLoaded;
  return imgLoaded ? "none" : theme.surface3;
}, function (_ref14) {
  var theme = _ref14.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing["in"]);
});
var LogoContainer = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  display: flex;\n"])));
var L2NetworkLogo = styled__default["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  --size: ", ";\n  width: var(--size);\n  height: var(--size);\n  position: absolute;\n  left: 50%;\n  bottom: 0;\n  background: url(", ");\n  background-repeat: no-repeat;\n  background-size: ", ";\n  display: ", ";\n"])), function (_ref15) {
  var parentSize = _ref15.parentSize;
  return "calc(".concat(parentSize, " / 2)");
}, function (_ref16) {
  var networkUrl = _ref16.networkUrl;
  return networkUrl;
}, function (_ref17) {
  var parentSize = _ref17.parentSize;
  return "calc(".concat(parentSize, " / 2) calc(").concat(parentSize, " / 2)");
}, function (_ref18) {
  var networkUrl = _ref18.networkUrl;
  return !networkUrl && "none";
});

/**
 * Renders an image by prioritizing a list of sources, and then eventually a fallback triangle alert
 */
function AssetLogo(_ref19) {
  var _getChainInfo;
  var isNative = _ref19.isNative,
    address = _ref19.address,
    _ref19$chainId = _ref19.chainId,
    chainId = _ref19$chainId === void 0 ? sdkCore.ChainId.MAINNET : _ref19$chainId,
    symbol = _ref19.symbol,
    backupImg = _ref19.backupImg,
    _ref19$size = _ref19.size,
    size = _ref19$size === void 0 ? "24px" : _ref19$size,
    style = _ref19.style,
    _ref19$hideL2Icon = _ref19.hideL2Icon,
    hideL2Icon = _ref19$hideL2Icon === void 0 ? false : _ref19$hideL2Icon;
  var _useTokenLogoSource = useAssetLogoSource(address, chainId, isNative, backupImg),
    _useTokenLogoSource2 = _slicedToArray__default["default"](_useTokenLogoSource, 2),
    src = _useTokenLogoSource2[0],
    nextSrc = _useTokenLogoSource2[1];
  var L2Icon = (_getChainInfo = chainInfo.getChainInfo(chainId)) === null || _getChainInfo === void 0 ? void 0 : _getChainInfo.circleLogoUrl;
  var _useState = React.useState(function () {
      var img = document.createElement("img");
      img.src = src !== null && src !== void 0 ? src : "";
      return src ? img.complete : false;
    }),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    imgLoaded = _useState2[0],
    setImgLoaded = _useState2[1];
  return /*#__PURE__*/React__default["default"].createElement(LogoContainer, {
    style: _objectSpread({
      height: size,
      width: size
    }, style)
  }, src ? /*#__PURE__*/React__default["default"].createElement(LogoImageWrapper, {
    size: size,
    imgLoaded: imgLoaded
  }, /*#__PURE__*/React__default["default"].createElement(LogoImage, {
    src: src,
    alt: "".concat(symbol !== null && symbol !== void 0 ? symbol : "token", " logo"),
    size: size,
    onLoad: function onLoad() {
      return void setImgLoaded(true);
    },
    onError: nextSrc,
    imgLoaded: imgLoaded
  })) : /*#__PURE__*/React__default["default"].createElement(MissingImageLogo, {
    size: size
  }, symbol === null || symbol === void 0 ? void 0 : symbol.toUpperCase().replace("$", "").replace(/\s+/g, "").slice(0, 3)), !hideL2Icon && /*#__PURE__*/React__default["default"].createElement(L2NetworkLogo, {
    networkUrl: L2Icon,
    parentSize: size
  }));
}

exports.MissingImageLogo = MissingImageLogo;
exports["default"] = AssetLogo;
