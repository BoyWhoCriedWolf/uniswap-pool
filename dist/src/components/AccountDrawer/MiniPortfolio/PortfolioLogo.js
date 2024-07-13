import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { ChainId } from '@uniswap/sdk-core';
import blankTokenUrl from '../../../assets/svg/blank_token.svg.js';
import { ReactComponent as SvgContractInteraction } from '../../../assets/svg/contract-interaction.svg.js';
import { MissingImageLogo } from '../../Logo/AssetLogo.js';
import { Unicon } from '../../Unicon/index.js';
import { getChainInfo } from '../../../constants/chainInfo.js';
import useAssetLogoSource from '../../../hooks/useAssetLogoSource.js';
import useENSAvatar from '../../../hooks/useENSAvatar.js';
import React__default from 'react';
import { Loader } from 'react-feather';
import styled from 'styled-components';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
var UnknownContract = styled(SvgContractInteraction)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var DoubleLogoContainer = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  gap: 2px;\n  position: relative;\n  top: 0;\n  left: 0;\n  img:nth-child(n) {\n    width: 19px;\n    height: 40px;\n    object-fit: cover;\n  }\n  img:nth-child(1) {\n    border-radius: 20px 0 0 20px;\n    object-position: 0 0;\n  }\n  img:nth-child(2) {\n    border-radius: 0 20px 20px 0;\n    object-position: 100% 0;\n  }\n"])));
var StyledLogoParentContainer = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  position: relative;\n  top: 0;\n  left: 0;\n"])));
var ENSAvatarImg = styled.img(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  border-radius: 8px;\n  height: 40px;\n  width: 40px;\n"])));
var StyledChainLogo = styled.img(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  height: 14px;\n  width: 14px;\n"])));
var SquareChainLogo = styled.img(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  height: 100%;\n  width: 100%;\n"])));
var CircleLogoImage = styled.img(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  width: ", ";\n  height: ", ";\n  border-radius: 50%;\n"])), function (_ref2) {
  var size = _ref2.size;
  return size;
}, function (_ref3) {
  var size = _ref3.size;
  return size;
});
var L2LogoContainer = styled.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 2px;\n  height: 16px;\n  left: 60%;\n  position: absolute;\n  top: 60%;\n  outline: 2px solid ", ";\n  width: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])), function (_ref4) {
  var theme = _ref4.theme,
    hasSquareLogo = _ref4.hasSquareLogo;
  return hasSquareLogo ? theme.surface2 : theme.neutral1;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface1;
});
function DoubleLogo(_ref6) {
  var logo1 = _ref6.logo1,
    onError1 = _ref6.onError1,
    logo2 = _ref6.logo2,
    onError2 = _ref6.onError2,
    size = _ref6.size;
  return /*#__PURE__*/React__default.createElement(DoubleLogoContainer, null, /*#__PURE__*/React__default.createElement(CircleLogoImage, {
    size: size,
    src: logo1 !== null && logo1 !== void 0 ? logo1 : blankTokenUrl,
    onError: onError1
  }), /*#__PURE__*/React__default.createElement(CircleLogoImage, {
    size: size,
    src: logo2 !== null && logo2 !== void 0 ? logo2 : blankTokenUrl,
    onError: onError2
  }));
}
function DoubleCurrencyLogo(_ref7) {
  var _currencies$, _currencies$2, _currencies$3, _currencies$4, _currencies$5;
  var chainId = _ref7.chainId,
    currencies = _ref7.currencies,
    backupImages = _ref7.backupImages,
    size = _ref7.size;
  var _useTokenLogoSource = useAssetLogoSource(currencies === null || currencies === void 0 || (_currencies$ = currencies[0]) === null || _currencies$ === void 0 ? void 0 : _currencies$.wrapped.address, chainId, currencies === null || currencies === void 0 || (_currencies$2 = currencies[0]) === null || _currencies$2 === void 0 ? void 0 : _currencies$2.isNative, backupImages === null || backupImages === void 0 ? void 0 : backupImages[0]),
    _useTokenLogoSource2 = _slicedToArray(_useTokenLogoSource, 2),
    src = _useTokenLogoSource2[0],
    nextSrc = _useTokenLogoSource2[1];
  var _useTokenLogoSource3 = useAssetLogoSource(currencies === null || currencies === void 0 || (_currencies$3 = currencies[1]) === null || _currencies$3 === void 0 ? void 0 : _currencies$3.wrapped.address, chainId, currencies === null || currencies === void 0 || (_currencies$4 = currencies[1]) === null || _currencies$4 === void 0 ? void 0 : _currencies$4.isNative, backupImages === null || backupImages === void 0 ? void 0 : backupImages[1]),
    _useTokenLogoSource4 = _slicedToArray(_useTokenLogoSource3, 2),
    src2 = _useTokenLogoSource4[0],
    nextSrc2 = _useTokenLogoSource4[1];
  if (currencies.length === 1 && src) {
    return /*#__PURE__*/React__default.createElement(CircleLogoImage, {
      size: size,
      src: src,
      onError: nextSrc
    });
  }
  if (currencies.length > 1) {
    return /*#__PURE__*/React__default.createElement(DoubleLogo, {
      logo1: src,
      onError1: nextSrc,
      logo2: src2,
      onError2: nextSrc2,
      size: size
    });
  }
  return /*#__PURE__*/React__default.createElement(MissingImageLogo, {
    size: size
  }, (_currencies$5 = currencies[0]) === null || _currencies$5 === void 0 || (_currencies$5 = _currencies$5.symbol) === null || _currencies$5 === void 0 ? void 0 : _currencies$5.toUpperCase().replace("$", "").replace(/\s+/g, "").slice(0, 3));
}
function PortfolioAvatar(_ref8) {
  var accountAddress = _ref8.accountAddress,
    size = _ref8.size;
  var _useENSAvatar = useENSAvatar(accountAddress, false),
    avatar = _useENSAvatar.avatar,
    loading = _useENSAvatar.loading;
  if (loading) {
    return /*#__PURE__*/React__default.createElement(Loader, {
      size: size
    });
  }
  if (avatar) {
    return /*#__PURE__*/React__default.createElement(ENSAvatarImg, {
      src: avatar,
      alt: "avatar"
    });
  }
  return /*#__PURE__*/React__default.createElement(Unicon, {
    size: 40,
    address: accountAddress
  });
}
function SquareL2Logo(_ref9) {
  var chainId = _ref9.chainId;
  if (chainId === ChainId.MAINNET) return null;
  var _getChainInfo = getChainInfo(chainId),
    squareLogoUrl = _getChainInfo.squareLogoUrl,
    logoUrl = _getChainInfo.logoUrl;
  var chainLogo = squareLogoUrl !== null && squareLogoUrl !== void 0 ? squareLogoUrl : logoUrl;
  return /*#__PURE__*/React__default.createElement(L2LogoContainer, {
    hasSquareLogo: !!squareLogoUrl
  }, squareLogoUrl ? /*#__PURE__*/React__default.createElement(SquareChainLogo, {
    src: chainLogo,
    alt: "chainLogo"
  }) : /*#__PURE__*/React__default.createElement(StyledChainLogo, {
    src: chainLogo,
    alt: "chainLogo"
  }));
}

