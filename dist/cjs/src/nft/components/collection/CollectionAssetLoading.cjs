'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Asset = require('../../../graphql/data/nft/Asset.cjs');
var loading_css = require('../../css/loading.css.cjs');
var sizingImage = require('../../../assets/images/sizingImage.cjs');
var Box = require('../Box.cjs');
var Flex = require('../Flex.cjs');
var CollectionAssetLoading_css = require('./CollectionAssetLoading.css.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CollectionAssetLoading = function CollectionAssetLoading(_ref) {
  var height = _ref.height;
  return /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "div",
    className: CollectionAssetLoading_css.collectionAssetLoading
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "div",
    position: "relative",
    width: "full",
    style: {
      height: height
    }
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "div",
    className: CollectionAssetLoading_css.collectionAssetsImageLoading
  }), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "img",
    width: "full",
    opacity: "0",
    src: sizingImage,
    draggable: false
  })), /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    justifyContent: "space-between",
    marginTop: "12",
    paddingLeft: "12",
    paddingRight: "12"
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "div",
    className: loading_css.loadingAsset,
    height: "12",
    width: "120"
  })), /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    justifyContent: "space-between",
    marginTop: "12",
    paddingLeft: "12",
    paddingRight: "12"
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "div",
    className: loading_css.loadingAsset,
    height: "16",
    width: "80"
  })));
};
var LoadingAssets = function LoadingAssets(_ref2) {
  var count = _ref2.count,
    height = _ref2.height;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, Array.from(Array(count !== null && count !== void 0 ? count : Asset.ASSET_PAGE_SIZE), function (_, index) {
    return /*#__PURE__*/React__default["default"].createElement(CollectionAssetLoading, {
      key: index,
      height: height
    });
  }));
};

exports.LoadingAssets = LoadingAssets;
