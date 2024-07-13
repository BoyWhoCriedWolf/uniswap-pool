'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../Unicon/index.cjs');
var types = require('../../connection/types.cjs');
var useENSAvatar = require('../../hooks/useENSAvatar.cjs');
var styled = require('styled-components');
var ThemeToggle = require('../../theme/components/ThemeToggle.cjs');
var styles = require('../../theme/styles.cjs');
var socks = require('../../assets/svg/socks.cjs');
var useSocksBalance = require('../../hooks/useSocksBalance.cjs');
var index = require('./index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var IconWrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  ", ";\n  align-items: center;\n  justify-content: center;\n  margin-right: 4px;\n  & > img,\n  span {\n    height: ", ";\n    width: ", ";\n  }\n  ", ";\n"])), styles.flexColumnNoWrap, function (_ref) {
  var size = _ref.size;
  return size ? size + "px" : "32px";
}, function (_ref2) {
  var size = _ref2.size;
  return size ? size + "px" : "32px";
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n    align-items: flex-end;\n  "])));
});
var MiniIconContainer = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 16px;\n  height: 16px;\n  bottom: -4px;\n  ", "\n  border-radius: 50%;\n  outline: 2px solid ", ";\n  outline-offset: -0.1px;\n  background-color: ", ";\n  overflow: hidden;\n  @supports (overflow: clip) {\n    overflow: clip;\n  }\n"])), function (_ref4) {
  var side = _ref4.side;
  return "".concat(side === "left" ? "left" : "right", ": -4px;");
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface1;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.surface1;
});
var MiniImg = styled__default["default"].img(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  width: 16px;\n  height: 16px;\n"])));
var Socks = function Socks() {
  return /*#__PURE__*/React__default["default"].createElement(MiniIconContainer, {
    side: "left"
  }, /*#__PURE__*/React__default["default"].createElement(MiniImg, {
    src: socks
  }));
};
var MiniWalletIcon = function MiniWalletIcon(_ref7) {
  var _connection$getIcon;
  var connection = _ref7.connection,
    side = _ref7.side;
  var isDarkMode = ThemeToggle.useIsDarkMode();
  return /*#__PURE__*/React__default["default"].createElement(MiniIconContainer, {
    side: side
  }, /*#__PURE__*/React__default["default"].createElement(MiniImg, {
    src: (_connection$getIcon = connection.getIcon) === null || _connection$getIcon === void 0 ? void 0 : _connection$getIcon.call(connection, isDarkMode),
    alt: "".concat(connection.getName(), " icon")
  }));
};
var MainWalletIcon = function MainWalletIcon(_ref8) {
  var account = _ref8.account,
    connection = _ref8.connection,
    size = _ref8.size;
  var _useENSAvatar = useENSAvatar(account !== null && account !== void 0 ? account : undefined),
    avatar = _useENSAvatar.avatar;
  if (!account) {
    return null;
  } else if (avatar || connection.type === types.ConnectionType.INJECTED && connection.getName() === "MetaMask") {
    return /*#__PURE__*/React__default["default"].createElement(index, {
      account: account,
      size: size
    });
  } else {
    return /*#__PURE__*/React__default["default"].createElement(index$1.Unicon, {
      address: account,
      size: size
    });
  }
};
function StatusIcon(_ref9) {
  var account = _ref9.account,
    connection = _ref9.connection,
    _ref9$size = _ref9.size,
    size = _ref9$size === void 0 ? 16 : _ref9$size,
    _ref9$showMiniIcons = _ref9.showMiniIcons,
    showMiniIcons = _ref9$showMiniIcons === void 0 ? true : _ref9$showMiniIcons;
  var hasSocks = useSocksBalance.useHasSocks();
  return /*#__PURE__*/React__default["default"].createElement(IconWrapper, {
    size: size,
    "data-testid": "StatusIconRoot"
  }, /*#__PURE__*/React__default["default"].createElement(MainWalletIcon, {
    account: account,
    connection: connection,
    size: size
  }), showMiniIcons && /*#__PURE__*/React__default["default"].createElement(MiniWalletIcon, {
    connection: connection,
    side: "right"
  }), hasSocks && showMiniIcons && /*#__PURE__*/React__default["default"].createElement(Socks, null));
}

exports.IconWrapper = IconWrapper;
exports["default"] = StatusIcon;