/**
 * Renders an image by prioritizing a list of sources, and then eventually a fallback contract icon
 */
function PortfolioLogo(props) {
  return /*#__PURE__*/React__default.createElement(StyledLogoParentContainer, null, getLogo(props), /*#__PURE__*/React__default.createElement(SquareL2Logo, {
    chainId: props.chainId
  }));
}
function getLogo(_ref10) {
  var chainId = _ref10.chainId,
    accountAddress = _ref10.accountAddress,
    currencies = _ref10.currencies,
    images = _ref10.images,
    _ref10$size = _ref10.size,
    size = _ref10$size === void 0 ? "40px" : _ref10$size;
  if (accountAddress) {
    return /*#__PURE__*/React__default.createElement(PortfolioAvatar, {
      accountAddress: accountAddress,
      size: size
    });
  }
  if (currencies && currencies.length) {
    return /*#__PURE__*/React__default.createElement(DoubleCurrencyLogo, {
      chainId: chainId,
      currencies: currencies,
      backupImages: images,
      size: size
    });
  }
  if ((images === null || images === void 0 ? void 0 : images.length) === 1) {
    var _images$;
    return /*#__PURE__*/React__default.createElement(CircleLogoImage, {
      size: size,
      src: (_images$ = images[0]) !== null && _images$ !== void 0 ? _images$ : blankTokenUrl
    });
  }
  if (images && (images === null || images === void 0 ? void 0 : images.length) >= 2) {
    return /*#__PURE__*/React__default.createElement(DoubleLogo, {
      logo1: images[0],
      logo2: images[images.length - 1],
      size: size
    });
  }
  return /*#__PURE__*/React__default.createElement(UnknownContract, {
    width: size,
    height: size
  });
}

export { PortfolioLogo };
