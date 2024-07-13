import React__default from 'react';
import { ASSET_PAGE_SIZE } from '../../../graphql/data/nft/Asset.js';
import { loadingAsset } from '../../css/loading.css.js';
import SizingImage from '../../../assets/images/sizingImage.png.js';
import { Box } from '../Box.js';
import { Row } from '../Flex.js';
import { collectionAssetLoading, collectionAssetsImageLoading } from './CollectionAssetLoading.css.js';

var CollectionAssetLoading = function CollectionAssetLoading(_ref) {
  var height = _ref.height;
  return /*#__PURE__*/React__default.createElement(Box, {
    as: "div",
    className: collectionAssetLoading
  }, /*#__PURE__*/React__default.createElement(Box, {
    as: "div",
    position: "relative",
    width: "full",
    style: {
      height: height
    }
  }, /*#__PURE__*/React__default.createElement(Box, {
    as: "div",
    className: collectionAssetsImageLoading
  }), /*#__PURE__*/React__default.createElement(Box, {
    as: "img",
    width: "full",
    opacity: "0",
    src: SizingImage,
    draggable: false
  })), /*#__PURE__*/React__default.createElement(Row, {
    justifyContent: "space-between",
    marginTop: "12",
    paddingLeft: "12",
    paddingRight: "12"
  }, /*#__PURE__*/React__default.createElement(Box, {
    as: "div",
    className: loadingAsset,
    height: "12",
    width: "120"
  })), /*#__PURE__*/React__default.createElement(Row, {
    justifyContent: "space-between",
    marginTop: "12",
    paddingLeft: "12",
    paddingRight: "12"
  }, /*#__PURE__*/React__default.createElement(Box, {
    as: "div",
    className: loadingAsset,
    height: "16",
    width: "80"
  })));
};
var LoadingAssets = function LoadingAssets(_ref2) {
  var count = _ref2.count,
    height = _ref2.height;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, Array.from(Array(count !== null && count !== void 0 ? count : ASSET_PAGE_SIZE), function (_, index) {
    return /*#__PURE__*/React__default.createElement(CollectionAssetLoading, {
      key: index,
      height: height
    });
  }));
};

export { LoadingAssets };
