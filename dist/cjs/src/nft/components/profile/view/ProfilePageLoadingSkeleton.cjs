'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var Box = require('../../Box.cjs');
var CollectionNfts_css = require('../../collection/CollectionNfts.css.cjs');
var loading_css = require('../../../css/loading.css.cjs');
var styled = require('styled-components');
var ProfilePage = require('./ProfilePage.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
var SkeletonBodyWrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  gap: 18px;\n"])));
var SkeletonRowWrapper = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direct: row;\n  width: 100%;\n"])));
var AccountDetailsSkeletonWrapper = styled__default["default"](SkeletonRowWrapper)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  gap: 12px;\n  margin-bottom: 30px;\n"])));
var ProfileDetailsSkeleton = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  width: 180px;\n  height: 36px;\n  border-radius: 12px;\n"])));
var FilterBarSkeletonWrapper = styled__default["default"](SkeletonRowWrapper)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  justify-content: space-between;\n"])));
var FilterButtonSkeleton = styled__default["default"].div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  width: 92px;\n  height: 44px;\n  border-radius: 12px;\n"])));
var SellButtonSkeleton = styled__default["default"].div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  width: 80px;\n  height: 44px;\n  border-radius: 12px;\n"])));
var ProfileAssetCardSkeleton = styled__default["default"].div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  height: 330px;\n  border-radius: 20px;\n"])));
var ProfileAssetCardDisplaySectionSkeleton = function ProfileAssetCardDisplaySectionSkeleton() {
  return /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    width: "full",
    className: CollectionNfts_css.assetList
  }, Array.from(Array(ProfilePage.DEFAULT_WALLET_ASSET_QUERY_AMOUNT), function (_, index) {
    return /*#__PURE__*/React__default["default"].createElement(ProfileAssetCardSkeleton, {
      key: index,
      className: loading_css.loadingAsset
    });
  }));
};
var ProfileBodyLoadingSkeleton = function ProfileBodyLoadingSkeleton() {
  return /*#__PURE__*/React__default["default"].createElement(SkeletonBodyWrapper, null, /*#__PURE__*/React__default["default"].createElement(AccountDetailsSkeletonWrapper, null, /*#__PURE__*/React__default["default"].createElement(ProfileDetailsSkeleton, {
    className: loading_css.loadingAsset
  })), /*#__PURE__*/React__default["default"].createElement(FilterBarSkeletonWrapper, null, /*#__PURE__*/React__default["default"].createElement(FilterButtonSkeleton, {
    className: loading_css.loadingAsset
  }), /*#__PURE__*/React__default["default"].createElement(SellButtonSkeleton, {
    className: loading_css.loadingAsset
  })), /*#__PURE__*/React__default["default"].createElement(ProfileAssetCardDisplaySectionSkeleton, null));
};

exports.ProfileBodyLoadingSkeleton = ProfileBodyLoadingSkeleton;
