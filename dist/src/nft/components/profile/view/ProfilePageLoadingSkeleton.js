import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Box } from '../../Box.js';
import { assetList } from '../../collection/CollectionNfts.css.js';
import { loadingAsset } from '../../../css/loading.css.js';
import styled from 'styled-components';
import { DEFAULT_WALLET_ASSET_QUERY_AMOUNT } from './ProfilePage.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
var SkeletonBodyWrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  gap: 18px;\n"])));
var SkeletonRowWrapper = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direct: row;\n  width: 100%;\n"])));
var AccountDetailsSkeletonWrapper = styled(SkeletonRowWrapper)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  gap: 12px;\n  margin-bottom: 30px;\n"])));
var ProfileDetailsSkeleton = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  width: 180px;\n  height: 36px;\n  border-radius: 12px;\n"])));
var FilterBarSkeletonWrapper = styled(SkeletonRowWrapper)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  justify-content: space-between;\n"])));
var FilterButtonSkeleton = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  width: 92px;\n  height: 44px;\n  border-radius: 12px;\n"])));
var SellButtonSkeleton = styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  width: 80px;\n  height: 44px;\n  border-radius: 12px;\n"])));
var ProfileAssetCardSkeleton = styled.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 330px;\n  border-radius: 20px;\n"])));
var ProfileAssetCardDisplaySectionSkeleton = function ProfileAssetCardDisplaySectionSkeleton() {
  return /*#__PURE__*/React__default.createElement(Box, {
    width: "full",
    className: assetList
  }, Array.from(Array(DEFAULT_WALLET_ASSET_QUERY_AMOUNT), function (_, index) {
    return /*#__PURE__*/React__default.createElement(ProfileAssetCardSkeleton, {
      key: index,
      className: loadingAsset
    });
  }));
};
var ProfileBodyLoadingSkeleton = function ProfileBodyLoadingSkeleton() {
  return /*#__PURE__*/React__default.createElement(SkeletonBodyWrapper, null, /*#__PURE__*/React__default.createElement(AccountDetailsSkeletonWrapper, null, /*#__PURE__*/React__default.createElement(ProfileDetailsSkeleton, {
    className: loadingAsset
  })), /*#__PURE__*/React__default.createElement(FilterBarSkeletonWrapper, null, /*#__PURE__*/React__default.createElement(FilterButtonSkeleton, {
    className: loadingAsset
  }), /*#__PURE__*/React__default.createElement(SellButtonSkeleton, {
    className: loadingAsset
  })), /*#__PURE__*/React__default.createElement(ProfileAssetCardDisplaySectionSkeleton, null));
};

export { ProfileBodyLoadingSkeleton };
