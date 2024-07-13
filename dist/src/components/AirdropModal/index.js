import React__default, { useState, useEffect } from 'react';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { BigNumber } from '@ethersproject/bignumber';
import { UNISWAP_NFT_AIRDROP_CLAIM_ADDRESS } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import uniswapNftAirdropClaim from '../../abis/uniswap-nft-airdrop-claim.json.js';
import airdropBackgroundv2 from '../../assets/images/airdopBackground.png.js';
import { ThemeButton, ButtonSize, ButtonEmphasis } from '../Button/index.js';
import { OpacityHoverState } from '../Common/index.js';
import Loader from '../Icons/LoadingSpinner.js';
import { useContract } from '../../hooks/useContract.js';
import { ChevronRightIcon } from '../../nft/components/icons.js';
import { useIsNftClaimAvailable } from '../../nft/hooks/useIsNftClaimAvailable.js';
import { CollectionRewardsFetcher } from '../../nft/queries/genie/GetAirdorpMerkle.js';
import { Airdrop } from '../../nft/types/airdrop/index.js';
import { AlertTriangle } from 'react-feather';
import { useModalIsOpen, useToggleModal } from '../../state/application/hooks.js';
import { ApplicationModal } from '../../state/application/reducer.js';
import styled from 'styled-components';
import { CloseIcon } from '../../theme/components/index.js';
import Modal from '../Modal/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22;
var ModalWrap = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n"])));
var Body = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  padding: 28px 20px 20px 20px;\n"])));
var ClaimButton = styled(ThemeButton)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  width: 100%;\n  background-color: ", ";\n  border-radius: 12px;\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.accent1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.white;
});
var Line = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  height: 1px;\n  width: 100%;\n  background-color: ", ";\n  opacity: 0.24;\n  margin-top: 12px;\n  margin-bottom: 12px;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.white;
});
var LinkWrap = styled.a(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  text-decoration: none;\n  ", "\n"])), OpacityHoverState);
var ImageContainer = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  position: relative;\n  width: 100%;\n"])));
var StyledImage = styled.img(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 170px;\n"])));
var USDCLabel = styled.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  font-weight: 535;\n  font-size: 36px;\n  line-height: 44px;\n  margin-top: 8px;\n  color: white;\n"])));
var TextContainer = styled.div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  position: absolute;\n  left: 16px;\n  top: 16px;\n  right: 16px;\n"])));
var RewardsDetailsContainer = styled.div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n"])));
var CurrencyText = styled.span(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  color: white;\n  font-weight: 535;\n  font-size: 12px;\n  line-height: 14.5px;\n"])));
var ClaimContainer = styled.div(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n  height: 380px;\n  padding: 60px 28px;\n  padding-bottom: 20px;\n"])));
var SuccessText = styled.div(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n  font-weight: 485;\n  font-size: 16px;\n  line-height: 24px;\n  margin-top: 24px;\n  margin-bottom: 8px;\n"])));
var EtherscanLink = styled.a(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n  text-decoration: none;\n\n  ", "\n"])), OpacityHoverState);
var CloseButton = styled(ThemeButton)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["\n  max-width: 68px;\n  margin-top: auto;\n  margin-left: auto;\n  margin-right: auto;\n"])));
var SyledCloseIcon = styled(CloseIcon)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["\n  float: right;\n  height: 24px;\n\n  ", "\n"])), OpacityHoverState);
var Error = styled.div(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["\n  display: flex;\n  color: ", ";\n  font-weight: 535;\n  line-height: 24px;\n  border-radius: 16px;\n  padding: 12px 20px;\n  font-size: 14px;\n  align-items: center;\n  gap: 12px;\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.critical;
});
var ReactLinkWrap = styled.div(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["\n  margin-bottom: 40px;\n"])));
var RewardsText = styled.span(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["\n  font-size: 12px;\n  line-height: 16px;\n  color: ", ";\n\n  &:first-child {\n    margin-bottom: 8px;\n  }\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.white;
});
var RewardsInformationText = styled.span(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["\n  display: inline-block;\n  font-size: 14px;\n  line-height: 20px;\n  color: ", ";\n  margin-bottom: 28px;\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.neutral1;
});
var MainHeader = styled.span(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["\n  font-weight: 535;\n  font-size: 16px;\n  line-height: 20px;\n  color: ", ";\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.white;
});
var EtherscanLinkWrap = styled.div(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n"])));
var RewardAmounts = /*#__PURE__*/function (RewardAmounts) {
  RewardAmounts[RewardAmounts["tradingRewardAmount"] = 300] = "tradingRewardAmount";
  RewardAmounts[RewardAmounts["holderRewardAmount"] = 1000] = "holderRewardAmount";
  RewardAmounts[RewardAmounts["combinedAmount"] = 1300] = "combinedAmount";
  return RewardAmounts;
}(RewardAmounts || {});
var AirdropModal = function AirdropModal() {
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account,
    provider = _useWeb3React.provider;
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    claim = _useState2[0],
    setClaim = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isClaimed = _useState4[0],
    setIsClaimed = _useState4[1];
  var _useState5 = useState(""),
    _useState6 = _slicedToArray(_useState5, 2),
    hash = _useState6[0],
    setHash = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    error = _useState8[0],
    setError = _useState8[1];
  var setIsClaimAvailable = useIsNftClaimAvailable(function (state) {
    return state.setIsClaimAvailable;
  });
  var _useState9 = useState(false),
    _useState10 = _slicedToArray(_useState9, 2),
    isSubmitting = _useState10[0],
    setIsSubmitting = _useState10[1];
  var _useState11 = useState(0),
    _useState12 = _slicedToArray(_useState11, 2),
    totalAmount = _useState12[0],
    setTotalAmount = _useState12[1];
  var isOpen = useModalIsOpen(ApplicationModal.UNISWAP_NFT_AIRDROP_CLAIM);
  var usdcAirdropToggle = useToggleModal(ApplicationModal.UNISWAP_NFT_AIRDROP_CLAIM);
  var contract = useContract(UNISWAP_NFT_AIRDROP_CLAIM_ADDRESS, uniswapNftAirdropClaim);
  var displayError = function displayError() {
    setIsSubmitting(false);
    setError(true);
    setTimeout(function () {
      setError(false);
    }, 5000);
  };
  useEffect(function () {
    if (account && provider && contract) {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _yield$CollectionRewa, data, _claim, _yield$contract$conne, _yield$contract$conne2, _isClaimed, usdAmount;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return CollectionRewardsFetcher(account);
            case 3:
              _yield$CollectionRewa = _context.sent;
              data = _yield$CollectionRewa.data;
              _claim = data.find(function (claim) {
                return (claim === null || claim === void 0 ? void 0 : claim.rewardType) === Airdrop.GENIE_UNISWAP_USDC_AIRDROP;
              });
              if (_claim) {
                _context.next = 8;
                break;
              }
              return _context.abrupt("return");
            case 8:
              _context.next = 10;
              return contract.connect(provider).functions.isClaimed(_claim === null || _claim === void 0 ? void 0 : _claim.index);
            case 10:
              _yield$contract$conne = _context.sent;
              _yield$contract$conne2 = _slicedToArray(_yield$contract$conne, 1);
              _isClaimed = _yield$contract$conne2[0];
              if (_claim && _isClaimed === false) {
                usdAmount = BigNumber.from(_claim.amount).div(Math.pow(10, 6));
                setClaim(_claim);
                setTotalAmount(usdAmount.toNumber());
                setIsClaimAvailable(true);
              }
              _context.next = 19;
              break;
            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              displayError();
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 16]]);
      }))();
    }
  }, [account, contract, provider, setIsClaimAvailable]);
  var makeClaim = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var response;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            if (!(contract && claim && claim.amount && claim.merkleProof && provider)) {
              _context2.next = 12;
              break;
            }
            setIsSubmitting(true);
            _context2.next = 5;
            return contract.connect(provider === null || provider === void 0 ? void 0 : provider.getSigner()).functions.claim(claim.index, account, claim === null || claim === void 0 ? void 0 : claim.amount, claim === null || claim === void 0 ? void 0 : claim.merkleProof);
          case 5:
            response = _context2.sent;
            _context2.next = 8;
            return response.wait();
          case 8:
            setHash(response.hash);
            setIsSubmitting(false);
            setIsClaimed(true);
            setIsClaimAvailable(false);
          case 12:
            _context2.next = 18;
            break;
          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            setIsSubmitting(false);
            displayError();
          case 18:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 14]]);
    }));
    return function makeClaim() {
      return _ref9.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Modal, {
    hideBorder: true,
    isOpen: isOpen,
    onDismiss: usdcAirdropToggle,
    maxHeight: 90,
    maxWidth: 400
  }, /*#__PURE__*/React__default.createElement(ModalWrap, null, isClaimed ? /*#__PURE__*/React__default.createElement(ClaimContainer, null, /*#__PURE__*/React__default.createElement(ThemedText.HeadlineSmall, null, "Congratulations!"), /*#__PURE__*/React__default.createElement(SuccessText, null, "You have successfully claimed ", totalAmount, " USDC. Thank you for supporting Genie.xyz."), /*#__PURE__*/React__default.createElement(EtherscanLink, {
    href: "https://etherscan.io/tx/".concat(hash),
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement(ThemedText.Link, null, /*#__PURE__*/React__default.createElement(EtherscanLinkWrap, null, /*#__PURE__*/React__default.createElement("span", null, "Etherscan"), /*#__PURE__*/React__default.createElement(ChevronRightIcon, null)))), /*#__PURE__*/React__default.createElement(CloseButton, {
    size: ButtonSize.medium,
    emphasis: ButtonEmphasis.medium,
    onClick: usdcAirdropToggle
  }, "Close")) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(ImageContainer, null, /*#__PURE__*/React__default.createElement(TextContainer, null, /*#__PURE__*/React__default.createElement(SyledCloseIcon, {
    onClick: usdcAirdropToggle,
    stroke: "white"
  }), /*#__PURE__*/React__default.createElement(MainHeader, null, "Uniswap NFT Airdrop"), /*#__PURE__*/React__default.createElement(USDCLabel, null, totalAmount, " USDC"), /*#__PURE__*/React__default.createElement(Line, null), /*#__PURE__*/React__default.createElement(RewardsDetailsContainer, null, /*#__PURE__*/React__default.createElement(RewardsText, null, "Trading rewards"), " ", /*#__PURE__*/React__default.createElement(CurrencyText, null, totalAmount === RewardAmounts.tradingRewardAmount || totalAmount === RewardAmounts.combinedAmount ? "".concat(RewardAmounts.tradingRewardAmount, " USDC") : "0")), /*#__PURE__*/React__default.createElement(RewardsDetailsContainer, null, /*#__PURE__*/React__default.createElement(RewardsText, null, "Genie NFT holder rewards"), " ", /*#__PURE__*/React__default.createElement(CurrencyText, null, totalAmount !== RewardAmounts.tradingRewardAmount ? "".concat(RewardAmounts.holderRewardAmount, " USDC") : "0"))), /*#__PURE__*/React__default.createElement(StyledImage, {
    src: airdropBackgroundv2
  })), /*#__PURE__*/React__default.createElement(Body, null, /*#__PURE__*/React__default.createElement(RewardsInformationText, null, "As a long time supporter of Genie, you\u2019ve been awarded", " ", totalAmount, " USDC tokens."), /*#__PURE__*/React__default.createElement(ReactLinkWrap, null, /*#__PURE__*/React__default.createElement(LinkWrap, {
    href: "https://uniswap.org/blog/uniswap-nft-aggregator-announcement",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement(ThemedText.Link, null, "Read more about Uniswap NFT."))), error && /*#__PURE__*/React__default.createElement(Error, null, /*#__PURE__*/React__default.createElement(AlertTriangle, null), "Claim USDC failed. Please try again later"), /*#__PURE__*/React__default.createElement(ClaimButton, {
    onClick: makeClaim,
    size: ButtonSize.medium,
    emphasis: ButtonEmphasis.medium,
    disabled: isSubmitting
  }, isSubmitting && /*#__PURE__*/React__default.createElement(Loader, {
    stroke: "white"
  }), /*#__PURE__*/React__default.createElement("span", null, "Claim", isSubmitting && "ing", " USDC")))))));
};
var AirdropModal$1 = AirdropModal;

export { AirdropModal$1 as default };
