'use strict';

var React = require('react');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var bignumber = require('@ethersproject/bignumber');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var uniswapNftAirdropClaim = require('../../abis/uniswap-nft-airdrop-claim.cjs');
var airdopBackground = require('../../assets/images/airdopBackground.cjs');
var index = require('../Button/index.cjs');
var index$1 = require('../Common/index.cjs');
var LoadingSpinner = require('../Icons/LoadingSpinner.cjs');
var useContract = require('../../hooks/useContract.cjs');
var icons = require('../../nft/components/icons.cjs');
var useIsNftClaimAvailable = require('../../nft/hooks/useIsNftClaimAvailable.cjs');
var GetAirdorpMerkle = require('../../nft/queries/genie/GetAirdorpMerkle.cjs');
var index$3 = require('../../nft/types/airdrop/index.cjs');
var reactFeather = require('react-feather');
var hooks = require('../../state/application/hooks.cjs');
var reducer = require('../../state/application/reducer.cjs');
var styled = require('styled-components');
var index$2 = require('../../theme/components/index.cjs');
var index$4 = require('../Modal/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22;
var ModalWrap = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: column;\n"])));
var Body = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  padding: 28px 20px 20px 20px;\n"])));
var ClaimButton = styled__default["default"](index.ThemeButton)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  background-color: ", ";\n  border-radius: 12px;\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.accent1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.white;
});
var Line = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  height: 1px;\n  width: 100%;\n  background-color: ", ";\n  opacity: 0.24;\n  margin-top: 12px;\n  margin-bottom: 12px;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.white;
});
var LinkWrap = styled__default["default"].a(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  text-decoration: none;\n  ", "\n"])), index$1.OpacityHoverState);
var ImageContainer = styled__default["default"].div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  width: 100%;\n"])));
var StyledImage = styled__default["default"].img(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  height: 170px;\n"])));
var USDCLabel = styled__default["default"].div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  font-weight: 535;\n  font-size: 36px;\n  line-height: 44px;\n  margin-top: 8px;\n  color: white;\n"])));
var TextContainer = styled__default["default"].div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  left: 16px;\n  top: 16px;\n  right: 16px;\n"])));
var RewardsDetailsContainer = styled__default["default"].div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  width: 100%;\n  justify-content: space-between;\n"])));
var CurrencyText = styled__default["default"].span(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral__default["default"](["\n  color: white;\n  font-weight: 535;\n  font-size: 12px;\n  line-height: 14.5px;\n"])));
var ClaimContainer = styled__default["default"].div(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n  height: 380px;\n  padding: 60px 28px;\n  padding-bottom: 20px;\n"])));
var SuccessText = styled__default["default"].div(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral__default["default"](["\n  font-weight: 485;\n  font-size: 16px;\n  line-height: 24px;\n  margin-top: 24px;\n  margin-bottom: 8px;\n"])));
var EtherscanLink = styled__default["default"].a(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral__default["default"](["\n  text-decoration: none;\n\n  ", "\n"])), index$1.OpacityHoverState);
var CloseButton = styled__default["default"](index.ThemeButton)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral__default["default"](["\n  max-width: 68px;\n  margin-top: auto;\n  margin-left: auto;\n  margin-right: auto;\n"])));
var SyledCloseIcon = styled__default["default"](index$2.CloseIcon)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral__default["default"](["\n  float: right;\n  height: 24px;\n\n  ", "\n"])), index$1.OpacityHoverState);
var Error = styled__default["default"].div(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  color: ", ";\n  font-weight: 535;\n  line-height: 24px;\n  border-radius: 16px;\n  padding: 12px 20px;\n  font-size: 14px;\n  align-items: center;\n  gap: 12px;\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.critical;
});
var ReactLinkWrap = styled__default["default"].div(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral__default["default"](["\n  margin-bottom: 40px;\n"])));
var RewardsText = styled__default["default"].span(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral__default["default"](["\n  font-size: 12px;\n  line-height: 16px;\n  color: ", ";\n\n  &:first-child {\n    margin-bottom: 8px;\n  }\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.white;
});
var RewardsInformationText = styled__default["default"].span(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral__default["default"](["\n  display: inline-block;\n  font-size: 14px;\n  line-height: 20px;\n  color: ", ";\n  margin-bottom: 28px;\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.neutral1;
});
var MainHeader = styled__default["default"].span(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral__default["default"](["\n  font-weight: 535;\n  font-size: 16px;\n  line-height: 20px;\n  color: ", ";\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.white;
});
var EtherscanLinkWrap = styled__default["default"].div(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n"])));
var RewardAmounts = /*#__PURE__*/function (RewardAmounts) {
  RewardAmounts[RewardAmounts["tradingRewardAmount"] = 300] = "tradingRewardAmount";
  RewardAmounts[RewardAmounts["holderRewardAmount"] = 1000] = "holderRewardAmount";
  RewardAmounts[RewardAmounts["combinedAmount"] = 1300] = "combinedAmount";
  return RewardAmounts;
}(RewardAmounts || {});
var AirdropModal = function AirdropModal() {
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account,
    provider = _useWeb3React.provider;
  var _useState = React.useState(),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    claim = _useState2[0],
    setClaim = _useState2[1];
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    isClaimed = _useState4[0],
    setIsClaimed = _useState4[1];
  var _useState5 = React.useState(""),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
    hash = _useState6[0],
    setHash = _useState6[1];
  var _useState7 = React.useState(false),
    _useState8 = _slicedToArray__default["default"](_useState7, 2),
    error = _useState8[0],
    setError = _useState8[1];
  var setIsClaimAvailable = useIsNftClaimAvailable.useIsNftClaimAvailable(function (state) {
    return state.setIsClaimAvailable;
  });
  var _useState9 = React.useState(false),
    _useState10 = _slicedToArray__default["default"](_useState9, 2),
    isSubmitting = _useState10[0],
    setIsSubmitting = _useState10[1];
  var _useState11 = React.useState(0),
    _useState12 = _slicedToArray__default["default"](_useState11, 2),
    totalAmount = _useState12[0],
    setTotalAmount = _useState12[1];
  var isOpen = hooks.useModalIsOpen(reducer.ApplicationModal.UNISWAP_NFT_AIRDROP_CLAIM);
  var usdcAirdropToggle = hooks.useToggleModal(reducer.ApplicationModal.UNISWAP_NFT_AIRDROP_CLAIM);
  var contract = useContract.useContract(sdkCore.UNISWAP_NFT_AIRDROP_CLAIM_ADDRESS, uniswapNftAirdropClaim);
  var displayError = function displayError() {
    setIsSubmitting(false);
    setError(true);
    setTimeout(function () {
      setError(false);
    }, 5000);
  };
  React.useEffect(function () {
    if (account && provider && contract) {
      _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
        var _yield$CollectionRewa, data, _claim, _yield$contract$conne, _yield$contract$conne2, _isClaimed, usdAmount;
        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return GetAirdorpMerkle.CollectionRewardsFetcher(account);
            case 3:
              _yield$CollectionRewa = _context.sent;
              data = _yield$CollectionRewa.data;
              _claim = data.find(function (claim) {
                return (claim === null || claim === void 0 ? void 0 : claim.rewardType) === index$3.Airdrop.GENIE_UNISWAP_USDC_AIRDROP;
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
              _yield$contract$conne2 = _slicedToArray__default["default"](_yield$contract$conne, 1);
              _isClaimed = _yield$contract$conne2[0];
              if (_claim && _isClaimed === false) {
                usdAmount = bignumber.BigNumber.from(_claim.amount).div(Math.pow(10, 6));
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
    var _ref9 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
      var response;
      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
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
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(index$4["default"], {
    hideBorder: true,
    isOpen: isOpen,
    onDismiss: usdcAirdropToggle,
    maxHeight: 90,
    maxWidth: 400
  }, /*#__PURE__*/React__default["default"].createElement(ModalWrap, null, isClaimed ? /*#__PURE__*/React__default["default"].createElement(ClaimContainer, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineSmall, null, "Congratulations!"), /*#__PURE__*/React__default["default"].createElement(SuccessText, null, "You have successfully claimed ", totalAmount, " USDC. Thank you for supporting Genie.xyz."), /*#__PURE__*/React__default["default"].createElement(EtherscanLink, {
    href: "https://etherscan.io/tx/".concat(hash),
    target: "_blank"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.Link, null, /*#__PURE__*/React__default["default"].createElement(EtherscanLinkWrap, null, /*#__PURE__*/React__default["default"].createElement("span", null, "Etherscan"), /*#__PURE__*/React__default["default"].createElement(icons.ChevronRightIcon, null)))), /*#__PURE__*/React__default["default"].createElement(CloseButton, {
    size: index.ButtonSize.medium,
    emphasis: index.ButtonEmphasis.medium,
    onClick: usdcAirdropToggle
  }, "Close")) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(ImageContainer, null, /*#__PURE__*/React__default["default"].createElement(TextContainer, null, /*#__PURE__*/React__default["default"].createElement(SyledCloseIcon, {
    onClick: usdcAirdropToggle,
    stroke: "white"
  }), /*#__PURE__*/React__default["default"].createElement(MainHeader, null, "Uniswap NFT Airdrop"), /*#__PURE__*/React__default["default"].createElement(USDCLabel, null, totalAmount, " USDC"), /*#__PURE__*/React__default["default"].createElement(Line, null), /*#__PURE__*/React__default["default"].createElement(RewardsDetailsContainer, null, /*#__PURE__*/React__default["default"].createElement(RewardsText, null, "Trading rewards"), " ", /*#__PURE__*/React__default["default"].createElement(CurrencyText, null, totalAmount === RewardAmounts.tradingRewardAmount || totalAmount === RewardAmounts.combinedAmount ? "".concat(RewardAmounts.tradingRewardAmount, " USDC") : "0")), /*#__PURE__*/React__default["default"].createElement(RewardsDetailsContainer, null, /*#__PURE__*/React__default["default"].createElement(RewardsText, null, "Genie NFT holder rewards"), " ", /*#__PURE__*/React__default["default"].createElement(CurrencyText, null, totalAmount !== RewardAmounts.tradingRewardAmount ? "".concat(RewardAmounts.holderRewardAmount, " USDC") : "0"))), /*#__PURE__*/React__default["default"].createElement(StyledImage, {
    src: airdopBackground
  })), /*#__PURE__*/React__default["default"].createElement(Body, null, /*#__PURE__*/React__default["default"].createElement(RewardsInformationText, null, "As a long time supporter of Genie, you\u2019ve been awarded", " ", totalAmount, " USDC tokens."), /*#__PURE__*/React__default["default"].createElement(ReactLinkWrap, null, /*#__PURE__*/React__default["default"].createElement(LinkWrap, {
    href: "https://uniswap.org/blog/uniswap-nft-aggregator-announcement",
    target: "_blank"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.Link, null, "Read more about Uniswap NFT."))), error && /*#__PURE__*/React__default["default"].createElement(Error, null, /*#__PURE__*/React__default["default"].createElement(reactFeather.AlertTriangle, null), "Claim USDC failed. Please try again later"), /*#__PURE__*/React__default["default"].createElement(ClaimButton, {
    onClick: makeClaim,
    size: index.ButtonSize.medium,
    emphasis: index.ButtonEmphasis.medium,
    disabled: isSubmitting
  }, isSubmitting && /*#__PURE__*/React__default["default"].createElement(LoadingSpinner["default"], {
    stroke: "white"
  }), /*#__PURE__*/React__default["default"].createElement("span", null, "Claim", isSubmitting && "ing", " USDC")))))));
};
var AirdropModal$1 = AirdropModal;

module.exports = AirdropModal$1;
